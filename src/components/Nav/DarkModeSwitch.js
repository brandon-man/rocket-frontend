import { useColorMode, IconButton } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const iconColor = {
    light: "blue.500",
    dark: "yellow.300",
  };
  return (
    <IconButton
      rounded={20}
      aria-label="Toggle dark mode"
      icon={
        colorMode === "dark" ? (
          <SunIcon _hover={{ color: "white", stroke: "white" }} />
        ) : (
          <MoonIcon _hover={{ color: "black", stroke: "black" }} />
        )
      }
      onClick={toggleColorMode}
      color={iconColor[colorMode]}
    />
  );
};

export default DarkModeSwitch;
