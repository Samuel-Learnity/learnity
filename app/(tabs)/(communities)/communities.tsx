import {StyleSheet} from 'react-native';
import {Text, useThemeColor, View} from '../../../components/Themed';
import {SafeAreaThemed} from "../../../components/common/SafeAreaThemed";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import Colors from "../../../constants/Colors";
import Images from "../../../assets/Images"
import {IconThemed} from "../../../components/IconThemed";

export default function CommunitiesScreen() {
    const insets = useSafeAreaInsets()

    const backgroundColor = useThemeColor({
        light: Colors.light.secondaryAccent,
        dark: Colors.dark.secondaryAccent
    }, 'secondaryAccent');

    const inputBackgroundColor = useThemeColor({
        light: "#dadada",
        dark: Colors.dark.primary
    }, 'secondary');

    const styles = StyleSheet.create({
        header: {
            position: "absolute",
            display: 'flex',
            flexDirection: "row",
            alignItems: 'center',
            justifyContent: "center",
            backgroundColor: backgroundColor,
            height: insets.top + 48,
            paddingTop: insets.top + 8,
            paddingHorizontal: 8,
            width: "100%",
            top: 0,
            zIndex: 1,
        },
        container: {
            flex: 1,
            width: '100%',
            paddingHorizontal: 24,
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
        inputContainer : {
            backgroundColor: inputBackgroundColor,
            marginBottom: 4,
            width: "100%",
            height: 32,
            borderRadius: 12,
        },
    })

    console.log(Images.LoupeIcon)

    return (
        <SafeAreaThemed>
            <View style={styles.header}>
                <View style={styles.inputContainer}>
                    <IconThemed source={Images.LoupeIcon} width={30} height={30}/>
                </View>
            </View>
            {/*
                Header
                Search Bar
                Backbutton
            */}

            {/*
                If IsSearch
            */}

            {/*
                If Not Search
                <View style={styles.container}>
                    <Text style={styles.title}>Tab Three</Text>
                    <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>
                </View>
            */}

        </SafeAreaThemed>
    );
}
