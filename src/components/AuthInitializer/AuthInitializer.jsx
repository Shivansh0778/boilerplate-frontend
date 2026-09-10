import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getMe } from "../../services/auth.service";
import {
  setCredentials,
  setLoading,
  logout,
} from "../../store/authSlice";

function AuthInitializer({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        dispatch(setLoading(false));
        return;
      }

      try {
        const data = await getMe(token);

        dispatch(
          setCredentials({
            user: data.user,
            token,
          })
        );
      } catch (error) {
        console.error("Session restore failed:", error.message);

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        dispatch(logout());
      } finally {
        dispatch(setLoading(false));
      }
    };

    restoreSession();
  }, [dispatch]);

  return children;
}

export default AuthInitializer;