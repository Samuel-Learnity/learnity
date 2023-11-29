import {StyleSheet} from 'react-native';
import {Text, View} from '../../../components/Themed';
import {Link} from "expo-router";

export default function ProfileScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>
            <Link href={"/settings"} style={styles.title}>Go to Setting</Link>
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
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
