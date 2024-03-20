import { Slider, SliderFilledTrack, SliderThumb, SliderTrack, StackItem, Text } from "@chakra-ui/react";

interface PanelRangeSliderProps {
  min: number;
  max: number;
  label: string;
  defaultValue: number;
  onChange: (val: number) => void;
}

export const PanelRangeSlider = (props: PanelRangeSliderProps) => {
  return (
    <StackItem alignItems="center" width="100%" px={5}>
      <Text mr={3} mb={2}>
        {props.label}
      </Text>
      <Slider
        aria-label="spacer-slider"
        colorScheme="yellow"
        defaultValue={props.defaultValue}
        min={props.min}
        max={props.max}
        width="100%"
        onChange={props.onChange}
        focusThumbOnChange={false}
      >
        <SliderTrack backgroundColor="rgba(255, 255, 255, 0.3)">
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </StackItem>
  );
};
