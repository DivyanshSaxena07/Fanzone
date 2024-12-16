import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated : false,
    loading: true,
    posts: [],
    error: null,
  };

  
  export const likeReducer = createReducer(initialState, (builder) => {
    builder
    .addCase('likeRequest', (state) => {
        state.loading = true;
    })
    .addCase('likeSuccess', (state, action) => {
        state.loading = false;
        state.message = action.payload;
        // state.isAuthenticated = true;
    })
    .addCase('likeFailure', (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // state.isAuthenticated = false;

    })
    .addCase('addCommentRequest', (state) => {
        state.loading = true;
    })
    .addCase('addCommentSuccess', (state, action) => {
        state.loading = false;
        state.message = action.payload;
        // state.isAuthenticated = true;
    })
    .addCase('addCommentFailure', (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // state.isAuthenticated = false;

    })
    .addCase('deleteCommentRequest', (state) => {
        state.loading = true;
    })
    .addCase('deleteCommentSuccess', (state, action) => {
        state.loading = false;
        state.message = action.payload;
        // state.isAuthenticated = true;
    })
    .addCase('deleteCommentFailure', (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // state.isAuthenticated = false;

    })
    .addCase('newpostRequest', (state) => {
        state.loading = true;
    })
    .addCase('newpostSuccess', (state, action) => {
        state.loading = false;
        state.message = action.payload;
        // state.isAuthenticated = true;
    })
    .addCase('newpostFailure', (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // state.isAuthenticated = false;

    })
    .addCase('deletePostRequest', (state) => {
        state.loading = true;
    })
    .addCase('deletePostSuccess', (state, action) => {
        state.loading = false;
        state.message = action.payload;
        // state.isAuthenticated = true;
    })
    .addCase('deletePostFailure', (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // state.isAuthenticated = false;

    })
    .addCase('updateCaptionRequest', (state) => {
        state.loading = true;
    })
    .addCase('updateCaptionSuccess', (state, action) => {
        state.loading = false;
        state.message = action.payload;
        // state.isAuthenticated = true;
    })
    .addCase('updateCaptionFailure', (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // state.isAuthenticated = false;

    })

    .addCase('updateProfileRequest', (state) => {
        state.loading = true;
    })
    .addCase('updateProfileSuccess', (state, action) => {
        state.loading = false;
        state.message = action.payload;
        // state.isAuthenticated = true;
    })
    .addCase('updateProfileFailure', (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // state.isAuthenticated = false;

    })
    
    .addCase('UpdatePasswordRequest', (state) => {
        state.loading = true;
    })
    .addCase('UpdatePasswordSuccess', (state, action) => {
        state.loading = false;
        state.message = action.payload;
        // state.isAuthenticated = true;
    })
    .addCase('UpdatePasswordFailure', (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // state.isAuthenticated = false;

    })
    .addCase('ForgotPasswordRequest', (state) => {
        state.loading = true;
    })
    .addCase('ForgotPasswordSuccess', (state, action) => {
        state.loading = false;
        state.message = action.payload;
        // state.isAuthenticated = true;
    })
    .addCase('ForgotPasswordFailure', (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // state.isAuthenticated = false;

    })
    .addCase('ResetPasswordRequest', (state) => {
        state.loading = true;
    })
    .addCase('ResetPasswordSuccess', (state, action) => {
        state.loading = false;
        state.message = action.payload;
        // state.isAuthenticated = true;
    })
    .addCase('ResetPasswordFailure', (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // state.isAuthenticated = false;

    })
    .addCase('clearErrors', (state) => {
        state.error = null;
    })
    .addCase('clearMessage', (state) => {
        state.message = null;
    })
  })
  export const mypostsReducer = createReducer(initialState, (builder) => {
    builder
    .addCase('mypostsRequest', (state) => {
        state.loading = true;
    })
    .addCase('mypostsSuccess', (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        // state.isAuthenticated = true;
    })
    .addCase('mypostsFailure', (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // state.isAuthenticated = false;
    })
    .addCase('clearErrors', (state) => {
        state.error = null;
    })
})
