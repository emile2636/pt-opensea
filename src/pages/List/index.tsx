import {
  Container,
  Wrap,
  Center,
  WrapItem,
  Text,
  Divider,
  SimpleGrid,
} from "@chakra-ui/react";
import ListItem from "../../components/ListItem";

const List = () => {
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
