import { HTMLAttributes } from "react";

export type bulb = {
    deviceName: string;
    fwVersion: string;
    ltype: LightType;
    signalStrength: number;
    slowlyDimmed: number;
    slowlyLit: number;
    startup: string;
    deviceId: string;
    switch: "on" | "off";
  } & {
    [key in LightType]?: LightSettings;
  };
  type LightType =
    | "white"
    | "color"
    | "bright"
    | "goodNight"
    | "read"
    | "nightLight"
    | "party"
    | "leisure"
    | "soft"
    | "colorful";
  
  interface LightSettings {
    br: number;
    ct?: number;
    r?: number;
    g?: number;
    b?: number;
    tf?: number;
    sp?: number;
  }
 export type WidgetProps = {
    icon: JSX.Element;
    title: string;
    subtitle: string;
    bulb: bulb;
  } & HTMLAttributes<HTMLDivElement>;