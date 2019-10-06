import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'native-base';
import {Alert} from "react-native"
import MapView from 'react-native-maps';
import * as Location from "expo-location";

var id=0;
let lo;
let lat=[];
let long=[];
var i=0;
const timer=require('react-native-timer');

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

  onRegionChange=(region)=>{
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
  }

  render(){
    const {navigation} = this.props;
    lo=JSON.stringify(navigation.getParam('photos_loc'));
    if(lo){
      lat[id]=navigation.state.params.photos_loc.latitude;
      long[id]=navigation.state.params.photos_loc.longitude;
      id++;
    }
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
