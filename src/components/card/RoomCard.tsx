import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useState } from "react";
import Card from "@components/card";
import { Link } from "react-router-dom";

const RoomCard = ({
  title,
  owner,
  extra,
  id,
}: {
  title: string;
  owner: string;
  extra?: string;
  id: number;
}) => {
  const handleSaveCurrentRoom = () => {
    localStorage.setItem("currentRoom", id.toString());
  };
  return (
    <Card
      extra={`flex flex-col w-full h-full !p-4 3xl:p-![18px] bg-white ${extra}`}
    >
      <div className="h-full w-full">
        <div className="mb-3 flex items-center justify-between px-1 md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col xl:items-start 3xl:flex-row 3xl:justify-between">
          <div className="mb-2">
            <p className="text-lg font-bold text-navy-700 dark:text-white">
              {owner}
            </p>
            <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2">
              {title}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col 2xl:items-start 3xl:flex-row 3xl:items-center 3xl:justify-between">
          <Link to={`/${id}`}>
            <button
              type="button"
              onClick={handleSaveCurrentRoom}
              className="linear rounded-md bg-brand-900 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90"
            >
              Przejdź do pokoju
            </button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default RoomCard;
