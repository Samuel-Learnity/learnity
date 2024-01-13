import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {SplashScreen, Stack} from 'expo-router';
import {useEffect} from 'react';
import {useColorScheme} from 'react-native';
import {PaperProvider} from "react-native-paper";
import {loadAppFont} from "../assets/loadAppFont";
import store from "../redux/store";
import {Provider} from "react-redux";

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = loadAppFont()


    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return <RootLayoutNav/>;
}

function RootLayoutNav() {
    const colorScheme = useColorScheme();

    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Provider store={store}>
                <PaperProvider>
                    <Stack>
                        <Stack.Screen name="(auth)" options={{headerShown: false}}/>
                        <Stack.Screen name="(tabs)" options={{headerShown: false, gestureEnabled: false}}/>
                        <Stack.Screen name="modal" options={{presentation: 'modal'}}/>
                    </Stack>
                </PaperProvider>
            </Provider>
        </ThemeProvider>
    );
}
