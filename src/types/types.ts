export interface Room {
  name: string;
  id: number;
}

export enum RoomDeviceTypes {
  THERMOMETER = "thermometer",
  SWITCH = "switch",
  LIGHT = "light",
}

export type ZigbeeDevice = {
  id: string;
  name: string;
  type: RoomDeviceTypes;
  topic: string;
};
