import {StyleSheet} from 'react-native';
import {Image} from 'expo-image';
import {Text, View} from '../../components/Themed';
import {TextInput} from "react-native-paper";
import {Spacer} from "../../components/common/Spacer";
import {SafeAreaThemed} from "../../components/common/SafeAreaThemed";
import Images, {logoIcon} from "../../assets/Images";
import {Button} from "../../components/design system/SystemButton";
import {ButtonSize_L} from "../../components/design system/ButtonStyles";
import {Header} from "../../components/common/Header";
import {useRegisterScreenController} from "../../hooks/auth/useRegisterScreenController";
import {state} from "sucrase/dist/types/parser/traverser/base";

export default function RegisterScreen() {
    const {
        status,
        email, _setEmail,
        password, _setPassword,
        code, _setCode,
        verifying,
        //username, setUsername,
        headerShown, setHeaderShown,
        onGoWelcomeScreen, goToLogin, onRegister, onConfirmSignup
    } = useRegisterScreenController()

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
            <Text style={styles.title}>Inscription</Text>
            <View style={styles.form}>
                <TextInput
                    label="Email"
                    style={styles.input}
                    mode={'outlined'}
                    value={email}
                    onChangeText={e => _setEmail(e)}
                />
                <TextInput
                    label="Mot de passe"
                    style={styles.input}
                    mode={'outlined'}
                    value={password}
                    secureTextEntry={true}
                    onChangeText={e => _setPassword(e)}
                />
                {verifying &&
                    <>
                        <TextInput
                            label="code"
                            style={styles.input}
                            mode={'outlined'}
                            value={code}
                            onChangeText={e => _setCode(e)}
                        />
                    </>
                }
                {status === "verifying" &&
                    <>
                        <Text>Vous êtes inscrit !</Text>
                    </>
                }
            </View>
            <View style={{width: "100%", alignContent: 'flex-start', marginLeft: "20%", marginTop: 16}}>
                <Text style={styles.linkText} onPress={goToLogin}>
                    Déjà un compte ?
                </Text>
            </View>
            <Button
                title={verifying ? "Confirmer" : "S'inscrire"}
                mode="contained"
                onPress={verifying ? onConfirmSignup : onRegister}
                isSticky={true}
                width={80}
                marginHorizontal={8}
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
    text: {
        fontSize: 16,
    },
});
