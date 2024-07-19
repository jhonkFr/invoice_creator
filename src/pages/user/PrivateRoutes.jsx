import { Navigate, Outlet, useLoaderData, useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
import { account } from "../../appwrite/config";
import { useEffect } from "react";
export const loader = async () => {
  //   console.log(12);
  try {
    const userData = await account.get();
    return userData;
  } catch (error) {
    console.error(error);
    return null;
  }
};
import { useUserL } from "../login/zustantd";
export const PrivateRoutes = () => {
  const navigate = useNavigate();

  const userData = useUserL((s) => s.user);
  console.log(userData);

  useEffect(() => {
    if (!userData) {
      navigate("/login", { replace: true });
    }
  }, [userData, navigate]);
  //   const user = useLoaderData();

  //   if (user === undefined) {
  //     // Si user es undefined, podríamos estar esperando la carga
  //     return <div>Cargando...</div>;
  //   }

  return userData ? <Outlet /> : <Navigate to="/login" replace />;
};
