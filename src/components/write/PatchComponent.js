import React, { useEffect, useRef, useState } from "react";
import { Button, Card, CloseButton, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
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
const CardWrapper = styled.div`
  display: flex;
  justify-content: center; 
  align-items: center; 
  margin-top: 10px; 
`;


function PatchComponent({ board }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user?.data);
  const [errorText, setErrorText] = useState('');

  //파일첨부 유효성검사
  const [fileName, setFileName] = useState();
  const [previewUrl, setPreviewUrl] = useState(); // 이미지 미리보기 URL 상태 추가
  const [isFileError, setIsFileError] = useState(false) //파일 에러 유무 
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file);
    if (file) {
      // 파일 크기 검증
      if (file.size > 2 * 1024 * 1024) { // 2MB 이상인 경우
        setErrorText("파일 크기는 2MB 이하이어야 합니다.");
        setIsFileError(true);
        return; // 추가 검증 중단
      }
      // 파일 타입 검증
      if (!file.type.startsWith('image/')) { // 이미지 파일이 아닌 경우
        setErrorText("이미지 파일만 업로드 가능합니다.");
        setIsFileError(true);
        return;
      }
      // 문제가 없으면 에러 메시지 초기화
      setErrorText("");
      setIsFileError(false);
      // FileReader를 사용하여 파일 읽기
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };



  // useEffect 훅을 사용하여 컴포넌트가 마운트될 때 기존 게시글의 데이터를 로드
  useEffect(() => {
    if (board) {
      setTitle(board.title);
      setCategory(board.category);
      setContent(board.content);
      setPreviewUrl(board.thumbnail);
    }
  }, [board]); // board가 변경될 때마다 이 effect를 다시 실행

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
      if (isFileError) {
        setErrorText('2mb이하의 이미지 파일로만 업로드하세요.');
        return;
      }
      await dispatch(patchBoard(boardData)); // 액션 디스패치
      navigate('/boards');
    } catch (error) {
      setErrorText('에러가 발생했습니다, 잠시 후 시도해주세요.');
      return;
    }
  };

  //close 버튼 누르면 파일 입력 초기화
  // 파일 입력칸을 초기화하기 위한 ref 추가
  const fileInputRef = useRef(null);
  const onClickToFileInputInital = () => {
    setPreviewUrl('');
    setFileName(null);
    setErrorText('');
    setIsFileError(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // 파일 입력 초기화
    }
  }

  // 입력 폼의 상태를 관리하기 위한 useState 훅
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  // useEffect 훅을 사용하여 컴포넌트가 마운트될 때 기존 게시글의 데이터를 로드
  useEffect(() => {
    if (board) {
      setTitle(board.title);
      setCategory(board.category);
      setContent(board.content);
      setPreviewUrl(board.thumbnail);
    }
  }, [board]); // board가 변경될 때마다 이 effect를 다시 실행

  if (board) return (
    <PatchComponentBlock>
      <Row className="justify-content-md-center">
        <Col xs={12} md={8}>
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
                  value={title} // 여기에 상태 할당
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>카테고리 입력</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="category"
                value={category} // 여기에 상태 할당
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>카테고리</option>
                <option value="hiphop">힙합</option>
                <option value="pop">팝</option>
                <option value="rnb">R&B</option>
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>썸네일</Form.Label><CloseButton onClick={onClickToFileInputInital} />
              <Form.Control type="file" name="thumbnail" onChange={handleFileChange} ref={fileInputRef} />
              {previewUrl &&
                <CardWrapper>
                  <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={previewUrl} />
                  </Card>
                </CardWrapper>
              }
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>내용 입력</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="content"
                value={content} // 여기에 상태 할당
                onChange={(e) => setContent(e.target.value)}
              />
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