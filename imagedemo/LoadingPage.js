import React from 'react';
import {StyleSheet, Text, View, Button, ScrollView, PixelRatio,
    TouchableOpacity,Image,Dimensions,Platform} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actionsheet';
import Toast, {DURATION} from 'react-native-easy-toast'

//import ModalProgress from '../../components/Progress/ModalProgress'

//存放数组
var dataToPost = [];
var Config='';

export  default class LoadingPage extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const {state} = navigation;
        return {
            title: '上传信息',
            headerRight: (
                <Button
                    title="上传"
                    onPress={()=>{
                        state.params.commitPage();
                    }}
                />
            ),
        };
    };
    componentWillMount(){
        this.props.navigation.setParams({
            commitPage:this.commitPage,
        })
    }
    constructor(props){
        super(props);
        this.state={
            images: [],
        }
    }
    show() {
        this.ActionSheet.show();
    }

    _handlePress(index) {
        if(index==0){  //扫一扫
            this.openPicLib();
        }else if(index==1){
            this.pickSingleWithCamera();
        }
    }
    render(){
        return(
            <ScrollView>
                <View>
                    <View>
                        <View style={styles.viewPadding}>
                            {this.createImageItem()}
                        </View>
                    </View>
                    <View style={styles.itemLine}/>
                    <Toast  //提示
                        ref="toast"
                        style={{backgroundColor:'gray'}}
                        position='center'
                        positionValue={200}
                        opacity={0.6}
                        textStyle={{color:'white'}}
                    />
                    <ActionSheet
                        ref={(o) => this.ActionSheet = o}
                        title="选择图片"
                        options={['从相册选取', '拍照一张']}
                        destructiveButtonIndex={0}
                        destructiveButtonIndex={1}
                        onPress={this._handlePress.bind(this)}
                    />
                </View>
            </ScrollView>
        )
    }

    createImageItem(){
        let  imageSource = require('../src/img/upload.png');
        let mainView;
        if(this.state.images!=null&&this.state.images.length>=9){
            mainView=null;
        }else{
            mainView=  <TouchableOpacity
                onPress={()=>{
                    this.show();
                }}>
                <Image source={imageSource} />
            </TouchableOpacity>
        }

        return(
            <View>
                <View>
                    {this.state.images ? this.state.images.map(i => <View key={i.uri}>{this.renderImage(i)}</View>) : null}
                </View>
                <View>
                    {mainView}
                </View>
            </View>
        )
    }

    //从相机获取图片
    pickSingleWithCamera=()=> {
        ImagePicker.openCamera({
            cropping: false,
            width: Math.round((Dimensions.get('window').width-20)),
            height: 300,
        }).then(image => {
            dataToPost.push({
                uri: image.path,
                width: image.width,
                height: image.height,
            });
            this.setState({
                images: dataToPost
            });
        }).catch(
            e => alert(e)
        );
    }

//从图库或者相机进行获取,因为安卓平台不能进行多图选择，所以，需要区分不同平台
    openPicLib=()=> {
        if(Platform.OS === 'ios'){
            ImagePicker.openPicker({
                multiple: true,
                waitAnimationEnd: false,
            }).then(images => {
                for (var i=0;i<images.length;i++) {
                    dataToPost.push({
                        uri: images[i].path,
                        width: images[i].width,
                        height: images[i].height,
                        mime: images[i].mime,
                    });
                }
                this.setState({
                    images: dataToPost
                });
            }).catch(e =>
                alert(e)
            );

        }else{
            ImagePicker.openPicker({
                width: 300,
                height: 300,
                cropping: false,
                cropperCircleOverlay: false,
                compressImageMaxWidth: 480,
                compressImageMaxHeight: 640,
                compressImageQuality: 0.5,
                mediaType: 'photo',
                compressVideoPreset: 'MediumQuality'
            }).then(image => {
                dataToPost.push({
                    uri: image.path,
                    width: image.width,
                    height: image.height,
                    mime: image.mime
                });
                this.setState({
                    images: dataToPost
                });
            }).catch(e => {
                Alert.alert(e.message
                    ? e.message
                    : e);
            });
        }
    }

    renderImage(image) {
        return <Image style={{width: 100, height: 100, resizeMode: 'contain'}} source={image} />
    }


    //数据提交
    commitPage=()=>{
        let formData = new FormData();
        if(this.state.images == null){
            alert("没有选择图片");
        } else {
            for(var i = 0;i<this.state.images.length;i++){
                var uri = this.state.images[i].uri;
                var index = uri.lastIndexOf("\/");
                var name  = uri.substring(index + 1, uri.length);
                let file = {uri: uri, type: 'multipart/form-data', name: name } ;
                formData.append('file', file);
            }
        }

        //上传图片时，可以在此添加相关其他参数
        formData.append('userId', '1');
        formData.append('fileType', 'image');
        formData.append('name','time');
        formData.append('phone', '11222222');
        this.refs.toast.show("数据上传中，请稍后....",1000);
        //ModalProgress.show("数据上传中，请稍后....");
        const REQUEST_URL = Config.domain+'/upload/uploadQualifications';
        fetch(REQUEST_URL,{
            method:'POST',
            headers:{
                'Content-Type':'multipart/form-data',
                'Accept': 'application/json'
            },
            body:formData,
        }).then((response) => response.json()).then((responseJson) => {
            alert(JSON.stringify(responseJson));
            if (responseJson.status == 0) {
                this.refs.toast.show("finish",1000);
                //ModalProgress.hide();
                {this.goBack()}
            }else{
                //ModalProgress.hide();
                this.refs.toast.show("finish",1000);
                alert(responseJson.msg);
            }
        }).catch((error) => {
            alert(error);
            //ModalProgress.hide();
            this.refs.toast.show("finish",1000);
        });

    }
}
const styles = StyleSheet.create({
    viewPadding: {
        padding: 5
    },
    itemLine: {
        padding: 5,
        borderColor: '#9B9B9B',
    },
    avatar: {
        borderRadius: 50,
        width: 100,
        height: 100
    }
});