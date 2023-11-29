import {useFonts} from "expo-font";
import FontAwesome from "@expo/vector-icons/FontAwesome";

// Appeler à la création du RootLayout
export const loadAppFont = () => {
    const [loaded, error] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
        RobotoBold: require('../assets/fonts/Roboto-Bold.ttf'),
        RobotoLight: require('../assets/fonts/Roboto-Light.ttf'),
        RobotoThin: require('../assets/fonts/Roboto-Thin.ttf'),
        RobotoMedium: require('../assets/fonts/Roboto-Medium.ttf'),
        RobotoRegular: require('../assets/fonts/Roboto-Regular.ttf'),
        RobotoCondensedBold: require('../assets/fonts/RobotoCondensed-Bold.ttf'),
        RobotoCondensedLight: require('../assets/fonts/RobotoCondensed-Light.ttf'),
        RobotoCondensedThin: require('../assets/fonts/RobotoCondensed-Thin.ttf'),
        RobotoCondensedMedium: require('../assets/fonts/RobotoCondensed-Medium.ttf'),
        RobotoCondensedRegular: require('../assets/fonts/RobotoCondensed-Regular.ttf'),
        ...FontAwesome.font,
    });
    return [loaded, error]
}