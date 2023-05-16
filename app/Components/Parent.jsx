import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DrawerContent from '../navigation/DrawerContent'

export default function Parent() {
    return (
        <View style={{ marginTop: 100 }}>
            <Text>
                Hello
            </Text>
            <DrawerContent></DrawerContent>
        </View>
    )
}

const styles = StyleSheet.create({})