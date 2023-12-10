import { createSlice, configureStore } from "@reduxjs/toolkit";

interface Room {
  name: string;
  id: number;
}

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    rooms: [] as Room[],
  },
  reducers: {
    setRooms: (state, action) => {
      state.rooms = action.payload;
    },
  },
});

export const { setRooms } = counterSlice.actions;

export const store = configureStore({
  reducer: counterSlice.reducer,
});
export type RootState = ReturnType<typeof store.getState>;


