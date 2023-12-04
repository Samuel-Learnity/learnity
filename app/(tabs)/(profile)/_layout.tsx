import {Stack, useNavigation} from 'expo-router';
import IconBack from '../../../assets/images/arrow_back_ios_new.svg'
import {TouchableOpacity} from "react-native";

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
