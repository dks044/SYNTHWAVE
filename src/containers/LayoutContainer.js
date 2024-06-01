import React from "react";
import Navigate from "../components/layout/Navigate";
import { Outlet } from "react-router-dom";

function LayoutContainer(){
  return (
    <>
      <Navigate />
      <Outlet />
    </>
  )
}

export default React.memo(LayoutContainer);