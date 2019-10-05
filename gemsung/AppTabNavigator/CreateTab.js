import React from 'react'
import { StyleSheet, Text, View, Button, ScrollView, Image } from 'react-native'
import * as Permissions from 'expo-permissions'
import { ImageBrowser } from 'expo-multiple-media-imagepicker'
import { Icon } from 'native-base'

export default class CreateTab extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
        <Icon name='ios-home' style={{ color: tintColor }} />
    )
  }

  constructor (props) {
    super(props)
    this.state = {
      imageBrowserOpen: false,
      photos: [],
      photos_loc:[]
    }
  }

  async componentDidMount () {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('권한 허용을 해주셔야 어플이 작동해요!');
      }
  }

  imageBrowserCallback = (callback) => {
    callback.then((photos) => {
      this.setState({
        imageBrowserOpen: false,
        photos,
      })
      this.state.photos.map((item) => this.renderImage(item.location))
    }).catch((e) => console.log(e))
  }

  renderImage = async(photos_loc)=>{
    this.setState({
      photos_loc
    });
    //console.log(this.state.photos_loc)
    this.props.navigation.navigate('ViewTab',{photos_loc:this.state.photos_loc})
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
