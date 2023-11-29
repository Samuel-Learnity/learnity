import {StyleSheet, TouchableOpacity} from 'react-native';
import {Image} from 'expo-image';
import {Text, View as ThemedView} from '../../components/Themed';
import {router, useNavigation} from "expo-router";
import {TextInput} from "react-native-paper";
import {useState} from "react";
import {Spacer} from "../../components/common/Spacer";
import {SafeAreaThemed} from "../../components/common/SafeAreaThemed";
import {Separator} from "../../components/common/Separator";
import {logoIcon} from "../../assets/Images";
import {Button} from "../../components/design system/SystemButton";
import {ButtonSize_L} from "../../components/design system/ButtonStyles";

export default function LoginScreen() {
    const navigation = useNavigation()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const onGoWelcomeScreen = () => {
        navigation.goBack()
    }

    const goToRegister = () => {
        // @ts-ignore
        navigation.navigate("register")
    }

    const onLogin = () => {
        router.push('/(tabs)/')
    }

    return (
        <SafeAreaThemed>
            {/* TODO: ScrollView for little screen and keyboard padding*/}
            <ThemedView style={styles.header}>
                <TouchableOpacity onPress={onGoWelcomeScreen} style={styles.backButton}>
                    <Text style={{fontSize: 38}}>{"<"}</Text>
                </TouchableOpacity>
            </ThemedView>
            <Image
                source={logoIcon}
                alt={"Logo"}
                style={styles.logo}
                contentFit={"contain"}
            />
            <Text style={styles.title}>Connexion</Text>
            <Separator marginTop={16} marginBottom={32} widthPercent={80}/>
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
