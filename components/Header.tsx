import {useThemeColor, View} from "./Themed";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {Text} from "./Themed"
import {FC, ReactNode} from "react";
import {StyleSheet, TouchableOpacity} from "react-native";
import IconBack from "../assets/images/arrow_back_ios_new.svg";
import Colors from "../constants/Colors";
import {IconThemed} from "./IconThemed";
import {Spacer} from "./common/Spacer";

export interface HeaderProps {
    headerLeft?: ReactNode
    headerTitle?: string
    headerRight?: ReactNode
    haveBackground?: boolean
    isScroll?: string
}

export const Header: FC<HeaderProps> = (
    {
        headerTitle,
        headerLeft,
        headerRight,
        haveBackground,
        isScroll
    }) => {
    const insets = useSafeAreaInsets()

    const backgroundColor = useThemeColor({light: Colors.light.primary, dark: Colors.dark.primary}, 'secondary');

    const styles = StyleSheet.create({
        button: {
        },
        header: {
            position: "absolute",
            display: 'flex',
            flexDirection: "row",
            alignItems: 'center',
            justifyContent: "center",
            backgroundColor: haveBackground ? backgroundColor : 'transparent',
            height: insets.top + 48,
            paddingTop: insets.top + 8,
            paddingHorizontal: 8,
            width: "100%",
            top: 0,
        },
        title: {
            fontFamily: "RobotoMedium",
            fontSize: 20,
            textAlign: "center"
        },
        center: {
            flexGrow: 1,
            flexShrink: 0,
            flexBasis: 100,
        },
        left: {
            backgroundColor: haveBackground ? backgroundColor : 'transparent',
            flexGrow: 0,
            flexShrink: 1,
            flexBasis: 40,
            minWidth: 40
        },
        right: {
            backgroundColor: haveBackground ? backgroundColor : 'transparent',
            flexGrow: 0,
            flexShrink: 1,
            flexBasis: 40,
            minWidth: 40
        }
    })

    return (
        <View style={styles.header}>
            {headerLeft ?
                <View style={styles.button}>
                    {headerLeft}
                </View>
                : <Spacer size={40}/> // Fill Space
            }
            {headerTitle ?
                <View style={styles.center}>
                    <Text style={styles.title}>
                        {headerTitle}
                    </Text>
                </View>
                : <Spacer size={40}/> // Fill Space
            }
            {headerRight ?
                <View style={{
                    alignSelf: 'flex-end'
                }}>
                    {headerRight}
                </View>
                : <Spacer size={40}/> // Fill Space
            }
        </View>
    )
}

export interface HeaderBackButtonProps {
    goBack: () => void
}

export const HeaderBackButton: FC<HeaderBackButtonProps> = ({goBack}) => {
    return <TouchableOpacity onPress={goBack} style={{width: 38, height: 38}}>
        <IconThemed source={IconBack}/>
    </TouchableOpacity>
}