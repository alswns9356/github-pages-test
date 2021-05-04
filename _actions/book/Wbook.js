import axios from "axios";
import { WBOOK_READ } from "./WbookTypes";

export function getWBookRead() {
  const request = axios.get("/wBook").then((res) => res.data);

  return {
    type: WBOOK_READ,
    payload: request,
  };
}
