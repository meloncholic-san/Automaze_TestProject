import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { logOut } from "../../redux/auth/operations.js";
import css from "./Header.module.css";
import logo from "/logo/logo.jpg";
import { resetFilters } from "../../redux/filters/slice.js";
import { resetTasks } from "../../redux/tasks/slice.js";
export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    await dispatch(logOut());
    await dispatch(resetFilters());
    await dispatch(resetTasks());
    // window.location.reload();
    navigate("/auth/login");
  };

  return (
    <header className={css.header}>
      <div className={`container ${css.inner}`}>
        <Link to="/" className={css.logo}>
          <img src={logo} alt="Logo" />
          <span className={css.logoText}>TaskDoer</span>
        </Link>

        <div className={css.userBlock}>
          <span className={css.welcomeText}>Greetings,</span>
          {isLoggedIn ? (
            <>
                <img src={user.avatarUrl} className={css.avatar}></img>
                <span className={css.userName}>{user.name}</span>
                <button className={css.logoutBtn} onClick={handleLogout}>
                Logout
                </button>
            </>
          ) : (
            <>
                <img src="/img/anonim_avatar.jpg" alt="anonim-avatar" className={css.avatar}/>
                <span className={css.userName}>Anonymous</span>
                <Link to="/auth/login" className={css.authBtn}>Login</Link>
                <Link to="/auth/register" className={css.authBtn}>Registration</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
