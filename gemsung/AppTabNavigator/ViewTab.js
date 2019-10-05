import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
// import Video from 'react-native-video'
// import { Video } from "react-native-video";
import { Video } from 'expo-av';
import { Icon } from "native-base";
import { Alert } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import CreateTab from "./CreateTab";
/*
export default class App extends React.Component {
  state={
    region:{
      latitude:35,
      longitude:127,
      latitudeDelta:0.0922,
      longitudeDelta:0.0421
    }
  }
  getLocation=async()=>{
    try{
      await Location.requestPermissionsAsync();
      const {
        coords
      } = await Location.getCurrentPositionAsync();
      this.setState({
        region:{
          latitude:coords.latitude,
          longitude:coords.longitude,
          latitudeDelta:0.0922,
          longitudeDelta:0.0421
        }
      });
    } catch(error){
      Alert.alert("Can't find you.","So sad");
    }
  }
  componentDidMount(){
    this.getLocation();
  }
  onRegionChange=(region)=>{
    this.setState({region});
  }
  render() {
      return (
      <MapView
       style={{flex: 1}}
       initialRegion={this.state.region}
       region={this.state.region}
       onRegionChange={this.onRegionChange}
      />
    );
  }
}*/

let lo;
var lat, long;

export default class ViewTab extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="arrow-dropright-circle" style={{ color: tintColor }} />
    )
  };
  state = {
    region: {
      latitude: 35,
      longitude: 127,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    }
  };
  getLocation = async () => {
    const { navigation } = this.props;
    lo = JSON.stringify(navigation.getParam("photos_loc"));
    if (lo) {
      lat = navigation.state.params.photos_loc.latitude;
      long = navigation.state.params.photos_loc.longitude;
      console.log(lat, long);
      this.setState({
        region: {
          latitude: lat,
          longitude: long,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }
      });
    }
  };
  onRegionChange = region => {
    this.setState({ region });
  };
  componentDidMount() {
    this.getLocation();
    console.log(1);
  }
  render() {
    return (
      <ScrollView style={style.container}>
        <View style={style.videoRow}>
          <Video style={style.videoView}
          source={{uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'}}
          shouldPlay
	        resizeMode="cover"
          ></Video>
          <View></View>
        </View>
        <View style={style.mapRow}>
          <MapView
            style={style.mapView}
            initialRegion={this.state.region}
            region={this.state.region}
            onRegionChange={this.onRegionChange} 
          ></MapView>
        </View>
        <View style={style.imagesRow}></View>
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
    backgroundColor: "blue"
  }
});
