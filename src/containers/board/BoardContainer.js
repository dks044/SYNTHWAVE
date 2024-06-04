import React from "react";
import styled from "styled-components";
import Board from "../../components/board/Board";

const BoardBlock = styled.div`
  padding: 5% 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function BoardContainer({boardId}){
  return(
    <BoardBlock>
      <p>{boardId}</p>
      <Board />
    </BoardBlock>
  )
}

export default React.memo(BoardContainer);