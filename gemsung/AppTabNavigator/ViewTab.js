import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
// import Video from 'react-native-video'
// import { Video } from "react-native-video";
import { Video } from 'expo-av';
import { Icon } from "native-base";
import { Alert } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import CreateTab from './CreateTab.js'

var id=0;
let lo;
let lat=[];
let long=[];
var i=0;
let {navigation}={};

export default class ViewTab extends Component {
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
  getData=async()=>{
    await {navigation}=this.props;
    //console.log('navigation: ',navigation);
  }

  render() {
    //const {navigation} = this.props;
    //lo=JSON.stringify(navigation.getParam('photos_info'));
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
          source={{uri: 'https://storage.googleapis.com/the-gemsung.appspot.com/video%2Fgemsung-key.mp4?GoogleAccessId=firebase-adminsdk-ezw2p%40the-gemsung.iam.gserviceaccount.com&Expires=16447017600&Signature=kgQg%2FoeGX02IUBdLp5g4cG0Z5DT9X%2F4NsR7oi0TtfgincnaN2c11g4jMn8lU7vFQXoxOTe1k6QeBjUdOrGwvUI9THxG8w9hiFK6ngDiar%2B4P0ZNWE7Pe3uysNCjA0OmpFqJFakGvUM3qyfpLL2vEG7x7wFmxVOXKuKB23GDhk4W1pePQfsoUB35yWZU87L4UwqSYiXJGGHWYGrPEjr4h%2FP0TsRzA%2FrZM711Lc98kE8UZk3ZEvL3ZEoo4URzqG72rJuzX0%2Fp3iOHaUd2gZ7omn9QqZapB076CSfsZlGZvP6ydJCUB7pwRArUcl4yOpnCJDhGYG7fMW%2FpvRNo6ZZ7aRg%3D%3D'}}
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
