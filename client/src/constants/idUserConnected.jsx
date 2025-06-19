import { jwtDecode } from "jwt-decode";

export default function idUserConnected() {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found");
    }
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.id;
    } catch (error) {
      console.error("Error decoding token", error);
      return null;
    }
}
