import {useNavigation} from "expo-router";
import {useState} from "react";
import {NativeScrollEvent, NativeSyntheticEvent, useColorScheme} from "react-native";
import useSettingsViewModel from "../../../vm/tabs/profile/useSettingsViewModel";
import useProfileViewModel from "../../../vm/tabs/profile/useProfileViewModel";

export const useSettingsScreenController = () => {
    const navigation = useNavigation()

    const [headerShown, setHeaderShown] = useState(true);
    const isDarkTheme = useColorScheme() === 'dark';

    const {
        status,
        error,
        user
    } = useProfileViewModel()

    const goToSettings = () => {
        // @ts-ignore
        navigation.navigate('settings')
    }

    return {
        headerShown, setHeaderShown,
        isDarkTheme, goToSettings,
        status,
        error,
        user
    }
}