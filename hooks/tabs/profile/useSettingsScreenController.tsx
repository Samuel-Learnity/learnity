import {useNavigation} from "expo-router";
import {useState} from "react";
import {NativeScrollEvent, NativeSyntheticEvent} from "react-native";
import useSettingsViewModel from "../../../vm/tabs/profile/useSettingsViewModel";

export const useSettingsScreenController = () => {
    const navigation = useNavigation()

    const [email, setEmail] = useState("")
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [headerShown, setHeaderShown] = useState(true);

    const {
        handleDisconnect,
        status,
        error,
        token,
    } = useSettingsViewModel()

    const goBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack()
        }
    }

    const onUpdateEmail = () => {
        //

    }

    const onUpdatePassword = () => {

        //
    }
    const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const scrolling = e.nativeEvent.contentOffset.y;

        if (scrolling > 100) {
            setHeaderShown(false);
        } else {
            setHeaderShown(true);
        }
    }

    const onDisconnect = () => {
        handleDisconnect()
    }
    const onDeleteAccount = () => {
        //

    }

    return {
        email, setEmail,
        oldPassword, setOldPassword,
        headerShown, setHeaderShown,
        newPassword, setNewPassword,
        goBack, onUpdateEmail, onUpdatePassword, handleScroll, onDisconnect, onDeleteAccount
    }
}