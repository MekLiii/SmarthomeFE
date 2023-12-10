import Card from "@components/card";
import { RoomWidgetProps } from "./RoomWidget.types";
import { Link } from "react-router-dom";

export const RoomWidget = ({ id, name }: RoomWidgetProps) => {
  return (
    <Link to={`/${id}`}>
      <Card extra="!flex-row flex-grow items-center rounded-[20px] cursor-pointer relative">
        <div
          className="ml-[18px] flex h-[90px] w-auto flex-row items-center"
         
        >
          <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
            <span className="flex items-center text-brand-500 dark:text-white">
            </span>
          </div>
        </div>

        <div className="h-50 ml-4 flex w-auto flex-col justify-center">
          <p className="font-dm text-sm font-medium text-gray-600">{name}</p>
          <h4 className="text-xl font-bold text-navy-700 dark:text-white"></h4>
        </div>
      </Card>
    </Link>
  );
};
