import { Room } from "@/types/types";
import axiosInstance from "@axios";
import { AxiosResponse } from "axios";


export const getRoomById = async (rommId:string | undefined):Promise<AxiosResponse<Room>> => {
    return axiosInstance.get(`/Rooms/${rommId}`);
};
export const getRooms = async ():Promise<AxiosResponse<Room[]>> => {
    return axiosInstance.get("/Rooms");
};