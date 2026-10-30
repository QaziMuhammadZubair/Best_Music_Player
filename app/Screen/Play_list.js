import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Play_list() {
  return (
    <View style={styles.container}>
      <Text>music_list</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})