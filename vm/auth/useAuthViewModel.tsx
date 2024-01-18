import store, {AppDispatch, RootState} from "../../redux/store";
import {fetchAuthSessionThunk} from "../../redux/slices/authSlice";
import {useDispatch, useSelector} from "react-redux";

export const useAuthViewModel = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        status,
        error,
        isAuthenticated,
    } = useSelector((state: RootState) => state.auth);

    const handleAutoLogin = async () => {
        // Dispatch the fetchUser action to fetch the user based on the token
        await dispatch(fetchAuthSessionThunk());
    };

    return {
        handleAutoLogin,
        status,
        error,
        isAuthenticated,
    };
}

export default useAuthViewModel;
