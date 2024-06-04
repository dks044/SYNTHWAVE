import React, { useState } from "react";
import { Button, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {postBoard} from "../../modules/board/board";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const WriteComponentBlock = styled.div`
  width: 50%;
`
const ErrorText = styled.h3`
  font-weight: bold;
  margin-top: 10px;
  color: red;
  text-align: center;
`


function WriteComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user?.data);
  const boards = useSelector((state) => state.board.boards?.data);
  let boardsLastIndex = parseInt(boards && boards.length > 0 ? boards[boards.length - 1].id : 0)+1;

  const [errorText,setErrorText] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const title = event.target.elements.floatingInputTitle.value;
    const category = event.target.elements.category.value;
    const thumbnail = event.target.elements.thumbnail.files[0];
    const content = event.target.elements.content.value;
  
    if (!title || !category || !content) {
      setErrorText('빈 입력칸이 있는지 확인해주세요.');
      return;
    }
    setErrorText("");
  
    // 현재 시간 할당
    const currentTime = new Date().toISOString();
  
    // 폼 데이터
    const newBoard = {
      id: boardsLastIndex,
      title,
      author: user.id,
      category,
      content,
      comments: [],
      likes: 0,
      rating: 0.0,
      createDate: currentTime
    };
  
    try {
      // FormData 대신 JSON 객체 전송
      const boardData = {
        newBoard,
        file: thumbnail
      };
  
      await dispatch(postBoard(boardData));
      navigate('/boards');
    } catch (error) {
      setErrorText('에러가 발생했습니다, 잠시후 시도해주세요.');
      return;
    }
  };

  return (
  <WriteComponentBlock>
    <Row className="justify-content-md-center">
      <Col xs={12} md={8}> {/* 중앙 정렬을 위해 적절한 크기 지정 */}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>제목 입력</Form.Label>
            <FloatingLabel
              controlId="floatingInputTitle"
              label="제목 입력"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="제목을 입력하세요"
                name="title"
                maxLength="30"
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>카테고리 입력</Form.Label>
            <Form.Select aria-label="Default select example" name="category">
              <option>카테고리</option>
              <option value="hiphop">힙합</option>
              <option value="pop">팝</option>
              <option value="rnb">R&B</option>
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>썸네일</Form.Label>
            <Form.Control type="file" name="thumbnail"/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>내용 입력</Form.Label>
            <Form.Control as="textarea" rows={3} name="content" />
          </Form.Group>
          <Container className="d-flex justify-content-center mt-3">
            <Button variant="outline-primary" type="submit" size="lg">작성하기</Button>
          </Container>
        </Form>
        <ErrorText>{errorText}</ErrorText>
      </Col>
    </Row>
  </WriteComponentBlock>
  );
}



export default React.memo(WriteComponent);