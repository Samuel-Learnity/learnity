import {FC} from "react";
import {SvgProps} from "react-native-svg";
import {DimensionValue, StyleSheet} from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import {View, Text} from "./Themed";
import Colors from "../constants/Colors";

export interface IconThemedProps extends SvgProps{
    source: FC<SvgProps>
}

export const IconThemed: FC<IconThemedProps> = (props) => {
    return (
        <MaskedView
            style={styles.maskedView}
            maskElement={
                <View style={styles.maskWrapper}>
                    <props.source {...props}/>
                </View>
            }>
            <View
                style={{minWidth: props.width as DimensionValue ?? 20, minHeight: props.height as DimensionValue ?? 20}}
                lightColor={Colors.light.secondary}
                darkColor={Colors.dark.secondary}
            />
        </MaskedView>
    )
}


const styles = StyleSheet.create({

    maskedView: {
        flex: 1,
        flexDirection: 'row',
        height: '100%',
    },
    maskWrapper: {
        backgroundColor: 'transparent',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mask: {
        fontSize: 60,
        color: 'black',
        fontWeight: 'bold',
    },
    image: {
        flex: 1,
        height: '100%',
        backgroundColor: '#324376'
    },
});
