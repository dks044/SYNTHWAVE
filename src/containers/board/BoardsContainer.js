import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Boards from "../../components/board/Boards";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {getBoards} from "../../modules/board/board";
import './board.css';
import { Pagination } from "react-bootstrap";

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

const PaginationBlock = styled.div`
  width: auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`

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


  // 페이지네이션 로직
  const [pageNum, setPageNum] = useState(0);
  const [maxPageNumberLimit,setMaxPageNumberLimit] = useState(5); // 한 번에 보여줄 최대 페이지 번호 개수
  const itemsPerPage = viewMode === 'card' ? 5 : 10;
  //const totalPages = data && data ? Math.ceil(data.length / itemsPerPage) : 0;
  const [totalPages, setTotalPages] = useState(0);
  const paginationRange = 2; // 현재 페이지 양옆으로 보여줄 페이지 번호 개수

  let pages = [];
  let startPage = Math.max(pageNum - paginationRange, 0);
  let endPage = Math.min(startPage + maxPageNumberLimit - 1, totalPages - 1);

  if (totalPages > maxPageNumberLimit && pageNum + paginationRange >= totalPages) {
    startPage = totalPages - maxPageNumberLimit;
    endPage = totalPages - 1;
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  //키입력 감지
  const [keyWordChanged, setKeyWordChanged] = useState(false);
  useEffect(() => {
    setKeyWordChanged(keyWord.length > 0);
  }, [keyWord]);

  //정렬된 데이터 및 페이징 처리
  const filteredAndSortedData = data ? filterAndSortData(data) : [];
  const currentPageData = filteredAndSortedData.slice(pageNum * itemsPerPage, (pageNum + 1) * itemsPerPage);
  
  useEffect(() => {
    // 검색, 필터, 정렬, 또는 뷰 모드(viewMode)가 변경된 후의 데이터 길이를 기반으로 총 페이지 수를 다시 계산
    const filteredAndSortedDataLength = filterAndSortData(data ? data : []).length;
    const newTotalPages = Math.ceil(filteredAndSortedDataLength / itemsPerPage);
  
    // 현재 페이지 번호가 새로운 총 페이지 수를 초과하는 경우 조정
    // 검색 조건이 변경되었을 때는 pageNum을 0으로 재설정
    if (pageNum >= newTotalPages || keyWordChanged) {
      setPageNum(0); // 검색 조건이 변경되었을 때는 첫 페이지부터 보여주도록 설정
    } else if (pageNum >= newTotalPages) {
      setPageNum(newTotalPages - 1);
    }
  
    // 총 페이지 수 업데이트
    setTotalPages(newTotalPages);
  }, [keyWord, filter, sort, data, viewMode]);


  return(
    <BoatdBlock>
      <BoardTitle>전체 게시글</BoardTitle>
      <BoardSearchBar>
        <SearchInput placeholder="Search" type="search" onChange={onChangeKeyWord}/>
        <StyledFaSearch>
          <FaSearch size={20}/>
        </StyledFaSearch>
        <StyledSelect onChange={onChangeFilter}>
          <option value="">필터</option>
          <option value="hiphop">HipHop</option>
          <option value="rnb">R&B</option>
          <option value="pop">POP</option>
        </StyledSelect>
        <StyledSelect onChange={onChangeSort}>
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
      <br/>
      <h3>총 {filterAndSortData(data ? data : []).length}건의 데이터가 있습니다.</h3>
      <Boards boards={currentPageData} viewMode={viewMode} />
      <PaginationBlock>
        <Pagination className="custom-pagination">
            {pageNum > 0 && <Pagination.Prev onClick={() => setPageNum(pageNum - 1)} />}
            
            {startPage > 0 && (
              <>
                <Pagination.Item onClick={() => setPageNum(0)}>1</Pagination.Item>
                {startPage > 1 && <Pagination.Ellipsis />}
              </>
            )}

            {pages.map(page => (
              <Pagination.Item key={page} active={page === pageNum} onClick={() => setPageNum(page)}>
                {page + 1}
              </Pagination.Item>
            ))}

            {endPage < totalPages - 1 && (
              <>
                {endPage < totalPages - 2 && <Pagination.Ellipsis />}
                <Pagination.Item onClick={() => setPageNum(totalPages - 1)}>{totalPages}</Pagination.Item>
              </>
            )}
            
            {pageNum < totalPages - 1 && <Pagination.Next onClick={() => setPageNum(pageNum + 1)} />}
        </Pagination>
      </PaginationBlock>
    </BoatdBlock>
  )
}

export default React.memo(BoardContainer);