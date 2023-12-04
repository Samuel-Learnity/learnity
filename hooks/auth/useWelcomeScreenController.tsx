import {router, useNavigation} from "expo-router";
import {useState} from "react";

export const useLoginScreenController = () => {
    const navigation = useNavigation()

    const goToRegister = () => {
        // @ts-ignore
        navigation.navigate("register")
    }

    const goToLogin = () => {
        // @ts-ignore
        navigation.navigate("login")
    }

    return { goToRegister, goToLogin }
}