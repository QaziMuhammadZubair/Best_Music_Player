import React, { Component, createContext } from 'react'
import { Alert, Text, View } from 'react-native'
import * as MediaLibrary from 'expo-media-library'
import { DataProvider } from 'recyclerlistview'
export const audioContext = createContext()
export class Audioprovider extends Component {
    constructor(props){
        super(props)
        this.state = {
            audioFiles: [],
            permissionError: false,
            dataProvider: new DataProvider((r1,r2)=> r1 !==r2),
            playbackObj: null,
            soundObj: null,
            currentAudio:{},
            isPlaying: false,
            currentAudioIndex: null,
            playbackPosition:null,
            playbackDuration:null,
        }
        this.totalAudioCount = 0;
    }
    permissionAlert = () =>{
        Alert.alert("Permission is Required","This app is need to read audio Files!",[{
            text: "I'm ready",
            onPress:()=> this.getPermission()
        },
    {
        text:'Cancle',
        onPress:()=>this.permissionAlert()
    }])
    }
    // Object {
    //     "canAskAgain": true,
    //     "expires": "never",
    //     "granted": false,
    //     "status": "undetermined",
    //   }
    getAudioFiles = async() =>{
        const {dataProvider, audioFiles} = this.state
        let media = await MediaLibrary.getAssetsAsync({
            mediaType: 'audio'
        })
        media = await MediaLibrary.getAssetsAsync({
            mediaType: 'audio',
            first: media.totalCount
        })
        this.totalAudioCount= media.totalCount
        this.setState({...this.state, dataProvider:dataProvider.cloneWithRows([...
        audioFiles, ...media.assets]), audioFiles:[...
            audioFiles, ...media.assets]})
        console.log(media.assets.length);
    }
    getPermission= async()=>{
        const permission = await MediaLibrary.getPermissionsAsync()
        console.log(permission)
        if(permission.granted){
            //all audio files appear
            this.getAudioFiles();

        }
        if(!permission.canAskAgain && !permission.granted){
            this.setState({...this.state, permissionError:true})
        }
        if(!permission.granted && permission.canAskAgain){
            const {status, canAskAgain} =await MediaLibrary.requestPermissionsAsync();
            if(status== 'denied' && canAskAgain){
                //show alert Please allow the Permission
                this.permissionAlert();
            }
            if(status=='granted'){
                //all audio files appear
                this.getAudioFiles();
            }
            if(status== 'denied' && !canAskAgain){
                //show error
                this.setState({...this.state, permissionError:true})

            }
        }

    }
    componentDidMount(){
        this.getPermission()
    }
    updateState = (prevState, newState={})=>{
        this.setState({...prevState, ...newState})
    }
  render() {
    const {audioFiles,dataProvider, permissionError, playbackObj, soundObj, currentAudio,
         isPlaying, currentAudioIndex,playbackPosition,
         playbackDuration} = this.state
    if(permissionError) 
      return( 
       <View style={{flex:1,
        justifyContent:'center',
        alignItems:'center'}}>
        <Text style={{fontSize: 25, textAlign: 'center', color:'red'}}>It 
        look like you never accept the permission
            </Text>
            </View>
    );
    // console.log(currentAudioIndex)
    return( <audioContext.Provider value={{ audioFiles, dataProvider, playbackObj, soundObj,
     currentAudio, isPlaying, currentAudioIndex, updateState: this.updateState ,
      playbackPosition,
      playbackDuration,
      totalAudioCount:this.totalAudioCount,}}>
        {this.props.children}

    </audioContext.Provider>
    );
  }
}

export default Audioprovider
