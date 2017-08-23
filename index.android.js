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
import Tts from 'react-native-tts';
import SpeechAndroid from 'react-native-android-voice';

const { SpeechToText } = NativeModules;
const {height, width} = Dimensions.get('window')

export default class nativeModuleTest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: ''
    }
  }

  async handleSpeech() {
    // Write method to handle speech here
    // Tts.setDefaultLanguage('in-ID');
    // Tts.voices().then(voices => console.log(voices));
    // SpeechToText.writeSpeech()
    // .then(result => {
    //   this.setState({notes: result})
    //   // Tts.speak(result);
    // })
    try{
        //More Locales will be available upon release. 
        var spokenText = await SpeechAndroid.startSpeech("Speak yo", SpeechAndroid.GERMAN);
        this.setState({notes: spokenText})
        // ToastAndroid.show(spokenText , ToastAndroid.LONG);
    
      }catch(error){
        switch(error){
            case SpeechAndroid.E_VOICE_CANCELLED:
                ToastAndroid.show("Voice Recognizer cancelled" , ToastAndroid.LONG);
                break;
            case SpeechAndroid.E_NO_MATCH:
                ToastAndroid.show("No match for what you said" , ToastAndroid.LONG);
                break;
            case SpeechAndroid.E_SERVER_ERROR:
                ToastAndroid.show("Google Server Error" , ToastAndroid.LONG);
                break;
            /*And more errors that will be documented on Docs upon release*/
        }
    }
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
