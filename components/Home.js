import { Button, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { ethers } from "ethers";

function Home() {
  const rocket = () => {};

  return (
    <Container>
      <Flex alignItems="center" flexDirection="column" m={4}>
        <Heading p={4}>🚀 Hey there!</Heading>

        <Text p={4}>Connect your Ethereum wallet and go to the moon!</Text>

        <Button onClick={rocket}>To the moon!</Button>
      </Flex>
    </Container>
  );
}

export default Home;
