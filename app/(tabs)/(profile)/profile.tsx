import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text, View} from '../../../components/Themed';
import {Link, useNavigation} from "expo-router";
import {useEffect, useLayoutEffect} from "react";
import IconBack from "../../../assets/images/arrow_back_ios_new.svg";
import {SafeAreaThemed} from "../../../components/common/SafeAreaThemed";
import {Header} from "../../../components/Header";

export default function ProfileScreen() {
    const navigation = useNavigation()

    const goBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack()
            console.log(navigation.getState())
        }
    }

    return (
        <SafeAreaThemed>
            <View style={styles.container}>
                <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>
                <Link href={"/settings"} style={styles.title}>Go to Setting</Link>
            </View>
        </SafeAreaThemed>
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
