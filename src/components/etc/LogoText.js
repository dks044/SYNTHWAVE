import React from "react";
import styled from "styled-components";
import './etc.css';

const LogoTitleText = styled.p`
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : '50px')};
  display: inline-block;
  color : ${ ({fontColor})=> (fontColor ? `` : '#fab005') };
`

const LogoText = ({fontSize, fontColor} ) => {
  return( 
    <LogoTitleText fontSize={fontSize} fontColor={fontColor} id="logoFont" >Synth Wave</LogoTitleText>
  )
}

export default React.memo(LogoText);