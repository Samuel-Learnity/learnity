import {Stack} from 'expo-router';

export default function HomeLayout() {
    return (
        <Stack screenOptions={{
            gestureDirection: 'horizontal',
            gestureEnabled: true
        }}>
            <Stack.Screen name="home" options={{headerShown: false}}/>
            <Stack.Screen name="detail" options={{headerShown: false}}/>
        </Stack>
    );
}
