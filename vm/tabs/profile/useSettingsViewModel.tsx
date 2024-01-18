import {useDispatch, useSelector} from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import store, {AppDispatch, RootState} from "../../../redux/store";
import {logoutUser, setToken, signOutThunk} from "../../../redux/slices/authSlice";

export const useSettingsViewModel = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        status,
        error,
    } = useSelector((state: RootState) => state.auth);

    const retrieveTokenFromCookies = async () => {
        const token = await AsyncStorage.getItem('@jwtToken');
        if (token) {
            // Dispatch the setToken action to set the token in the Redux store
            store.dispatch(setToken(token));
            return true
        }
        return false
    };

    const handleDisconnect = async () => {
        await dispatch(signOutThunk());
    };

    return {
        status,
        error,
        handleDisconnect,
    };
}

export default useSettingsViewModel;
