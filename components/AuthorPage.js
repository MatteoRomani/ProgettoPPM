import React from 'react'
import {StyleSheet, View, Text, Image} from 'react-native'


export default function AuthorPage({route}) {
    const {nameAuthor, textBody} = route.params;
    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.titleText}>{JSON.stringify(nameAuthor)}</Text>
                <View style={{flex: 1}}>
                    <Image style={styles.imgAuthor} source={{uri: 'https://via.placeholder.com/150.png/00008B'}}/>
                </View>
            </View>
            <View style={styles.body}>
                <Text style={styles.bodyText}>{JSON.stringify(textBody)}</Text>
            </View>

        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center"
    },
    title: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    titleText: {
        marginTop: 10,
        marginLeft: 10,
        flex: 1,
        fontSize: 32,
        fontWeight: "bold"
    },
    imgAuthor: {
        marginTop: 10,
        width: 90,
        height: 90,
        borderRadius: 50,
        marginRight: 25,
        alignSelf: "flex-end"
    },
    body: {
        flex: 5
    },
    bodyText: {
        marginTop: 10,
        marginHorizontal: 10,
        fontSize: 20,
    }
})
