import {Tabs} from 'expo-router';
import {TabBar} from "../../components/TabBar";
import {Platform} from "react-native";
import {BlurView} from "expo-blur";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */


export default function TabLayout() {
    return (
        <Tabs
            initialRouteName="(home)"
            tabBar={props =>
                Platform.OS === "ios" ? (
                    <BlurView
                        style={{position: "absolute", bottom: 0, left: 0, right: 0}}
                        intensity={95}
                    >
                        <TabBar {...props} />
                    </BlurView>
                ) : (
                    <TabBar {...props} />
                )}
            screenOptions={{
                headerShown: false
            }}>
            <Tabs.Screen
                name="(home)"
                options={{
                    href: '/(home)/',
                    title: 'Home',
                }}
            />
            <Tabs.Screen
                name="(media)"
                options={{
                    href: '/(media)/',
                }}
            />
            <Tabs.Screen
                name="(communities)"
                options={{
                    href: '/(communities)/',
                }}
            />
            <Tabs.Screen
                name="(profile)"
                options={{
                    href: '/(profile)/',
                }}
            />
        </Tabs>
    );
}