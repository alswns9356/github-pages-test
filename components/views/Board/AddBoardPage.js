import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAddBoardList } from "../../../_actions/board_action";
import Moment from "react-moment";

const TitleStyled = styled.div`
  text-align: center;
  font-size: 50px;
`;

const ListStyled = styled.div`
  width: 700px;
  margin: auto;
  table {
    tr {
      th {
        text-align: center;
        width: 150px;
      }
      .date {
        width: 250px;
      }
      td {
        text-align: center;
      }
    }
  }
`;

const WriteLinkStyled = styled.div`
  border: 1px solid black;
  border-radius: 25px;
  vertical-align: middle;
  padding: 15px;
  position: relative;
  right: 0px;
  width: 100px;
  text-align: center;
  margin: 30px 150px 0 0;
  transition: 0.5s;
  a {
    color: black;
  }
  &:hover {
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
  }
`;

const AddBoardPage = () => {
  const [lists, setLists] = useState([
    // {
    //   aNo: "",
    //   aUserid: "",
    //   aContent: "",
    //   aDate: "",
    // },
  ]);

  const dispatch = useDispatch();

  useEffect(
    async () => {
      try {
        dispatch(getAddBoardList());
        const res = await axios.get("/addBoard");
        const inputdata = await res.data.addboard.map((data) => ({
          aNo: data.aNo,
          aUserid: data.aUserid,
          aContent: data.aContent,
          aDate: data.aDate,
        }));
        setLists(lists.concat(inputdata));
        console.log("addboard inputdata ==>", inputdata);
        console.log("lists ==>", lists);
      } catch (e) {
        console.log(e);
      }
    },
    [dispatch]
    // []
  );
  console.log("lists==>", lists);

  return (
    <div>
      <TitleStyled>신청게시판</TitleStyled>
      <WriteLinkStyled>
        <Link to={"/addBoard/write"}>작성하기</Link>
      </WriteLinkStyled>
      <ListStyled>
        <table>
          <tr>
            <th>글번호</th>
            <th>작성자</th>
            <th>신청메뉴</th>
            <th>작성일자</th>
          </tr>

          {lists.map((list) => {
            if (!list) {
              return <div>게시글이 없습니다.</div>;
            } else {
              return (
                <tr key={list.aNo}>
                  <td>{list.aNo}</td>
                  <td>{list.aUserid}</td>
                  <td>{list.aContent}</td>
                  <td>
                    <Moment format="YYYY/MM/DD">{list.aDate}</Moment>
                  </td>
                </tr>
              );
            }
          })}
        </table>
      </ListStyled>
    </div>
  );
};

export default withRouter(AddBoardPage);
