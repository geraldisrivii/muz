import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAuth = createAsyncThunk(
  "auth/fetchAuth",
  async (params: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: params.email,
            password: params.password,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error);
      }

      return await response.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

interface RegisterParams {
  email: string;
  password: string;
  confirmPassword: string;
}

interface ErrorResponse {
  message?: string;
  errors?: Record<string, string>;
  // Добавьте другие поля, которые возвращает ваш бэкенд
}

export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async (params: RegisterParams, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/auth/register",
        {
          email: params.email,
          password: params.password,
          confirmPassword: params.confirmPassword,
        }
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data as ErrorResponse);
    }
  }
);

export const fetchAuthMe = createAsyncThunk(
  "auth/fetchAuthMe",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "/auth/me"
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  data: null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
      state.status = "idle";
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Общие обработчики для всех запросов
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.status = "loading";
          state.error = null;
        }
      )

      // Обработчики для успешных запросов
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state, action) => {
          state.status = "succeeded";
          state.data = (action as any).payload;
        }
      )

      // Обработчики для ошибок
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "failed";
          state.error = (action as any).payload?.message || "Произошла ошибка";
        }
      );
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);
export const selectAuthError = (state) => state.auth.error;
export const selectAuthStatus = (state) => state.auth.status;

export const { logout, clearError } = authSlice.actions;
export const authReducer = authSlice.reducer;
