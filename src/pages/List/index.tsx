import {
  Container,
  Text,
  Divider,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState, useCallback, useMemo } from "react";
import ListItem from "../../components/ListItem";
import useRequest from "../../hooks/useRequest";
import { Asset, getAssets } from "../../services/assets";
const List = () => {
  const [offset, setOffset] = useState(0);
  const [renderAssets, setRenderAssets] = useState<Asset[]>([]);
  const { loading, data = { assets: [] } } = useRequest(
    () =>
      getAssets({
        owner: "0x85fD692D2a075908079261F5E351e7fE0267dB02",
        offset,
        limit: 20,
      }),
    [offset]
  );

  const handleScroll = useCallback(() => {
    const atBottom =
      document.documentElement.scrollHeight -
        document.documentElement.scrollTop <=
      document.documentElement.clientHeight;
    if (atBottom && data.assets.length === 20) {
      setOffset(offset + 20);
    }
  }, [offset, data]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setRenderAssets(renderAssets.concat(data.assets));
  }, [data]);
  
  return (
    <Container centerContent p={8}>
      <Text as="b">NFT List</Text>
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
