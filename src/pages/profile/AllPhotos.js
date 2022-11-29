import React, { useRef } from "react";
import CardGallery from "react-card-image-gallery";
import { photosReducer } from "../../functions/reducers";
import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import useClickOutside from "../../helpers/clickOutside";
export default function AllPhotos({
  username,
  token,
  setPhotosVisible,
  setSinglePhoto,
  photosVisible,
  singlePhoto,
}) {
  const closeHandler = () => {
    setPhotosVisible(false);
  };
  const photo = useRef(null)
  const singlePhotoHandler = (id) => {
    setSinglePhoto(true);
  };
    useClickOutside(photo, () => {
      setPhotosVisible(false);
    });
  const [{ loading, error, photos }, dispatch] = useReducer(photosReducer, {
    loading: false,
    photos: {},
    error: "",
  });
  useEffect(() => {
    getPhotos();
  }, [username]);
  const path = `${username}/*`;
  const max = 30;
  const sort = "desc";

  const getPhotos = async () => {
    try {
      dispatch({
        type: "PHOTOS_REQUEST",
      });
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/listImages`,
        { path, sort, max },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: "PHOTOS_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "PHOTOS_ERROR",
        payload: error.response.data.message,
      });
    }
  };
  console.log(photos);
  return (
    <div className="blur" ref={photo}>
    <i className="exit_icon"></i>
      <div className="all_photos scrollbar">
        <div className="profile_photos">
          {photos.resources &&
            photos.resources.slice(0).map((img) => (
             
                <div className="see_all_photos">
                  <img src={img.secure_url} alt="" />
                </div>
            
            ))}
        </div>
      </div>
    </div>
  );
}
