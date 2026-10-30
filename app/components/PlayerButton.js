import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {AntDesign } from '@expo/vector-icons'
import color from '../misc/color'
const PlayerButton = (props) => {
    const{iconType, size=40, iconColor= color.FONT,onPress}=props
    const getIconName =(type) =>{
        switch(type){
        case 'PLAY':
            return 'pausecircle' //related to PLAY
        case 'PAUSE':
            return 'playcircleo'//related to PAUSE
        case 'NEXT':
            return 'forward' //related to NEXT
        case 'PREV':
            return 'banckward' //related to PREVIOUS
        }
    }
    return (
      <AntDesign {...props} onPress={onPress} name={getIconName(iconType)} size={size} color={iconColor} />
    // <View>
    //   <Text>PlayerButton</Text>
    // </View>
  )
}
export default PlayerButton

