import React, { useState } from "react";
import styled from "styled-components";
import Board from "../../components/board/Board";
import { FloatingLabel, Form } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

const BoatdBlock = styled.div`
  padding: 1% 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
`
const BoardTitle = styled.h1`
  font-weight: bolder;
  text-align: center;
  font-size: 50px;

`
// 검색창
const BoardSearchBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  align-items: center;
  width: auto;
  height: 50px;
  border: 3px solid transparent;
  border-radius: 20px 20px 20px 20px;

  background-image: linear-gradient(#fff, #fff),
  linear-gradient(to right, red 0%,  orange 100%);
  background-origin: border-box;
  background-clip: content-box, border-box;

  @media screen and (max-width: 768px) {
    height: 100px;
  }
`
const SearchInput = styled.input`
  margin-left: 15px;
  border: transparent;
  height: 30px;
  width: 220px;
`
const StyledFaSearch = styled.div`
  margin-left: 10px;
  color: black;
`
const StyledSelect = styled.select`
  border: 1px solid transparent;
  border-radius: 5px;
  padding: 5px;
  margin-left: 5px;
`;


function BoardContainer() {
  // 뷰 모드 상태를 관리하기 위한 useState 훅 사용
  const [viewMode, setViewMode] = useState("card");

  // 라디오 버튼 변경 핸들러
  const handleViewModeChange = (event) => {
    setViewMode(event.target.value);
  };

  return(
    <BoatdBlock>
      <BoardTitle>전체 게시글</BoardTitle>
      <BoardSearchBar>
        <SearchInput placeholder="Search" type="search"/>
        <StyledFaSearch>
          <FaSearch size={20}/>
        </StyledFaSearch>
        <StyledSelect>
          <option value="">필터</option>
          <option value="hiphop">HipHop</option>
          <option value="rnb">R&B</option>
          <option value="pop">POP</option>
        </StyledSelect>
        <StyledSelect>
          <option value="">정렬</option>
          <option value="1">최신순</option>
          <option value="2">오래된순</option>
          <option value="3">평점순</option>
          <option value="4">댓글순</option>
        </StyledSelect>
        <label>
          <input
            type="radio"
            name="viewMode" 
            value="card"
            checked={viewMode === "card"} 
            onChange={handleViewModeChange} 
          />
          Card
        </label>
        <label>
          <input
            type="radio"
            name="viewMode" 
            value="list"
            checked={viewMode === "list"} 
            onChange={handleViewModeChange} 
          />
          List
        </label>
      </BoardSearchBar>
      {/* TODO: 필터, 정렬의 VALUE를 Props로 Board에 전달 */}
      <Board />
    </BoatdBlock>
  )
}

export default React.memo(BoardContainer);