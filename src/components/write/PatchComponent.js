import React, { useState } from "react";
import { Button, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { patchBoard } from "../../modules/board/board";

const PatchComponentBlock = styled.div`
  width: 50%;
`
const ErrorText = styled.h3`
  font-weight: bold;
  margin-top: 10px;
  color: red;
  text-align: center;
`


function PatchComponent({ board }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user?.data);

  const [errorText, setErrorText] = useState('');

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

    // 현재 시간 할당 (수정날짜용)
    //const currentTime = new Date().toISOString();

    // 업데이트할 보드 정보 (id 제외)
    // TODO: 수정날짜
    const updatedBoard = {
      title,
      author: user.id,
      category,
      content
    };

    try {
      const boardData = {
        id: board.id,
        updatedBoard,
        file: thumbnail
      };

      await dispatch(patchBoard(boardData)); // 액션 디스패치
      navigate('/boards');
    } catch (error) {
      setErrorText('에러가 발생했습니다, 잠시 후 시도해주세요.');
      return;
    }
  };

  if (board) return (
    <PatchComponentBlock>
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
              <Form.Control type="file" name="thumbnail" />
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
    </PatchComponentBlock>
  )
}

export default React.memo(PatchComponent);