import { useColorMode, Flex, Box } from "@chakra-ui/react";
import styled from "@emotion/styled";

import DarkModeSwitch from "./DarkModeSwitch";

const NavContainer = ({ children }) => {
  const { colorMode } = useColorMode();

  const bgColor = {
    light: "#FBEAEB",
    dark: "#4831D4",
  };

  const navHoverBg = {
    light: "gray.100",
    dark: "gray.300",
  };

  const color = {
    light: "black",
    dark: "white",
  };

  const StickNav = styled(Flex)`
    position: sticky;
    z-index: 10;
    top: 0;
    transition: height 0.5s, line-height 0.5s;
  `;
  return (
    <Box bg={[colorMode]}>
      <StickNav
        flexDirection="row"
        justifyContent="flex-end"
        alignItems="flex-end"
        maxWidth={["330", "400", "450"]}
        as="nav"
        px={[2, 6, 6]}
        py={2}
        mb={[0, 0, 8]}
        ms="auto"
      >
        <DarkModeSwitch />
      </StickNav>
      <Flex
        as="main"
        justifyContent="center"
        flexDirection="column"
        bg={bgColor[colorMode]}
        color={color[colorMode]}
        px={[0, 4, 4]}
        mt={[4, 8, 8]}
      >
        {children}
      </Flex>
    </Box>
  );
};

export default NavContainer;
