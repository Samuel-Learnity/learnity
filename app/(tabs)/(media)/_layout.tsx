import {Stack} from 'expo-router';

export default function MediaLayout() {
    return (
        <Stack initialRouteName={"media"}>
            <Stack.Screen name="media" options={{headerShown: false}}/>
        </Stack>
    );
}
