import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Home from "./pages/home";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";
import { useSelector } from "react-redux";
// import Activate from "./pages/home/activate";
// import Reset from "./pages/reset";
import CreatePostPopup from "./components/createPostPopup";
import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { postsReducer } from "./functions/reducers";
import Messanger from "./pages/messenger/Messanger";
import PageNotFound from "./pages/404/PageNotFound";
import Friends from "./pages/friends";
import SinglePhots from "./pages/profile/SinglePhots";
import AllPhotos from "./pages/profile/AllPhotos";
import { photosReducer } from "./functions/reducers";

function App() {
  const [visible, setVisible] = useState(false);
  const [photosVisible, setPhotosVisible] = useState(false);
  const [singlePhoto, setSinglePhoto] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const [newPost, setNewPost] = useState(false);

 
  const [{ loading, error, posts }, dispatch] = useReducer(postsReducer, {
    loading: false,
    posts: [],
    error: "",
  });
  useEffect(() => {
    getAllPosts();
  }, [newPost]);
  const getAllPosts = async () => {
    try {
      dispatch({
        type: "POSTS_REQUEST",
      });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getAllPost`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      dispatch({
        type: "POSTS_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "POSTS_ERROR",
        payload: error.response.data.message,
      });
    }
  };

 

  return (
    <div>
      {visible && (
        <CreatePostPopup
          user={user}
          setVisible={setVisible}
          setNewPost={setNewPost}
        />
      )}
      {photosVisible && (
        <AllPhotos
          username = {user.username}
          token = {user.token}
          setPhotosVisible={setPhotosVisible}
          setSinglePhoto={setSinglePhoto}
          photosVisible={photosVisible}
          singlePhoto={singlePhoto}
        />
      )}
      <Routes>
        <Route element={<LoggedInRoutes />}>
          <Route
            path="/profile"
            element={
              <Profile
                setVisible={setVisible}
                setPhotosVisible={setPhotosVisible}
                setSinglePhoto={setSinglePhoto}
                photosVisible={photosVisible}
                singlePhoto={singlePhoto}
              />
            }
            exact
          />
          <Route
            path="/profile/:username"
            element={
              <Profile setVisible={setVisible} getAllPosts={getAllPosts} />
            }
            exact
          />
          <Route
            path="/friends"
            element={
              <Friends setVisible={setVisible} getAllPosts={getAllPosts} />
            }
            exact
          />
          {/* <Route
            path="/singlePhots"
            element={<SinglePhots setSinglePhoto={setSinglePhoto} />}
            exact
          />
          <Route
            path="/allPhotos"
            element={
              <AllPhotos
                setPhotosVisible={setPhotosVisible}
                setSinglePhoto={setSinglePhoto}
                photosVisible={photosVisible}
                singlePhoto={singlePhoto}
              />
            }
            exact
          /> */}
          <Route
            path="/friends/:type"
            element={
              <Friends setVisible={setVisible} getAllPosts={getAllPosts} />
            }
            exact
          />

          <Route
            path="/"
            element={<Home setVisible={setVisible} posts={posts} />}
            exact
          />

          <Route path="/messanger" element={<Messanger user={user} />} exact />
          {/* <Route path="/activate/:token" element={<Activate />} exact /> */}
        </Route>
        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<Login />} exact />
        </Route>
        {/* <Route path="/reset" element={<Reset />} /> */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
