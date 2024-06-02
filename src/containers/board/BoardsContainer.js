import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Boards from "../../components/board/Boards";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {getBoards} from "../../modules/board/board";


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
  const loading = useSelector(
    (state) => state.board.boards?.loading
  );
  const data = useSelector((state) => state.board.boards?.data);
  const error = useSelector((state) => state.board.boards?.error);
  const dispatch = useDispatch();
  useEffect(()=>{
    if(data) return;
    dispatch(getBoards());
  });


  // 뷰 모드 상태를 관리하기 위한 useState 훅 사용
  const [viewMode, setViewMode] = useState("card");

  // 라디오 버튼 변경 핸들러
  const handleViewModeChange = (event) => {
    setViewMode(event.target.value);
  };

  //검색, 필터, 정렬
  const [keyWord,setKeyWord] = useState('');
  const [filter,setFilter] = useState('');
  const [sort,setSort] = useState('');
  // 검색, 필터, 정렬 이벤트 핸들러
  const onChangeKeyWord = (e) => {
    setKeyWord(e.target.value);
  }
  const onChangeFilter = (e) => {
    setFilter(e.target.value);
  }
  const onChangeSort = (e) => {
    setSort(e.target.value);
  }

  //검색&필터&정렬 함수
  const filterAndSortData = (boards) => {
    let filterSortData = boards;

    if (keyWord) {
      filterSortData = filterSortData.filter(
        (board) =>
          board.title.includes(keyWord) || board.content.includes(keyWord)
      );
    }

    if (filter) {
      filterSortData = filterSortData.filter((board) => board.category === filter);
    }

    switch (sort) {
      case '최신순':
        filterSortData = filterSortData.sort((a, b) => new Date(b.createDate) - new Date(a.createDate));
        break;
      case '오래된순':
        filterSortData = filterSortData.sort((a, b) => new Date(a.createDate) - new Date(b.createDate));
        break;
      case '평점순':
        filterSortData = filterSortData.sort((a, b) => b.rating - a.rating);
        break;
      case '댓글순':
        filterSortData = filterSortData.sort((a, b) => b.comments.length - a.comments.length);
        break;
      default:
        break;
    }

    return filterSortData;
  };

  const filteredAndSortedData = data ? filterAndSortData(data) : [];

  return(
    <BoatdBlock>
      <BoardTitle>전체 게시글</BoardTitle>
      <BoardSearchBar>
        <SearchInput placeholder="Search" type="search" onChange={onChangeKeyWord()}/>
        <StyledFaSearch>
          <FaSearch size={20}/>
        </StyledFaSearch>
        <StyledSelect onChange={onChangeFilter()}>
          <option value="">필터</option>
          <option value="hiphop">HipHop</option>
          <option value="rnb">R&B</option>
          <option value="pop">POP</option>
        </StyledSelect>
        <StyledSelect onChange={onChangeSort()}>
          <option value="">정렬</option>
          <option value="최신순">최신순</option>
          <option value="오래된순">오래된순</option>
          <option value="평점순">평점순</option>
          <option value="댓글순">댓글순</option>
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
      {/* TODO: 뷰모드, 필터, 정렬의 VALUE를 Props로 Board에 전달 */}
      {/* TODO: 정렬된 데이터 props로 전달 */}
      <Boards boards={filteredAndSortedData} viewMode={viewMode} />
    </BoatdBlock>
  )
}

export default React.memo(BoardContainer);