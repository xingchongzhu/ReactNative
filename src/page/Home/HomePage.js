import React, {Component} from 'react';
import {
    Image,
    StyleSheet,
    BackHandler,
    ToastAndroid,
    WebView,
    View,
    ActivityIndicator,
    StatusBar
} from 'react-native';

const currentHeight = StatusBar.currentHeight;

export default class HomePage extends Component {
    static navigationOptions = {
        tabBarLabel: '首页',
        header: null,
        tabBarIcon: ({focused}) => {
            if (focused) {
                return (
                    <Image style={styles.tabBarIcon} source={require('../../img/home_sel.png')}/>
                );
            }
            return (
                <Image style={styles.tabBarIcon} source={require('../../img/home_nor.png')}/>
            );
        },
    };

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }

    onBackAndroid = () => {
        if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
            //最近2秒内按过back键，可以退出应用。
            BackHandler.exitApp();
            return false;
        }
        this.lastBackPressed = Date.now();
        ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
        // return true;
        return true;
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar
                    translucent={true}
                    animated={true}
                    backgroundColor={"#73808080"}
                    barStyle={"light-content"}
                />
                <WebView
                    // source={{uri: 'http://www.qiandu.com/#/mine/center'}}
                    source={{uri: 'https://www.imooc.com/#'}}
                    startInLoadingState
                    renderLoading={() => {
                        return this.loading()
                    }}
                />
            </View>
        );
    }

    loading = () => {
        return <ActivityIndicator style={styles.flash} size='small' color='#aa00aa'/>
    }

}
const styles = StyleSheet.create({
    container: {
        marginTop: currentHeight
    },
    flash: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    tabBarIcon: {
        width: 19,
        height: 19,
    }
});
