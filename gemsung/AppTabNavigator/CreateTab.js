// 핸드폰 갤러리에서 원하는 사진들을 선택하고 해당 영상으로 제작하는 소스
import React from 'react'
import { StyleSheet, Text, View,ScrollView, Image } from 'react-native'
import { Button } from 'react-native-elements'
import * as Permissions from 'expo-permissions'
import { ImageBrowser } from 'expo-multiple-media-imagepicker'
import { Icon } from 'native-base'
import firebase from 'firebase'

export default class CreateTab extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name='aperture' style={{ color: tintColor }} /> // 하단 아이콘 디자인
    )
  }

  id=0 // photos_info 배열 키 값
  state = {
      imageBrowserOpen: false, // 이미지 선택 브라우저 출력 여부
      photos: [], // 선택된 이미지들만 저장하는 배열
      photos_info:[], // 이미지 좌표와 로컬 uri만 필터하는 배열
      firebase_uri:[],
    }

  async componentDidMount () {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL); // 갤러리 이용 권한 작업
    if (status !== 'granted') {
      alert('권한 허용을 해주셔야 어플이 작동해요!');
    }

    firebase.initializeApp({ // 영상 제작에 쓰이는 firebase 설정
      apiKey: "AIzaSyBHtLuP71PutAwof-Ytde_jC3ZXct5AVhg",
      authDomain: "the-gemsung.firebaseapp.com",
      databaseURL: "https://the-gemsung.firebaseio.com",
      projectId: "the-gemsung",
      storageBucket: "the-gemsung.appspot.com",
      messagingSenderId: "2966113910",
      appId: "1:2966113910:web:db7631062a840ac62b9957",
      measurementId: "G-H753YWPF3H"
    });
  }

  imageBrowserCallback = (callback) => {
    callback.then((photos) => {
      this.setState({
        imageBrowserOpen: false,
        photos,
      })
      //console.log(photos);
      this.state.photos.map((item) => this.getImageInfo(item.location,item.uri)) // 이미지 메타 데이터 중 좌표랑 로컬 uri만 필터하기 위해 넘긴다
      this.sendImage(); // firebase 스토리지에 이미지 로컬 uri만 넘긴다
    }).catch((e) => console.log(e))
  }

  getImageInfo = (photos_loc,photos_uri)=>{
    this.setState({
      photos_info:this.state.photos_info.concat({id:this.id++,photos_loc,photos_uri}),
    });
    //console.log(this.state.photos_info.photos_uri);
  }

  sendImage = async() =>{
    for (var i = 0; i < this.id; i++) {
      const repos = await fetch(this.state.photos_info[i].photos_uri)
      const blob = await repos.blob()
      const uploadFilePath = `gemsung_img/${this.uuidv4()}`
      console.log(`Firebase img path : ${uploadFilePath}`)
      let ref = firebase.storage().ref().child(uploadFilePath)
      ref.put(blob)
    }
    /*ref.put(blob).then(file => {
      console.log('file uploaded')
      ref.getDownloadURL().then(url => {
        console.log(`file url ${url}`)
        this.get_url(url)
      }).catch(err => {
        console.error('error file', err)
      })
    })
    .catch(err => {
      console.log('error while upload file ', err)
    });
    console.log('CreateTab photos_loc:', this.state.photos_loc);
    this.props.navigation.navigate('ViewTab',{photos_loc:this.state.photos_loc});*/
  }

  uuidv4 = ()=> {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  get_url=async(firebase_uri)=>{
    this.setState({
      firebase_uri
    })
    console.log("firbase_img_uri is : ",this.state.firebase_uri)
    this.uploadDB()
  }

  uploadDB=()=>{
    const data ={
      "flag" : 0,
      "src" : this.state.firebase_uri.map((item, index) => {
        return {
          path: item,
          caption: 'test'
        }
      })
    }
    console.log('data', data);
    console.log('firebase_uri test', this.state.firebase_uri);
    firebase.database().ref('/').push(data)
  }

  render () {
    if (this.state.imageBrowserOpen) {
      return (
        <ImageBrowser
        max={30} // 최대 이미지 선택 수 지정
        headerCloseText={'취소'} // 상단 왼쪽 취소 버튼 디자인
        headerDoneText={'만들기'} // 상단 오른쪽 만들기 버튼 디자인
        headerButtonColor={'#4C64FF'} // 버튼 색상 설정
        headerSelectText={'선택 되었습니다'} // Word when picking.  default is 'n selected'.
        //mediaSubtype={'default'} // Only iOS, Filter by MediaSubtype. default is display all.
        badgeColor={'#4C64FF'} // 이미지 선택 시 구분을 위한 색상 지정
        emptyText={'None'} // 백그라운드 텍스트 설정
        callback={this.imageBrowserCallback} // 콜백 함수로 선택된 이미지들 넘기기
        />
      )
    }
    return (
      <View style={styles.container}>
      <Button //화면 가운데 텍스트 버튼 디자인
      large
      type='clear'
      icon={{name:'ios-images',type:'ionicon'}}
      title='새 추억 만들기'
      onPress={() => this.setState({ imageBrowserOpen: true })}
      />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30
  }
})
