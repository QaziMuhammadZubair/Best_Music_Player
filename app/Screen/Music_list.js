import React, { Component } from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import { audioContext } from '../Context/Audioprovider'
import { RecyclerListView,LayoutProvider} from 'recyclerlistview'
import { AudioListItem } from '../components/AudioListItem';
import Screen from '../components/Screen';
import { OptionModal } from '../components/OptionModal';
import { Audio} from 'expo-av'
import {Play, pause, resume,  playNext} from '../misc/audioController';
export class Music_list extends Component {
  static contextType = audioContext;
  
  constructor(props){
    super(props);
    this.state={
      OptionModalVisible: false,
    }
    this.currentItem={}
  }

  layoutProvider = new LayoutProvider ((i)=> 'audio',(type,dim)=>{
    switch(type){
      case 'audio':
        dim.width = Dimensions.get('window').width;
        dim.height= 70;  
        break;
      default:
        dim.width = 0;
        dim.height= 0;
    }
  })

  OnPlaybackStatusUpdate = async OnPlaybackStatus =>{
    if(OnPlaybackStatus.isLoaded && OnPlaybackStatus.isPlaying){
      this.context.updateState(this.context,{
      playbackPosition: OnPlaybackStatus.positionMillis,
      playbackDuration: OnPlaybackStatus.durationMillis,
      })
    }
    if(OnPlaybackStatus.didJustFinish){
      const nextAudioIndex= this.context.currentAudioIndex +1;
      //this is last audio play
      if(nextAudioIndex >= this.context.totalAudioCount)
      {
        this.context.playbackObj.unloadAsync();
        return this.context.updateState(this.context,{
          soundObj:null,
          currentAudio:this.context.audioFiles[0],
          isPlaying: false,
          currentAudioIndex:0,
          playbackPosition: null,
          playbackDuration:null
        })
      }
      //this is for play next audio
      const audio = this.context.audioFiles[nextAudioIndex];
      const status = await playNext(this.context.playbackObj, audio.uri)
      this.context.updateState(this.context,{
        soundObj:status,
        currentAudio:audio,
        isPlaying: true,
        currentAudioIndex: nextAudioIndex
      })
    }
  }
  handleAudioPress= async audio =>{
    const {soundObj, playbackObj, currentAudio, updateState, audioFiles}= this.context;
    //playing audio for this first time.
    if(soundObj == null){
      const playbackObj = new Audio.Sound()
      const status = await Play(playbackObj, audio.uri);
      const index= audioFiles.indexOf(audio)
      updateState(this.context,{currentAudio: audio, playbackObj:playbackObj, soundObj:status,
      isPlaying:true, currentAudioIndex: index});
      return playbackObj.setOnPlaybackStatusUpdate(this.OnPlaybackStatusUpdate)
    }

    //pause audio 
    if(soundObj.isLoaded && soundObj.isPlaying && currentAudio.id==audio.id){
      const status = await pause(playbackObj);
      return updateState(this.context, {soundObj:status, isPlaying:false});
    }

    //resume audio
    if(soundObj.isLoaded && !soundObj.isPlaying && currentAudio.id==audio.id){
      const status=await resume(playbackObj);
      return updateState(this.context, {soundObj:status, isPlaying:true});

    }

    //Select another audio
    if(soundObj.isLoaded && currentAudio.id!=audio.id){
      const status = await playNext(playbackObj, audio.uri)
      const index= audioFiles.indexOf(audio)

      return updateState(this.context,{currentAudio: audio,  soundObj:status, isPlaying:true
      , currentAudioIndex: index});

    }
  }
  rowRenderer = (type, item, index, extendedState) => {
    return <AudioListItem title={item.filename}
    isPlaying={extendedState.isPlaying}
    activeListItem={this.context.currentAudioIndex==index}
    duration={item.duration} 
    onAudioPress={() => this.handleAudioPress(item)}
    onOptionPress={()=>{
      this.currentItem =item;
      this.setState({...this.state, OptionModalVisible: true})
    }} />
  }
  render() {
    return (<audioContext.Consumer>
      {({dataProvider, isPlaying})=>{
        return (
        <Screen>
        <RecyclerListView 
         dataProvider={dataProvider} 
         layoutProvider={this.layoutProvider} 
         rowRenderer={this.rowRenderer}
         extendedState={{isPlaying}}
         />
         <OptionModal
         onPlayPress={()=> console.log('hi')}
         onPlayListPress={()=> console.log('me')} 
         currentItem={this.currentItem}
         onClose={()=>
          this.setState({...this.state, OptionModalVisible:false})
         } 
         visible={this.state.OptionModalVisible}/>
        </Screen>
        );
      }}

    </audioContext.Consumer>)
  }
}
const styles = StyleSheet.create({
   
})
export default Music_list
