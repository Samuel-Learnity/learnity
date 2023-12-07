import {useDispatch, useSelector} from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import store, {AppDispatch, RootState} from "../../../redux/store";
import {logoutUser, setToken} from "../../../redux/slices/authSlice";

export const useProfileViewModel = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        status,
        error,
        user
    } = useSelector((state: RootState) => state.auth);

    return {
        status,
        error,
        user,
    };
}

export default useProfileViewModel;
