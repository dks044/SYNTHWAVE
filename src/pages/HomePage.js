import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import LogoText from "../components/etc/LogoText";
import LogoComponent from "../components/etc/LogoComponent";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const HomePageBlock = styled.div`
  padding: 5% 20%;
  justify-content: center;
  text-align: center;
`;

const AnimatedLogo = styled.div`
  animation: ${fadeIn} 1s ease-out;
  opacity: 0; // 초기 상태는 보이지 않게
  ${(props) => props.delay && `animation-delay: ${props.delay}s;`} 
  animation-fill-mode: forwards; 
`;

const AnimatedText = styled.div`
  animation: ${fadeIn} 1s ease-out;
  opacity: 0; // 초기 상태는 보이지 않게
  ${(props) => props.delay && `animation-delay: ${props.delay}s;`} 
  animation-fill-mode: forwards; 
`;


function HomePage() {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowText(true);
    }, 1000); // 1초 후에 텍스트를 보여줌
  }, []);

  return(
    <HomePageBlock>
      {showText && (
        <>
          <AnimatedLogo delay={0.5}>
            <LogoComponent logoSize={100}/>
          </AnimatedLogo>
          <AnimatedText delay={1.0}>
            <h1><LogoText fontSize={30}/> 에 오신것을 환영합니다</h1>
          </AnimatedText>
          <AnimatedText delay={1.5}>
            <h2>자유롭게 게시판에 음악 리뷰 글을 작성하며</h2>
          </AnimatedText>
          <AnimatedText delay={2.0}>
            <h2>댓글로 여러 의견을 나눠보세요</h2>
          </AnimatedText>
        </>
      )}
    </HomePageBlock>
  )
}

export default React.memo(HomePage);
