import {StyleSheet} from 'react-native';
import {Text} from '../../../components/Themed';
import {Separator} from "../../../components/common/Separator";
import {Header} from "../../../components/common/Header";
import {useNavigation} from "expo-router";
import {SafeAreaThemed} from "../../../components/common/SafeAreaThemed";
import {useState} from "react";
import Images from "../../../assets/Images";

export default function DetailScreen() {
    const navigation = useNavigation()
    const [headerShown, setHeaderShown] = useState(true);

    return (
        <SafeAreaThemed>
            <Header
                headerLeft={{action: (() => navigation.goBack()), icon: Images.BackIcon, width: 30, height: 30}}
                headerTitle={'Settings'}
                haveBackground={false}
                headerShown={headerShown}
            />
            <Text style={styles.title}>Detail</Text>
            <Separator marginBottom={0} marginTop={0} widthPercent={80}/>
        </SafeAreaThemed>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});
