import {Stack} from 'expo-router';

export default function ProfileLayout() {
    return (
        <Stack initialRouteName={"profile"} screenOptions={{headerShown: true, headerTransparent: true}}>
            <Stack.Screen name="profile" options={{headerShown: false}}/>
            <Stack.Screen name="settings" options={{headerShown: true}}/>
        </Stack>
    );
}
