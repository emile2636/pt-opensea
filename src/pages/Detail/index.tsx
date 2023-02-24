import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Text,
  Divider,
  Link,
  Spinner,
  Image,
  Button,
  Flex,
} from "@chakra-ui/react";

import useRequest from "../../hooks/useRequest";
import { getSingleAsset } from "../../services/assets";

const Detail = () => {
  const { asset_contract_address = "", token_id = "" } = useParams();
  const navigate = useNavigate();

  const { data, loading } = useRequest(() =>
    getSingleAsset({
      asset_contract_address,
      token_id,
    })
  );

  const handleBack = () => {
    navigate("/");
  };

  return (
    <Container centerContent p={8} minH="100vh">
      <Flex alignItems="center" w="100%">
        <Button
          position="absolute"
          colorScheme="blue"
          variant="ghost"
          onClick={handleBack}
        >
          {"<"}
        </Button>
        <Text as="b" flexGrow={1}>
          {data?.collection.name}
        </Text>
      </Flex>
      <Divider m={4} />
      <Image
        w="100%"
        src={data?.image_url}
        alt={data?.name}
        borderRadius="lg"
        fit="contain"
        fallbackSrc="https://via.placeholder.com/100"
      />
      <Text fontSize="lg" as="b">
        {data?.name}
      </Text>
      <Text fontSize="sm">{data?.description}</Text>
      <Link href={data?.permalink} isExternal position="absolute" bottom={20}>
        Go Permalink 👈
      </Link>
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

export default Detail;
