import React from 'react';
import ChatScreen from './ChatScreen';
import ImageDemo from '../imagedemo/ImageDemo';
import ShowCameraImage from '../imagedemo/ShowCameraImage';
import LoadingPage from '../imagedemo/LoadingPage';
import SelectPhoto from '../imagedemo/SelectPhoto';
import ExampleView from '../AnimationDemo/ExampleView';
import ViewDemo from '../AnimationDemo/index';
import ImageAnimation from '../AnimationDemo/ImageAnimation';
import {StyleSheet, Text, View, Button, PixelRatio} from 'react-native';
import { StackNavigator } from 'react-navigation';

class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Welcome',
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Button style={styles.avatar}
                    onPress={() => navigate('Chat', { user: 'bob' })}
                    title="导航栏页面跳转"
                />
                <Button  style={styles.avatar}
                         onPress={() => navigate('ImageDemo')}
                         title="图片显示"
                />
                <Button  style={styles.avatar}
                         onPress={() => navigate('SelectPhotoDemo')}
                         title="图片选择"
                />
                <Button  style={styles.avatar}
                         onPress={() => navigate('ShowCameraImage')}
                         title="显示图库图片"
                />
                <Button  style={styles.avatar}
                         onPress={() => navigate('LoadingPage')}
                         title="选择上传图片"
                />
                <Button  style={styles.avatar}
                         onPress={() => navigate('ExampleView')}
                         title="动画"
                />
                <Button  style={styles.avatar}
                         onPress={() => navigate('ImageAnimation')}
                         title="图片动画"
                />
                <Button  style={styles.avatar}
                onPress={() => navigate('ViewDemo')}
                title="图片动画"
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    avatar: {
        borderRadius: 50,
        marginBottom: 30
    }

});

const SimpleApp = StackNavigator({
    Home: { screen: HomeScreen },
    Chat: { screen: ChatScreen },
    ImageDemo: { screen: ImageDemo},
    SelectPhotoDemo: { screen: SelectPhoto},
    ShowCameraImage: { screen: ShowCameraImage},
    LoadingPage: { screen: LoadingPage},
    ExampleView: { screen: ExampleView},
    ImageAnimation: { screen: ImageAnimation},
    ViewDemo: { screen: ViewDemo},
});

export default class App extends React.Component {
    render() {
        return <SimpleApp />;
    }
}
