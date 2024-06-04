import axios from "axios";
import { convertToBase64 } from "../lib/converToBase64";

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