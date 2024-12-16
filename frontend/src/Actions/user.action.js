import axios from "axios";
export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "LoginRequest",
    });
    const { data } = await axios.post(
      "/api/v1/login",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: "LoginSuccess",
      payload: data.user,
    });
  } catch (error) {
    const errorPayload = {
      message: error.message,
      status: error.response ? error.response.status : null,
    };
    dispatch({
      type: "LoginFailure",
      payload: errorPayload,
    });
  }
};
export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LogoutUserRequest",
    });
    await axios.get("/api/v1/logout");
    dispatch({
      type: "LogoutUserSuccess",
    });
  } catch (error) {
    const errorPayload = {
      message: error.message,
      status: error.response ? error.response.status : null,
    };
    dispatch({
      type: "LogoutUserFailure",
      payload: errorPayload,
    });
  }
};
export const loadUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });
    const { data } = await axios.get("/api/v1/me");
    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    const errorPayload = {
      message: error.message,
      status: error.response ? error.response.status : null,
    };
    dispatch({
      type: "LoadUserFailure",
      payload: errorPayload,
    });
  }
};
export const getFollowingPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: "postOfFollowingRequest",
    });
    const { data } = await axios.get("/api/v1/posts");
    dispatch({
      type: "postOfFollowingSuccess",
      payload: data.posts,
    });
  } catch (error) {
    const errorPayload = {
      message: error.message,
      status: error.response ? error.response.status : null,
    };
    dispatch({
      type: "postOfFollowingFailure",
      payload: errorPayload,
    });
  }
};
export const getAllUsers = (name = "") => async (dispatch) => {
  try {
    dispatch({
      type: "allUsersRequest",
    });
    const { data } = await axios.get(`/api/v1/users?name=${name}`);
    dispatch({
      type: "allUsersSuccess",
      payload: data.users,
    });
  } catch (error) {
    const errorPayload = {
      message: error.message,
      status: error.response ? error.response.status : null,
    };
    dispatch({
      type: "allUsersFailure",
      payload: errorPayload,
    });
  }
};


export const getMyPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: "mypostsRequest",
    });
    const { data } = await axios.get("/api/v1/my/posts");
    dispatch({
      type: "mypostsSuccess",
      payload: data.posts,
    });
  } catch (error) {
    const errorPayload = {
      message: error.message,
      status: error.response ? error.response.status : null,
    };
    dispatch({
      type: "mypostsFailure",
      payload: errorPayload,
    });
  }
};
export const userPosts = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "userPostsRequest",
    });
    const { data } = await axios.get(`/api/v1/userposts/${id}`);
    dispatch({
      type: "userPostsSuccess",
      payload: data.posts,
    });
  } catch (error) {
    // const errorPayload = {
    //   message: error.message,
    //   status: error.response ? error.response.status : null,
    // };
    dispatch({
      type: "userPostsFailure",
      payload: error.message,
    });
  }
};
export const userProfile = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "userProfileRequest",
    });
    const { data } = await axios.get(`/api/v1/user/${id}`);
    dispatch({
      type: "userProfileSuccess",
      payload: data.user,
    });
  } catch (error) {
    // const errorPayload = {
    //   message: error.message,
    //   status: error.response ? error.response.status : null,
    // };
    dispatch({
      type: "userProfileFailure",
      payload: error.message,
    });
  }
};

export const followUser = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "followUserRequest",
    });
    const { data } = await axios.get(`/api/v1/follow/${id}`);
    dispatch({
      type: "followUserSuccess",
      payload: data.message,
    });
  } catch (error) {
    // const errorPayload = {
    //   message: error.message,
    //   status: error.response ? error.response.status : null,
    // };
    dispatch({
      type: "followUserFailure",
      payload: error.message,
    });
  }
};

export const RegisterUser =
  (name, email, password,avatar,rate,dob) => async (dispatch) => {
    try {
      dispatch({
        type: "RegisterRequest",
      });
      const { data } = await axios.post(
        "/api/v1/register",
        { name, email, password ,avatar,rate,dob},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({
        type: "RegisterSuccess",
        payload: data.user,
      });
    } catch (error) {
      const errorPayload = {
        message: error.message,
        status: error.response ? error.response.status : null,
      };
      dispatch({
        type: "RegisterFailure",
        payload: error.message,
      });
    }
  };

  export const updateProfile = (name, email,avatar) => async (dispatch) => {
    try {
      dispatch({
        type: "updateProfileRequest",
      });
      const { data } = await axios.put(
        "/api/v1/update/profile",
        { name, email ,avatar},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({
        type: "updateProfileSuccess",
        payload: data.message,
      });
    } catch (error) {
      const errorPayload = {
        message: error.message,
        status: error.response ? error.response.status : null,
      };
      dispatch({
        type: "updateProfileFailure",
        payload: errorPayload,
      });
    }
  };
  export const deleteProfile = () => async (dispatch) => {
    try {
      dispatch({
        type: "deleteProfileRequest",
      });
      const { data } = await axios.delete(
        "/api/v1/delete/me");
      dispatch({
        type: "deleteProfileSuccess",
        payload: data.message,
      });
    } catch (error) {
      // const errorPayload = {
      //   message: error.message,
      //   status: error.response ? error.response.status : null,
      // };
      dispatch({
        type: "deleteProfileFailure",
        payload: error.message,
      });
    }
  };

  export const updatePassword =(oldPassword,newPassword) => async (dispatch) => {
    try {
      dispatch({
        type: "UpdatePasswordRequest",
      });
      const { data } = await axios.put(
        "/api/v1/update/password",
        { oldPassword,newPassword},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({
        type: "UpdatePasswordSuccess",
        payload: data.message,
      });
    } catch (error) {
      const errorPayload = {
        message: error.message,
        status: error.response ? error.response.status : null,
      };
      dispatch({
        type: "UpdatePasswordFailure",
        payload: errorPayload,
      });
    }
  };
  export const forgotPassword =(email) => async (dispatch) => {
    try {
      dispatch({
        type: "ForgotPasswordRequest",
      });
      const { data } = await axios.post(
        "/api/v1/forgot/password",
        {email},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({
        type: "ForgotPasswordSuccess",
        payload: data.message,
      });
    } catch (error) {
      // const errorPayload = {
      //   message: error.message,
      //   status: error.response ? error.response.status : null,
      // };
      dispatch({
        type: "ForgotPasswordFailure",
        payload: error.message,
      });
    }
  };
  export const resetPassword =(token,password) => async (dispatch) => {
    try {
      dispatch({
        type: "ResetPasswordRequest",
      });
      const { data } = await axios.put(
        `/api/v1/password/reset/${token}`,
        {password},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({
        type: "ResetPasswordSuccess",
        payload: data.message,
      });
    } catch (error) {
      // const errorPayload = {
      //   message: error.message,
      //   status: error.response ? error.response.status : null,
      // };
      dispatch({
        type: "ResetPasswordFailure",
        payload: error.message,
      });
    }
  };
