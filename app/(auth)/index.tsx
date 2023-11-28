import {StyleSheet} from 'react-native';
import {Image} from 'expo-image';
import {useNavigation} from "expo-router";
import {SafeAreaThemed} from "../../components/common/SafeAreaThemed";
import {logoIcon} from "../../assets/Images";
import {Button} from "../../components/design system/SystemButton";
import {ButtonSize_M} from "../../components/design system/ButtonStyles";

export default function LoginScreen() {
    const navigation = useNavigation()
    const goToRegister = () => {
        // @ts-ignore
        navigation.navigate("register")
    }

    const goToLogin = () => {
        // @ts-ignore
        navigation.navigate("login")
    }

    return (
        <SafeAreaThemed>
            <Image
                source={logoIcon}
                alt={"Logo"}
                style={styles.logo}
                contentFit={"contain"}
            />

            <Button
                title={"Se connecter"}
                mode="outlined"
                onPress={() => goToLogin()}
                width={80}
                marginHorizontal={80}
                marginVertical={8}
                buttonSize={ButtonSize_M}
            />
            <Button
                title={"S'enregistrer"}
                mode="contained"
                onPress={() => goToRegister()}
                width={80}
                marginHorizontal={8}
                marginVertical={8}
                buttonSize={ButtonSize_M}
            />
        </SafeAreaThemed>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        height: "100%",
        width: "100%",
        position: "absolute",
        paddingHorizontal: 24
    },
    logo: {
        height: 104,
        width: "50%",
        marginLeft: "10%",
        alignSelf: "flex-start"
    },
    back_button: {
        alignSelf: "flex-start",
        justifyContent: "flex-start",
    },
    form: {
        width: "100%",
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        alignSelf: "flex-start",
        marginLeft: "10%",
        marginTop: 8,
    },
    input: {
        width: "80%",
    },
    link: {
        marginTop: 16,
        paddingVertical: 16,
    },
    linkText: {
        fontSize: 16,
        textDecorationLine: "underline",
    },
    text: {
        fontSize: 16,
    },
});
