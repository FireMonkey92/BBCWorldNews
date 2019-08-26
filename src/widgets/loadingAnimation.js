import React, { Component } from 'react'
import { Text, StyleSheet, View, ActivityIndicator } from 'react-native'

const LoadingAnimation = () => {
    return (
        <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="black" />
        </View>
    )
}
export default LoadingAnimation;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    horizontal: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        padding: 10
    }
})
