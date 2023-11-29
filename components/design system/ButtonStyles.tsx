import {StyleSheet} from 'react-native';

export type ButtonSizeType = {
    button: {
        height: number
    }
    text: {
        fontSize: number
    }
}

export const ButtonSize_S: ButtonSizeType = StyleSheet.create({
    button: {
        height: 40,
        borderRadius: 21
    },
    text: {
        fontSize: 16,
        fontFamily: 'RobotoMedium'
    },
})

export const ButtonSize_M: ButtonSizeType  = StyleSheet.create({
    button: {
        height: 48,
        borderRadius: 21
    },
    text: {
        fontSize: 18,
        fontFamily: 'RobotoMedium'
    },
})

export const ButtonSize_L: ButtonSizeType  = StyleSheet.create({
    button: {
        height: 56,
        borderRadius: 21
    },
    text: {
        fontSize: 20,
        fontFamily: 'RobotoMedium'
    },
})