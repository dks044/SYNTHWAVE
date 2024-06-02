import React from "react";
import styled from "styled-components";

const BoardsBlock = styled.div`
  display: flex;
  padding: 5% 10%;
`

function Boards({boards, viewMode}){
  return(
    <BoardsBlock>
      {viewMode === 'card' && 
        <p>카드모드</p>
      }
      {viewMode === 'list' && 
        <p>리스트모드</p>
      }
    </BoardsBlock>
  )
}

export default React.memo(Boards);