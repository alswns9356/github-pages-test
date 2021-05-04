import axios from "axios";
import { KBOOK_READ } from "./KbookTypes";

export function getKBookRead() {
  const request = axios.get("/kBook").then((res) => res.data);

  return {
    type: KBOOK_READ,
    payload: request,
  };
}
