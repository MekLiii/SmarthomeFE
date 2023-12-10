import Card from "@components/card";
import { HTMLAttributes } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { BulbBrighnessModal } from "../BulbBrightnesModal/BulbBrightnesModal";
import { WidgetProps, bulb } from "./BulbWidget.types";

const BulbWidget = (props: WidgetProps) => {
  const { icon, title, subtitle, bulb } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Card
      extra="!flex-row flex-grow items-center rounded-[20px] cursor-pointer relative"
      {...props}
    >
      <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
        <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
          <span className="flex items-center text-brand-500 dark:text-white">
            {icon}
          </span>
        </div>
      </div>

      <div className="h-50 ml-4 flex w-auto flex-col justify-center">
        <p className="font-dm text-sm font-medium text-gray-600">{title}</p>
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          {subtitle}
        </h4>
      </div>
      <div
        onClick={(e) => {
          e.stopPropagation();
          onOpen();
        }}
        className="absolute bottom-6 right-0 flex h-full flex-col justify-center"
      >
        <BsThreeDotsVertical className="ml-auto mr-4 text-gray-500 dark:text-white" />
      </div>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <BulbBrighnessModal
          isOpen={isOpen}
          onClose={onClose}
          title={title}
          deviceId={bulb.deviceId}
          br={bulb[bulb.ltype]?.br}
          ct={bulb[bulb.ltype]?.ct}
          ltype={bulb.ltype}
        />
      </div>
    </Card>
  );
};

export default BulbWidget;
