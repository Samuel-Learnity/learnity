import {useDispatch, useSelector} from 'react-redux';
import {loginUser} from "../../redux/slices/authSlice";
import {AppDispatch, RootState} from "../../redux/store";
import {useEffect} from "react";
import Cookies from 'js-cookie';

type HandleLoginProps = {
    email: string,
    password: string
}

export const useLoginViewModel = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        status,
        error,
        token
    } = useSelector((state: RootState) => state.auth);

    const handleLogin = (payload: HandleLoginProps) => {
        dispatch(loginUser(payload))
    };

    return {
        status,
        error,
        token,
        handleLogin,
    };
}

export default useLoginViewModel;
