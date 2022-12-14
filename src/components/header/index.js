import "./style.scss";
import { Link, Navigate } from "react-router-dom";
import PostAddOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import {
  ArrowDown,
  Friends,
  Gaming,
  Home,
  HomeActive,
  Logo,
  Market,
  Menu,
  Messenger,
  Notifications,
  Search,
  Watch,
} from "../../svg";
import { useSelector } from "react-redux";
import SearchMenu from "./SearchMenu";
import { useRef, useState } from "react";
import AllMenu from "./AllMenu";
import useClickOutside from "../../helpers/clickOutside";
import UserMenu from "./userMenu";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FriendsActive } from "../../svg";

export default function Header({
  page,
  notificaion,
  setNotification,
  setVisible,
}) {
  const navigate = useNavigate();
  const { user } = useSelector((user) => ({ ...user }));
  const color = "#111";
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const dispatch = useDispatch();
  const [showAllMenu, setShowAllMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  // const [showMsgNotification, setShowMsgNotification] = useState(false);
  const allmenu = useRef(null);
  const usermenu = useRef(null);
  useClickOutside(allmenu, () => {
    setShowAllMenu(false);
  });

  useClickOutside(usermenu, () => {
    setShowUserMenu(false);
  });
  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT", payload: null });
  };
  return (
    <header>
      <div className="header_left">
        <Link to="/" className="header_logo">
          <div className="circle1">
            <img className="circle" src=".././images/LOGO.png" alt="" />
          </div>
        </Link>
        <div
          className="search search1"
          onClick={() => {
            setShowSearchMenu(true);
          }}
        >
          <Search color={color} />
          <input
            type="text"
            placeholder="Search Gather"
            className="hide_input"
          />
        </div>
      </div>
      {showSearchMenu && (
        <SearchMenu
          color={color}
          setShowSearchMenu={setShowSearchMenu}
          token={user.token}
        />
      )}
      <div className="header_middle">
        <Link
          to="/"
          className={`middle_icon ${page === "home" ? "active" : "hover1"}`}
        >
          {page === "home" ? <HomeActive /> : <Home color={color} />}
        </Link>
        <Link
          to="/friends"
          className={`middle_icon ${page === "friends" ? "active" : "hover1"}`}
        >
          {page === "friends" ? <FriendsActive /> : <Friends color={color} />}
        </Link>
        {/* <Link to="" className="middle_icon hover1">
          <Watch color={color} />
          <div className="middle_notification">9+</div>
        </Link>
        <Link to="" className="middle_icon hover1">
          <Market color={color} />
        </Link>
        <Link to="" className="middle_icon hover1 ">
          <Gaming color={color} />
        </Link> */}
        <PostAddOutlinedIcon
          className="middle_icon hover1"
          onClick={() => {
            setVisible(true);
          }}
        />
      </div>
      <div className="header_right">
        <Link
          to="/profile"
          className={`profile_link hover1 ${
            page === "profile" ? "active_link" : ""
          }`}
        >
          <img src={user?.picture} alt="" />
          <span>{user?.first_name}</span>
        </Link>
        {/* <div className="circle_icon hover1" ref={allmenu}>
          <div
            onClick={() => {
              setShowAllMenu((prev) => !prev);
            }}
          >
            <div style={{ transform: "translateY(2px)" }}>
              <Menu />
            </div>
          </div>

          {showAllMenu && <AllMenu />}
        </div> */}
        <div
          className="circle_icon hover1"
          onClick={() => {
            navigate("/messanger");
          }}
        >
          <Messenger />
        </div>
        {/* <div className="circle_icon hover1">
          <Notifications />
          <div className="right_notification">5</div>
        </div> */}
        {/* <div className="circle_icon hover1" ref={usermenu}>
          <div
            onClick={() => {
              setShowUserMenu((prev) => !prev);
            }}
          >
            <div style={{ transform: "translateY(2px)" }}>
              <ArrowDown />
            </div>
          </div>

          {showUserMenu && <UserMenu user={user} />}
        </div> */}
        <div className="mmenu_item hover3" onClick={handleLogout}>
          <div className="small_circle">
            <i className="logout_filled_icon"></i>
          </div>
          <span>Logout</span>
        </div>
      </div>
    </header>
  );
}
