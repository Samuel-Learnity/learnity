import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from "../../redux/store";
import {confirmSignUpThunk, signUpThunk} from "../../redux/slices/authSlice";

export const useRegisterViewModel = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        status,
        error,
        email,
        code,
        verifying,
        password
    } = useSelector((state: RootState) => state.auth);

    const handleSignUp = () => {
        console.log("handle signup")
        dispatch(signUpThunk({email: email, password: password}));
    };

    const handleConfirmSignUp = () => {
        console.log("handle verifying")
        dispatch(confirmSignUpThunk({email: email, code: code}));

    };

    return {
        status,
        error,
        handleSignUp, handleConfirmSignUp,
        email,
        code,
        verifying,
        password
    };
}

export default useRegisterViewModel;
