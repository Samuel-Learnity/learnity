import {useDispatch, useSelector} from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import store, {AppDispatch, RootState} from "../../../redux/store";
import {logoutUser, setToken} from "../../../redux/slices/authSlice";

export const useCommunitiesViewModel = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        status,
        error,
        suggestions
    } = useSelector((state: RootState) => state.search);

    return {
        status,
        error,
        suggestions,
    };
}

export default useCommunitiesViewModel;
