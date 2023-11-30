import {useThemeColor, View} from "./Themed";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {Text} from "./Themed"
import {FC, ReactNode, useEffect, useRef} from "react";
import {Animated, StyleSheet, TouchableOpacity} from "react-native";
import IconBack from "../assets/images/arrow_back_ios_new.svg";
import Colors from "../constants/Colors";
import {IconThemed} from "./IconThemed";
import {Spacer} from "./common/Spacer";
import {SvgProps} from "react-native-svg";

export interface HeaderProps {
    headerLeft?: ReactNode
    headerTitle?: string
    headerRight?: ReactNode
    haveBackground?: boolean
    headerShown?: boolean
}

export const Header: FC<HeaderProps> = (
    {
        headerTitle,
        headerLeft,
        headerRight,
        haveBackground,
        headerShown
    }) => {
    const insets = useSafeAreaInsets()

    const backgroundColor = useThemeColor({
        light: Colors.light.secondaryAccent,
        dark: Colors.dark.secondaryAccent
    }, 'secondary');

    const translation = useRef(new Animated.Value(-100)).current;

    const styles = StyleSheet.create({
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
            zIndex: 1,
            transform: [
                {translateY: translation},
            ],
        },
        title: {
            fontFamily: "RobotoMedium",
            fontSize: 20,
            textAlign: "center"
        },
        center: {
            backgroundColor: haveBackground ? backgroundColor : 'transparent',
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

    useEffect(() => {
        Animated.timing(translation, {
            toValue: headerShown ? 0 : -100,
            duration: 250,
            useNativeDriver: true,
        }).start();
    }, [headerShown]);

    return (
        <Animated.View style={styles.header}>
            {headerLeft ?
                <View style={styles.left}>
                    {headerLeft}
                </View>
                : <Spacer size={40}/>
            }
            {headerTitle ?
                <View style={styles.center}>
                    <Text style={styles.title}>
                        {headerTitle}
                    </Text>
                </View>
                : <View style={styles.center}><Spacer size={40}/></View>
            }
            {headerRight ?
                <View style={styles.right}>
                    {headerRight}
                </View>
                : <View style={styles.right}><Spacer size={40}/></View>
            }
        </Animated.View>
    )
}

export interface HeaderButtonProps {
    action: () => void,
    icon: FC<SvgProps>,
    width: number,
    height: number,
}

export const HeaderButton: FC<HeaderButtonProps> = ({action, icon, width, height}) => {
    return <TouchableOpacity onPress={action} style={{minWidth: 38, minHeight: 38}}>
        <IconThemed source={icon} width={width} height={height}/>
    </TouchableOpacity>
}