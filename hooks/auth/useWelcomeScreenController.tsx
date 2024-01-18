import {router, useNavigation} from "expo-router";
import {useCallback, useEffect} from "react";
import useAuthViewModel from "../../vm/auth/useAuthViewModel";

export const useWelcomeScreenController = () => {
    const navigation = useNavigation()
    const {
        handleAutoLogin,
        status,
        error,
        isAuthenticated
    } = useAuthViewModel()

    const goToRegister = useCallback(() => {
        // @ts-ignore
        navigation.navigate("register")
    },[])

    const goToLogin = useCallback(() => {
        // @ts-ignore
        navigation.navigate("login")
    },[])

    const goToHome =  useCallback(() => {
        router.push('/(tabs)/(home)/home')
    }, [])

    const checkUserAuthentication = async () => {
        await handleAutoLogin()
    };

    useEffect(() => {
        //autoLogin()
        checkUserAuthentication()
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            goToHome()
        } else {
            goToLogin()
        }
    }, [isAuthenticated]);

    return {goToRegister, goToLogin}
}