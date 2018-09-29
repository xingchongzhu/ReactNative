import React from 'react';
import { StyleSheet, Text, View ,Image,ScrollView,Button,ImageBackground} from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class ImageDemo extends React.Component {
    // Nav options can be defined as a function of the screen's props:
    static navigationOptions = ({ navigation }) => ({
        title: `ImageDemo`,
    });

    _handleButtonPress = () => {
        CameraRoll.getPhotos({
            first: 20,
            assetType: 'Photos',
        })
            .then(r => {
                this.setState({ photos: r.edges });
            })
            .catch((err) => {
                //Error Loading Images
            });
    };

    render() {
        // The screen's current route is passed in to `props.navigation.state`:
        var icon = this.props.active
            ? require("../src/img/deal_sel.png")
            : require("../src/img/eye_black.png");
        return (
            <ImageBackground style={{width: '100%', height: '100%'}} source={{uri: 'https://facebook.github.io/react/logo-og.png'}} resizeMode='cover'>
            <View style={styles.containercolumn}>
                <View style={styles.container}>
                    <Image source={require("../src/img/car_nor.png")} />
                    <Image
                        source={{ uri: "asset:/deal_nor.png" }}
                        style={{ width: 40, height: 40 }}
                    />
                    <Image source={icon} />
                </View>
                <Image source={{uri: 'https://facebook.github.io/react/logo-og.png'}}
                       style={{width: 50, height: 50}} />
                <Image
                    source={{
                        uri: "https://facebook.github.io/react/logo-og.png",
                        method: "POST",
                        headers: {
                            Pragma: "no-cache"
                        },
                        body: "Your Body goes here"
                    }}
                    style={{ width: 50, height: 50 }}
                />
            </View>
            </ImageBackground>
        );
    }
}
const styles = StyleSheet.create({
    containercolumn: {
        flex: 1,
        paddingTop: 22,
        flexDirection: 'column'
    },
    containerrow: {
        flex: 1,
        paddingTop: 22,
        flexDirection: 'row'
    },
});
