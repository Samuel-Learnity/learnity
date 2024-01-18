import {Platform, ScrollView, StyleSheet} from 'react-native';
import {Text, useThemeColor, View} from '../../../components/Themed';
import {Header} from "../../../components/common/Header";
import IconBack from "../../../assets/images/arrow_back_ios_new.svg";
import {SafeAreaThemed} from "../../../components/common/SafeAreaThemed";
import Colors from "../../../constants/Colors";
import {TextInput} from "react-native-paper";
import {Button} from "../../../components/design system/SystemButton";
import {Spacer} from "../../../components/common/Spacer";
import {Separator} from "../../../components/common/Separator";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useSettingsScreenController} from "../../../hooks/tabs/profile/useSettingsScreenController";

export default function SettingsScreen() {
    const {
        email, setEmail,
        oldPassword, setOldPassword,
        headerShown, setHeaderShown,
        newPassword, setNewPassword,
        goBack, onUpdateEmail, onUpdatePassword, handleScroll, onDisconnect, onDeleteAccount
    } = useSettingsScreenController()

    const insets = useSafeAreaInsets()

    const edgeTop = Platform.OS === "ios" ? insets.top + 24: insets.top + 72;

    const borderColor = useThemeColor({
        light: Colors.light.primaryAccent,
        dark: Colors.dark.primaryAccent
    }, 'secondary');

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

    return (
        <SafeAreaThemed>
            <Header
                headerLeft={{action: goBack, icon: IconBack, width: 30, height: 30}}
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
                <Spacer size={edgeTop}/>
                <View style={styles.container}>
                    <View style={styles.card}>
                        <Text style={styles.card_title}>Update email</Text>
                        <TextInput
                            label="Email"
                            style={styles.input}
                            mode={'outlined'}
                            value={email}
                            placeholder={""}
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

                    <Button onPress={onDisconnect} title={'Disconnect'} mode={'contained'} width={80} marginVertical={16}/>
                    <Button onPress={onDeleteAccount} title={'Delete Account'} mode={'outlined-error'} width={80}/>
                </View>

                <Spacer size={72}/>
            </ScrollView>
        </SafeAreaThemed>
    );
}
