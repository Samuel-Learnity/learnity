import {Stack} from 'expo-router';

export default function CommunitiesLayout() {
    return (
        <Stack initialRouteName={"communities"}>
            <Stack.Screen name="communities" options={{headerShown: false}}/>
        </Stack>
    );
}
