import { Card, CardBody, Text, Image, Divider } from "@chakra-ui/react";

import type { Asset } from "../../services/assets";

const ListItem = ({ asset }: { asset: Asset }) => {
  return (
    <Card variant="outline" width={250} cursor="pointer">
      <CardBody>
        <Image
          h={100}
          src={asset.image_url}
          alt={asset.name}
          borderRadius="lg"
          m="auto"
          fit="contain"
          fallbackSrc="https://via.placeholder.com/100"
        />
        <Divider m={2} />
        <Text>{asset.name}</Text>
      </CardBody>
    </Card>
  );
};

export default ListItem;
