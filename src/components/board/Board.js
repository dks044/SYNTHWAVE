import React, { useEffect, useRef, useState } from "react";
import { Badge, Button, Form, Image, InputGroup, Modal, Overlay, Tooltip } from "react-bootstrap";
import styled from "styled-components";
import SimpleDataText from "../../lib/SimpleDataText"
import RatingStars from "../../lib/RatingStars";
import './board.css';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {decreaseBoardLikes, deleteBoard, increaseBoardLikes} from "../../modules/board/board";
import { deleteUserLikes, postUserLikes } from "../../modules/user/user";

const BoardComponentBlock = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex-wrap: wrap;
`
const StyledTextArea = styled.div`
  margin-top: 4%;
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
  margin-left: 5px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`
const CommentsBlock = styled.div`

`;
const PatchDeleteBlock = styled.div`
  display: ${(props) => (props.displayPatchDelete ? "block" : "none")};
`


function Board({ board }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user?.data);

  const userLikes = useSelector((state) => state.user.likeBoards?.data);
  const [likes,setLikes] = useState(0);

  const [displayPatchDelete, setDisplayPatchDelete] = useState(false);
  //modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  //현재 게시글의 작성자와 사용자가 맞는지 확인
  useEffect(() => {
    let author = null; // `const` 대신 `let` 사용
    if (board) {
      author = board.author;
    }
    if (user.id === author) {
      setDisplayPatchDelete(true);
      console.log(displayPatchDelete);
    }
  })

  //별점계산함수
  const calculateAverageRating = (ratingUsers) => {
    // ratingUsers가 배열인지 확인하고, 배열이 아니면 0을 반환
    if (!Array.isArray(ratingUsers) || !ratingUsers.length) {
      return 0;
    }
    const totalRating = ratingUsers.reduce((acc, curr) => acc + curr.rating, 0);
    return (totalRating / ratingUsers.length).toFixed(1);
  };

  const [category, setCategory] = useState();
  const target = useRef(null);

  //삭제함수
  const onClickToDelete = () => {
    dispatch(deleteBoard(board.id));
    navigate('/boards')
  }
  
  //좋아요 함수
  const onClickToLike = async () => {
    //좋아요 누른적이 없을 경우
    if (!userLikes.includes(board.id)) {
      await dispatch(postUserLikes(board.id));
      await dispatch(increaseBoardLikes(board.id));
      setLikes((prevLikes) => prevLikes + 1); 
    }
    //좋아요 누른적이 있을 경우
    else {
      await dispatch(deleteUserLikes(board.id)); //해당 좋아요한 게시글의 id 삭제
      await dispatch(decreaseBoardLikes(board.id));
      setLikes((prevLikes) => prevLikes - 1); 
    }
  }
  

  useEffect(() => {
    if (board) {
      if (board.category === 'rnb') setCategory('R&B');
      else if (board.category === 'hiphop') setCategory('HipHop');
      else if (board.category === 'pop') setCategory('POP');
    }
  }, []);

  if (board) return (
    <BoardComponentBlock>
      <h4><RatingStars rating={parseFloat(calculateAverageRating(board.ratingUser))} /></h4>
      <h1>{board.title} <Badge className="customBadge" bg="info">{category}</Badge>
        <PatchDeleteBlock displayPatchDelete={displayPatchDelete}>
          <Button onClick={() => navigate(`/boards/${board.id}/patch`)} variant="success" size="sm" >
            수정하기
          </Button>
          <Button className="deleteBlock" variant="danger" size="sm" onClick={handleShow}>
            삭제하기
          </Button>
        </PatchDeleteBlock>
      </h1>
      <span>
        <DateText><SimpleDataText dateString={board.createDate} /> | <strong>작성자 : {board.author}</strong></DateText>
      </span>
      {board.thumbnail && (
        <Image className="customImage" src={board.thumbnail} rounded />
      )}
      {!board.thumbnail && (
        <Image className="customImage" src={"https://cdn.pixabay.com/photo/2024/05/18/16/37/ai-generated-8770612_1280.jpg"} rounded />
      )}
      <StyledTextArea>
        {board.content}

      </StyledTextArea>
      <br /><br /><br /><br />
      <LikeAndFeedBackBar>
        <Button ref={target} variant="light" onClick={onClickToLike}>
          <strong>😀{likes}😀<br />👍좋아요👍</strong>
        </Button>
        <LikeAndFeedBackBarRating>
          <Form.Select size="sm">
            <option value={5}>⭐⭐⭐⭐⭐</option>
            <option value={4}>⭐⭐⭐⭐</option>
            <option value={3}>⭐⭐⭐</option>
            <option value={2}>⭐⭐</option>
            <option value={1}>⭐</option>
          </Form.Select>
          <Button variant="warning">별점주기</Button>
        </LikeAndFeedBackBarRating >

      </LikeAndFeedBackBar>
      <br /><br />
      <h4><strong>전체 댓글 {board.comments ? board.comments.length : 0} 개</strong></h4>
      <InputGroup className="mb-3">
        <Form.Control
          as="textarea"
          className="customCommentInput"
          placeholder="당신의 생각을 댓글로 표현하세요"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <Button variant="primary" id="button-addon2">
          댓글달기
        </Button>
      </InputGroup>
      <br />
      <CommentsBlock>
        {board.comments && board.comments.map((comment) => (
          <div className="comments" key={comment.id}>
            <h3>
              <strong>
                🎸{board.author && (board.author.length > 8 ? board.author.substring(0, 8) + '...' : board.author)}
              </strong>
            </h3>
            {comment.text}
          </div>
        ))}
      </CommentsBlock>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>게시글삭제</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          해당 게시글을 삭제하시겠습니까?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            취소
          </Button>
          <Button variant="danger" onClick={onClickToDelete}>삭제</Button>
        </Modal.Footer>
      </Modal>
    </BoardComponentBlock>
  )
}

export default React.memo(Board);