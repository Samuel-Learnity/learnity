import {Stack, useNavigation} from 'expo-router';
import IconBack from '../../../assets/images/arrow_back_ios_new.svg'
import {TouchableOpacity} from "react-native";

export default function ProfileLayout() {

    return (
        <Stack
            initialRouteName={"profile"}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="profile" options={{headerShown: false}}/>
            <Stack.Screen name="settings" options={{headerShown: false}}/>
        </Stack>
    );
}
