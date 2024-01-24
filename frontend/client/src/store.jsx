import {configureStore} from '@reduxjs/toolkit'
import userReducer from './features/user'
import blogReducer from './features/blog'
import blogdetailReducer from './features/blogdetail'

export const store = configureStore({
    reducer: {
        user: userReducer,
        blog: blogReducer,
        blogdetail: blogdetailReducer
    },
    devTools: import.meta.env.NODE_ENV !== 'production',
})

