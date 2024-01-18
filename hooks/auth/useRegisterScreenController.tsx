import {useNavigation, useRouter} from "expo-router";
import {useEffect, useState} from "react";
import useRegisterViewModel from "../../vm/auth/useRegisterViewModel";
import { setEmail, setPassword, setVerifying, setCode} from "../../redux/slices/authSlice";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../redux/store";

export const useRegisterScreenController = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter()
    //const [email, setEmail] = useState("")
    //const [password, setPassword] = useState("")
    //const [username, setUsername] = useState("")
    const [headerShown, setHeaderShown] = useState(true);

    const {
        handleSignUp, handleConfirmSignUp,
        status,
        error,
        //--
        email,
        verifying,
        password,
        code
    } = useRegisterViewModel()

    const onGoWelcomeScreen = () => {
        // @ts-ignore
        navigation.navigate('index')
    }

    const goToLogin = () => {
        // @ts-ignore
        navigation.navigate("login")
    }
    const _setEmail = (e: any) => {
        dispatch(setEmail(e))
    }
    const _setPassword = (e: any) => {
        dispatch(setPassword(e))
    }

    const _setCode = (e: any) => {
        dispatch(setCode(e))
    }

    // TODO: auth check and redirect
    const onRegister = () => {
        if (password != "" && email != "") {
            handleSignUp()
        }
    }
    const onConfirmSignup = () => {
        if (email != "" && code != "") {
            handleConfirmSignUp()
        }
    }

    return {
        status,
        email, _setEmail,
        password, _setPassword,
        verifying,
        code, _setCode,
        //username, setUsername,
        headerShown, setHeaderShown,
        onGoWelcomeScreen, goToLogin, onRegister, onConfirmSignup
    }
}