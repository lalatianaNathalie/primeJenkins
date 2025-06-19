import React, { useEffect, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/admin/sidebar/Sidebar";
import "./App.scss";
import MoonIcon from "../../assets/icons/moon.svg";
import SunIcon from "../../assets/icons/sun.svg";
import { AccountService } from "../../_services/Account.service";
import Navbar from "../../components/admin/navbar/navbar";
import { SidebarProvider } from "../../context/SidebarContext";
import { ThemeContext } from "../../context/ThemeContext";
import { DARK_THEME, LIGHT_THEME } from "../../constants/themeConstants";

const ALayout = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    if (!AccountService.isLogged()) {
      navigate("/auth/");
    }
  }, []);

  useEffect(() => {
    if (theme === DARK_THEME) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [theme]);

  return (
    <main className="page-wrapper">
      <SidebarProvider>
        <Sidebar />
        <Navbar />
        <div className="content-wrapper">
          <Outlet />
        </div>
      </SidebarProvider>
    </main>
  );
};

export default ALayout;
