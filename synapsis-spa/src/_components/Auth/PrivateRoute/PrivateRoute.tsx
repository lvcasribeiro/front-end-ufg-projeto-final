import { Outlet } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import styles from "./PrivateRoute.module.css";
import { useAuth } from "../AuthContext/AuthContext";
import Login from "../../../Pages/Login/Login";

export default function PrivateRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className={styles.spin_container}>
        <ClipLoader color="#4A90E2" size={50} />
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Login />;
}
