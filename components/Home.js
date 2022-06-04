import { Button, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { ethers } from "ethers";

function Home() {
  const checkIfWalletIsConnected = () => {
    /*
     * First make sure we have access to window.ethereum
     */
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
    } else {
      console.log("We have the ethereum object", ethereum);
    }
  };

  /*
   * This runs our function when the page loads.
   */
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

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
