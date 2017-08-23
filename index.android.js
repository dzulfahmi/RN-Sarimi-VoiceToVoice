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
  NativeModules
} from 'react-native';

const { SpeechToText } = NativeModules;
const {height, width} = Dimensions.get('window')

export default class nativeModuleTest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: ''
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
            <View style={{flex:1, justifyContent: 'flex-end', paddingBottom: 50, paddingLeft: 30, paddingRight: 30}}>
              <Text style={{padding: 10, fontSize: 42}}>
                {this.state.notes}
              </Text>
              <View>
                <Button style={{borderRadius: 10}} onPress={() => this.handleSpeech()} title={'Tap to speak'}/>
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
