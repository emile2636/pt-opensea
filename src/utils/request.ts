import axios from "axios";

const request = axios.create({
  baseURL: "https://testnets-api.opensea.io/api/v1",
});

export { request };
