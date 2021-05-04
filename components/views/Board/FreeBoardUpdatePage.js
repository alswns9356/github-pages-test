import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";
import Quill from "quill";
import "quill/dist/quill.bubble.css";
import { withRouter } from "react-router";

const TitleInput = styled.input`
  font-size: 3rem;
  outline: none;
  padding-bottom: 0.5rem;
  border: none;
  margin-bottom: 2rem;
  width: 100%;
`;

const QuillWrapper = styled.div`
  .ql-editor {
    padding: 0;
    min-height: 320px;
    font-size: 1.2rem;
    line-height: 1.5;
  }
  .ql-editor.ql-blank::before {
    left: 0;
  }
`;

const buttonStyle = css`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.3rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;
  background: cyan;
  ${(props) =>
    props.fullWidth &&
    css`
      padding-top: 0.8rem;
      padding-bottom: 0.8rem;
      width: 100%;
      font-size: 1.2rem;
    `}
  ${(props) =>
    props.cyan &&
    css`
      &:hover {
      }
    `}
`;

const StyledButton = styled.button`
  ${buttonStyle}
`;
const OutFormDiv = styled.div`
  border: 1px solid black;
  margin: auto;
  width: 700px;
  height: 800px;
`;

const FreeBoardUpdatePage = ({ match, history }) => {
  const fNo = match.params.fno;
  const quillElement = useRef(null);
  //quill 인스턴스설정
  const quillInstance = useRef(null);

  const [lists, setLists] = useState([
    {
      fNo: "",
      fTitle: "",
      fUserid: "",
      fContent: "",
      fDate: "",
      fLike: "",
      fView: "",
    },
  ]);

  const [updateTitle, setUpdateTitle] = useState("");
  const [updateContent, setUpdateContent] = useState("");

  useEffect(async () => {
    const res = await axios.get(`/freeBoard/get/${fNo}`);
    console.log("res.data==>", res.data.freeboard[0]);
    const data = res.data.freeboard[0];
    setLists(data);
  }, []);

  useEffect(() => {
    quillInstance.current = new Quill(quillElement.current, {
      theme: "bubble",
      // value:`${lists.fContent}`,
      // placeholder: `${lists.fContent}`,
      placeholder: "제목을 입력하시오",
      modules: {
        toolbar: [
          [{ header: "1" }, { header: "2" }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "orderded" }, { list: "bullet" }],
          ["blockquote", "code-block", "link", "image"],
        ],
      },
    });

    const quill = quillInstance.current;
    quill.on("text-change", (delta, oldDelta, source) => {
      console.log("quill.root.innerHTML ==>", quill.root.innerHTML);
      setUpdateContent(quill.root.innerHTML);
    });
  }, []);

  const UpdateSubmit = () => {
    // alert('updateContent'+updateContent+'updateTitle ==> '+updateTitle)
    if (updateContent !== "" && updateTitle !== "") {
      axios.put(`/freeBoard/update/${fNo}`, {
        fTitle: updateTitle,
        fContent: updateContent,
      });
      history.push(`/freeBoard`);
      // history.push(`/freeBoard/${fNo}`)
    } else {
      alert("제목이나 내용을 입력해주세요");
      return false;
    }
  };

  const onChangeTitle = (e) => {
    console.log(e.currentTarget.value);
    setUpdateTitle(e.currentTarget.value);
  };

  return (
    <OutFormDiv>
      <div>수정페이지</div>
      <form onSubmit={UpdateSubmit}>
        <TitleInput onChange={onChangeTitle} placeholder={`${lists.fTitle}`} />
        <QuillWrapper>
          <div ref={quillElement} />
        </QuillWrapper>
        <StyledButton>수정</StyledButton>
      </form>
      <StyledButton>목록</StyledButton>
    </OutFormDiv>
  );
};

export default withRouter(FreeBoardUpdatePage);
