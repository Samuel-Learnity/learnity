import {router, useNavigation} from "expo-router";
import {useEffect, useState} from "react";
import useLoginViewModel from "../../vm/auth/useLoginViewModel";
import CookieManager from '@react-native-cookies/cookies';
import AsyncStorage from "@react-native-async-storage/async-storage";

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
            router.push('/(tabs)/(home)/home')
        } else if (status === 'loading') {
            console.log('loading')
        } else if (status === 'failed') {
            console.log('failed')
        }
    }, [status]);

    return {
        email, setEmail,
        password, setPassword,
        headerShown, setHeaderShown,
        onGoWelcomeScreen, goToRegister, goToResetPassword, onLogin
    }
}