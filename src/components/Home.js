import {
  Button,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "../utils/RocketPortal.json";

function Home() {
  /*
   * Just a state variable we use to store our user's public wallet.
   */
  const [currentAccount, setCurrentAccount] = useState("");
  const [rocketCount, setRocketCount] = useState(0);

  const contractAddress = "0xf506d4F412a83a3d1c65DF415b76811264F4F7Bd";

  const contractABI = abi.abi;

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

  /**
   * Implement your connectWallet method here
   */
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const rocket = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const rocketPortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        let count = await rocketPortalContract.getTotalRockets();
        console.log("Retrieved total rocket count...", count.toNumber());

        const rocketTxn = await rocketPortalContract.rocket();
        console.log("Mining...", rocketTxn.hash);

        await rocketTxn.wait();
        console.log("Mining --", rocketTxn.hash);

        count = await rocketPortalContract.getTotalRockets();
        console.log("Retrieved total rocket count...", count.toNumber());
        setRocketCount(rocketCount + count.toNumber());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfRocket = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const rocketPortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        let count = await rocketPortalContract.getTotalRockets();
        console.log("Retrieved total rocket count...", count.toNumber());
        setRocketCount(count.toNumber());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  useEffect(() => {
    checkIfRocket();
  });

  return (
    <Container>
      <Flex alignItems="center" flexDirection="column" m={4}>
        <Heading p={4}>🚀 Hey there!</Heading>
        <Text p={4}>Connect your Ethereum wallet and go to the moon!</Text>
        <Text p={4}>Number of rockets: {rocketCount}</Text>
        <Stack spacing={4} direction="column" align="center">
          <Button onClick={rocket}>To the moon! 🚀</Button>
          {!currentAccount && (
            <Button onClick={connectWallet}>Connect Wallet</Button>
          )}
        </Stack>
      </Flex>
    </Container>
  );
}

export default Home;
