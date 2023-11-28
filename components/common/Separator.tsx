import {View} from "../Themed";
import {StyleSheet} from "react-native";
import {FC} from "react";

interface SeparatorProps {
    marginTop: number,
    marginBottom: number,
    widthPercent: number,
}

export const Separator: FC<SeparatorProps> = ({marginTop, marginBottom, widthPercent}) => {
    const styles = StyleSheet.create({
        separator: {
            marginTop: 8,
            marginBottom: 32,
            height: 1,
            width: `${widthPercent}%`,
        }
    })

    return <View style={styles.separator} lightColor="#222" darkColor="rgba(255, 255, 255, 0.1)"/>;
}
