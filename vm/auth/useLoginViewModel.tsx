import {useDispatch, useSelector} from 'react-redux';
import {loginUser, selectAuth} from "../../redux/slices/authSlice";
import {AppDispatch, RootState} from "../../redux/store";

export const useLoginViewModel = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        status,
        error,
        token
    } = useSelector((state: RootState) => state.auth);

    const handleLogin = (payload: {email: string, password: string}) => {
        console.log('handle login', payload)
        dispatch(loginUser(payload));
    };

    return {
        status,
        error,
        token,
        handleLogin,  // Si tu veux exposer la fonction de connexion directement
    };
}

export default useLoginViewModel;
