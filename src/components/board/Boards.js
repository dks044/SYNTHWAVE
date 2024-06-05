import React from "react";
import { Card, Col, ListGroup, Row, Table } from "react-bootstrap";
import styled from "styled-components";
import RatingStars from "../../lib/RatingStars";
import SimpleDataText from "../../lib/SimpleDataText";
import './board.css';
import { useNavigate } from "react-router-dom";

const BoardsBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 2% 5%;
`

function Boards({ boards, viewMode }) {
  const navigate = useNavigate();

  const calculateAverageRating = (ratingUsers) => {
    // ratingUsers가 배열인지 확인하고, 배열이 아니면 0을 반환
    if (!Array.isArray(ratingUsers) || !ratingUsers.length) {
      return 0;
    }
    const totalRating = ratingUsers.reduce((acc, curr) => acc + curr.rating, 0);
    return (totalRating / ratingUsers.length).toFixed(1);
  };

  return (
    <BoardsBlock>
      {viewMode === 'card' &&
        boards && boards.map((board) => (
          <Card style={{ width: '14rem' }} key={board.id}>
            {board.thumbnail && (
              <Card.Img className="navigate" onClick={() => navigate(`/boards/${board.id}`)} variant="top" src={board.thumbnail} />
            )}
            {!board.thumbnail && (
              <Card.Img className="navigate" onClick={() => navigate(`/boards/${board.id}`)} variant="top" src={"https://cdn.pixabay.com/photo/2024/05/18/16/37/ai-generated-8770612_1280.jpg"} />
            )}
            <Card.Body>
              <Card.Title className="navigate" onClick={() => navigate(`/boards/${board.id}`)} >{board.title}</Card.Title>
              <Card.Text>
                {board.content && (board.content.length > 50 ? board.content.substring(0, 50) + '...' : board.content)}
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>장르 : {board.category}</ListGroup.Item>
              <ListGroup.Item>글쓴이 : {board.author && (board.author.length > 8 ? board.author.substring(0, 8) + '...' : board.author)}</ListGroup.Item>
              <ListGroup.Item>댓글 수 : {board.comments && board.comments.length}</ListGroup.Item>
              <ListGroup.Item>Like : {board.likes}</ListGroup.Item>
              <ListGroup.Item><RatingStars rating={parseFloat(calculateAverageRating(board.ratingUser))} /> </ListGroup.Item>
              <ListGroup.Item><SimpleDataText dateString={board.createDate} /> </ListGroup.Item>
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
            {boards && boards.map((board, index) => ( // index를 사용하여 순번을 생성
              <tr key={board.id}>
                <td>{index + 1}</td>
                <td>{board.category}</td>
                <td className="navigate" onClick={() => navigate(`/boards/${board.id}`)} >{board.title}</td>
                <td>{board.author && (board.author.length > 8 ? board.author.substring(0, 8) + '...' : board.author)}</td>
                <td><SimpleDataText dateString={board.createDate} /></td>
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