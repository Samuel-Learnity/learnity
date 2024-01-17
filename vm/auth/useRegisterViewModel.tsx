import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from "../../redux/store";
import {signUpOrConfirmSignUp} from "../../redux/slices/authSlice";

export const useRegisterViewModel = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        status,
        error,
        token,
        email,
        code,
        verifying,
        password
    } = useSelector((state: RootState) => state.auth);

    const handleRegister = (payload: {email: string, password: string, username: string}) => {
        //dispatch(registerUser(payload));
        dispatch(signUpOrConfirmSignUp({...payload, verifying: verifying}));
    };

    return {
        status,
        error,
        token,
        handleRegister,
        email,
        code,
        verifying,
        password
    };
}

export default useRegisterViewModel;
