import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getBlog = createAsyncThunk('blog/list',  async(_, thunkAPI) => {
  try {
    const res = await fetch('api/blog/list', {
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
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

const initialState = {
  bloglist: [],
  loading: false,
};

const blogSlice = createSlice({
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
          // Update the property to access the 'blogs' array
          state.bloglist = action.payload.blogs; 
        })
        .addCase(getBlog.rejected, (state) => {
          state.loading = false;
        });
    },
  });
  

export const fetchBlogListData = () => async (dispatch) => {
  try {
    await dispatch(getBlog());
  } catch (error) {
    // Handle error, if needed
    console.error('Error fetching blog list:', error);
  }
};

export default blogSlice.reducer;
