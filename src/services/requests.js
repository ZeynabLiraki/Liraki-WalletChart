import axios from "axios";
import { BaseUrl } from "./constants";

const request = axios.create({
  baseURL: BaseUrl,
});

export const requestGet = async (url, data) => {
  const response = await request.get(url, data);
  return response?.data;
};
