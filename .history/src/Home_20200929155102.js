import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import {Button} from 'react-native-paper';
import {SpeechToText} from 'react-native-watson-speech-to-text';
class Home extends Component {
  state = {
    status: 'Speech to Text',
    output: '',
  };
  //   componentDidMount() {
  //     this.animation.play();
  //     // Or set a specific startFrame and endFrame with:
  //     this.animation.play(30, 120);
  //   }
  callback = (error, text, confidence) => {
    console.log(error, text, confidence);
    if (!error)
      this.setState({
        output: false ? '' : this.state.output + text,
      });
  };
  handleSpeech = async () => {
    if (this.state.transcribing) {
      SpeechToText.stopStreaming();
      this.setState({status: 'Speech to Text', transcribing: false});
    } else {
      this.animation.play();
      this.setState({status: 'Transcribing...', transcribing: true});
      SpeechToText.startStreaming(this.callback);
    }

    // setTimeout(() => {
    //   this.animation.pause();
    //   this.setState({status: 'proccessing...', loading: true}, () => {});
    // }, 4000);
  };
  componentDidMount = () => {
    SpeechToText.initialize(
      'RGleoWAqzzWFQUd8jQfuJJ_Kh7HDONxXdPPZyDls-w7R',
      'https://api.eu-gb.speech-to-text.watson.cloud.ibm.com/instances/e77677b6-64d9-43b8-8973-cf4a34c4468c', // endpoint
      'en-GB_BroadbandModel',
    );
  };
  render() {
    const {status, loading, output, transcribing} = this.state;
    return (
      <View style={styles.container}>
        <View style={{height: 200, width: 200, marginTop: -50}}>
          <LottieView
            style={{height: 200, width: 200}}
            ref={(animation) => {
              this.animation = animation;
            }}
            source={require('./assets/speaking.json')}
          />
        </View>

        <Text>{status}</Text>
        <Button
          // loading={loading}
          mode={'outlined'}
          style={styles.btn}
          labelStyle={styles.btnLabel}
          onPress={() => this.handleSpeech()}>
          {transcribing ? 'Tap to Stop listening' : ' Tap to Speak'}
        </Button>
        <View
          style={{
            alignItems: 'center',
            marginTop: 20,
            borderWidth: 0.2,
            borderRadius: 1,
            borderColor: 'gray',
            width: '80%',
            minHeight: 140,
            padding: 10,
          }}>
          <Text>Output:</Text>
          <Text>{output}</Text>
        </View>
      </View>
    );
  }
}
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {width: 200, marginTop: 10},
  btnLabel: {fontWeight: '700', color: '#0052cc'},
});
// const speechToText = new SpeechToTextV1({
//   authenticator: new IamAuthenticator({
//     apikey: "RGleoWAqzzWFQUd8jQfuJJ_Kh7HDONxXdPPZyDls-w7R",
//   }),
//   serviceUrl:
//     "https://api.eu-gb.speech-to-text.watson.cloud.ibm.com/instances/e77677b6-64d9-43b8-8973-cf4a34c4468c",
//   disableSslVerification: true,
// });
// var recognizeStream = speechToText.recognizeUsingWebSocket({
//   content_type: "audio/wav",
//   interim_results: true,
// });
