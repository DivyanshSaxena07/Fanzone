import axios from "axios";
export const likePost = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "likeRequest",
    });
    const { data } = await axios.get(`/api/v1/post/${id}`);
    dispatch({
      type: "likeSuccess",
      payload: data.message,
    });
  } catch (error) {
    const errorPayload = {
      message: error.message,
      status: error.response ? error.response.status : null,
    };
    dispatch({
      type: "likeFailure",
      payload: errorPayload,
    });
  }
};
export const addCommntOnPost = (id, comment) => async (dispatch) => {
  try {
    dispatch({
      type: "addCommentRequest",
    });
    const { data } = await axios.put(
      `/api/v1/posts/comment/${id}`,
      {
        comment,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "addCommentSuccess",
      payload: data.message,
    });
  } catch (error) {
    const errorPayload = {
      message: error.message,
      status: error.response ? error.response.status : null,
    };
    dispatch({
      type: "addCommentFailure",
      payload: errorPayload,
    });
  }
};
export const deleteCommentOnPost = (id, commentId) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteCommentRequest",
    });
    const { data } = await axios.delete(`/api/v1/posts/comment/${id}`, {
      data: commentId,
    });

    dispatch({
      type: "deleteCommentSuccess",
      payload: data.message,
    });
  } catch (error) {
    const errorPayload = {
      message: error.message,
      status: error.response ? error.response.status : null,
    };
    dispatch({
      type: "deleteCommentfailure",
      payload: errorPayload,
    });
  }
};
export const createnewpost =(caption, file, isPrivate, fileType) => async (dispatch) => {
    try {
      dispatch({
        type: "newpostRequest",
      });
      const formData = new FormData();
      formData.append("caption", caption);
      formData.append("file", file); // File object directly
      formData.append("isPrivate", isPrivate);
      formData.append("fileType", fileType);


      // const {data} = await axios.post(`/api/v1/post/upload`,{
      //     caption,
      //     file,
      //     isPrivate,
      //     fileType
      // },{
      //     headers:{
      //        "Content-Type":"application/json"
      //     }
      // });

      const { data } = await axios.post(`/api/v1/post/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // FormData requires this header
        },
      });

      dispatch({
        type: "newpostSuccess",
        payload: data.message,
      });
    } catch (error) {
      const errorPayload = {
        message: error.message,
        status: error.response ? error.response.status : null,
      };
      dispatch({
        type: "newpostFailure",
        payload: errorPayload,
      });
    }
  };

export const deletePost = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deletePostRequest",
    });
    const { data } = await axios.delete(`/api/v1/post/${id}`);

    dispatch({
      type: "deletePostSuccess",
      payload: data.message,
    });
  } catch (error) {
    const errorPayload = {
      message: error.message,
      status: error.response ? error.response.status : null,
    };
    dispatch({
      type: "deletePostFailure",
      payload: errorPayload,
    });
  }
};
export const updateCaption = (id, caption) => async (dispatch) => {
  try {
    dispatch({
      type: "updateCaptionRequest",
    });
    const { data } = await axios.put(
      `/api/v1/post/${id}`,
      {
        caption,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "updateCaptionSuccess",
      payload: data.message,
    });
  } catch (error) {
    const errorPayload = {
      message: error.message,
      status: error.response ? error.response.status : null,
    };
    dispatch({
      type: "updateCaptionFailure",
      payload: errorPayload,
    });
  }
};
