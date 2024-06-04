import React from "react";
import { Card, Col, ListGroup, Row, Table } from "react-bootstrap";
import styled from "styled-components";
import RatingStars from "../../lib/RatingStars";
import SimpleDataText from "../../lib/SimpleDataText";
import './board.css';

const BoardsBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 2% 5%;
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
                {board.content.length > 50 ? board.content.substring(0, 50) + '...' : board.content}
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>장르 : {board.category}</ListGroup.Item>
              <ListGroup.Item>글쓴이 : {board.author}</ListGroup.Item>
              <ListGroup.Item>댓글 수 : {board.comments.length}</ListGroup.Item>
              <ListGroup.Item>Like : {board.likes}</ListGroup.Item>
              <ListGroup.Item><RatingStars rating={board.rating}/> </ListGroup.Item>
              <ListGroup.Item><SimpleDataText dateString={board.createDate}/> </ListGroup.Item>
            </ListGroup>
          </Card>
        ))
      }

    {viewMode === 'list' &&
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>번호</th>
            <th>카테고리</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
            <th>추천수</th>
          </tr>
        </thead>
        <tbody>
          {boards && boards.map((board) => (
            <tr key={board.id}>
              <td>{board.id}</td>
              <td>{board.category}</td>
              <td>{board.title}</td>
              <td>{board.author}</td>
              <td><SimpleDataText dateString={board.createDate}/></td>
              <td>{board.likes}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    }
    </BoardsBlock>
  )
}

export default React.memo(Boards);