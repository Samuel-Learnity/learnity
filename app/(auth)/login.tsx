import {StyleSheet} from 'react-native';
import {Image} from 'expo-image';
import {Text, View as ThemedView} from '../../components/Themed';
import {TextInput} from "react-native-paper";
import {Spacer} from "../../components/common/Spacer";
import {SafeAreaThemed} from "../../components/common/SafeAreaThemed";
import Images, {logoIcon} from "../../assets/Images";
import {Button} from "../../components/design system/SystemButton";
import {ButtonSize_L} from "../../components/design system/ButtonStyles";
import {Header} from "../../components/common/Header";
import {useLoginScreenController} from "../../hooks/auth/useLoginScreenController";

export default function LoginScreen() {
    const {
        onLogin,
        onGoWelcomeScreen,
        goToResetPassword,
        goToRegister,
        password,
        setPassword,
        email,
        setEmail,
        headerShown,
        setHeaderShown,
    } = useLoginScreenController()

    return (
        <SafeAreaThemed>
            {/* TODO: ScrollView for little screen and keyboard padding*/}
            <Header
                headerLeft={{action: onGoWelcomeScreen, icon: Images.BackIcon, width: 32, height: 32}}
                haveBackground={false}
                headerShown={headerShown}
            />
            <Image
                source={logoIcon}
                alt={"Logo"}
                style={styles.logo}
                contentFit={"contain"}
            />
            <Text style={styles.title}>Connexion</Text>
            <ThemedView style={styles.form}>
                <TextInput
                    label="Email"
                    style={styles.input}
                    mode={'outlined'}
                    value={email}
                    onChangeText={e => setEmail(e)}
                />
                {email !== '' &&
                    <>
                        <Spacer size={16}/>
                        <TextInput
                            label="Mot de passe"
                            style={styles.input}
                            mode={'outlined'}
                            value={password}
                            onChangeText={e => setPassword(e)}
                        />
                        <ThemedView style={{width: "100%", alignContent: 'flex-start', marginLeft: "20%", marginTop: 16}}>
                            <Text style={styles.textBold} onPress={goToResetPassword}>Mot de passe oublié ?</Text>
                        </ThemedView>
                    </>
                }
            </ThemedView>
            <ThemedView style={{width: "100%", alignContent: 'flex-start', marginLeft: "20%", marginTop: 16}}>
                <Text style={styles.text}>Pas encore de compte ? <Text style={styles.linkText} onPress={goToRegister}>Créez
                    en un</Text></Text>
            </ThemedView>
            <Button
                title={"Se connecter"}
                mode="contained"
                onPress={onLogin}
                isSticky={true}
                width={80}
                buttonSize={ButtonSize_L}
            />
            <Spacer size={160}/>
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
    backButton: {
        alignSelf: "flex-start",
        justifyContent: "flex-start",
    },
    form: {
        width: "100%",
        alignItems: "center",
    },
    title: {
        fontSize: 36,
        fontFamily: 'RobotoCondensedRegular',
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
    textBold: {
        fontSize: 16,
        fontFamily: "RobotoBold",
    },
    text: {
        fontSize: 16,
    },
});
