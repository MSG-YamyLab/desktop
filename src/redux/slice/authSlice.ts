import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {   IUser } from "../../interface/auth/auth";
import { authService } from "../../service/authService";



const initialState: IUser = {
    id: 0,
    email: "",
    phone: "",
    nickname: "",
    is_active: false,
    is_block: false,
    is_superuser: false,
    is_staff: false,
    profile: {
      id: 0,
      name: "",
      surname: "",
      birthday: "",
      bio: "",
      avatar: [
        {
          image: ""
        }
      ]
    },
    is_online: false,
};



const getMe = createAsyncThunk<IUser, void, {}>(
  "authSlice/getMe",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await authService.getMe();
      return data;
    } catch (err) {
      const e = err as AxiosError;
      return rejectWithValue(e.request?.data);
    }
  }
);
const addAvatarUser = createAsyncThunk<IUser, any, {}>(
  "authSlice/addAvatarUser",
  async (image, { rejectWithValue }) => {
    try {
      const { data } = await authService.avatarAdd(image);
      return data;
    } catch (err) {
      const e = err as AxiosError;
      return rejectWithValue(e.request?.data);
    }
  }
);

const updateUser = createAsyncThunk<IUser, any, {}>(
  "authSlice/updateUser",
  async (dt, { rejectWithValue }) => {
    try {
      const { data } = await authService.user(dt);
      return data;
    } catch (err) {
      const e = err as AxiosError;
      return rejectWithValue(e.request?.data);
    }
  }
);


const addContactUser = createAsyncThunk<IUser, any, {}>(
  "authSlice/addContactUser",
  async (dt, { rejectWithValue }) => {
    try {
      const { data } = await authService.addUserByContact(dt);
      return data;
    } catch (err) {
      const e = err as AxiosError;
      return rejectWithValue(e.request?.data);
    }
  }
);
const delContactUser = createAsyncThunk<IUser, any, {}>(
  "authSlice/delContactUser",
  async (dt, { rejectWithValue }) => {
    try {
      const { data } = await authService.delUserByContact(dt);
      return data;
    } catch (err) {
      const e = err as AxiosError;
      return rejectWithValue(e.request?.data);
    }
  }
);

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {},
  extraReducers: (build) =>
    build
      .addCase(getMe.fulfilled, (state, { payload }) => {
        Object.assign(state, payload);
      })

      .addCase(addAvatarUser.fulfilled, (state, { payload }) => {
        Object.assign(state, payload);
      })



      .addCase(updateUser.fulfilled, (state, { payload }) => {
        Object.assign(state, payload);
      })

      .addCase(addContactUser.fulfilled, (state, { payload }) => {
        Object.assign(state, payload);
      })

      .addCase(delContactUser.fulfilled, (state, { payload }) => {
        Object.assign(state, payload);
      })

      .addCase(getMe.rejected, () => {
        console.log("bad Api");
      }),
        
});

const { reducer: authReducer, actions } = authSlice;

const authActions = {
  ...actions,
  getMe,
  addAvatarUser,
  updateUser,
  addContactUser,
  delContactUser,
};

export { authActions, authReducer };
