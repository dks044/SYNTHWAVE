import React, { useEffect, useRef, useState } from "react";
import { Badge, Button, Form, Image, Overlay, Tooltip } from "react-bootstrap";
import styled from "styled-components";
import SimpleDataText from "../../lib/SimpleDataText"
import RatingStars from "../../lib/RatingStars";
import './board.css';
import { FaRegStar,FaRegStarHalfStroke,FaStar } from "react-icons/fa6";

const BoardComponentBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
`
const StyledTextArea = styled.div`
  margin-top: 2%;
  font-size: 40;
`
const DateText = styled.p`
  display: inline-block;
`
const LikeAndFeedBackBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const LikeAndFeedBackBarRating = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`

function Board({board}){
  const [category,setCategory] = useState();
  const target = useRef(null);

  useEffect(() => {
    if(board){
      if(board.category === 'rnb') setCategory('R&B');
      else if(board.category === 'hiphop') setCategory('HipHop');
      else if(board.category === 'pop') setCategory('POP');
    }
  },[]); 

  if(board) return(
    <BoardComponentBlock>
      <h1>{board.title} <Badge className="customBadge" bg="info">{category}</Badge></h1>
      <span>
        <DateText><SimpleDataText dateString={board.createDate}/> | <strong>작성자 : {board.author}</strong></DateText>
      </span>
      <Image className="customImage" src={board.thumbnail} rounded />
      <StyledTextArea>
        {board.content}      
      </StyledTextArea>
      <br/><br/>
      <LikeAndFeedBackBar>
        <Button ref={target} variant="light" >
          <strong>😀{board.likes}😀<br/>좋아요👍</strong>
        </Button>
        <LikeAndFeedBackBarRating>
          <RatingStars rating={board.rating}/>
          <Form.Select size="sm">
            <option>별점 주기</option>
          </Form.Select>
        </LikeAndFeedBackBarRating>
      </LikeAndFeedBackBar>
    </BoardComponentBlock>
  )
}

export default React.memo(Board);