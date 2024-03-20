import { FormControl, FormLabel, StackItem, Switch } from "@chakra-ui/react";

interface PanelSwitchProps {
  id: string;
  label: string;
  isChecked: boolean;
  onChange: () => void;
}

export const PanelSwitch = (props: PanelSwitchProps) => (
  <StackItem>
    <FormControl display="flex" alignItems="center">
      <Switch
        id={props.id}
        isChecked={props.isChecked}
        onChange={props.onChange}
        colorScheme="yellow"
        mr="3"
        sx={{
          ".chakra-switch__track:not([data-checked])": {
            backgroundColor: "rgba(255, 255, 255, 0.3)",
          },
        }}
      />
      <FormLabel htmlFor={props.id} mb="0" cursor="pointer" fontSize="sm" userSelect="none">
        {props.label}
      </FormLabel>
    </FormControl>
  </StackItem>
);
