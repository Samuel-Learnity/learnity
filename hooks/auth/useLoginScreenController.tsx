import {router, useNavigation} from "expo-router";
import {useEffect, useState} from "react";
import useLoginViewModel from "../../vm/auth/useLoginViewModel";

export const useLoginScreenController = () => {
    const navigation = useNavigation()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [headerShown, setHeaderShown] = useState(true);

    const {
        handleLogin,
        status,
        token,
        error
    } = useLoginViewModel()

    const onGoWelcomeScreen = () => {
        navigation.goBack()
    }

    const goToRegister = () => {
        // @ts-ignore
        navigation.navigate("register")
    }
    const goToResetPassword = () => {
        // @ts-ignore
        navigation.navigate("password_reset")
    }

    // TODO: auth check and redirect
    const onLogin = () => {
        if (password != "" && email != "") {
            handleLogin({email: email, password: password})
        }
    }

    useEffect(() => {
        if (status === 'succeeded') {
            // Si Login, Register, Autologin ont réussit -> GoToApp
            console.log('login succeeded')
        } else if (status === 'loading') {
            console.log('login loading')
        } else if (status === 'failed') {
            console.log('login failed')
        } else {
            console.log('login idle')
        }
    }, [status]);

    return {
        email, setEmail,
        password, setPassword,
        headerShown, setHeaderShown,
        status,
        token,
        error,
        onGoWelcomeScreen, goToRegister, goToResetPassword, onLogin
    }
}