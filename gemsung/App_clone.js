import React from 'react';
import {Alert} from "react-native"
import MapView from 'react-native-maps';
import * as Location from "expo-location";

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
}
