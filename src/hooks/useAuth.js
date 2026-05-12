import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";

const useAuth = () => {
  const dispatch = useDispatch();
  const { user, role, token, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );

  const handleLogout = () => {
    dispatch(logout());
  };

  return {
    user,
    role,
    token,
    isAuthenticated,
    isLoading,
    handleLogout,
  };
};

export default useAuth;