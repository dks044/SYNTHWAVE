import React from "react";
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
  align-items: center;

  width: 30%;
  height: 50px;
  border: 3px solid transparent;
  border-radius: 20px 20px 20px 20px;

  background-image: linear-gradient(#fff, #fff),
  linear-gradient(to right, red 0%,  orange 100%);
  background-origin: border-box;
  background-clip: content-box, border-box;
`
const SearchInput = styled.input`
  margin-left: 20px;
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
  margin-left: 10px;
`;

function BoardContainer() {
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
      </BoardSearchBar>
      <Board />
    </BoatdBlock>
  )
}

export default React.memo(BoardContainer);