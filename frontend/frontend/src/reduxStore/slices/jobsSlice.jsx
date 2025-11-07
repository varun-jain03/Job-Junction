import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 1. RECRUITER: CREATE JOB
export const createJob = createAsyncThunk(
  "jobs/createJob",
  async (jobData, { rejectWithValue, getState }) => {
    try {
      const { user } = getState();
      const res = await fetch("https://job-junction-backend-91n3.onrender.com/job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify(jobData)
      })

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Failed to create job");
      return data;

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 2. RECRUITER: GET JOBS POSTED BY THE RECRUITER
export const getRecruiterJobs = createAsyncThunk(
  "jobs/getRecruiterJobs",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { user } = getState();
      const res = await fetch("https://job-junction-backend-91n3.onrender.com/job/recruiter/job", {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Failed to get recruiter jobs");
      return data.jobs;

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 3. STUDENTS: GET JOBS BY ID
export const getJobById = createAsyncThunk(
  "jobs/getJobById",
  async (jobId, { rejectWithValue }) => {
    try {
      const res = await fetch(`https://job-junction-backend-91n3.onrender.com/job/student/`)
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);



// INITIONAL STATE
const initialState = {
  jobs: [],
  recruiterJobs: [],
  selectedJob: null,
  loading: false,
  error: null,
  successMsg: null,
}

const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    clearJobState: (state) => {
      state.loading = false;
      state.error = null;
      state.successMsg = null;
    },
  },
  extraReducers: (builder) => {

  }
})