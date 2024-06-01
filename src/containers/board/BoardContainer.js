import React from "react";
import styled from "styled-components";
import Board from "../../components/board/Board";

const BoatdBlock = styled.div`
  padding: 5% 50px;
`

function BoardContainer() {
  return(
    <BoatdBlock>
      테스트
      <Board />
    </BoatdBlock>
  )
}

export default React.memo(BoardContainer);