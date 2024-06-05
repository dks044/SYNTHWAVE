import axios from "axios";
import { convertToBase64 } from "../lib/converToBase64";
import { v4 as uuidv4 } from 'uuid';

export async function getBoardsAPI() {
  try {
    const response = await axios.get('http://localhost:4000/boards');
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export const addBoardAPI = async (newBoard, file) => {
  // 이미지 파일이 있으면 Base64 문자열로 변환
  const imageBase64 = file ? await convertToBase64(file) : '';

  // 이미지 Base64 문자열을 newBoard 객체에 추가
  const boardWithImage = {
    ...newBoard,
    thumbnail: imageBase64, // Base64 문자열을 thumbnail 필드에 할당
  };

  // 게시글 데이터(이미지 Base64 문자열 포함)를 서버에 전송
  const response = await fetch('http://localhost:4000/boards', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(boardWithImage),
  });

  if (!response.ok) {
    throw new Error('Failed to add new board');
  }

  return await response.json();
};

export async function getBoardByIdAPI(id) {
  try {
    const response = await axios.get(`http://localhost:4000/boards/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data for id ${id}:`, error);
    throw error;
  }
}



//board 업데이트 API
export const patchBoardAPI = async (id, updatedBoard, file) => {
  // 이미지 파일이 있으면 Base64 문자열로 변환
  const imageBase64 = file ? await convertToBase64(file) : '';

  // 이미지 Base64 문자열을 updatedBoard 객체에 추가
  const boardWithImage = {
    ...updatedBoard,
    thumbnail: imageBase64, // Base64 문자열을 thumbnail 필드에 할당
  };

  // 게시글 데이터(이미지 Base64 문자열 포함)를 서버에 전송하여 기존 게시글을 업데이트
  const response = await fetch(`http://localhost:4000/boards/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(boardWithImage),
  });

  if (!response.ok) {
    throw new Error('Failed to update board');
  }

  return await response.json();
};

// board 삭제 API
export const deleteBoardAPI = async (id) => {
  const response = await fetch(`http://localhost:4000/boards/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete board');
  }

  return await response.json();
};

// board 좋아요 증감
export const IncreaseLikesBoardAPI = async (id) => {
  const boardResponse = await fetch(`http://localhost:4000/boards/${id}`);

  if (!boardResponse.ok) {
    throw new Error('Failed to fetch board');
  }

  const board = await boardResponse.json();
  let boardLikes = board.likes + 1;

  const response = await fetch(`http://localhost:4000/boards/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ likes: boardLikes }),
  });

  if (!response.ok) {
    throw new Error('Failed to update board');
  }

  return await response.json();
};

// board 좋아요 감소
export const DecreaseLikesBoardAPI = async (id) => {
  const boardResponse = await fetch(`http://localhost:4000/boards/${id}`);

  if (!boardResponse.ok) {
    throw new Error('Failed to fetch board');
  }

  const board = await boardResponse.json();
  let boardLikes = board.likes - 1;

  const response = await fetch(`http://localhost:4000/boards/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ likes: boardLikes }),
  });

  if (!response.ok) {
    throw new Error('Failed to update board');
  }

  return await response.json();
};

// board rating 피드백
export const ratingBoardAPI = async (id, userId, rating) => {
  const boardResponse = await fetch(`http://localhost:4000/boards/${id}`);

  if (!boardResponse.ok) {
    throw new Error('Failed to fetch board');
  }

  const board = await boardResponse.json();
  const boardRatingUser = board.ratingUser || [];

  const userRating = {
    userId: userId,
    rating: rating
  };
  // 유저 ID와 평점이 유효한지 확인
  if (!userId || !rating || rating < 1 || rating > 5) {
    throw new Error('Invalid user ID or rating');
  }
  const newBoardRatingUser = [...boardRatingUser, userRating];

  const response = await fetch(`http://localhost:4000/boards/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ratingUser: newBoardRatingUser }),
  });

  if (!response.ok) {
    throw new Error('Failed to update board');
  }

  return await response.json();
};

// 댓글달기
export const commentBoardAPI = async (id, text, author) => {
  const boardResponse = await fetch(`http://localhost:4000/boards/${id}`);

  if (!boardResponse.ok) {
    throw new Error('Failed to fetch board');
  }

  const board = await boardResponse.json();
  const boardComments = board.comments || [];

  const comment = {
    id: uuidv4(),
    text: text,
    author: author
  };

  const newBoardComments = [...boardComments, comment];

  const response = await fetch(`http://localhost:4000/boards/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ comments: newBoardComments }), 
  });

  if (!response.ok) {
    throw new Error('Failed to update board');
  }

  return await response.json();
};
