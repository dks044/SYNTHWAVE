import React from "react";
import { useParams } from "react-router-dom";
import PatchContainer from "../../containers/write/PatchContainer";

const PatchPage = () => {
  const {boardId} = useParams();

  return(
    <>
      <PatchContainer boardId={boardId}/>
    </>
  )
}
export default React.memo(PatchPage);