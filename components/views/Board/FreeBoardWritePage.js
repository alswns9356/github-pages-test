import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";
import Quill from "quill";
import "quill/dist/quill.bubble.css";
import axios from "axios";
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
  margin: auto;
  height: 600px;
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

const FreeBoardWritePage = ({ title, body, history }) => {
  //quill을 적용할 Div엘리먼트 설정
  const quillElement = useRef(null);
  //quill 인스턴스설정
  const quillInstance = useRef(null);

  const [fTitle, setFTitle] = useState("");
  const [fContent, setFContent] = useState("");

  useEffect(() => {
    console.log(fTitle, fContent);
    quillInstance.current = new Quill(quillElement.current, {
      theme: "bubble",
      placeholder: "내용을 입력하시오",
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
      setFContent(quill.root.innerHTML);
    });
  }, []);

  const onChangeTitle = (e) => {
    console.log("title", e.currentTarget.value);
    setFTitle(e.currentTarget.value);
    console.log(fTitle);
  };

  const BoardSubmit = async (e) => {
    if (fTitle !== "" && fContent !== "") {
      try {
        axios.post("/freeBoard/write", {
          fTitle: fTitle,
          fContent: fContent,
        });
        history.push("/freeBoard");
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <OutFormDiv>
      <form onSubmit={BoardSubmit}>
        <TitleInput
          placeholder="제목을 입력하시오"
          onChange={onChangeTitle}
          value={title}
        />
        <hr />
        <QuillWrapper>
          <div ref={quillElement} />
        </QuillWrapper>
        <StyledButton>작성</StyledButton>
      </form>
    </OutFormDiv>
  );
};

export default withRouter(FreeBoardWritePage);
