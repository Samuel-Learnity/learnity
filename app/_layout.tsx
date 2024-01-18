import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {SplashScreen, Stack} from 'expo-router';
import {useEffect} from 'react';
import {useColorScheme} from 'react-native';
import {PaperProvider} from "react-native-paper";
import {loadAppFont} from "../assets/loadAppFont";
import store from "../redux/store";
import {Provider} from "react-redux";

// TODO: move this in a file
import {REACT_APP_AWS_API, REACT_APP_AWS_REGION, REACT_APP_AWS_COGNITO_USER_POOL_ID, REACT_APP_AWS_COGNITO_CLIENT_ID, REACT_APP_AWS_COGNITO_IDENTITY_POOL_ID} from '@env';

import {Amplify} from "aws-amplify";

const awsConfig: any = {
    Auth: {
        Cognito: {
            domain: "https://learnity.auth.eu-west-3.amazoncognito.com",
            //  Amazon Cognito User Pool ID
            userPoolId: REACT_APP_AWS_COGNITO_USER_POOL_ID,

            // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
            userPoolClientId: REACT_APP_AWS_COGNITO_CLIENT_ID,
            // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
            identityPoolId: REACT_APP_AWS_COGNITO_IDENTITY_POOL_ID,

            // OPTIONAL - This is used when autoSignIn is enabled for Auth.signUp
            // 'code' is used for Auth.confirmSignUp, 'link' is used for email link verification
            //signUpVerificationMethod: 'code', // 'code' | 'link'
            /*loginWith: {
                // OPTIONAL - Hosted UI configuration
                oauth: {
                    domain: 'your_cognito_domain',

                    scopes: [
                        'phone',
                        'email',
                        'profile',
                        'openid',
                        'aws.cognito.signin.user.admin'
                    ],
                    redirectSignIn: ['http://localhost:3000/'],
                    redirectSignOut: ['http://localhost:3000/'],
                    responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
                }
            }*/
        }
    },
    API: {
        endpoints: [
            {
                name: "api",
                endpoint: REACT_APP_AWS_API,
                region: REACT_APP_AWS_REGION,
            },
        ],
    },
};


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
Amplify.configure(awsConfig);

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
