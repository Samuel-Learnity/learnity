import {router, useNavigation} from "expo-router";
import {useState} from "react";

export const useResetPasswordScreenController = () => {
    const navigation = useNavigation()
    const [email, setEmail] = useState("")

    const onGoWelcomeScreen = () => {
        navigation.goBack()
    }

    const onSubmit = () => {
        router.push('/')
    }
    return { onGoWelcomeScreen, onSubmit, email, setEmail }
}