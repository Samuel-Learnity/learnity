// redux/reducers/index.ts
import {combineReducers} from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import tabsReducer from '../slices/tabsSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    tabs: tabsReducer,
    // Add other reducers as needed
});

export default rootReducer;
