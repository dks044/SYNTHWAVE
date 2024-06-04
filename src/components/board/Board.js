import React from "react";
import styled from "styled-components";
const BoardComponentBlock = styled`
  display: flex;
  justify-content: center;
  align-items: center;
`

function Board(){
  return(
    <BoardComponentBlock>
      안녕하세요
    </BoardComponentBlock>
  )
}

export default React.memo(Board);