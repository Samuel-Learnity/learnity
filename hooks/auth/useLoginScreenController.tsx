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
        console.log('onLogin Controller')
        if (password != "" && email != "") {
            handleLogin({email: email, password: password})
        }
    }

    useEffect(() => {
        if (status === 'succeeded') {
            console.log('ROUTER PUSH TABS')
            router.push('/(tabs)/(home)/home')
        } else if (status === 'loading') {
            console.log('loading')
        }
    }, [status]);

    return {
        email, setEmail,
        password, setPassword,
        headerShown, setHeaderShown,
        onGoWelcomeScreen, goToRegister, goToResetPassword, onLogin
    }
}