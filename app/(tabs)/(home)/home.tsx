import {Pressable, StyleSheet} from 'react-native';
import {Text, View} from '../../../components/Themed';
import {Separator} from "../../../components/common/Separator";
import {useNavigation} from "expo-router";

export default function HomeScreen() {
    const navigation = useNavigation()

    const openModal = () => {
        // @ts-ignore
        navigation.navigate("detail")
    }

    return (
        <View style={styles.container}>
            <Pressable onPress={openModal}>
                <Text style={styles.title}>Go to detail</Text>
            </Pressable>
            <Separator marginBottom={0} marginTop={0} widthPercent={80}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});
