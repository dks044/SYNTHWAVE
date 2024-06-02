import React, { useState } from "react";
import styled from "styled-components";
import LogoComponent from "../etc/LogoComponent";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import './layout.css';

const NavigateBlock = styled.header`
  background-color: #333333;
  width: 100%;
  padding: 10px 12px 8px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .nav_logo {
    padding: 0 12px;
    .nav-logo-link {
      text-decoration: none;
      font-size: 34px;
      color: #fab005;
      font-weight: bold;
    }
  }
  .menuToggleBtn {
    display: none;
    color: white;
    font-size: 24px;
    position: absolute;
    right: 20px;
    top: 15px;
    cursor: pointer;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    .menuToggleBtn {
      display: block;
      color: #fab005;
    }
  }
`;

const NavManu = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  li {
    &:hover {
      cursor: pointer;
      border-radius: 4px;
      font-weight: bolder;

    }
  }
  .nav-menu-list {
    text-decoration: none;
    color: #fab005;
    display: flex;
    align-items: center;
    padding: 10px 10px;
  }
  @media screen and (max-width: 768px) {
    display: ${(props) => (props.isToggleOpen ? "block" : "none")};
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 5px;
  }
`;

function Navigate(){
  const [isToggleOpen,setIsToggleOpen] = useState(false);
  const handleToggleOpen = () => {
    setIsToggleOpen(!isToggleOpen);
  }

  return(
      <NavigateBlock>
        <div className="nav_logo">
            <Link to={"/"} id="logoFont" className="nav-logo-link">  
              <LogoComponent logoSize={30}/>
              Synth Wave
            </Link>
        </div>
        <NavManu isToggleOpen={isToggleOpen}>
            <li>
              <Link to={"/board"} className="nav-menu-list">
                리뷰
              </Link>
            </li>
            <li>
              <Link to={"/write"} className="nav-menu-list">
                글쓰기
              </Link>
            </li>
            <li>
              <Link to={"/mypage"} className="nav-menu-list">
                마이페이지
              </Link>
            </li>
        </NavManu >
        <FaBars className="menuToggleBtn" onClick={handleToggleOpen} />
      </NavigateBlock>
  )
}

export default React.memo(Navigate);