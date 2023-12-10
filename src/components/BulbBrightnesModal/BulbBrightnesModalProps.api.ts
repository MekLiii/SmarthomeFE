import axiosInstance from "@axios";
import { BulbBrightnes } from "./BulbBrightnesModal.types";

export const changeBrightness = (
  deviceId: string,
  brightness: BulbBrightnes
) => {
  return axiosInstance.post(`/Bulbs/dim/${deviceId}`, {
    ltype: brightness.ltype,
    colorTypes: {
      ct: brightness.ct,
      br: brightness.br,
    },
  });
};
