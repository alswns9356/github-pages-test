import axios from "axios";
import { JBOOK_READ } from "./JbookTypes";

export function getJBookRead() {
  const request = axios.get("/jBook").then((res) => res.data);

  return {
    type: JBOOK_READ,
    payload: request,
  };
}
