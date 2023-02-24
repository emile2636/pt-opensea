import {
  Container,
  Text,
  Divider,
  SimpleGrid,
  Spinner,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState, useCallback } from "react";
import ListItem from "../../components/ListItem";
import useRequest from "../../hooks/useRequest";
import { Asset, getAssets } from "../../services/assets";

import { useConnect, useAccount, useDisconnect } from "wagmi";

const defaultAddress = "0x85fD692D2a075908079261F5E351e7fE0267dB02";

const List = () => {
  const { connect, connectors, isLoading, pendingConnector } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const [offset, setOffset] = useState(0);
  const [renderAssets, setRenderAssets] = useState<Asset[]>([]);
  const { loading, data } = useRequest(
    () =>
      getAssets({
        owner: address || defaultAddress,
        offset,
        limit: 20,
      }),
    [offset, address]
  );

  useEffect(() => {
    setRenderAssets(renderAssets.concat(data?.assets || []));
  }, [data]);

  const handleScroll = useCallback(() => {
    const atBottom =
      document.documentElement.scrollHeight -
        document.documentElement.scrollTop <=
      document.documentElement.clientHeight;
    if (atBottom && data?.assets.length === 20) {
      setOffset(offset + 20);
    }
  }, [offset, data]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const connector = connectors[0]; // only one connector(Metamask)
  return (
    <Container centerContent p={8}>
      <Text as="b">NFT List</Text>
      <div>{address || "Default: " + defaultAddress}</div>

      {isConnected ? (
        <div>
          <Button size="sm" m={4} onClick={() => disconnect()}>
            Disconnect
          </Button>
        </div>
      ) : (
        <Button
          colorScheme="orange"
          size="sm"
          m={4}
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
          isLoading={isLoading}
        >
          Connect {connector.name}
          {!connector.ready && " (unsupported)"}
          {isLoading &&
            connector.id === pendingConnector?.id &&
            " (connecting)"}
        </Button>
      )}
      <Divider m={4} />
      <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={8}>
        {renderAssets.map((asset) => (
          <ListItem key={asset.id} asset={asset} />
        ))}
      </SimpleGrid>
      {loading && (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
          pos={"fixed"}
          bottom={20}
        />
      )}
    </Container>
  );
};

export default List;
