import {ScrollView, StyleSheet, TouchableOpacity, useColorScheme, Image} from 'react-native';
import {useThemeColor, View, Text} from '../../../components/Themed';
import {useNavigation} from "expo-router";
import {SafeAreaThemed} from "../../../components/common/SafeAreaThemed";
import {
    AvatarHeaderScrollView,
    DetailsHeaderScrollView,
    StickyHeaderScrollView,
    useStickyHeaderScrollProps
} from "react-native-sticky-parallax-header";
import SettingIcon from '../../../assets/images/settings.svg'
import IconBack from '../../../assets/images/arrow_back_ios_new.svg'
import {IconThemed} from "../../../components/IconThemed";
import Colors from "../../../constants/Colors";
import {Header, HeaderButton} from "../../../components/Header";
import Animated, {Extrapolate, interpolate, useAnimatedStyle} from "react-native-reanimated";
import {Spacer} from "../../../components/common/Spacer";
import {Separator} from "../../../components/common/Separator";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {FC} from "react";
import {TagView} from "../../../components/design system/TagView";

const PARALLAX_HEIGHT = 330;
const HEADER_BAR_HEIGHT = 92;
const SNAP_START_THRESHOLD = 100;
const SNAP_STOP_THRESHOLD = 330;

export default function ProfileScreen() {
    const navigation = useNavigation()
    const {
        onMomentumScrollEnd,
        onScroll,
        onScrollEndDrag,
        scrollHeight,
        scrollValue,
        scrollViewRef,
        // useStickyHeaderScrollProps is generic and need to know
        // which component (ScrollView, FlatList<ItemT> or SectionList<ItemT, SectionT>)
        // will be enhanced with sticky scroll props
    } = useStickyHeaderScrollProps<ScrollView>({
        parallaxHeight: PARALLAX_HEIGHT,
        snapStartThreshold: SNAP_START_THRESHOLD,
        snapStopThreshold: SNAP_STOP_THRESHOLD,
        snapToEdge: true,
    });

    const goBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack()
            console.log(navigation.getState())
        }
    }
    const goToSettings = () => {
        console.log("Go to setting")
        // @ts-ignore
        navigation.navigate('settings')
    }

    const isDarkTheme = useColorScheme() === 'dark';
    const insets = useSafeAreaInsets()
    return (
        <View style={{height: '100%'}}>
            <View style={[styles.headerBarContainer, {width: '100%'}]}>
                <Header
                    headerRight={HeaderButton({action: goToSettings, icon: SettingIcon, width: 26, height: 26})}
                    haveBackground={false}
                    headerShown={true}
                />
            </View>
            <StickyHeaderScrollView
                ref={scrollViewRef}
                onScroll={onScroll}
                onMomentumScrollEnd={onMomentumScrollEnd}
                onScrollEndDrag={onScrollEndDrag}
                renderHeader={() =>
                    <View style={{width: "100%", height: PARALLAX_HEIGHT}}>
                        <Image
                            source={{uri: 'https://w0.peakpx.com/wallpaper/251/540/HD-wallpaper-colour-patterns-blur-paint.jpg'}}
                            style={{
                                position: "absolute",
                                width: "100%",
                                height: "100%",
                                borderBottomLeftRadius: 16,
                                borderBottomRightRadius: 16,
                            }}
                        />
                        <View style={{
                            position: 'absolute',
                            flexDirection: 'column',
                            alignSelf: 'baseline',
                            backgroundColor: Colors.transparent,
                            padding: 32,
                            width: '100%',
                            bottom: 0
                        }}>
                            <Image
                                source={{uri: "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"}}
                                style={{
                                    width: 80,
                                    height: 80,
                                    borderRadius: 16,
                                }}
                            />
                            <Spacer size={8}/>
                            <Text style={{fontFamily: "RobotoCondensedBold", fontSize: 26, color: Colors.dark.textPrimary}}>Name</Text>
                            <Spacer size={8}/>
                            <Text style={{fontFamily: "RobotoThin", fontSize: 20, color: Colors.dark.textPrimary}}>Lorem ipsum lore doloris</Text>
                            <View style={{flexWrap: 'wrap', flexDirection: 'row', width: '100%', backgroundColor: Colors.transparent, marginTop: 8}}>

                                <TagView mode={"contained"} isDarkTheme={isDarkTheme} label={"Contained tag"}/>
                                <TagView mode={"outline"} isDarkTheme={isDarkTheme} label={"Outlined tag"}/>
                                <TagView mode={"outline-inverse"} isDarkTheme={isDarkTheme} label={"Inverse tag"}/>
                                <TagView mode={"inverse"} isDarkTheme={isDarkTheme} label={"Inverse tag"}/>
                            </View>
                        </View>
                    </View>
                }
            >
                <View style={{height: '100%'}}>
                    <Spacer size={10000}/>
                </View>
            </StickyHeaderScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    headerBarContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        backgroundColor: Colors.transparent,
        height: HEADER_BAR_HEIGHT,
        flex: 1,
        overflow: 'hidden',
        zIndex: 3,
    },
});