import React, { useRef, useState } from "react";
import { Button, Card, CloseButton, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { postBoard } from "../../modules/board/board";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

const WriteComponentBlock = styled.div`
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


function WriteComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user?.data);
  const boards = useSelector((state) => state.board.boards?.data);
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
      id: uuidv4(),
      title,
      author: user.id,
      category,
      content,
      comments: [],
      likes: 0,
      likeUsers: [],
      ratingUser: [],
      createDate: currentTime
    };

    try {
      // FormData 대신 JSON 객체 전송
      const boardData = {
        newBoard,
        file: thumbnail
      };
      if (isFileError) {
        setErrorText('2mb이하의 이미지 파일로만 업로드하세요.');
        return;
      }
      await dispatch(postBoard(boardData));
      navigate('/boards');
    } catch (error) {
      setErrorText('에러가 발생했습니다, 잠시후 시도해주세요.');
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
              <Form.Label>썸네일</Form.Label><CloseButton onClick={onClickToFileInputInital}/>
              <Form.Control type="file" name="thumbnail" onChange={handleFileChange} ref={fileInputRef}/>
              {/*이미지 미리보기*/}
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