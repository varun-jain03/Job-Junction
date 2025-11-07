import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// REGISTER
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData, thunkAPI) => {
    try {
      const res = await fetch("https://job-junction-backend-91n3.onrender.com/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      if (!res.ok) {
        return thunkAPI.rejectWithValue(data);
      }
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Registration failed");
    }
  }
);

// LOGIN
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {

      const response = await fetch("https://job-junction-backend-91n3.onrender.com/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!data.token) {
        throw new Error(data.msg || "No token received");
      }

      localStorage.setItem("accessToken", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      return { token: data.token, user: data.user || null };
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

// FETCH CURRENT USER FROM TOKEN
export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        return rejectWithValue("No token found");
      }

      const response = await fetch("https://job-junction-backend-91n3.onrender.com/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data);
      }

      // Save fresh user data
      localStorage.setItem("user", JSON.stringify(data.user));
      return data.user;
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

// UPDATE USER PROFILE OR BASIC INFO
export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async (updatedData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) return rejectWithValue("No token found");

      const hasProfileData = !!updatedData.profile;
      const url = hasProfileData
        ? "https://job-junction-backend-91n3.onrender.com/user/profile"
        : "https://job-junction-backend-91n3.onrender.com/user/update";

      const res = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData.profile || updatedData),
      });

      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.msg || "Update failed");

      const updatedUser =
        data.user || (data.profile ? { ...updatedData, profile: data.profile } : updatedData);

      const existingUser = JSON.parse(localStorage.getItem("user")) || {};
      const newUser = { ...existingUser, ...updatedUser };
      localStorage.setItem("user", JSON.stringify(newUser));

      return newUser;
    } catch (err) {
      return rejectWithValue(err.message || "Something went wrong");
    }
  }
);

// INITIAL STATE
const initialState = {
  token: localStorage.getItem("accessToken") || null,
  user: JSON.parse(localStorage.getItem("user")) || null,
  isLoggedIn: !!(localStorage.getItem("accessToken") && localStorage.getItem("user")),
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.newUser;
        state.isLoggedIn = false; // Only true after login
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // FETCH USER
      .addCase(fetchCurrentUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      //UPDATE USER INFO
      .addCase(updateUserProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
