import { useNavigate } from "react-router-dom";
import { AccountService } from "../_services/Account.service";

export  function useNameUserConnected() {
  const navigate = useNavigate();
  
  const userName = localStorage.getItem("userName");
  if (!userName) {
    AccountService.logout();
    navigate("/auth/");
    return null;
  }
   return userName;
  }