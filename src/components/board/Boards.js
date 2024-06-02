import React from "react";
import { Card, Col, ListGroup, Row } from "react-bootstrap";
import styled from "styled-components";
import RatingStars from "../../lib/RatingStars";
import SimpleDataText from "../../lib/SimpleDataText";

const BoardsBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 5% 10%;
`

function Boards({boards, viewMode}){
  return(
    <BoardsBlock>
      {viewMode === 'card' && 
        boards && boards.map((board)=>(
          <Card style={{ width: '14rem' }} key={board.id}>
            <Card.Img variant="top" src={board.thumbnail} />
            <Card.Body>
              <Card.Title>{board.title}</Card.Title>
              <Card.Text>
                {board.content}
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>장르 : {board.category}</ListGroup.Item>
              <ListGroup.Item>댓글 수 : {board.comments.length}</ListGroup.Item>
              <ListGroup.Item>Like : {board.likes}</ListGroup.Item>
              <ListGroup.Item><RatingStars rating={board.rating}/> </ListGroup.Item>
              <ListGroup.Item><SimpleDataText dateString={board.createDate}/> </ListGroup.Item>
            </ListGroup>
          </Card>
        ))
      }

      {viewMode === 'list' && 
        boards && boards.map((board)=>(
          <div key={board.id}>
            <p>{board.id}</p>
          </div>
        ))
      }
    </BoardsBlock>
  )
}

export default React.memo(Boards);