// redux/reducers/index.ts
import {combineReducers} from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import tabsReducer from '../slices/tabsSlice';
import searchReducer from '../slices/searchSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    tabs: tabsReducer,
    search: searchReducer
    // Add other reducers as needed
});

export default rootReducer;
