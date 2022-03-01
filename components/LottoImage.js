import React, {useState} from 'react'
import {StyleSheet, View, Text, Modal, Pressable} from "react-native";
import {useFocusEffect} from "@react-navigation/native";
import ImageMapper from "react-native-image-mapper";
import AudioPlayer from "./Audio";


const imgSource = require('../assets/planimetria.jpg')



export default function LottoImage({navigation, route}) {
    const {id} = route.params
    const colorCurrentEl = 'red'
    const colorOtherEl = 'green'
    const [selectedId, setSelectedId] = useState(null)
    const [firstId, setFirstId] = useState(null)
    const [nameBuilding, setNameBuilding] = useState(null)
    const [menuIsVisible, setMenuIsVisible] = useState(false)

    const MAP = [
        {
            id: '0',
            name: 'Acqua e Luce',
            shape: 'circle',
            radius: 30,
            x1: 233,
            y1: 247,
            prefill: firstId === '0' ? colorCurrentEl : colorOtherEl
        },
        {
            id: '1',
            name: 'Palazzo 2',
            shape: 'circle',
            radius: 30,
            x1: 73,
            y1: 277,
            prefill: firstId === '1' ? colorCurrentEl : colorOtherEl
        },
        {
            id: '2',
            name: 'Palazzo 3',
            shape: 'circle',
            radius: 30,
            x1: 73,
            y1: 100,
            prefill: firstId === '2' ? colorCurrentEl : colorOtherEl
        },

    ]



    const mainImgWasPressed = (item, idx, event) => {
        if (item.id === selectedId) {
            setSelectedId(item.id);
            setNameBuilding(item.name)
        }

        if (item.id !== selectedId) {
            setSelectedId(item.id);
            setNameBuilding(item.name)
        }
        console.log("Dopo click "+selectedId)
        setMenuIsVisible(true)
    }


    useFocusEffect(() => {
        setFirstId(JSON.stringify(id))
        console.log('Use Effect '+ selectedId)
    })

    return (
        <View style={styles.container}>
            <View style={styles.fieldSet}>
                <Text style={styles.legend}>Legenda</Text>
                <View style={{flexDirection: "row", paddingLeft: 10}}>
                    <View style={styles.dotRed}/>
                    <Text>Posizione lotto</Text>
                </View>
                <View style={{flexDirection: "row", paddingLeft: 10, marginTop: 10}}>
                    <View style={styles.dotGreen}/>
                    <Text>Altri lotti</Text>
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={menuIsVisible}
            >
                <View style={styles.centeredModal}>
                    <View style={styles.modalContent}>
                        <View style={{flex: 1}}>
                            <Text style={styles.modalTitle}>{nameBuilding}</Text>
                        </View>
                        <View style={{flex:1}}>
                            <Pressable
                                onPress={()=>{
                                    console.log(selectedId)
                                    if(selectedId === '0')
                                        navigation.navigate("Autore", {
                                            nameAuthor: "Autore Palazzo",
                                            textBody: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin felis elit, auctor non lobortis non, euismod vitae augue. Pellentesque eu urna ut massa scelerisque auctor. Suspendisse sagittis arcu quam, ac porta sem commodo ut. Integer ac scelerisque tortor, in dictum odio. "
                                        })
                                    if(selectedId === '1')
                                        navigation.navigate("Autore", {
                                            nameAuthor: "Autore Palazzo2",
                                            textBody: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin felis elit, auctor non lobortis non, euismod vitae augue. Pellentesque eu urna ut massa scelerisque auctor. Suspendisse sagittis arcu quam, ac porta sem commodo ut. Integer ac scelerisque tortor, in dictum odio. "
                                        })
                                    if(selectedId === '2')
                                        navigation.navigate("Autore", {
                                            nameAuthor: "Autore Palazzo3",
                                            textBody: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin felis elit, auctor non lobortis non, euismod vitae augue. Pellentesque eu urna ut massa scelerisque auctor. Suspendisse sagittis arcu quam, ac porta sem commodo ut. Integer ac scelerisque tortor, in dictum odio. "
                                        })
                                    setMenuIsVisible(false)
                                }}
                                style={styles.authorButton}
                            >
                                <Text>Autore</Text>
                            </Pressable>
                        </View>
                        <View style={{flex:1}}>
                            <AudioPlayer play={menuIsVisible}/>
                        </View>
                        <View style={{flex:1}}>
                            <Pressable
                                style={styles.authorButton}
                            >
                                <Text>Planimetrie</Text>
                            </Pressable>
                        </View>
                        <View style={{flex:1}}>
                            <Pressable
                                style={styles.authorButton}
                            >
                                <Text>Sezioni Edificio</Text>
                            </Pressable>
                        </View>
                        <View style={{flex:1}}>
                            <Pressable
                                onPress={()=>{
                                    if(selectedId === '0') {
                                        navigation.navigate("3DView")
                                        setMenuIsVisible(false)
                                    }
                                }}
                                style={styles.authorButton}
                            >
                                <Text>Visualizzazione 3D</Text>
                            </Pressable>
                        </View>
                        <Pressable
                            style={styles.dismissButton}
                            onPress={() => {
                                setMenuIsVisible(false)
                            }}
                        >
                            <Text>Chiudi</Text>
                        </Pressable>
                    </View>
                </View>


            </Modal>

            <ImageMapper
                imgHeight={500}
                imgSource={imgSource}
                onPress={(item, idx, event) =>
                    mainImgWasPressed(item, idx, event)
                }
                imgMap={MAP}
                containerStyle={styles.image}
                selectAreaId={selectedId}
            />
        </View>

    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF"
    },
    dotRed: {
        height: 20,
        width: 20,
        backgroundColor: "red",
        borderRadius: 50
    },
    dotGreen: {
        height: 20,
        width: 20,
        backgroundColor: "green",
        borderRadius: 50
    },
    fieldSet: {
        display: "flex",
        flexDirection: "column",
        margin: 10,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 5,
        borderWidth: 1,
        justifyContent: "space-between",
        borderColor: '#000'
    },
    legend: {
        position: 'absolute',
        top: -10,
        left: 10,
        fontWeight: 'bold',
        backgroundColor: '#FFFFFF'
    },
    textContainer: {
        flexDirection: "row",
        alignItems: "stretch"
    },
    image: {
        resizeMode: 'contain',
        height: 500,
    },
    centeredModal: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContent: {
        display: "flex",
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
        width: 300,
        height: 400,
        borderRadius: 24,
        backgroundColor: '#ecfeff',
    },
    modalTitle: {
        fontWeight: "bold",
        fontSize: 25,
        marginTop: 10,
    },
    dismissButton: {
        width: 150,
        height: 50,
        borderRadius: 24,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#be185d',
    },
    authorButton: {
        width: 200,
        height: 45,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF7F50',
    },



});
