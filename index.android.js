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
  NativeModules,
  Modal,
  TouchableHighlight
} from 'react-native';
import Tts from 'react-native-tts';
import SpeechAndroid from 'react-native-android-voice';

const image1 = require('./img/mic3.png');

const { SpeechToText } = NativeModules;
const {height, width} = Dimensions.get('window')

export default class nativeModuleTest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: '',
      translated: '',
      languageFrom: 'id',
      languageTo: 'en',
      modalVisible: false
    }
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  async handleSpeech() {
    Tts.voices().then(voices => console.log(voices));
    try{
        //More Locales will be available upon release.
        if (this.state.languageFrom === 'fr') {
          var spokenText = await SpeechAndroid.startSpeech("Speak yo", SpeechAndroid.FRANCE);
          this.setState({notes: spokenText})
        } else if (this.state.languageFrom === 'zh-cn') {
          var spokenText = await SpeechAndroid.startSpeech("Speak yo", SpeechAndroid.CHINESE);
          this.setState({notes: spokenText})
        } else if (this.state.languageFrom === 'en') {
          var spokenText = await SpeechAndroid.startSpeech("Speak yo", SpeechAndroid.ENGLISH);
          this.setState({notes: spokenText})
        } else if (this.state.languageFrom === 'ja') {
          var spokenText = await SpeechAndroid.startSpeech("Speak yo", SpeechAndroid.JAPANESE);
          this.setState({notes: spokenText})
        } else if (this.state.languageFrom === 'de') {
          var spokenText = await SpeechAndroid.startSpeech("Speak yo", SpeechAndroid.GERMAN);
          this.setState({notes: spokenText})
        } else if (this.state.languageFrom === 'du') {
          var spokenText = await SpeechAndroid.startSpeech("Speak yo", SpeechAndroid.DUTCH);
          this.setState({notes: spokenText})
        } else {
          var spokenText = await SpeechAndroid.startSpeech("Speak yo", SpeechAndroid.INDONESIAN);
          this.setState({notes: spokenText})
        }

        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${this.state.languageFrom}&tl=${this.state.languageTo}&dt=t&q=${this.state.notes}`;

        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            const resultText = data.length > 0 ? data[0][0][0] : ''; 

            this.setState({translated: resultText})

            if (this.state.languageTo === 'fr') {
              Tts.setDefaultLanguage('fr-FR');
              Tts.speak(resultText);
            } else if (this.state.languageTo === 'zh-cn') {
              Tts.setDefaultLanguage('zh-CN');
              Tts.speak(resultText);
            } else if (this.state.languageTo === 'id') {
              Tts.setDefaultLanguage('in-ID');
              Tts.speak(resultText);
            } else if (this.state.languageTo === 'ja') {
              Tts.setDefaultLanguage('ja-JP');
              Tts.speak(resultText);
            } else if (this.state.languageTo === 'de') {
              Tts.setDefaultLanguage('de-DE');
              Tts.speak(resultText);
            } else if (this.state.languageTo === 'du') {
              Tts.setDefaultLanguage('du-DU');
              Tts.speak(resultText);
            } else {
              Tts.setDefaultLanguage('en-IE');
              Tts.speak(resultText);
            }
          })
          .catch((error) => {
            console.error(error);
          });

      } catch(error){
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
    Tts.voices().then(voices => console.log(voices));
    return (
      <View style={{flex: 1}}>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
         <View style={{margin: 22}}>
          <View>
            <Text style={{margin: 10, fontSize:14}}>From</Text>
            <Text style={{margin: 10, fontSize:18}}>{this.state.notes}</Text>
            <Text style={{margin: 10, fontSize:14}}>To</Text>
            <Text style={{margin: 10, fontSize:18}}>{this.state.translated}</Text>
            <View>
              <Button style={{borderRadius: 10, margin: 10}} onPress={() => this.setModalVisible(!this.state.modalVisible)} title={'Hide Modal'}/>
            </View>
          </View>
         </View>
        </Modal>
        <View style={{flex:1, justifyContent: 'space-between', paddingBottom: 50, paddingTop: 30, paddingLeft: 30, paddingRight: 30}}>
          <View>
            <Text>From</Text>
            <View style={{ alignItems:'center'}}>
              <Picker
                selectedValue={this.state.languageFrom}
                style={{ color: '#757575', width: 190 }}
                onValueChange={(itemValue, itemIndex) => this.setState({languageFrom: itemValue})}
                mode="dropdown"
              >
                <Picker.Item label="Indonesian" value="id" />
                <Picker.Item label="Chinese" value="zh-cn" />
                <Picker.Item label="English" value="en" />
                <Picker.Item label="France" value="fr" />
                <Picker.Item label="Japanese" value="ja" />
                <Picker.Item label="Germany" value="de" />
                <Picker.Item label="Dutch" value="du" />
              </Picker>  
            </View>
          </View>
          
          <View>
            <Text>To</Text>
            <View style={{ alignItems:'center'}}>
              <Picker
                selectedValue={this.state.languageTo}
                style={{ color: '#757575', width: 190 }}
                onValueChange={(itemValue, itemIndex) => this.setState({languageTo: itemValue})}
                mode="dropdown"
              >
                <Picker.Item label="Indonesian" value="id" />
                <Picker.Item label="Chinese" value="zh-cn" />
                <Picker.Item label="English" value="en" />
                <Picker.Item label="France" value="fr" />
                <Picker.Item label="Japanese" value="ja" />
                <Picker.Item label="Germany" value="de" />
                <Picker.Item label="Dutch" value="du" />
              </Picker>  
            </View>
          </View>
          
          <View style={{paddingBottom:30, alignItems:'center'}}>
            <TouchableOpacity onPress={() => this.handleSpeech()}>
              <Image source={image1} style={{height:120, width:120 }}/>
            </TouchableOpacity>
          </View>
          <View>
<<<<<<< HEAD
            <Button style={{borderRadius: 10}} onPress={() => this.setModalVisible(true)} title={'Detail'}/>
=======
            <Button style={{borderRadius: 10}} onPress={() => console.log('Button Pressed')} title={'Detail'}/>
>>>>>>> 61bea33115abab87d51eab508a10499d7ed2d889
          </View>
        </View>
      </View>
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
