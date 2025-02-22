import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null); // ✅ Export du contexte

export function AuthProvider({ children }) {  // ✅ Exportation en tant que fonction nommée
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      fetchUser();
    }
  }, []);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch("http://localhost:8080/api/v1/users/currentuser", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const userData = await response.json();
        console.log("Utilisateur connecté:", userData);
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      } else {
        console.error("Erreur lors de la récupération de l'utilisateur");
      }
    } catch (error) {
      console.error("Erreur serveur:", error);
    }
  };

  const login = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
    fetchUser();
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;