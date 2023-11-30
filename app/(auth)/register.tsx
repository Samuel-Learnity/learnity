import {StyleSheet, TouchableOpacity} from 'react-native';
import {Image} from 'expo-image';
import {Text, View} from '../../components/Themed';
import {TextInput} from "react-native-paper";
import {useState} from "react";
import {Spacer} from "../../components/common/Spacer";
import {SafeAreaThemed} from "../../components/common/SafeAreaThemed";
import {Separator} from "../../components/common/Separator";
import Images, {logoIcon} from "../../assets/Images";
import {Button} from "../../components/design system/SystemButton";
import {ButtonSize_L} from "../../components/design system/ButtonStyles";
import {useNavigation, useRouter} from "expo-router";
import {Header} from "../../components/Header";

export default function LoginScreen() {
    const navigation = useNavigation()
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordVerif, setPasswordVerif] = useState("")
    const [headerShown, setHeaderShown] = useState(true);

    const onGoWelcomeScreen = () => {
        // @ts-ignore
        navigation.navigate('index')
    }

    const goToLogin = () => {
        // @ts-ignore
        navigation.navigate("login")
    }

    // TODO: auth check and redirect
    const onRegister = () => {
        router.push("/(tabs)/(home)/home")
    }

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
                            secureTextEntry={true}
                            onChangeText={e => setPassword(e)}
                        />
                        <Spacer size={16}/>
                        {password !== "" &&
                            <TextInput
                                label="Mot de passe"
                                style={styles.input}
                                mode={'outlined'}
                                value={passwordVerif}
                                secureTextEntry={true}
                                onChangeText={e => setPasswordVerif(e)}
                            />
                        }
                    </>
                }
            </View>
            <View style={{width: "100%", alignContent: 'flex-start', marginLeft: "20%", marginTop: 16}}>
                <Text style={styles.linkText} onPress={goToLogin}>
                    Déjà un compte ?
                </Text>
            </View>
            <Button
                title={"S'inscrire"}
                mode="contained"
                onPress={onRegister}
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
