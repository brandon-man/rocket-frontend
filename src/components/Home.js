import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Spinner,
  Stack,
  Text,
  useColorMode,
  usePrefersReducedMotion,
  keyframes,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "../utils/RocketPortal.json";

const float = keyframes`
  0% { transform: translatey(0px); }
  50% { transform: translatey(-20px); }
  100% { transform: translatey(0px); }
`;

function Home() {
  const prefersReducedMotion = usePrefersReducedMotion();

  const animation = prefersReducedMotion
    ? undefined
    : `${float} infinite 8s ease-in-out`;

  const [value, setValue] = useState("");

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };
  /*
   * Just a state variable we use to store our user's public wallet.
   */
  const [currentAccount, setCurrentAccount] = useState("");
  const [allRockets, setAllRockets] = useState([]);
  const [rocketCount, setRocketCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();

  const contractAddress = "0xa4CC42728a48710524B454F719fD5483bE2DBe8f";

  const contractABI = abi.abi;

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have Metamask!");
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
        getAllRockets();
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

        const rocketTxn = await rocketPortalContract.rocket(value);
        console.log("Mining...", rocketTxn.hash);
        setLoading(true);

        await rocketTxn.wait();
        console.log("Mining --", rocketTxn.hash);

        count = await rocketPortalContract.getTotalRockets();
        console.log("Retrieved total rocket count...", count.toNumber());
        setRocketCount(rocketCount + count.toNumber());
        setLoading(false);
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

  useEffect(() => {
    const getAllRockets = async () => {
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

          const rockets = await rocketPortalContract.getAllRockets();

          let rocketsCleaned = [];
          rockets.forEach((rocket) => {
            rocketsCleaned.push({
              address: rocket.rocketer,
              timestamp: new Date(rocket.timestamp * 1000),
              message: rocket.message,
            });
          });

          setAllRockets(rocketsCleaned);
        } else {
          console.log("Ethereum object doesn't exist!");
        }
      } catch (error) {
        console.log(error);
      }
    };

    getAllRockets();
  }, [rocketCount]);

  return (
    <Container>
      <Flex alignItems="center" flexDirection="column" m={4}>
        <Heading p={4}>🚀 Hey there!</Heading>
        <Text p={4}>Connect your Ethereum wallet and go to the moon!</Text>

        <Stack spacing={4} direction="column" align="center">
          <Textarea
            value={value}
            onChange={handleInputChange}
            size="lg"
            variant="filled"
            placeholder="Send me a message"
            _placeholder={{
              opacity: 1,
              color: colorMode === "dark" ? "white" : "black",
            }}
          />
          {loading ? (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          ) : (
            <Button
              colorScheme={colorMode === "dark" ? "orange" : "blue"}
              onClick={rocket}
            >
              To the moon! 🚀
            </Button>
          )}
          {!currentAccount ? (
            <Button
              colorScheme={colorMode === "dark" ? "orange" : "blue"}
              onClick={connectWallet}
            >
              Connect Wallet
            </Button>
          ) : (
            <Text p={4}>Number of rockets: {rocketCount}</Text>
          )}
        </Stack>
      </Flex>
      <Box>
        {allRockets.map((rocket, index) => {
          return (
            <Flex
              key={index}
              animation={animation}
              rounded={26}
              boxShadow="rgba(0, 0, 0, 0.16) 0px 20px 20px, rgba(0, 0, 0, 0.23) 0px 22px 22px"
              flexDirection="column"
              backgroundColor={colorMode === "dark" ? "coral" : "#AFEEEE"}
              mt={16}
              p={8}
            >
              <Text color={colorMode === "dark" ? "#1338BE" : "#DD571C"}>
                #{index + 1}
              </Text>
              <Heading size="sm">Address: </Heading>
              <Text color={colorMode === "dark" ? "#1338BE" : "#DD571C"}>
                {rocket.address}
              </Text>
              <Heading size="sm">Sent at: </Heading>
              <Text color={colorMode === "dark" ? "#1338BE" : "#DD571C"}>
                {rocket.timestamp.toString()}
              </Text>
              <Heading size="sm">Message: </Heading>
              <Text color={colorMode === "dark" ? "#1338BE" : "#DD571C"}>
                {rocket.message}
              </Text>
            </Flex>
          );
        })}
      </Box>
    </Container>
  );
}

export default Home;
