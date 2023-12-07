import {router, useNavigation} from "expo-router";
import {useEffect} from "react";
import useAuthViewModel from "../../vm/auth/useAuthViewModel";

export const useWelcomeScreenController = () => {
    const navigation = useNavigation()
    const {
        handleAutoLogin,
        retrieveTokenFromCookies,
        status,
        token,
        error
    } = useAuthViewModel()

    const goToRegister = () => {
        // @ts-ignore
        navigation.navigate("register")
    }

    const goToLogin = () => {
        // @ts-ignore
        navigation.navigate("login")
    }

    const autoLogin = async () => {
        await retrieveTokenFromCookies()
    };

    useEffect(() => {
        autoLogin();
    }, []);

    useEffect(() => {
        if (token) {
            // Dispatch the fetchUser action to get the user based on the token
            handleAutoLogin();
        } else {
            goToLogin()
        }
    }, [token]);

    useEffect(() => {
        if (status === 'succeeded') {
            router.push('/(tabs)/(home)/home')
        } else if (status === 'loading') {
            console.log('loading')
        } else if (status === 'failed') {
            console.log('failed')
        }
    }, [status]);

    return { goToRegister, goToLogin }
}