import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'native-base';
import {Alert} from "react-native"
import MapView from 'react-native-maps';
import * as Location from "expo-location";
import CreateTab from './CreateTab';
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
           <Icon name='arrow-dropright-circle' style={{ color: tintColor }} />
       )
   }
   state={
     region:{
       latitude:35,
       longitude:127,
       latitudeDelta:0.0922,
       longitudeDelta:0.0421
     }
   }
   getLocation=async()=>{
     const { navigation } = this.props;
     lo=JSON.stringify(navigation.getParam('photos_loc'));
     if(lo){
       lat=navigation.state.params.photos_loc.latitude;
       long=navigation.state.params.photos_loc.longitude;
       console.log(lat, long);
       this.setState({
       region:{
         latitude:lat,
         longitude:long,
         latitudeDelta:0.0922,
         longitudeDelta:0.0421,
       }
     });
   }
 }
   onRegionChange=(region)=>{
     this.setState({region});
   }
   componentDidMount(){
     this.getLocation();
     console.log(1);
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
}

const style = StyleSheet.create({
  container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
