import {configureStore} from '@reduxjs/toolkit'
import userReducer from './features/user'
import blogReducer from './features/blog'

export const store = configureStore({
    reducer: {
        user: userReducer,
        blog: blogReducer,
    },
    devTools: import.meta.env.NODE_ENV !== 'production',
})

