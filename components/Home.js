import { Button, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

function Home() {
  /*
   * Just a state variable we use to store our user's public wallet.
   */
  const [currentAccount, setCurrentAccount] = useState("");

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      /*
       * Check if we're authorized to access the user's wallet
       */
      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
