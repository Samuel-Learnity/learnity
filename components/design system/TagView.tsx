import {FC} from "react";
import {StyleSheet} from "react-native";
import Colors from "../../constants/Colors";
import {Text, View} from "../Themed";

interface TagViewProps {
    isDarkTheme: boolean,
    label: string,
    mode: 'outline' | 'contained' | 'inverse' | 'outline-inverse'
}

export const TagView: FC<TagViewProps> = (
    {
        isDarkTheme,
        label,
        mode
    }) => {

    const styles = StyleSheet.create({
        container: {
            margin: 4,
            borderRadius: 16,
        },
        label: {
            paddingHorizontal: 8,
            paddingVertical: 4,
        },
        outline: {
            backgroundColor: Colors.transparent,
            borderWidth: 1,
            borderColor: isDarkTheme ? Colors.dark.primary : Colors.light.primary,
        },
        contained: {
            backgroundColor: isDarkTheme ? Colors.dark.primary : Colors.light.primary,
        },
        inverse: {
            backgroundColor: !isDarkTheme ? Colors.dark.primary : Colors.light.primary,
        },
        outline_inverse: {
            backgroundColor: Colors.transparent,
            borderWidth: 1,
            borderColor: isDarkTheme ? Colors.dark.secondary : Colors.light.secondary,
        },
        label_outline: {
            color: isDarkTheme ? Colors.dark.textSecondary : Colors.light.textSecondary
        },
        label_outline_inverse: {
            color: isDarkTheme ? Colors.dark.textPrimary : Colors.light.textPrimary
        },
        label_contained: {
            color: isDarkTheme ? Colors.dark.textPrimary : Colors.light.textPrimary,
        },
        label_inverse: {
            color: isDarkTheme ? Colors.dark.textSecondary : Colors.light.textSecondary,
        },
    })

    const getTagMode = () => {
        switch (mode) {
            case "contained": {
                return styles.contained
            }
            case "outline": {
                return styles.outline
            }
            case 'inverse': {
                return styles.inverse
            }
            case "outline-inverse": {
                return styles.outline_inverse
            }
            default: {
                return styles.contained
            }
        }
    }
    const getLabelMode = () => {
        switch (mode) {
            case "contained": {
                return styles.label_contained
            }
            case "outline": {
                return styles.label_outline
            }
            case 'inverse': {
                return styles.label_inverse
            }
            case "outline-inverse": {
                return styles.label_outline_inverse
            }
            default: {
                return styles.label_contained
            }
        }
    }

    let tagStyle = {...styles.container, ...getTagMode()}
    let labelStyle = {...styles.label, ...getLabelMode()}

    const options = {}
    return (
        <View style={tagStyle}>
            <Text style={labelStyle}>{label}</Text>
        </View>
    )
}

