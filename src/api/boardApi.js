import axios from "axios";

export async function getBoardsAPI() {
  try {
    const response = await axios.get('http://localhost:4000/boards');
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
