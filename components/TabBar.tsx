import {BottomTabBarProps} from "@react-navigation/bottom-tabs";
import {StyleSheet, TouchableOpacity, useColorScheme} from "react-native";
import {Text, View} from "./Themed";
import Colors from "../constants/Colors";
import {faUser} from "@fortawesome/free-regular-svg-icons/faUser";
import {Spacer} from "./common/Spacer";
import {IconDefinition} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {LinearGradient} from "expo-linear-gradient";


export const TabBar = (props: BottomTabBarProps) => {
    const colorScheme = useColorScheme();

    const styles = StyleSheet.create({
        tabBarStyle: {
            flexDirection: 'row',
            margin: 4,
            padding: 8,
            backgroundColor: colorScheme == 'light' ? "#fff" : "#000",
            borderRadius: 12,
        },
        linearGradient: {
            marginBottom: props.insets.bottom,
            marginRight: 16,
            marginLeft: 16,
            borderRadius: 16,
            alignItems: "center"
        },
    })

    return (
        <View /* Prevent default theme background on dark mode */>
            <LinearGradient
                colors={Colors.color_gradient}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.linearGradient}
            >
                <View style={styles.tabBarStyle}>
                    {props.state.routes.map((route, index) => {
                        return <TabBarItem tabBarProps={props} route={route} index={index} key={index}/>
                    })}
                </View>
            </LinearGradient>
        </View>
    )
}

interface ITabBarItem {
    tabBarProps: BottomTabBarProps,
    route: any,
    index: number
}

export const TabBarItem = ({tabBarProps, route, index}: ITabBarItem) => {
    const {navigation, descriptors, state} = tabBarProps
    const {options} = descriptors[route.key]
    const colorScheme = useColorScheme();

    const label =
        options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
                ? options.title
                : route.name;

    const isFocused = state.index === index;

    const onPress = () => {
        const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
        }
    };

    const onLongPress = () => {
        navigation.emit({
            type: 'tabLongPress',
            target: route.key,
        });
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }
    })

    let iconColor = colorScheme === 'light' ? Colors.light.tabIconDefault : Colors.dark.tabIconDefault
    iconColor = isFocused ? Colors.primary : iconColor

    return (
        <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.container}
        >
            <TabBarIcon icon={faUser} color={iconColor}/>
            <Spacer size={8}/>
            <Text style={{color: iconColor}}>
                {label}
            </Text>
        </TouchableOpacity>
    );

}

function TabBarIcon(props: {
    icon: IconDefinition,
    color: string,

}) {
    return <FontAwesomeIcon size={28} style={{marginBottom: -3}} icon={props.icon} color={props.color}/>;
}