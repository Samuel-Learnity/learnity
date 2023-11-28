import {Tabs} from 'expo-router';
import {TabBar} from "../../components/TabBar";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */


export default function TabLayout() {
    return (
        <Tabs
            tabBar={props => <TabBar {...props}/>}
            screenOptions={{
                headerShown: false
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Tab One',
                }}
            />
            <Tabs.Screen
                name="two"
                options={{
                    title: 'Tab Two',
                }}
            />
            <Tabs.Screen
                name="three"
                options={{
                    title: 'Tab Three',
                }}
            />
            <Tabs.Screen
                name="four"
                options={{
                    title: 'Tab Four',
                }}
            />
        </Tabs>
    );
}