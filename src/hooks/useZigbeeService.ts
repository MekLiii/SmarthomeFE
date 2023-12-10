import { useState, useEffect, useCallback } from "react";
import { ZigbeeDevice } from "@/types/types";

type deviceInfo = {
  payload: {
    battery: number;
    humidity: number;
    linkquality: number;
    temperature: number;
  };
  topic: string;
  name?: string;
  type?: string;
};
const websocket = new WebSocket("ws://192.168.0.104:8080/api");
export const useZigbeeService = (devices: ZigbeeDevice[] | null) => {
  const [data, setData] = useState<deviceInfo[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    websocket.onopen = () => {
      setLoading(false);
      console.log("connected");
    };
    websocket.onmessage = (message) => {
      setData((prev) => {
        try {
          const data = JSON.parse(message.data);
          const topic = data.topic;
          const payload = data.payload;
          const newTopicData = { topic, payload };
          if (prev) {
            const newTopics = prev.filter(
              (topic) => topic.topic !== newTopicData.topic
            );
            return [...newTopics, newTopicData];
          }
          return [newTopicData];
        } catch (e) {
          console.log(e);
          return prev;
        }
      });
    };
    websocket.onclose = () => {
      console.log("disconnected");
    };
  }, []);
  const getTopicsData = useCallback(
    () => {
      if (data && devices) {
        const avalibleTopics = devices?.map((device) => device.id);
        console.log({ avalibleTopics });
        const topicsData = data.filter((data) => avalibleTopics.includes(data.topic));
        console.log({ topicsData });
        topicsData.forEach((topicData) => {
          const deviceData = devices.find(
            (device) => device.id === topicData.topic
          );
          if (deviceData) {
            topicData.name = deviceData.name;
            topicData.type = deviceData.type;
          }
        });
        return topicsData;
      }
      return null;
    },
    [data, devices]
  );

  return { data, loading, getTopicsData };
};
