import { request } from "../utils/request";

export interface Collection {
  name: string;
}

export interface Asset {
  image_url: string;
  name: string;
  description: string;
  permalink: string;
  collection: Collection;
  id: number;
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
