import { Card, CardBody, Text, Image, Divider } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import type { Asset } from "../../services/assets";

const ListItem = ({ asset }: { asset: Asset }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    const { asset_contract, token_id } = asset;
    navigate(`/detail/${asset_contract.address}/${token_id}`);
  };
  return (
    <Card variant="outline" width={250} cursor="pointer" onClick={handleClick}>
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
