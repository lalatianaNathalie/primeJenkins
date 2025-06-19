import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PublicRouter from "./pages/public/PublicRouter";
import AdminRouter from "./pages/admin/AdminRouter";
import AuthRouter from "./pages/auth/AuthRouter";
import AuthGuard from "./_helpers/AuthGuard";
import { ThemeProvider } from "./context/ThemeContext";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<PublicRouter />} />
        <Route
          path="/admin/*"
          element={
            <ThemeProvider>
              <AuthGuard>
                <AdminRouter />
              </AuthGuard>
            </ThemeProvider>
          }
        />
        <Route path="/auth/*" element={<AuthRouter />} />
      </Routes>
    </Router>
  );
}
export default App;
