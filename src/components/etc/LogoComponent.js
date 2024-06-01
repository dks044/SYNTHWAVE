import React from "react";
import { SiDiscogs } from "react-icons/si";
import styled, { keyframes } from "styled-components";
import LogoIcon from '../../resources/SYNWHWAVE LOGO.png'
import './etc.css';

// 회전 애니메이션 정의
const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LogoBlock = styled.div`
  padding: 0 12px;
  display: inline-block;
`;

const ImageContainer = styled.img`
  width: ${({ logoSize }) => (logoSize ? `${logoSize}px` : '50px')};
  height: ${({ logoSize }) => (logoSize ? `${logoSize}px` : '50px')};
  animation: ${rotateAnimation} 20s linear infinite;
`;

function LogoComponent({logoSize}){
  return (
    <LogoBlock>
      <ImageContainer src={LogoIcon} logoSize={logoSize} />
    </LogoBlock>
  
  )
}

export default React.memo(LogoComponent);