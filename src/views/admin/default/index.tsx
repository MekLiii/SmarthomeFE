import { TbBulb, TbBulbOff } from "react-icons/tb";
import { useMutation, useQuery } from "react-query";
import { getBulbs, getRoomDetail, switchBulb } from "./apis";
import BulbWidget from "@components/BulbWidget/BulbWidget";
import { Spinner } from "@chakra-ui/react";
import { useZigbeeService } from "@/hooks/useZigbeeService";
import { useEffect, useMemo } from "react";
import { RoomDeviceTypes } from "@/types/types";

const Dashboard = ({ roomId }: { roomId: string | undefined }) => {
  useEffect(() => {
    refetch();
  }, []);
  const {
    data: bulbs,
    refetch: bulbsRefetch,
    isLoading: isLoadingBulbs,
  } = useQuery("light" + roomId, () => getBulbs(roomId), {
    refetchOnWindowFocus: false,
  });
  const { mutate } = useMutation(
    "switchOfLight",
    ([deviceId, switchState]: [string, "on" | "off"]) =>
      switchBulb(deviceId, switchState)
  );
  const { data: roomDetails, refetch } = useQuery(
    "roomDetails" + roomId,
    () => getRoomDetail(roomId),
    {
      enabled: false,
    }
  );

  const { getTopicsData } = useZigbeeService(
    roomDetails?.zigbeeDevices || null
  );

  const devicesData = getTopicsData();

  return (
    <div>
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        {isLoadingBulbs ? (
          <Spinner className="color-black dark:text-white" />
        ) : (
          bulbs?.data?.map((item) => (
            <BulbWidget
              key={item.deviceName}
              icon={item.switch === "on" ? <TbBulb /> : <TbBulbOff />}
              title={item.deviceName}
              subtitle={item.switch}
              bulb={item}
              onClick={() => {
                mutate([item.deviceId, item.switch === "on" ? "off" : "on"], {
                  onSuccess: () => {
                    bulbsRefetch();
                  },
                  onError: () => {
                    console.log("error");
                  },
                });
              }}
            />
          ))
        )}
      </div>
      {/* make a component for display temperature and humanidty */}
      <div className="mt-3 grid auto-rows-auto grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-flow-row-dense 2xl:grid-cols-3 3xl:grid-cols-3">
        {devicesData?.map((item) => {
          if (item.type === RoomDeviceTypes.THERMOMETER) {
            return (
              <div
                key={item.topic}
                className="flex h-auto flex-col justify-between rounded-lg bg-white px-4 py-6 shadow-lg dark:bg-gray-800"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mx-2 flex flex-col">
                      <span className="text-6xl font-bold dark:text-white">
                        {item.payload.temperature}°C
                      </span>
                      <span className="text-2xl font-bold dark:text-white">
                        {item.payload.humidity} %
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default Dashboard;
