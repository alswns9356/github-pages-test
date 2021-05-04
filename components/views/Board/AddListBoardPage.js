import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAddBoardList } from "../../../_actions/board_action";

const AddListBoardPage = () => {

  
  const [lists, setLists] = useState([
    {
      aNo: "",
      aUserid: "",
      aContent: "",
      aDate: "",
    },
  ]);
  const dispatch = useDispatch();

  useEffect(async () => {
    try {
      // dispatch(getAddBoardList());
      const res = await axios.get("/addBoard");
      console.log("추가게시판!!", res.data);
      const inputdata = await res.data.addboard.map((data) => ({
        aNo: data.aNo,
        aUserid: data.aUserid,
        aContent: data.aContent,
        aDate: data.aDate,
      }));
      setLists(lists.concat(inputdata));
      console.log("inputdata ==>", inputdata);
      console.log("lists ==>", lists);
    } catch (e) {
      console.log(e);
    }
  }, 
  // [dispatch]
  []
  );

  return (
    <>
      <h3>메뉴추가 게시판@@</h3>
      <Link to={"/addBoard/write"}>작성하기</Link>
      {lists.map((data) => {
        <div key={data.aNo}>
          <div>{data.aNo}</div>
        </div>;
      })}
    </>
  );
};

export default withRouter(AddListBoardPage);
