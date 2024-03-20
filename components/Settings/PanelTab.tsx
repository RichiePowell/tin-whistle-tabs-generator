import { Tab, Text } from "@chakra-ui/react";

interface SettingsTabsProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  counter?: number;
}

export const PanelTab: React.FC<SettingsTabsProps> = ({ children, icon, counter }) => {
  return (
    <Tab
      color="rgba(255, 255, 255, 0.75)"
      _hover={{ color: "white" }}
      _selected={{ color: "white", borderColor: "white" }}
      _active={{ background: "none" }}
    >
      {icon}
      <Text ml={3}>
        {children}
        {counter && counter > 0 ? (
          <Text
            borderRadius="50%"
            h="20px"
            w="20px"
            lineHeight="20px"
            background="rgba(255, 255, 255, 0.2)"
            fontSize="xs"
            fontWeight="bold"
            as="span"
            display="inline-block"
            ml={1}
          >
            {counter}
          </Text>
        ) : (
          ""
        )}
      </Text>
    </Tab>
  );
};
