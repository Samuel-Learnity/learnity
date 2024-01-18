import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from "../../redux/store";
import {signInThunk} from "../../redux/slices/authSlice";

type HandleLoginProps = {
    email: string,
    password: string
}

export const useLoginViewModel = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        status,
        error,
    } = useSelector((state: RootState) => state.auth);

    const handleLogin = (payload: HandleLoginProps) => {
        console.log(payload)
        dispatch(signInThunk({username: payload.email, password: payload.password}))
    };

    return {
        status,
        error,
        handleLogin,
    };
}

export default useLoginViewModel;