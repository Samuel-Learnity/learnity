import {Stack} from 'expo-router';

export default function HomeLayout() {
    return (
        <Stack initialRouteName={"home"}>
            <Stack.Screen name="home" options={{headerShown: false}}/>
        </Stack>
    );
}
