import {useNavigation, useRouter} from "expo-router";
import {useEffect, useState} from "react";
import useRegisterViewModel from "../../vm/auth/useRegisterViewModel";

export const useRegisterScreenController = () => {
    const navigation = useNavigation()
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordVerif, setPasswordVerif] = useState("")
    const [headerShown, setHeaderShown] = useState(true);

    const {
        handleRegister,
        status,
        token,
        error
    } = useRegisterViewModel()

    const onGoWelcomeScreen = () => {
        // @ts-ignore
        navigation.navigate('index')
    }

    const goToLogin = () => {
        // @ts-ignore
        navigation.navigate("login")
    }

    // TODO: auth check and redirect
    const onRegister = () => {
        if (password != "" && email != "") {
            handleRegister({email: email, password: password, username: "name_default"})
        }
    }



    return {
        email, setEmail,
        password, setPassword,
        passwordVerif, setPasswordVerif,
        headerShown, setHeaderShown,
        onGoWelcomeScreen, goToLogin, onRegister
    }
}