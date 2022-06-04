import { Box, Button, Container, Heading, Text } from "@chakra-ui/react";
import { ethers } from "ethers";

function Home() {
  const rocket = () => {};

  return (
    <Container>
      <Box>
        <Heading>🚀 Hey there!</Heading>

        <Text>Connect your Ethereum wallet and go to the moon!</Text>

        <Button onClick={rocket}>To the moon!</Button>
      </Box>
    </Container>
  );
}

export default Home;
