import React, { useEffect } from "react";
import styled from "styled-components";
import Board from "../../components/board/Board";
import { useDispatch, useSelector } from "react-redux";
import {getBoard} from "../../modules/board/board"

const BoardBlock = styled.div`
  padding: 5% 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function BoardContainer({boardId}){
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.board.board?.loading);
  const data = useSelector((state) => state.board.board?.data);
  const error = useSelector((state) => state.board.board?.error);

  useEffect(()=>{
    dispatch(getBoard(boardId));
  },[dispatch,boardId])

  if (loading && !data) return <p>잠시만 기다려주세요..</p>
  if (error) return <div>{error.message}</div>;

  return(
    <BoardBlock>
      <Board board={data}/>
    </BoardBlock>
  )
}

export default React.memo(BoardContainer);