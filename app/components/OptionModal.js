import React from 'react'
import { Modal, Text, View,StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import color from '../misc/color';

export const OptionModal = ({visible, onClose, currentItem, onPlayListPress,onPlayPress}) =>{
        const {filename} = currentItem;
    return (
      <Modal animationType='slide' transparent visible={visible}>
        <View style={styles.Modal}>
            <Text style={styles.title} numberOfLines={2}> 
            {filename}
            </Text>
            <View style={styles.optionContainer}>
                <TouchableOpacity onPress={onPlayPress}>
                 <Text style={styles.option} >Play</Text>
                 </TouchableOpacity>
                <TouchableOpacity onPress={onPlayListPress}>
                  <Text style={styles.option}>Add to Playlist</Text>
                </TouchableOpacity>
            </View>
        </View>
        <TouchableWithoutFeedback onPress={onClose}>
         <View style={styles.ModalBg}/>
        </TouchableWithoutFeedback>
      </Modal>
    )
  
}
const styles = StyleSheet.create({
    Modal:{
        position: 'absolute',
        bottom:0,
        right:0,
        left:0,
        backgroundColor: color.APP_BG,
        borderTopRightRadius:20,
        borderTopLeftRadius:20,
        zIndex:1000
    },
    optionContainer:{
        padding: 20,
    },
    title:{
        fontSize: 18,
        fontWeight: 'bold',
        padding: 20,
        paddingBottom: 0,
        color: color.FONT_MEDIUM
    },
    option:{
        fontSize:16,
        fontWeight:'bold',
        color: color.FONT,
        paddingVertical: 10,
        letterSpacing:1,
    },
    ModalBg:{
        position:'absolute',
        top:0,
        right:0,
        left:0,
        bottom:0,
        backgroundColor:color.MODAL_BG,
    }
    
});