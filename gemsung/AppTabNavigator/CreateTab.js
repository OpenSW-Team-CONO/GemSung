// 핸드폰 갤러리에서 원하는 사진들을 선택하고 해당 영상으로 제작하는 소스
import React from 'react'
import { StyleSheet, Text, View,ScrollView, Image } from 'react-native'
import { Button } from 'react-native-elements'
import * as Permissions from 'expo-permissions'
import { ImageBrowser } from 'expo-multiple-media-imagepicker'
import { Icon } from 'native-base'
import Loading from '../Loading'

import firebase from 'firebase'

export default class CreateTab extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name='aperture' style={{ color: tintColor }} /> // 하단 아이콘 디자인
    )
  }

  id=0 // photos_info 배열 키 값
  state = {
      Loadcheck : false, // firebase 그리고 영상 제작시 걸리는 로딩 여부
      imageBrowserOpen: false, // 이미지 선택 브라우저 출력 여부
      photos: [], // 선택한 이미지들 저장하는 배열
      photos_info:[], // 이미지 좌표와 로컬 uri만 필터하는 배열
      firebase_uri:[], // firebase DB에 저장할 스토리지 이미지 uri 배열
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
        Loadcheck : true,
        photos,//photos에 이미지들 저장
      })
      //console.log(photos);
      this.state.photos.map((item) => this.getImageInfo(item.location,item.uri)) // 이미지 메타 데이터 중 좌표랑 로컬 uri만 필터해 넘긴다
      this.sendImage(); // firebase 스토리지에 이미지 로컬 uri 전송
    }).catch((e) => console.log(e))
  }

  getImageInfo = (photos_loc,photos_uri)=>{
    this.setState({
      //좌표 그리고 로컬 uri 정보를 photos_info에 저장
      photos_info:this.state.photos_info.concat({id:this.id++,photos_loc,photos_uri}),
    });
    //console.log(this.state.photos_info.photos_uri);
  }

  sendImage = async() =>{
    for (var i = 0; i < this.id; i++) { // 이미지 갯수만큼 스토리지에 저장
      const repos = await fetch(this.state.photos_info[i].photos_uri)
      const blob = await repos.blob()
      const uploadFilePath = `gemsung_img/${this.uuidv4()}`
      console.log(`Firebase storage img path : ${uploadFilePath}`)
      let ref = firebase.storage().ref().child(uploadFilePath)
      await ref.put(blob).then(file => {
        console.log('file uploaded!')
        ref.getDownloadURL().then(url => { // DB 업로드를 위해 다운로드 가능한 uri 추출
          console.log(`storage file url is ${url}`)
          this.setState({
            // firebase_uri에 추출한 스토리지 이미지uri 저장
            firebase_uri:this.state.firebase_uri.concat({url})
          })
          //console.log(this.state.firebase_uri)
        }).catch(err => {
          console.error('error file', err)
        })
      }).catch(err => {
        console.log('error while upload file ', err)
      });
    }
    this.uploadDB() // firebase DB에 스토리지 uri 전송
  }

  uuidv4 = ()=> { // 파일명 랜덤 생성
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  uploadDB=async()=>{
    // DB에 json 포맷으로 이미지 저장
      let data ={
        "flag" : 0,
        "src" : this.state.firebase_uri.map((item) => {
          return {
            caption: "test",
            path: item.url,
          }
        })
      }
      console.log('Firebase DB data : ', data);
      await firebase.database().ref('gemsung-key/').set(data);
      await firebase.database().ref('gemsung-key/').update({ // 이미지 저장이 완료되면 영상 재생 트리거 on
        "flag" : 1
      })
  await this.props.navigation.navigate('ViewTab'); // 모든 작업이 완료되면 ViewTab으로 넘어간다
  await this.setState({
    Loadcheck:false
  });
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
    if(this.state.Loadcheck)
    {
      return <Loading />
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
