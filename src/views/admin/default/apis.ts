import axiosInstance from "@axios";
import { AxiosResponse } from "axios";
import { bulbResponse,RoomDetail } from "./types";

const getBulbs = (roomId: string | undefined): Promise<AxiosResponse<bulbResponse[]>> => {
  return axiosInstance.get(`/Bulbs/${roomId}`);
};
export const switchBulb = (deviceId: string, switchState: "on" | "off") => {
  return axiosInstance.post(`/Bulbs/switch/${deviceId}`, {
    switchState,
  });
};


export const getRoomDetail = async (roomId: string | undefined):Promise<RoomDetail> => {
    if (!roomId) {
        return Promise.reject(new Error("Room id is not defined"));
    }
    return (await axiosInstance.get(`/Rooms/${roomId}`)).data;
};

export { getBulbs };
