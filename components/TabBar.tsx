import {BottomTabBarProps} from "@react-navigation/bottom-tabs";
import {Platform, StyleSheet, TouchableOpacity, useColorScheme} from "react-native";
import {View} from "./Themed";
import IconHome from "../assets/images/icons/home.svg"
import IconHomeActive from "../assets/images/icons/home_active.svg"
import IconAccount from "../assets/images/icons/account_circle.svg"
import IconAccountActive from "../assets/images/icons/account_circle_active.svg"
import IconCommunity from "../assets/images/icons/supervisor_account.svg"
import IconCommunityActive from "../assets/images/icons/supervisor_account_active.svg"
import IconMedia from "../assets/images/icons/video_library.svg"
import IconMediaActive from "../assets/images/icons/video_library_active.svg"
import {IconThemed} from "./IconThemed";

export const TabBar = (props: BottomTabBarProps) => {
    const colorScheme = useColorScheme();

    const styles = StyleSheet.create({
        tabBarStyle: {
            flexDirection: 'row',
            backgroundColor: colorScheme == 'light' ? "#FFFBFF" : "#000",
            paddingBottom: props.insets.bottom + 8,
            paddingVertical: 16,
            paddingHorizontal: 16
        },
    })

    return (
        <View /* Prevent default theme background on dark mode */>
            <View style={styles.tabBarStyle}>
                {props.state.routes.map((route, index) => {
                    return <TabBarItem tabBarProps={props}
                                       route={route}
                                       index={index}
                                       key={index}/>
                })}
            </View>
        </View>
    )
}

interface ITabBarItem {
    tabBarProps: BottomTabBarProps,
    route: any,
    index: number
}

enum TabBarIndex {
    home,
    media,
    communities,
    profile
}

export const TabBarItem = ({tabBarProps, route, index}: ITabBarItem) => {
    const {navigation, descriptors, state} = tabBarProps
    const {options} = descriptors[route.key]
    const colorScheme = useColorScheme();

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
            marginBottom: 8,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }
    })

    const indexIcon = () => {
        switch (index) {
            case TabBarIndex.home: {
                return isFocused ? <IconHomeActive width={22} height={22}/>
                    : <IconThemed source={IconHome} width={22} height={22}/>
            }
            case TabBarIndex.media: {
                return isFocused ? <IconMediaActive width={22} height={22}/>
                    : <IconThemed source={IconMedia} width={22} height={22}/>

            }
            case TabBarIndex.communities: {
                return isFocused ? <IconCommunityActive width={22} height={22}/>
                    : <IconThemed source={IconCommunity} width={22} height={22}/>
            }
            case TabBarIndex.profile: {
                return isFocused ? <IconAccountActive width={22} height={22}/>
                    : <IconThemed source={IconAccount} width={22} height={22}/>
            }
            default: {
                return <IconThemed source={IconAccount} width={22} height={22}/>
            }
        }
    }

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
            {
                indexIcon()
            }
        </TouchableOpacity>
    );
}