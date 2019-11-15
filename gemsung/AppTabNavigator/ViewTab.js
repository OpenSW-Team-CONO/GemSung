import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
// import Video from 'react-native-video'
// import { Video } from "react-native-video";
import { Video } from 'expo-av';
import { Icon } from "native-base";
import { Alert } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import firebase from 'firebase';

var id=0;
let lo;
let lat=[];
let long=[];
var i=0;

export default class ViewTab extends Component {
  // state={
  //   video_url:null,
  // }
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="arrow-dropright-circle" style={{ color: tintColor }} />
    )
  }
  state = {
    region: {
      latitude: 35,
      longitude: 127,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    }
  }
  /*onRegionChange=(region)=>{
    for(i=0; i<id; i++){
      this.setState({
        region:{
          latitude:lat[i],
          longitude:long[i],
          latitudeDelta:0.0922,
          longitudeDelta:0.0421
        }
      });
    }
  }*/
  render() {
    // let ref = firebase.database().ref('gemsung-key/urls');
    // ref.on('value', (snapshot) => {
    //     console.log("In Value");
    //     console.log(snapshot.val());
    //     this.setState({video_url:snapshot.val()})
    // });
    // ref.on('value')
    // .then(snapshot => {
    //   console.log('value ', snapshot.val())
    // })
    // .catch(e => {
    //   console.log('e', e);
    // })
    const {navigation} = this.props;
    lo=JSON.stringify(navigation.getParam('photos_loc'));
    /*if(lo){
      lat[id]=navigation.state.params.photos_loc.latitude;
      long[id]=navigation.state.params.photos_loc.longitude;
      console.log('photos location is :',lat[id], long[id]);
      id++;
    }*/
    return (
      <ScrollView style={style.container}>
        <View style={style.videoRow}>
          <Video style={style.videoView}
          source={{uri: ''}}
          shouldPlay
          isLooping
	        resizeMode="cover"
          ></Video>
          <View></View>
        </View>
        <View style={style.mapRow}>
          <MapView
            style={style.mapView}
            initialRegion={this.state.region}
            //region={this.state.region}
            //onRegionChange={this.onRegionChange}
          />
        </View>
        <View style={style.imagesRow}>
          <Text>현재 준비중...</Text>
        </View>
      </ScrollView>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black"
  },
  videoRow: {
    height: 200,
    flexDirection: "row",
    backgroundColor: "red"
  },
  videoView: {
    flex: 1
  },
  mapRow: {
    height: 300,
    flexDirection: "row",
    backgroundColor: "green"
  },
  mapView: {
    flex: 1
  },
  imagesRow: {
    minHeight: 300,
    backgroundColor: "white"
  }
});
