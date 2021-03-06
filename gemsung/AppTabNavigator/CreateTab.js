/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
/* eslint-disable array-callback-return */
/* eslint-disable no-mixed-operators */
/* eslint-disable eqeqeq */
/* eslint-disable no-bitwise */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable max-len */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable no-use-before-define */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-console */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/sort-comp */
/* eslint-disable import/no-extraneous-dependencies */

// 핸드폰 갤러리에서 원하는 사진들을 선택하고 해당 영상으로 제작하는 소스
import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import * as Permissions from 'expo-permissions';
import { ImageBrowser } from 'expo-multiple-media-imagepicker';
import { Icon } from 'native-base';
import firebase from 'firebase';
import Loading from '../Loading';


export default class CreateTab extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="aperture" style={{ color: tintColor }} /> // 하단 아이콘 디자인
    ),
  }

  // id=0 // photos_info 배열 키 값

  constructor(props) {
    super(props);
    this.state = {
      Loadcheck: false, // firebase 그리고 영상 제작시 걸리는 로딩 상태 여부
      imageBrowserOpen: false, // 이미지 선택 브라우저 출력 여부
      photos: [], // 선택한 이미지들을 저장하는 배열
    };
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL); // 갤러리 이용 권한 작업
    if (status !== 'granted') {
      Alert.alert('권한 허용을 해주셔야 어플이 작동해요!');
    }

    firebase.initializeApp({ // firebase 설정
      apiKey: 'AIzaSyBHtLuP71PutAwof-Ytde_jC3ZXct5AVhg',
      authDomain: 'the-gemsung.firebaseapp.com',
      databaseURL: 'https://the-gemsung.firebaseio.com',
      projectId: 'the-gemsung',
      storageBucket: 'the-gemsung.appspot.com',
      messagingSenderId: '2966113910',
      appId: '1:2966113910:web:db7631062a840ac62b9957',
      measurementId: 'G-H753YWPF3H',
    });
  }

  uuidv4 = () => // 이미지 파일명 랜덤 생성
    'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0; const
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    })

  imageBrowserCallback = (callback) => {
    callback.then((photos) => {
      this.setState({
        photos_info: [], // 이미지 좌표와 로컬 uri만 필터 및 저장하는 배열
        firebase_uri: [], // firebase DB에 저장할 스토리지 이미지 uri 배열
        imageBrowserOpen: false,
        Loadcheck: true, // 업로드 및 제작 단계로 로딩 상태 값을 True
        photos, // photos에 이미지들 저장
      });
      // id: this.id++;
      // console.log(photos);
      // console.log(this.id);
      this.state.photos.map((item) => this.sendImage(item.uri)); // 이미지 로컬 uri 와 firebase stroage에 전송;
      this.uploadDB();
    }).catch((e) => console.log(e));
  }

  sendImage = async (photos_uri) => {
    const repos = await fetch(photos_uri);
    const blob = await repos.blob();
    const uploadFilePath = await `gemsung_img/${this.uuidv4()}`;
    const ref = await firebase.storage().ref().child(uploadFilePath);
    await ref.put(blob).then(() => {
      console.log('file uploaded to storage!');
      ref.getDownloadURL().then((url) => { // DB 업로드를 위해 다운로드 가능한 uri 추출
        console.log(`storage file url is ${url}`);
        this.setState({
          // firebase_uri에 추출한 스토리지 이미지uri 저장
          firebase_uri: this.state.firebase_uri.concat({ url }),
        });
        console.log(this.state.firebase_uri);
      }).catch((err) => {
        console.error('error file', err);
      });
    }).catch((err) => {
      console.log('error while upload file ', err);
    });
    // console.log(this.state.firebase_uri);
  }

  uploadDB=async () => {
    // DB에 json 포맷으로 이미지 저장
    const data = {
      flag: 0, // 이미지 업로드 단계에선 플래그 값은 0
      src: this.state.firebase_uri.map((item) => ({
        caption: 'test', // 샘플 캡션 옵션
        path: item.url, // 이미지 경로
      })),
    };
    console.log('Firebase DB data : ', data);
    await firebase.database().ref('gemsung-key/').set(data); // data를 DB에 연속 Input
    await firebase.database().ref('gemsung-key/').update({
      flag: 1, // DB 업로드가 완료되면 영상 제작을 위해 플래그 값을 1로 변경
    });
    // await this.props.navigation.navigate('ViewTab'); // 모든 작업이 완료되면 ViewTab으로 넘어간다
    await this.setState({
      Loadcheck: false, // 로딩 상태 값을 false로 변환
    });
  }

  render() {
    if (this.state.imageBrowserOpen) { // 추억 만들기 버튼이 눌렸을 떄
      return (
        <ImageBrowser
          max={30} // 최대 이미지 선택 수 지정
          headerCloseText="취소" // 상단 왼쪽 취소 버튼 디자인
          headerDoneText="만들기" // 상단 오른쪽 만들기 버튼 디자인
          headerButtonColor="#4C64FF" // 버튼 색상 설정
          headerSelectText="선택 되었습니다" // Word when picking.  default is 'n selected'.
        // mediaSubtype={'default'} // Only iOS, Filter by MediaSubtype. default is display all.
          badgeColor="#4C64FF" // 이미지 선택 시 구분을 위한 색상 지정
          emptyText="None" // 백그라운드 텍스트 설정
          callback={this.imageBrowserCallback} // 콜백 함수로 선택된 이미지들 넘기기
        />
      );
    }
    if (this.state.Loadcheck) { // 로딩 상태 값이 True일 떄
      return <Loading />; // 로딩 UI 출력
    }
    return (
      <View style={styles.container}>
        <Button // 화면 가운데 텍스트 버튼 디자인
          large
          type="clear"
          icon={{ name: 'ios-images', type: 'ionicon' }}
          title="새 추억 만들기"
          onPress={() => this.setState({ imageBrowserOpen: true })}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
});
