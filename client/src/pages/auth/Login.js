import React, { useEffect } from "react";
import "./Login.css";
import "./Animation.css";
import Formulaire from "./../../components/auth/Formulaire/Formulaire";
import Panel from "./../../components/auth/Panel/Panel";
import { useNavigate } from "react-router-dom";
import { AccountService } from "../../_services/Account.service";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (AccountService.isLogged()) {
      navigate("/admin/dashboard");
    }
  }, []);
  useEffect(() => {
    const sign_in_btn = document.querySelector("#sign-in-btn");
    const sign_up_btn = document.querySelector("#sign-up-btn");
    const containerLog = document.querySelector(".containerLog");

    sign_up_btn.addEventListener("click", () => {
      containerLog.classList.add("sign-up-mode");
    });

    sign_in_btn.addEventListener("click", () => {
      containerLog.classList.remove("sign-up-mode");
    });
  }, []);

  return (
    <div className="containerLog">
     
      <Formulaire />
      <Panel />
    </div>
  );
};

export default Login;
