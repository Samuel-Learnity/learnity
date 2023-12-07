import Cookies from "js-cookie";
import store, {AppDispatch, RootState} from "../../redux/store";
import {fetchUser, setToken} from "../../redux/slices/authSlice";
import {useDispatch, useSelector} from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useAuthViewModel = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        status,
        error,
        token
    } = useSelector((state: RootState) => state.auth);

    const retrieveTokenFromCookies = async () => {
        const token = await AsyncStorage.getItem('@jwtToken');
        console.log('retrieveTokenFromCookies', token)
        if (token) {
            // Dispatch the setToken action to set the token in the Redux store
            store.dispatch(setToken(token));
            return true
        }
        return false
    };

    const handleAutoLogin = async () => {
        // Dispatch the fetchUser action to fetch the user based on the token
        if (token) {
            console.log('handleAutoLogin: ', token)
            await dispatch(fetchUser({token}));
        }
    };

    return {
        status,
        error,
        token,
        handleAutoLogin,
        retrieveTokenFromCookies,
    };
}

export default useAuthViewModel;
