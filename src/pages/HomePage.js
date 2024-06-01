import React from "react";
import styled from "styled-components";
import LogoText from "../components/etc/LogoText";

const HomePageBlock = styled.div`
  display: flex;
  padding: 10% 30%;
  justify-content: center;


`


function HomePage() {
  return(
    <HomePageBlock>
      <h1><LogoText fontSize={30}/> 에 오신것을 환영합니다!</h1>
    </HomePageBlock>
  )
}
export default React.memo(HomePage);