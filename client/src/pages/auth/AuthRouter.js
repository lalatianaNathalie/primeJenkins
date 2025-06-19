import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Error404 from "../../_utils/Error404";

const AuthRouter = () => {
  return (
    <div>
      <Routes>
        <Route index element={<Login />} />
        <Route path="login" element={<Login />} />
        
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
};

export default AuthRouter;
