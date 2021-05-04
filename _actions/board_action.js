import axios from "axios";
import {
  FREEBOARD_LIST,
  FREEBOARD_WRITE,
  FREEBOARD_DETAIL,
  ADDBOARD_LIST,
} from "./BoardTypes";

export function getFreeBoardList() {
  const request = axios.get("/freeBoard").then((res) => {});
  return {
    type: FREEBOARD_LIST,
    payload: request,
  };
}

export function postFreeBoardPost() {
  const request = axios.post("/freeBoard/write").then((res) => res.data);

  return {
    type: FREEBOARD_WRITE,
    payload: request,
  };
}

export function getFreeBoardDetail(fno) {
  console.log("action에 들어왔어요 수박");
  const request = axios.get(`/freeBoard/${fno}`).then((res) => res.data);
  console.log("request", request);
  return {
    type: FREEBOARD_WRITE,
    payload: request,
  };
}

// export function postFreeBoardPost() {
//   const request = axios.post("/freeBoard/write").then((res) => res.data);

//   return {
//     type:FREEBOARD_WRITE,
//     payload:request
//   }
// }

export function getAddBoardList() {
  console.log("addboardlist");
  const req = axios.get("/addBoard").then((res) => res.data);

  return{
    type:ADDBOARD_LIST,
    payload:req
  }
}
