import {StyleSheet} from 'react-native';
import {Text, View} from '../../components/Themed';
import {Separator} from "../../components/common/Separator";

export default function TabOneScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tab One</Text>
            <Separator/>
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
