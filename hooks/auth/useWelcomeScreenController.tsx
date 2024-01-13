import {router, useNavigation} from "expo-router";
import {useCallback, useEffect} from "react";
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

    const goToRegister = useCallback(() => {
        // @ts-ignore
        navigation.navigate("register")
    },[])

    const goToLogin = useCallback(() => {
        // @ts-ignore
        navigation.navigate("login")
    },[])

    const autoLogin = useCallback(async () => {
        await retrieveTokenFromCookies()
    }, [token]);

    useEffect(() => {
        autoLogin()
    }, []);

    useEffect(() => {
        if (token) {
            console.log('have token')
            handleAutoLogin();
        } else {
            // Ne marche pas lors de la première ouverture de l'app
            console.log('go to login')
            goToLogin()
        }
    }, [token]);

    useEffect(() => {
        if (status === 'succeeded') {
            // Si Login, Register, Autologin ont réussit -> GoToApp
            router.push('/(tabs)/(home)/home')
        } else if (status === 'loading') {
            console.log('autologin loading')
        } else if (status === 'failed') {
            console.log('autologin failed')
        }
    }, [status]);

    return {goToRegister, goToLogin}
}