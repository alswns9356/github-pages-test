import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../../Book.scss";

const CBookPage = () => {
  const user = useSelector((state) => state.user);


  const [lists, setLists] = useState([
    {
      cBookNo: "",
      cBookTitle: "",
      cBookImg: "",
      // cBookReply:"",
    },
  ]);

  const [reply, setReply] = useState([
    {
      cBookReUserid: "",
      cBookReComment: "",
      cBookReDate: "",
    },
  ]);

  // const dispatch = useDispatch();

  useEffect(async () => {
    try {

      const res = await axios.get("/cBook");
      const inputdata = await res.data.data.cBook.map((data) => ({
        cBookNo: data.cBookNo,
        cBookTitle: data.cBookTitle,
        cBookImg: data.cBookImg,
        // cBookReply: data.cBookReply,
      }));

      setLists(inputdata[0]);
      const cBookmNo =inputdata[0].cBookNo;
      console.log('cobbokmno====>,,,',cBookmNo);

      const replyres = await axios.get(`/cBook/${cBookmNo}`);
      console.log('ㅁㅁㅁㅁㅁ')
      const replydata = await replyres.data.data.cBookReply.map((data) => ({
        cBookReUserid: data.cBookReUserid,
        cBookReComment: data.cBookReComment,
        cBookReDate: data.cBookReDate,
      }));
      console.log("replydata ==> ", replydata);
      setReply(reply.concat(replydata));
      console.log("lists==>", lists);
    } catch (error) {
      console.log('!!',error);
    }
  }, []);

  //댓글 write
  const [writereply, setWriteReply] = useState("");

  const writereplyChange = (e) => {
    setWriteReply(e.currentTarget.value);
  };

  const writeReplySubmit = (e) => {
    
    axios.post(`/cBook/cBookReply/write`, {
      cBookmNo: lists.cBookNo,
      cBookReComment: writereply,
    });
    
    setWriteReply("");
    // history.push(`/cBook`);
  };

  return (
    <div className="component">
      <ul className="align">
        <li>
          <figure className="book">
            {/* <!-- Front --> */}
            <ul className="hardcover_front">
              <li>
                중식
                <span className="ribbon bestseller">중식</span>
              </li>
              <li></li>
            </ul>
            {/* <!-- Pages -->  */}
            <ul className="page">
              <li></li>
              <li key={lists.cBookNo}>
                <h2>{lists.cBookTitle}</h2>
                <Link to="/SearchPlace" className="btn">
                  {lists.cBookImg}
                </Link>
              </li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
            {/* <!-- Back --> */}
            <ul className="hardcover_back">
              <li></li>
              <li></li>
            </ul>
            <ul className="book_spine">
              <li></li>
              <li></li>
            </ul>
          </figure>
        </li>
      </ul>
      {/* 댓글 */}
      <form onSubmit={writeReplySubmit}>
        <textarea type="text" onChange={writereplyChange} value={writereply} />
        <button>작성하기</button>
      </form>
      {reply.map((re) => {
        return (
          <div>
            <div>
              {re.cBookReUserid}
              {re.cBookReDate}
            </div>
            <div>{re.cBookReComment}</div>
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default withRouter(CBookPage);
