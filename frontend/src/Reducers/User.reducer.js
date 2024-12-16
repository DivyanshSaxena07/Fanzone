import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated : false,
    loading: true,
    posts: [],
    error: null,
  };

export const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase('LoginRequest', (state) => {
            state.loading = true;
        })
        .addCase('LoginSuccess', (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
        })
        .addCase('LoginFailure', (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;

        })
        .addCase('RegisterRequest', (state) => {
            state.loading = true;
        })
        .addCase('RegisterSuccess', (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;

        })
        .addCase('RegisterFailure', (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;

        })
        .addCase('LoadUserRequest', (state) => {
            state.loading = true;
        })
        .addCase('LoadUserSuccess', (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;

        })
        .addCase('LoadUserFailure', (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;

        })
        .addCase('LogoutUserRequest', (state) => {
            state.loading = true;
        })
        .addCase('LogoutUserSuccess', (state, action) => {
            state.loading = false;
            state.user = null;
            state.isAuthenticated = false;

        })
        .addCase('LogoutUserFailure', (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = true;

        })
        .addCase('clearErrors', (state) => {
            state.error = null;
        });
});
export const postOfFollowingReducer = createReducer(initialState, (builder) => {
    builder
        .addCase('postOfFollowingRequest', (state) => {
            state.loading = true;
        })
        .addCase('postOfFollowingSuccess', (state, action) => {
            state.loading = false;
            state.posts = action.payload;
            // state.isAuthenticated = true;
        })
        .addCase('postOfFollowingFailure', (state, action) => {
            state.loading = false;
            state.error = action.payload;
            // state.isAuthenticated = false;

        })
        .addCase('clearErrors', (state) => {
            state.error = null;
        })
        
        
});
export const userPostsReducer = createReducer(initialState, (builder) => {
    builder
        .addCase('userPostsRequest', (state) => {
            state.loading = true;
        })
        .addCase('userPostsSuccess', (state, action) => {
            state.loading = false;
            state.posts = action.payload;
            // state.isAuthenticated = true;
        })
        .addCase('userPostsFailure', (state, action) => {
            state.loading = false;
            state.error = action.payload;
            // state.isAuthenticated = false;

        })
        .addCase('clearErrors', (state) => {
            state.error = null;
        })
        
        
});
export const userProfileReducer = createReducer(initialState, (builder) => {
    builder
        .addCase('userProfileRequest', (state) => {
            state.loading = true;
        })
        .addCase('userProfileSuccess', (state, action) => {
            state.loading = false;
            state.user = action.payload;
            // state.isAuthenticated = true;
        })
        .addCase('userProfileFailure', (state, action) => {
            state.loading = false;
            state.error = action.payload;
            // state.isAuthenticated = false;

        })

        .addCase('deleteProfileRequest', (state) => {
            state.loading = true;
        })
        .addCase('deleteProfileSuccess', (state, action) => {
            state.loading = false;
            state.message = action.payload;
            // state.isAuthenticated = true;
        })
        .addCase('deleteProfileFailure', (state, action) => {
            state.loading = false;
            state.error = action.payload;
            // state.isAuthenticated = false;
    
        })
        .addCase('clearErrors', (state) => {
            state.error = null;
        })
        
});

export const followUserReducer = createReducer(initialState, (builder) => {
    builder
        .addCase('followUserRequest', (state) => {
            state.loading = true;
        })
        .addCase('followUserSuccess', (state, action) => {
            state.loading = false;
            state.user = action.payload;
            // state.isAuthenticated = true;
        })
        .addCase('followUserFailure', (state, action) => {
            state.loading = false;
            state.error = action.payload;
            // state.isAuthenticated = false;

        })
        .addCase('clearErrors', (state) => {
            state.error = null;
        })
        
        
});

export const allUsersReducer = createReducer(initialState, (builder) => {
    builder
        .addCase('allUsersRequest', (state) => {
            state.loading = true;
        })
        .addCase('allUsersSuccess', (state, action) => {
            state.loading = false;
            state.users = action.payload;
            // state.isAuthenticated = true;
        })
        .addCase('allUsersFailure', (state, action) => {
            state.loading = false;
            state.error = action.payload;
            // state.isAuthenticated = false;

        })
        .addCase('clearErrors', (state) => {
            state.error = null;
        })
        
        
});














// import { createReducer } from "@reduxjs/toolkit";
// const initialState  = {}
// export const userReducer = createReducer(initialState , {
//     LoginRequest:(state) =>{
//         state.loading = true;
//     },
//     LoginSuccess:(state,action) =>{
//         state.loading = false;
//         state.user = action.payload;
//     },
//     LoginFailure:(state,action) =>{
//         state.loading = false;
//         state.error = action.payload;
//     },

//     RegisterRequest:(state) =>{
//         state.loading = true;
//     },
//     RegisterSuccess:(state,action) =>{
//         state.loading = false;
//         state.user = action.payload;
//     },
//     RegisterFailure:(state,action) =>{
//         state.loading = false;
//         state.error = action.payload;
//     },

//     LoadUserRequest:(state) =>{
//         state.loading = true;
//     },
//     LoadUserSuccess:(state,action) =>{
//         state.loading = false;
//         state.user = action.payload;
//     },
//     LoadUserFailure:(state,action) =>{
//         state.loading = false;
//         state.error = action.payload;
//     },


// })