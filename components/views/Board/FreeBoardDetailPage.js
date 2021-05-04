import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, matchPath, withRouter } from "react-router-dom";
import * as qs from "query-string";
import { ButtonToolbar, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getFreeBoardDetail } from "../../../_actions/board_action";
import Moment from "react-moment";

const TableDivStyled = styled.div`
  width: 650px;
  margin: auto;
  table {
    width: 650px;
    th,
    td {
      border: 1px solid #444444;
    }
    text-align: center;
    th {
      width: 100px;
    }
    td {
      width: 150px;
    }
    .content {
      height: 400px;
    }
  }
`;
const ReplyContentStyled = styled.div`
  width: 660px;
  margin: auto;
  form {
    input {
      vertical-align: middle;
      width: 500px;
      height: 30px;
    }
    button {
      box-shadow: 2px 2px 2px gray;
      border-radius: 20px;
      padding: 10px;
      vertical-align: middle;
      width: 100px;
      height: 30px;
      font-size: 15px;
      margin: 0 0 0 20px;
    }
  }
`;
const ReplyListStyled = styled.div``;

const UserClickStyled = styled.div`
  div {
    vertical-align: middle;
    display: inline-block;
    margin: 15px 15px 15px 0;
    button {
      box-shadow: 2px 2px 2px gray;
      border-radius: 20px;
      padding: 10px;
      vertical-align: middle;
      width: 100px;
      height: 30px;
      font-size: 15px;
      margin: 0 0 0 20px;
    }
  }
`;

const ReplyItemStyled = styled.div`
  width: 650px;
  div {
    display: inline-block;
  }
  .reUserid {
    vertical-align: middle;
    width: 150px;
    margin: 0 15px 0 0;
  }
  .reContent {
    white-space: normal;
    width: 300px;
    margin: 0 15px 0 0;
  }
  .reDate {
    width: 150px;
  }
`;

const FreeBoardDetailPage = ({ match, props, history }) => {
  const user = useSelector((state) => state.user);
  console.log("user.userData", user);

  const onDelClick = (e) => {
    const delNum = match.params.fno;
    axios.delete(`/freeBoard/del/${delNum}`).then(history.push("/freeBoard"));
  };

  const [lists, setLists] = useState([
    // {
    //   fNo: "",
    //   fTitle: "",
    //   fUserid: "",
    //   fContent: "",
    //   fDate: "",
    //   fLike: "",
    //   fView: "",
    // },
  ]);

  const [reply, setReply] = useState([
    // {
    //   fReUserid: "",
    //   fReComment: "",
    //   fReDate: "",
    // },
  ]);

  // const dispatch = useDispatch();

  useEffect(
    async () => {
      try {
        const fNo = match.params.fno;
        // dispatch(getFreeBoardDetail(fNo));
        const res = await axios.get(`/freeBoard/${fNo}`);
        const inputdata = await res.data.data.freeboard.map((data) => ({
          fNo: data.fNo,
          fTitle: data.fTitle,
          fUserid: data.fUserid,
          fContent: data.fContent,
          fDate: data.fDate,
          fLike: data.fLike,
          fView: data.fView,
        }));
        const replydata = await res.data.data.Reply.map((data) => ({
          fReUserid: data.fReUserid,
          fReComment: data.fReComment,
          fReDate: data.fReDate,
        }));
        console.log("replydata ==> ", replydata);
        setLists(inputdata[0]);
        setReply(reply.concat(replydata));
      } catch (error) {
        console.log(error);
      }
    },
    []
    // [dispatch]
  );

  const [writereply, setWriteRely] = useState("");

  const writereplyChange = (e) => {
    setWriteRely(e.currentTarget.value);
  };

  const writeReplySubmit = (e) => {
    e.preventDefault();
    const fNo = match.params.fno;
    if (writereply == "") {
      return alert("댓글을 입력하시오");
    } else {
      axios.post(`/freeBoard/fReply/write/${fNo}`, {
        fBoardNo: fNo,
        fReComment: writereply,
      });
      setWriteRely("");
      // .then((res) => alert('resresresresresresres',res)).catch(e => {console.log(e)});
      history.replace(`/freeBoard/${fNo}`);
    }
  };

  const updateButton = () => {
    const con = window.confirm('수정페이지 이동시 그 전 데이터는 날아갈수 있습니다.');
    if(con == true){
      history.push(`/freeBoardupdate/${lists.fNo}`);
    }else{
      return false;
    }
  };

  return (
    <div>
      <TableDivStyled>
        <table>
          <tr>
            <th>글번호</th>
            <td>{lists.fNo}</td>
            <th>작성자</th>
            <td>{lists.fUserid}</td>
          </tr>
          <tr>
            <th>작성날짜</th>
            <td>
              <Moment format="YYYY/MM/DD">{lists.fDate}</Moment>
            </td>
            <th>조회수</th>
            <td>{lists.fView}</td>
          </tr>
          <tr>
            <th>제목</th>
            <td colspan="3">{lists.fTitle}</td>
          </tr>
          <tr>
            <th className="content">내용</th>
            <td className="writeContent" colspan="3">
              <div dangerouslySetInnerHTML={{ __html: lists.fContent }} />
            </td>
          </tr>
        </table>
        <UserClickStyled>
          <div>
            <Link to={"/freeBoard"}>목록</Link>
          </div>
          {/* 하지만 새로 고침시 useSelector가 사라져서 오류가 뜬다.... */}
          {user.userData.id == lists.fUserid ? (
            <>
              <div>
                <button onClick={updateButton}>수정하기</button>
              </div>
              <div>
                <button onClick={onDelClick}>삭제</button>
              </div>
            </>
          ) : (
            <></>
          )}
        </UserClickStyled>
      </TableDivStyled>
      <ReplyContentStyled>
        <form onSubmit={writeReplySubmit}>
          <input type="text" onChange={writereplyChange} value={writereply} />
          <button>작성하기</button>
        </form>
        <ReplyListStyled>
          {reply.map((re) => {
            return (
              <ReplyItemStyled>
                <div className="reUserid">{re.fReUserid}</div>
                <div className="reContent">{re.fReComment}</div>
                <div className="reDate">
                  <Moment format="YYYY/MM/DD">{re.fReDate}</Moment>
                </div>
                <hr />
              </ReplyItemStyled>
            );
          })}
        </ReplyListStyled>
      </ReplyContentStyled>
    </div>
  );
};

export default withRouter(FreeBoardDetailPage);
