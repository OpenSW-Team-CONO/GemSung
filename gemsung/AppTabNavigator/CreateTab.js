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
        <Icon name='aperture' style={{ color: tintColor }} />
    )
  }

  constructor (props) {
    super(props)
    this.state = {
      imageBrowserOpen: false,
      photos: [],
      photos_loc:[],
      phtos_uri:[],
      fb_uri:[]
    }
  }

  async componentDidMount () {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('권한 허용을 해주셔야 어플이 작동해요!');
      }
    firebase.initializeApp({
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
      //console.log(photos)
      this.state.photos.map((item) => this.renderImage(item.location,item.uri))
    }).catch((e) => console.log(e))
  }

  renderImage = async(photos_loc,photos_uri)=>{
    this.setState({
      photos_loc,
      photos_uri
    });
    console.log(photos_uri)

    const repos = await fetch(photos_uri)
    const blob = await repos.blob()
    const uploadFilePath = `gemsung_img/${this.uuidv4()}`
    console.log(`path : ${uploadFilePath}`)
    let ref = firebase.storage().ref().child(uploadFilePath)

    ref.put(blob)
      .then(file => {
        console.log('file uploaded')
        ref.getDownloadURL()
        .then(url => {
          console.log(`file url ${url}`)
          this.get_url(url)
        })
        .catch(err => {
          console.error('error file', err)
        })
        // file.getDownloadURL()
        //   .then(url => {
        //     console.log(`file url ${url}`)
        //   })
        //   .catch(err => {
        //     console.error('error while get file url', err);
        //   })
      })
      .catch(err => {
        console.log('error while upload file ', err)
      });
   //  console.log('file test', file);
   //  file.getDownloadURL().then((url) => {
   //     console.log(url);
   // });
    const data ={
     "flag" : 0,
     "src" : this.state.fb_uri.filter((item, index) => {
       return {
         path: item,
         caption: 'test'
       }
     })
   }
   console.log('data', data);
   console.log('fb_uri test', this.state.fb_uri)
   firebase.database().ref('/').push(data)
    this.props.navigation.navigate('ViewTab',{photos_loc:this.state.photos_loc})
  }

  uuidv4 = ()=> {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
get_url=async(fb_uri)=>{
  this.setState({
    fb_uri
  })
  console.log("fb_uri is : ",this.state.fb_uri)
}

  render () {
    if (this.state.imageBrowserOpen) {
      return (
        <ImageBrowser
        max={30} // Maximum number of pickable image. default is None
        headerCloseText={'취소'} // Close button text on header. default is 'Close'.
        headerDoneText={'만들기'} // Done button text on header. default is 'Done'.
        //headerButtonColor={'#E31676'} // Button color on header.
        headerSelectText={'선택 되었습니다'} // Word when picking.  default is 'n selected'.
        //mediaSubtype={'default'} // Only iOS, Filter by MediaSubtype. default is display all.
        //badgeColor={'#E31676'} // Badge color when picking.
        emptyText={'None'} // Empty Text
        callback={this.imageBrowserCallback} // Callback functinon on press Done or Cancel Button. Argument is Asset Infomartion of the picked images wrapping by the Promise.
          />
      )
    }

    return (
      <View style={styles.container}>
        <Button
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
