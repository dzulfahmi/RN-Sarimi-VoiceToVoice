/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Button,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  Picker,
  NativeModules
} from 'react-native';
import image1 from './img/mic3.png';

const { SpeechToText } = NativeModules;
const {height, width} = Dimensions.get('window')

export default class nativeModuleTest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: '',
      language: ''
    }
  }

  handleSpeech() {
    // Write method to handle speech here
    SpeechToText.writeSpeech()
    .then(result => {
      this.setState({notes: result})
    })
  }

  render() {
    return (
      <ScrollView style={styles.scroll}>
        <View style={{flex: 1, width, height}}>
          <View style={{flex: 1, justifyContent: 'space-around'}}>
            <View style={{flex:1, justifyContent: 'space-between', paddingBottom: 50, paddingLeft: 30, paddingRight: 30}}>
              <Text style={{padding: 10, fontSize: 42}}>
                {this.state.notes}
              </Text>
              <View style={{ alignItems:'center'}}>
                <Picker
                  style={{ color: '#757575', width: 190 }}

                  mode="dropdown"
                >
                  <Picker.Item label="Indonesian" value="Indonesian" />
                  <Picker.Item label="Chinese" value="Chinese" />
                  <Picker.Item label="English" value="English" />
                </Picker>  
              </View>
              <View style={{paddingBottom:30, alignItems:'center'}}>
                <TouchableOpacity onPress={() => this.handleSpeech()}>
                  <Image source={image1} style={{height:100, width:100 }}/>
                </TouchableOpacity>
              </View>
              <View>
                <Button style={{borderRadius: 10}} onPress={() => this.handleSpeech()} title={'Detail'}/>
              </View>
              
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    padding: 16,
  },
  listItemName: {
    fontSize: 20,
  },
  listItemPhone: {
    fontSize: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('nativeModuleTest', () => nativeModuleTest);
