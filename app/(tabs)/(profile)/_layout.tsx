import {Stack} from 'expo-router';

export default function ProfileLayout() {

    return (
        <Stack
            initialRouteName={"[users]"}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="[users]" options={{headerShown: false}}/>
            <Stack.Screen name="settings" options={{headerShown: false}}/>
        </Stack>
    );
}
