import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text, View} from '../../../components/Themed';
import {Header, HeaderBackButton} from "../../../components/Header";
import IconBack from "../../../assets/images/arrow_back_ios_new.svg";
import {useNavigation} from "expo-router";

export default function SettingsScreen() {
    const navigation = useNavigation()

    const goBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack()
        }
    }

    return (
        <View style={styles.container}>
            <Header
                headerLeft={HeaderBackButton({goBack: goBack})}
                headerTitle={'Settings'}
                haveBackground={true}
            />
            <Text style={styles.title}>Settings</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>
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
