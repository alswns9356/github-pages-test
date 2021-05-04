import axios from "axios";
import React, { useState } from "react";
import { withRouter } from "react-router";

const AddBoardWritePage = ({ history }) => {
  const [menu, setMenu] = useState("");
  const writeMenu = (e) => {
    console.log(e.currentTarget.value);
    setMenu(e.currentTarget.value);
  };
  const OnSubmit = () => {
    //   alert(menu)
    if (menu == "") {
      alert("내용이 필요합니다.");
      return false;
    }
    axios.post("/addBoard/write", {
      aContent: menu,
    });
    history.push("/addBoard");
  };
  return (
    <div>
      <form onSubmit={OnSubmit}>
        <input placeholder="메뉴이름 작성해주세요" style={{padding:"16px 50px 13px 15px"}} onChange={writeMenu} />
        <button style={{      background:"teal",
      padding: "0.6rem 1rem",
      border: "3px solid teal",
      fontSize:"1rem",
      borderRadius:"0.5rem",
      lineHeight:"1.7",
      cursor:"pointer",
      marginLeft:"3px",
     
     }}>신청</button>
      </form>
    </div>
  );
};

export default withRouter(AddBoardWritePage);
