import { request } from "../utils/request";

export interface Collection {
  name: string;
}

export interface AssetContract {
  address: string;
}
export interface Asset {
  image_url: string;
  name: string;
  description: string;
  permalink: string;
  collection: Collection;
  id: number;
  asset_contract: AssetContract;
  token_id: string;
}

export async function getAssets(params: {
  owner: string;
  offset: number;
  limit: number;
}) {
  const res = await request.get<{ assets: Asset[] }>("/assets", {
    params,
  });
  return res.data;
}

export async function getSingleAsset({
  asset_contract_address,
  token_id,
}: {
  asset_contract_address: string;
  token_id: string;
}) {
  const res = await request.get<Asset>(
    `/asset/${asset_contract_address}/${token_id}`
  );
  return res.data;
}
