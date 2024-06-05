import React, { useEffect, useRef, useState } from "react";
import { Badge, Button, Form, Image, InputGroup, Modal, Overlay, Tooltip } from "react-bootstrap";
import styled from "styled-components";
import SimpleDataText from "../../lib/SimpleDataText"
import RatingStars from "../../lib/RatingStars";
import './board.css';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { decreaseBoardLikes, deleteBoard, increaseBoardLikes, patchBoardComments, patchBoardRatingUser } from "../../modules/board/board";
import { deleteUserLikes, postRatingBoards, postUserLikes } from "../../modules/user/user";
import { FaPen } from "react-icons/fa";

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

const RatingErrorText = styled.h4`
  margin-top: 10px;
  text-align: center;
  font-weight: bolder;
`
const CommentPatchDeleteBlock = styled.span`
  margin-left: 5px;
`

function Board({ board }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user?.data);
  const ratingBoards = useSelector((state) => state.user.ratingBoards?.data || []);
  const userLikes = useSelector((state) => state.user.likeBoards?.data || []);
  const [likes, setLikes] = useState(0);
  const [ratingUser, setRatingUser] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (board && board.likes !== undefined) {
      setLikes(board.likes);
    }
    if (board && board.ratingUser !== undefined) {
      setRatingUser(board.ratingUser);
    }
    if (board && board.comments !== undefined) {
      setComments(board.comments);
    }
  }, [board])

  const [displayPatchDelete, setDisplayPatchDelete] = useState(false);
  //modal
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setModalTitle('');
    setModalBody('');
    setModalButton('');
  }

  const handleShow = () => {
    setModalTitle('삭제');
    setModalBody('해당 게시글을 삭제하시겠습니까?');
    setModalButton('삭제');
    setShow(true);
  }


  const [modalTitle, setModalTitle] = useState('');
  const [modalBody, setModalBody] = useState('');
  const [modalButton, setModalButton] = useState('');


  //현재 게시글의 작성자와 사용자가 맞는지 확인
  useEffect(() => {
    let author = null;
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
  //레이팅
  const [rating, setRating] = useState(0);
  const onChangeRating = (e) => {
    setRating(Number(e.target.value));
  };

  //레이팅 로직
  const [ratingText, setRatingText] = useState('');
  const onClickToRating = async () => {
    const userRating = {
      userId: user.id,
      rating: rating
    };

    // 별점 유효성 검사
    if (rating < 1 || rating > 5) {
      alert('별점은 1에서 5 사이로 주세요.');
      return;
    }
    //레이팅(별점) 준적이 없을경우
    if (!ratingBoards.includes(board.id)) {
      await dispatch(postRatingBoards(board.id)); //레이팅(평가) 한 게시물id로 등록
      await dispatch(patchBoardRatingUser({ boardId: board.id, userId: user.id, rating: rating }));
      setRatingUser([...ratingUser, userRating]);
      console.log(ratingUser);
    } else {
      setRatingText('이미 별점을 주신 게시글입니다.');
      return;
    }
  }

  useEffect(() => {
    if (board) {
      if (board.category === 'rnb') setCategory('R&B');
      else if (board.category === 'hiphop') setCategory('HipHop');
      else if (board.category === 'pop') setCategory('POP');
    }
  }, []);

  //댓글로직
  const commentRef = useRef('');
  const [comment, setComment] = useState('');
  const onChangeComment = (e) => {
    setComment(e.target.value);
  };
  const onClickToComment = async () => {
    const userComment = {
      author: user.id,
      text: comment
    };
    await dispatch(patchBoardComments({ boardId: board.id, text: comment, author: user.id }));
    setComment('');
    if (commentRef.current) {
      commentRef.current.value = ''; 
    }
    setComments([...comments, userComment])
  }


  if (board) return (
    <BoardComponentBlock>
      <h4><RatingStars rating={parseFloat(calculateAverageRating(ratingUser))} /></h4>
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
          <Form.Select size="sm" onChange={onChangeRating}>
            <option >⭐별점주기⭐</option>
            <option value={5}>⭐⭐⭐⭐⭐</option>
            <option value={4}>⭐⭐⭐⭐</option>
            <option value={3}>⭐⭐⭐</option>
            <option value={2}>⭐⭐</option>
            <option value={1}>⭐</option>
          </Form.Select>
          <Button variant="warning" onClick={onClickToRating}>별점주기</Button>
        </LikeAndFeedBackBarRating >
      </LikeAndFeedBackBar>
      <RatingErrorText>{ratingText}</RatingErrorText>
      <br /><br />
      <h4><strong>전체 댓글 {comments ? comments.length : 0} 개</strong></h4>
      <InputGroup className="mb-3">
        <Form.Control
          as="textarea"
          className="customCommentInput"
          placeholder="당신의 생각을 댓글로 표현하세요"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          onChange={onChangeComment}
          value={comment}
          ref={commentRef}
        />
        <Button variant="primary" id="button-addon2" onClick={onClickToComment}>
          댓글달기
        </Button>
      </InputGroup>
      <br />
      <CommentsBlock>
        {comments && comments.map((comment) => (
          <div className="comments" key={comment.id}>
            <h3>
              <strong>
                🎸{comment.author && (comment.author.length > 8 ? comment.author.substring(0, 8) + '...' : comment.author)}
              </strong>
              {comment.author === user.id && (
                <CommentPatchDeleteBlock>
                  <FaPen size={20} />
                </CommentPatchDeleteBlock>
              )}
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
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalBody}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            취소
          </Button>
          <Button variant="danger" onClick={onClickToDelete}>{modalButton}</Button>
        </Modal.Footer>
      </Modal>
    </BoardComponentBlock>
  )
}

export default React.memo(Board);