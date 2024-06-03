import React from "react";
import styled from "styled-components";
import WriteComponent from "../../components/write/WriteComponent";

const WriteBlock = styled.div`
  padding: 5% 10%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

`

function WriteContainer(){
  return(
    <WriteBlock>
      <h1>글쓰기페이지</h1>
      <WriteComponent />
    </WriteBlock>
  )
}

export default React.memo(WriteContainer);