import React, { MouseEventHandler } from "react";
import { Link, useLocation } from "react-router-dom";
import DashIcon from "@components/icons/DashIcon";
import { useQuery } from "react-query";
import { getRooms } from "./Links.api";

export const SidebarLinks: React.FC<{
  onClose: MouseEventHandler<HTMLSpanElement>;
}> = ({ onClose }) => {
  let location = useLocation();

  const activeRoute = (routeName: string) => {
    if (routeName === "null" && location.pathname === "/") {
      return true;
    }
    return location.pathname.includes(routeName);
  };
  const isMobile = window.innerWidth < 1200;

  const { data } = useQuery("user", getRooms);
  const roomsWithMain = data?.data
    ? [{ id: null, name: "Pokoje" }, ...data?.data]
    : [{ id: null, name: "Main Dashboard" }];

  const createLinks = () => {
    return roomsWithMain.map((route, index) => {
      return (
        <Link key={index} to={route.id === null ? "/" : `/${route.id}`}>
          <div
            className="relative mb-3 flex hover:cursor-pointer"
            onClick={(e) => {
              isMobile && onClose(e)
              route.id === null && localStorage.removeItem("currentRoom");
            }}
          >
            <li
              className="my-[3px] flex cursor-pointer items-center px-8"
              key={index}
            >
              <span
                className={`${
                  activeRoute(`${route.id}`) === true
                    ? "font-bold text-brand-500 dark:text-white"
                    : "font-medium text-gray-600"
                }`}
              >
                {/* {route.icon ? route.icon : <DashIcon />} */}
                <DashIcon />
              </span>
              <p
                className={`leading-1 ml-4 flex ${
                  activeRoute(`${route.id}`) === true
                    ? "font-bold text-navy-700 dark:text-white"
                    : "font-medium text-gray-600"
                }`}
              >
                {route.name}
              </p>
            </li>
            {activeRoute(`${route.id}`) ? (
              <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-brand-500 dark:bg-brand-400" />
            ) : null}
          </div>
        </Link>
      );
    });
  };
  // BRAND
  return <>{createLinks()}</>;
};

export default SidebarLinks;
