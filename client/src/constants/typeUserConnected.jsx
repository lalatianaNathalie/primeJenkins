import { useNavigate } from "react-router-dom";
import { AccountService } from "../_services/Account.service";

export  function useTypeUserConnected() {
  const navigate = useNavigate();
  
  const userType = localStorage.getItem("userType");
  if (!userType) {
    AccountService.logout();
    navigate("/auth/");
    return null;
  }
   return userType;
  }