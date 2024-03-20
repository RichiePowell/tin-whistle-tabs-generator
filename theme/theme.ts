import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "#f1f6f4",
      },
    },
  },
  components: {
    Button: {
      variants: {
        "light-transparent": {
          bg: "rgba(255, 255, 255, 0.2)",
          color: "white",
          _hover: {
            bg: "rgba(255, 255, 255, 0.3)",
          },
          _active: {
            bg: "rgba(255, 255, 255, 0.4)",
          },
        },
      },
    },
  },
});
