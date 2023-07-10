import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const isAuthenticated = () => !!Cookies.get("reactnotes_authtoken");

const AuthenticatedRoute = ({ component: Component, ...props }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      if (!isAuthenticated()) {
        navigate("/login");
      } else {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, [navigate]);

  if (loading) {
    // Exibir um componente de carregamento enquanto verifica a autenticação
    return <div>Carregando...</div>;
  }

  return <Component {...props} />;
};

export default AuthenticatedRoute;
