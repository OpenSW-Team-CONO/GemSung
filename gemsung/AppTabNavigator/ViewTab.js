import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'native-base';

export default class ViewTab extends Component {
  static navigationOptions = {
       tabBarIcon: ({ tintColor }) => (
           <Icon name='arrow-dropright-circle' style={{ color: tintColor }} />
       )
   }
    render() {
      const { navigation } = this.props;
        return (
          console.log(JSON.stringify(navigation.getParam('photos_loc'))),
            <View style={style.container}>
                <Text>{JSON.stringify(navigation.getParam('photos_loc'))}</Text>
            </View>
        );
    }
<<<<<<< Updated upstream
=======
  }

  render() {
    const {navigation} = this.props;
    lo=JSON.stringify(navigation.getParam('photos_loc'));
    if(lo){
      lat[id]=navigation.state.params.photos_loc.latitude;
      long[id]=navigation.state.params.photos_loc.longitude;
      //console.log('photos location is :',lat[id], long[id]);
      id++;
    }
    return (
      <ScrollView style={style.container}>
        <View style={style.videoRow}>
          <Video style={style.videoView}
          source={{uri: 'https://storage.googleapis.com/the-gemsung.appspot.com/video%2Fgemsung-key.mp4?GoogleAcc%22https://storage.googleapis.com/the-gemsung.appspot.com/video%2Fgemsung-key.mp4?GoogleAccessId=firebase-adminsdk-ezw2p%40the-gemsung.iam.gserviceaccount.com&Expires=16447017600&Signature=kgQg%2FoeGX02IUBdLp5g4cG0Z5DT9X%2F4NsR7oi0TtfgincnaN2c11g4jMn8lU7vFQXoxOTe1k6QeBjUdOrGwvUI9THxG8w9hiFK6ngDiar%2B4P0ZNWE7Pe3uysNCjA0OmpFqJFakGvUM3qyfpLL2vEG7x7wFmxVOXKuKB23GDhk4W1pePQfsoUB35yWZU87L4UwqSYiXJGGHWYGrPEjr4h%2FP0TsRzA%2FrZM711Lc98kE8UZk3ZEvL3ZEoo4URzqG72rJuzX0%2Fp3iOHaUd2gZ7omn9QqZapB076CSfsZlGZvP6ydJCUB7pwRArUcl4yOpnCJDhGYG7fMW%2FpvRNo6ZZ7aRg%3D%3D%22essId=firebase-adminsdk-ezw2p%40the-gemsung.iam.gserviceaccount.com&Expires=16447017600&Signature=kgQg%2FoeGX02IUBdLp5g4cG0Z5DT9X%2F4NsR7oi0TtfgincnaN2c11g4jMn8lU7vFQXoxOTe1k6QeBjUdOrGwvUI9THxG8w9hiFK6ngDiar%2B4P0ZNWE7Pe3uysNCjA0OmpFqJFakGvUM3qyfpLL2vEG7x7wFmxVOXKuKB23GDhk4W1pePQfsoUB35yWZU87L4UwqSYiXJGGHWYGrPEjr4h%2FP0TsRzA%2FrZM711Lc98kE8UZk3ZEvL3ZEoo4URzqG72rJuzX0%2Fp3iOHaUd2gZ7omn9QqZapB076CSfsZlGZvP6ydJCUB7pwRArUcl4yOpnCJDhGYG7fMW%2FpvRNo6ZZ7aRg%3D%3D'}}
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
            region={this.state.region}
            onRegionChange={this.onRegionChange}
          />
        </View>
        <View style={style.imagesRow}>
        <Text> 현재 준비 중... </Text>
        </View>
      </ScrollView>
    );
  }
>>>>>>> Stashed changes
}

const style = StyleSheet.create({
  container: {
<<<<<<< Updated upstream
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
=======
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
>>>>>>> Stashed changes
});
