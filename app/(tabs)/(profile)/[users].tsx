import {ScrollView, StyleSheet, TouchableOpacity, useColorScheme, Image} from 'react-native';
import {useNavigation} from "expo-router";
import {
    StickyHeaderScrollView,
    useStickyHeaderScrollProps
} from "react-native-sticky-parallax-header";
import SettingIcon from '../../../assets/images/settings.svg'
import Colors from "../../../constants/Colors";
import {Header} from "../../../components/Header";
import {Spacer} from "../../../components/common/Spacer";
import {TagView} from "../../../components/design system/TagView";
import {useState} from "react";
import {View, Text} from "../../../components/Themed";

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

    const [headerShown, setHeaderShown] = useState(true);

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

    const handleScroll = (e: any) => {
        const scrolling = e.contentOffset.y;

        if (scrolling > 100) {
            setHeaderShown(false);
            console.log("SCROLL > 100", scrolling)
        } else {
            setHeaderShown(true);
            console.log("SCROLL <= 100", scrolling)
        }
    }
    const isDarkTheme = useColorScheme() === 'dark';
    return (
        <View style={{height: '100%'}}>
            <StickyHeaderScrollView
                ref={scrollViewRef}
                onScroll={onScroll}
                onMomentumScrollEnd={onMomentumScrollEnd}
                onScrollEndDrag={onScrollEndDrag}

                /******** HEADER CONTENT HERE ********/
                renderHeader={() =>
                    <View style={styles.headerContainer}>
                        <Image
                            source={{uri: 'https://w0.peakpx.com/wallpaper/251/540/HD-wallpaper-colour-patterns-blur-paint.jpg'}}
                            style={styles.imageHeaderBackground}
                        />
                        <Header
                            headerRight={{action: goToSettings, icon: SettingIcon, width: 32, height: 32}}
                            haveBackground={false}
                            headerShown={headerShown}
                        />
                        <View style={styles.headerContent}>
                            <View style={{
                                flexDirection: 'row',
                                backgroundColor: Colors.transparent,
                            }}>
                                <Image
                                    source={{uri: "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"}}
                                    style={styles.imageProfile}
                                />

                                <View style={styles.statsContainer}>
                                    <View style={styles.stats}>
                                        <Text style={styles.statsTitle}>Post</Text>
                                        <Text style={styles.statsNumbers}>42</Text>
                                    </View>
                                    <View style={styles.stats}>
                                        <Text style={styles.statsTitle}>Abonnements</Text>
                                        <Text style={styles.statsNumbers}>42</Text>
                                    </View>
                                    <View style={styles.stats}>
                                        <Text style={styles.statsTitle}>Abonnés</Text>
                                        <Text style={styles.statsNumbers}>28000</Text>
                                    </View>
                                </View>

                            </View>

                            <Spacer size={8}/>

                            <Text style={{fontFamily: "RobotoCondensedBold", fontSize: 26}}>Name</Text>

                            <Spacer size={8}/>

                            <Text style={{fontFamily: "RobotoRegular", fontSize: 20}}>Lorem ipsum lore doloris</Text>

                            <View style={styles.tagsContainer}>
                                <TagView mode={"contained"} isDarkTheme={isDarkTheme} label={"Contained tag"}/>
                                <TagView mode={"outline"} isDarkTheme={isDarkTheme} label={"Outlined tag"}/>
                                <TagView mode={"outline-inverse"} isDarkTheme={isDarkTheme} label={"Inverse tag"}/>
                            </View>

                        </View>
                    </View>
                }
            >
                {/******** PAGE CONTENT HERE ********/}
                <View style={{height: '100%'}}>
                    <Spacer size={1000}/>
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
    headerContainer: {
        width: "100%",
        height: PARALLAX_HEIGHT
    },
    tagsContainer: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        width: '100%',
        backgroundColor: Colors.transparent,
        marginTop: 8
    },
    headerContent: {
        position: 'absolute',
        flexDirection: 'column',
        alignSelf: 'baseline',
        backgroundColor: Colors.transparent,
        padding: 32,
        width: '100%',
        bottom: 0
    },
    statsTitle: {
        fontSize: 16,
        fontFamily: 'RobotoMedium',
    },
    statsNumbers: {
        fontSize: 18,
        fontFamily: 'RobotoRegular',
        alignSelf: "center"
    },
    stats: {
        backgroundColor: Colors.transparent,
        flexDirection: 'column',
        marginHorizontal: 8,
    },
    statsContainer: {
        position: 'absolute',
        marginLeft: 8,
        marginRight: -16,
        alignSelf: 'center',
        right: 0,
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        flex: 1,
        flexDirection: 'row',
        backgroundColor: Colors.transparent
    },
    imageHeaderBackground: {
        position: "absolute",
        width: "100%",
        height: "100%",
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
    },
    imageProfile: {
        width: 80,
        height: 80,
        borderRadius: 16,
    }
});