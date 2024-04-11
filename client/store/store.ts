import {configureStore} from '@reduxjs/toolkit';
import pageReducer from '../reducers/pageReducer';

export const store = configureStore({
    reducer:{
        page: pageReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type appDispatch = typeof store.dispatch;