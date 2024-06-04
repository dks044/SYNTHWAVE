import React from "react";
import styled from "styled-components";
import WriteComponent from "../../components/write/WriteComponent";

const WriteBlock = styled.div`
  padding: 5% 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  margin-bottom: 20px; // h1 태그와 input 사이의 여백 추가
`;

function WriteContainer() {
  return (
    <WriteBlock>
      <Title><strong>글쓰기 페이지</strong></Title>
      <WriteComponent />
    </WriteBlock>
  );
}

export default React.memo(WriteContainer);