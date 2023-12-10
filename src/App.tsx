import { Routes, Route } from "react-router-dom";
import { useQuery } from "react-query";
import axiosInstance from "./axios/axios";
import { lazy, useEffect, Suspense } from "react";
import { useDispatch } from "react-redux";
import { setRooms } from "./store/store";
import { Spinner } from '@chakra-ui/react'

const Room = lazy(() => import("./views/Room/Room"));
const Rooms = lazy(() => import("./views/Rooms"));


const App = () => {
  const { refetch } = useQuery("user", () => axiosInstance.get("/Rooms"), {
    enabled: false,
  });
  const dispatch = useDispatch();
  useEffect(() => {
    refetch().then((res) => {
      dispatch(setRooms(res.data?.data));
    });
  }, []);

 

  return (
    <Routes>
      <Route
        path="/:id"
        element={
          <Suspense fallback={<Spinner />}>
            <Room />
          </Suspense>
        }
      />
      <Route
        path="/"
        element={
          <Suspense fallback={<Spinner />}>
            <Rooms />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default App;
