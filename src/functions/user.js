import axios from "axios";
export const updateprofilePicture = async (
url,token
) => {
  try {
    const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/updateProfilePicture`,
    //   "http://localhost:8080/createPost",
      {
        url,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return "ok";
  } catch (error) {
    return error.response.data.message;
  }
};