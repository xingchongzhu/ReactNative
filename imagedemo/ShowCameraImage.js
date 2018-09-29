
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    CameraRoll,
} from 'react-native';

//照片获取参数
var fetchParams = {
    first: 6,
    groupTypes: 'All',
    assetType: 'Photos'
}

//默认应用的容器组件
export default class ShowCameraImage extends Component {
    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            photos: null
        };
    }

    //页面的组件渲染完毕（render）之后执行
    componentDidMount() {
        var _that = this;
        //获取照片
        var promise = CameraRoll.getPhotos(fetchParams)
        promise.then(function(data){
            var edges = data.edges;
            var photos = [];
            for (var i in edges) {
                photos.push(edges[i].node.image.uri);
            }
            _that.setState({
                photos:photos
            });
        },function(err){
            alert('获取照片失败！');
        });
    }

    //渲染
    render() {

        var photos = this.state.photos || [];
        var photosView = [];
        for(var i = 0; i < 6 ; i += 2){
            photosView.push(
                <View key={i} style={styles.row}>
                    <View style={styles.flex}>
                        <Image resizeMode="stretch" style={styles.image} source={{uri:photos[i]}}/>
                    </View>
                    <View style={styles.flex}>
                        <Image resizeMode="stretch" style={styles.image} source={{uri:photos[i+1]}}/>
                    </View>
                </View>
            )
        }

        return (
            <ScrollView>
                <View style={styles.container}>
                    {photosView}
                </View>
            </ScrollView>
        );
    }

}

//样式定义
const styles = StyleSheet.create({
    flex:{
        flex:1
    },
    container: {
        flex: 1,
        paddingTop: 30,
        alignItems:'center'
    },
    row:{
        flexDirection: 'row'
    },
    image:{
        height: 120,
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5,
        borderWidth: 1,
        borderColor: '#ddd'
    },
});
