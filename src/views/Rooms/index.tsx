import { useEffect, useState } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import Navbar from "@components/navbar";
import Sidebar from "@components/sidebar";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import RoomCard from "@components/card/RoomCard";
import { Room } from "@/types/types";

export default function Rooms(props: { [x: string]: any }) {
  const { ...rest } = props;
  const location = useLocation();
  const [open, setOpen] = useState(window.innerWidth > 1200);
  const [currentRoute, setCurrentRoute] = useState("Main Dashboard");

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth > 1200 && setOpen(true)
    );
  }, []);

  const savedRoom = localStorage.getItem("currentRoom");
  if (savedRoom) {
    Navigate({
      to: `/${savedRoom}`,
      replace: true,
    });
  }

  const { id } = useParams<{ id: string }>();
  const { rooms } = useSelector((state: RootState) => state);

  return (
    <div className="flex h-full w-full">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
        <main
          className={`mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]`}
        >
          <div className="h-full">
            <Navbar
              onOpenSidenav={() => setOpen(true)}
              brandText={currentRoute}
              {...rest}
            />
            <div className="pt-5s mx-auto mb-auto flex h-24 min-h-[84vh] flex-col gap-3 p-2 pt-10 md:pr-2">
              <div className="flex flex-col gap-10  md:grid md:grid-cols-2 md:gap-10 md:px-2 md:pt-10">
                {!id &&
                  rooms?.length > 0 &&
                  rooms
                    .slice()
                    .sort((a: Room, b: Room) => {
                      return a.id - b.id;
                    })
                    .map((room: Room) => (
                      <RoomCard
                        owner={room.name}
                        title={`Pokój ${room.id}`}
                        key={room.id}
                        id={room.id}
                      />
                    ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
