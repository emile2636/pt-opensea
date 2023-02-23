import { Container, Text, Divider, SimpleGrid } from "@chakra-ui/react";
import ListItem from "../../components/ListItem";
import useRequest from "../../hooks/useRequest";
import { getAssets } from "../../services/assets";
const List = () => {
  const { loading, data = { assets: [] } } = useRequest(() =>
    getAssets({
      owner: "0x85fD692D2a075908079261F5E351e7fE0267dB02",
      offset: 0,
      limit: 20,
    })
  );
  console.log(loading, data);

  return (
    <Container centerContent>
      <Text as="b" mt={4}>
        NFT List
      </Text>
      <Divider m={4} />
      <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={8}>
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
      </SimpleGrid>
    </Container>
  );
};

export default List;
