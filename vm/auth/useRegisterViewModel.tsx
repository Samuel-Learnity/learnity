import {useDispatch, useSelector} from 'react-redux';
import {loginUser, registerUser, selectAuth} from "../../redux/slices/authSlice";
import {AppDispatch, RootState} from "../../redux/store";

export const useRegisterViewModel = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        status,
        error,
        token
    } = useSelector((state: RootState) => state.auth);

    const handleRegister = (payload: {email: string, password: string, username: string}) => {
        console.log('handle Register', payload)
        dispatch(registerUser(payload));
    };

    return {
        status,
        error,
        token,
        handleRegister,  // Si tu veux exposer la fonction de connexion directement
    };
}

export default useRegisterViewModel;
