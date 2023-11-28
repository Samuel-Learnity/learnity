import {SafeAreaView, StyleSheet} from "react-native";
import {View} from "../Themed";
import {ReactElement} from "react";

export function SafeAreaThemed(props: { children: ReactElement | ReactElement[] }) {
    return (
        <View style={styles.view}>
            <SafeAreaView style={styles.safeArea}>
                {props.children}
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    view: {
        height: "100%",
        width: "100%",
    }
})
