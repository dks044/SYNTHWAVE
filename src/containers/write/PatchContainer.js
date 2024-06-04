import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBoard } from "../../modules/board/board";
import styled from "styled-components";
import PatchComponent from "../../components/write/PatchComponent";

const PatchBlock = styled.div`
  padding: 5% 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  margin-bottom: 20px; // h1 태그와 input 사이의 여백 추가
`;

function PatchContainer({boardId}){
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.board.board?.loading);
  const data = useSelector((state) => state.board.board?.data);
  const error = useSelector((state) => state.board.board?.error);

  useEffect(()=>{
    dispatch(getBoard(boardId));
  },[dispatch,boardId])


  if (loading && !data) return <p>잠시만 기다려주세요..</p>
  if (error) return <div>{error.message}</div>;

  return (
    <PatchBlock>
      <Title><strong>수정 페이지</strong></Title>
      <PatchComponent board={data}/>
    </PatchBlock>
  )
}

export default React.memo(PatchContainer);