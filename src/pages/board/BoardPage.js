import React from "react";
import BoardContainer from "../../containers/board/BoardContainer";
import { useParams } from "react-router-dom";

const BoardPage = () =>{
  const {boardId} = useParams();
  return(
    <BoardContainer boardId={boardId}/>
  )
}

export default React.memo(BoardPage);