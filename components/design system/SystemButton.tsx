import {useEffect, useRef, useState} from "react";
import {Animated, Pressable, StyleSheet} from "react-native";
import {ThemeProps, useThemeColor, View} from "../Themed";
import Colors from "../../constants/Colors";
import {ButtonSize_S, ButtonSizeType} from "./ButtonStyles";
import {RobotoText} from "../StyledText";
import {useSafeAreaInsets} from "react-native-safe-area-context";

type BtnProps = {
    onPress: () => void,
    title: string,
    buttonSize?: ButtonSizeType,
    mode?: 'text' | 'outlined' | 'contained',//  | 'elevated' | 'contained-tonal',
    isSticky?: boolean
    isLoading?: boolean
    width?: number // Percent %
    marginHorizontal?: number // Pixel
    marginVertical?: number // Pixel
}
export type ButtonProps = BtnProps & ThemeProps;

export function Button(props: ButtonProps) {
    const {isSticky, width} = props;
    const insets = useSafeAreaInsets()

    const [isSelected, setIsSelected] = useState(false)

    // Mode du bouton. Text par défaut
    let mode = props.mode ?? 'text'

    const haveBackground = mode !== "outlined" && mode !== "text"

    // Taille du bouton. S par défaut
    let buttonSize = props.buttonSize ?? ButtonSize_S

    // Primary color of the theme
    const primaryColor = useThemeColor({light: Colors.light.secondary, dark: Colors.dark.secondary}, 'secondary')
    // Secondary color of the theme
    const secondaryColor = useThemeColor({light: Colors.light.primary, dark: Colors.dark.primary}, 'primary')

    const backgroundColor = haveBackground ? primaryColor
        : Colors.transparent;
    const selectedBackgroundColor = haveBackground ? Colors.transparent
        : primaryColor;

    const textColor = haveBackground ? secondaryColor
        : primaryColor;
    const selectedTextColor = haveBackground ? primaryColor
        : secondaryColor;

    const styles = StyleSheet.create({
        container: {
            width: width ? `${width}%` : 'auto',
            marginVertical: props.marginVertical ? props.marginVertical : 0,
            marginHorizontal: props.marginHorizontal ? props.marginHorizontal : 0,
        },
        button: {
            width: "100%",
            alignItems: 'center',
            alignSelf: "center",
            justifyContent: 'center',
            paddingHorizontal: 16,
        },
        notSelected: {
            backgroundColor: backgroundColor,
        },
        selected: {
            backgroundColor: selectedBackgroundColor,
        },
        stickyBottom: {
            width: "100%",
            position: "absolute",
            bottom: insets.bottom,
            alignItems: "center"
        },
        outline: {
            borderColor: primaryColor,
            borderStyle: "solid",
            borderWidth: 1
        },

    })

    // Fusion des styles en fonction du theme, du mode et de l'action
    let buttonStyle = {...styles.button, ...buttonSize.button}
    if (mode === 'outlined') {
        buttonStyle = {...buttonStyle, ...styles.outline}
    }
    let notSelectedStyle = {...buttonStyle, ...styles.notSelected}
    let selectedStyle = {...buttonStyle, ...styles.selected}
    if (mode === 'contained') {
        selectedStyle = {...selectedStyle, ...styles.outline}
    }

    const _onPressStart = () => {
        setIsSelected(true)
    }
    const _onPressEnd = () => {
        setIsSelected(false)
    }

    // Ne fonctionne pas: Utiliser la lib Reanimated pour les animations
    const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
    useEffect(() => {
        if (isSelected) {
            console.log("isSelected", isSelected)
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 10000,
                useNativeDriver: true,
            }).start();
        } else {
            console.log("End Selected", isSelected)
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 10000,
                useNativeDriver: true,
            }).start();
        }
    }, [isSelected]);

    const buttonView =
        <Pressable
            style={styles.container}
            onPress={props.onPress}
            onPressIn={_onPressStart}
            onPressOut={_onPressEnd}
        >
            {/* Utiliser Reanimated */}
            <Animated.View style={isSelected ? selectedStyle : notSelectedStyle}>
                <RobotoText style={{...buttonSize.text, color: isSelected ? selectedTextColor : textColor}}>
                    {props.title}
                </RobotoText>
            </Animated.View>
        </Pressable>

    return (<>
        {!isSticky &&
            buttonView
        }
        {isSticky &&
            <View style={styles.stickyBottom}>
                {buttonView}
            </View>
        }
    </>)
}