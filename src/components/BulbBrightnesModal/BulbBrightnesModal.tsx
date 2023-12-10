import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { Button } from "@chakra-ui/react";

import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BulbBrightnesModalProps } from "./BulbBrightnesModal.types";
import { useMutation } from "react-query";
import { changeBrightness } from "./BulbBrightnesModalProps.api";

export const BulbBrighnessModal = ({
  isOpen,
  onClose,
  title,
  deviceId,
  ct,
  br,
  ltype,
}: BulbBrightnesModalProps) => {
  const [brightness, setBrightness] = useState(br);
  const [temperature, setTemperature] = useState(ct);

  const { data, mutate } = useMutation(() =>
    changeBrightness(deviceId, {
      deviceId,
      br: brightness,
      ct: temperature,
      ltype: ltype,
    })
  );
  const debounceDelay = 500;
  let debounceTimer: ReturnType<typeof setTimeout> | undefined;

  const debouncedMutate = () => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    debounceTimer = setTimeout(() => {
      mutate();
    }, debounceDelay);
  };
  useEffect(() => {
    debouncedMutate();
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [brightness, temperature]);

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      isCentered
      motionPreset="slideInBottom"
    >
      <ModalOverlay
        bg="rgba(0,0,0,0.5)"
        zIndex={50}
        backdropFilter="auto"
        backdropBlur="2px"
      />
      <ModalContent className="z-50 rounded-[20px] bg-white dark:bg-navy-700">
        <ModalHeader className="z-50 rounded-[20px] text-navy-700 dark:text-white">
          {title}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody className="z-50 flex flex-col gap-5 rounded-[20px] bg-white dark:bg-navy-700">
          <div>
            <span className="text-navy-700 dark:text-white">Jasność</span>
            <Slider
              aria-label="slider-ex-1"
              defaultValue={brightness}
              onChange={(value) => {
                setBrightness(value);
              }}
              min={1}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </div>
          <div>
            <span className="text-navy-700 dark:text-white">Temperatura</span>
            <Slider
              aria-label="slider-ex-1"
              defaultValue={temperature}
              onChange={(value) => {

                setTemperature(value);
              }}
              min={1}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Zamknij</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
