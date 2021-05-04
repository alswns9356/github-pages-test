import axios from "axios";
import { CBOOK_READ } from "./CbookTypes";

export function getCBookRead() {
  const request = axios.get("/cBook").then((res) => res.data);

  return {
    type: CBOOK_READ,
    payload: request,
  };
}
export function getCBookReply(cBookmNo) {
  const request = axios.get(`/cBook/${cBookmNo}`).then((res) => res.data);

  return {
    type: CBOOK_READ,
    payload: request,
  };
}