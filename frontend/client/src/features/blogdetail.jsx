import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getBlog = createAsyncThunk('blog/getBlogById', async (blogId, thunkAPI) => {
  try {
    const res = await fetch(`api/blog/${blogId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    });

    const data = await res.json();

    if (res.status === 200) {
      return data;
    } else {
      return thunkAPI.rejectWithValue(data);
    }
  } catch (err) {
    if (err.response) {
      // Handle error when there is a response
      return thunkAPI.rejectWithValue(err.response.data);
    } else {
      // Handle other types of errors
      console.error('Unexpected error:', err);
      return thunkAPI.rejectWithValue({ error: 'Unexpected error' });
    }
  }
});

const initialState = {
  blog: {}, // Add an initial state property for the blog
  loading: false,
};

const blogdetailSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blog = action.payload;
      })
      .addCase(getBlog.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const fetchBlogById = (blogId) => async (dispatch) => {
  try {
    await dispatch(getBlog(blogId));
  } catch (error) {
    // Handle error, if needed
    console.error(`Error fetching blog with ID ${blogId}:`, error);
  }
};

export default blogdetailSlice.reducer;
