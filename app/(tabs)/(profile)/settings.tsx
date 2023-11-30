import {
    Animated,
    NativeScrollEvent,
    NativeSyntheticEvent,
    StyleSheet,
    TouchableOpacity,
    useColorScheme
} from 'react-native';
import {Text, useThemeColor, View} from '../../../components/Themed';
import {Header, HeaderButton} from "../../../components/Header";
import IconBack from "../../../assets/images/arrow_back_ios_new.svg";
import {useNavigation} from "expo-router";
import {SafeAreaThemed} from "../../../components/common/SafeAreaThemed";
import {ScrollView} from "react-native";
import card from "react-native-paper/src/components/Card/Card";
import Colors from "../../../constants/Colors";
import {TextInput} from "react-native-paper";
import {useState} from "react";
import {Button} from "../../../components/design system/SystemButton";
import {Spacer} from "../../../components/common/Spacer";
import {Separator} from "../../../components/common/Separator";

export default function SettingsScreen() {
    const navigation = useNavigation()
    const borderColor = useThemeColor({
        light: Colors.light.primaryAccent,
        dark: Colors.dark.primaryAccent
    }, 'secondary');

    const [email, setEmail] = useState("")
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [headerShown, setHeaderShown] = useState(true);

    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: "center",
            alignContent: "center",
            alignItems: 'center',
            flex: 1,
            height: "100%",
            width: "100%",
        },
        card: {
            position: "relative",
            borderStyle: 'solid',
            borderColor: borderColor,
            borderWidth: 1,
            borderRadius: 16,
            width: '80%',
            paddingHorizontal: 24,
            paddingVertical: 16,
        },
        title: {
            fontSize: 20,
            fontWeight: 'bold',
        },
        input: {},
        card_title: {
            fontSize: 18,
            fontFamily: 'RobotoMedium',
            marginBottom: 8,
        },
        scrollView: {
            width: '100%',
        },
    });

    const goBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack()
        }
    }

    const onUpdateEmail = () => {

    }

    const onUpdatePassword = () => {

    }
    const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const scrolling = e.nativeEvent.contentOffset.y;

        if (scrolling > 100) {
            setHeaderShown(false);
            console.log(scrolling)
        } else {
            setHeaderShown(true);
            console.log(scrolling)
        }
    }

    const onDisconnect = () => {

    }
    const onDeleteAccount = () => {

    }

    return (
        <SafeAreaThemed>
            <Header
                headerLeft={HeaderButton({action: goBack, icon: IconBack, width: 26, height: 26})}
                headerTitle={'Settings'}
                haveBackground={false}
                headerShown={headerShown}
            />
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                stickyHeaderIndices={[0]}
                scrollEventThrottle={16}
                onScroll={handleScroll}
            >
                <Spacer size={72}/>
                <View style={styles.container}>
                    <View style={styles.card}>
                        <Text style={styles.card_title}>Update email</Text>
                        <TextInput
                            label="Email"
                            style={styles.input}
                            mode={'outlined'}
                            value={email}
                            onChangeText={e => setEmail(e)}
                        />
                        <Spacer size={16}/>
                        <Button onPress={onUpdateEmail} title={"Update"} mode={'outlined'}/>
                    </View>

                    <Spacer size={24}/>
                    <View style={styles.card}>
                        <Text style={styles.card_title}>Update password</Text>
                        <TextInput
                            label="Actual password"
                            style={styles.input}
                            mode={'outlined'}
                            secureTextEntry={true}
                            value={oldPassword}
                            onChangeText={e => setOldPassword(e)}
                        />
                        <Spacer size={8}/>
                        <TextInput
                            label="New password"
                            style={styles.input}
                            mode={'outlined'}
                            secureTextEntry={true}
                            value={newPassword}
                            onChangeText={e => setNewPassword(e)}
                        />
                        <Spacer size={16}/>
                        <Button onPress={onUpdatePassword} title={"Update"} mode={'outlined'}/>
                    </View>

                    <Separator marginTop={16} marginBottom={0} widthPercent={80}/>

                    <Button onPress={onDeleteAccount} title={'Disconnect'} mode={'contained'} width={80} marginVertical={16}/>
                    <Button onPress={onDisconnect} title={'Delete Account'} mode={'outlined-error'} width={80}/>
                </View>

                <Spacer size={72}/>
            </ScrollView>
        </SafeAreaThemed>
    );
}
