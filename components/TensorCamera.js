import React, {useEffect, useState} from "react";
import {bundleResourceIO, cameraWithTensors} from "@tensorflow/tfjs-react-native";
import {Camera} from "expo-camera";
import {Platform, StyleSheet, Text, View} from "react-native";
import { useIsFocused } from '@react-navigation/native'

import * as tf from "@tensorflow/tfjs";
import LottoImage from "./LottoImage";

export default function TensorCamera({navigation}) {
    const [hasPermission, setHasPermission] = useState(null);
    const [model, setModel] = useState(null)
    const [predictionFound, setPredictionFound] = useState(false)

    const modelJson = require('../model/model.json')
    const modelWeights = require('../model/weights.bin')
    const TensorCamera = cameraWithTensors(Camera)
    const textureDims = Platform.OS === "ios"? { width: 1080, height: 1920 } : { width: 1600, height: 1200 };
    const tensorDims = { width: 224, height: 224 };
    const isFocused = useIsFocused();
    let requestAnimationFrameId = 0



    const getPrediction = async(tensor) => {
        if(!tensor){ return;}
        const prediction = await model.predict(tensor).dataSync()
        console.log( prediction )
        if(!prediction || prediction.length === 0) {return;}

        if(prediction[0] > 0.5) {
            cancelAnimationFrame(requestAnimationFrameId)
            /*setPredictionFound(true)*/
            navigation.navigate("Foto",{id: 0});

        }

    }


    const handleCameraStream = (imageAsTensor) => {
        const loop = async () => {
            if(imageAsTensor.next().value !== undefined) {
                const nextImageTensor = await imageAsTensor.next().value;
                const expandedTensor = nextImageTensor.expandDims(0)
                await getPrediction(expandedTensor);
                requestAnimationFrameId = requestAnimationFrame(loop)
            }
        }
        if(!predictionFound) loop();
    }



    useEffect(() => {
        (async () => {
            const {status} = await Camera.requestCameraPermissionsAsync();
            console.log(`permission status: ${status}`);
            setHasPermission(status === 'granted');

            await tf.ready();

            /* Carico il modello */
            try {
                const myModel = await tf.loadLayersModel(bundleResourceIO(modelJson, modelWeights))
                setModel(myModel);
                console.log("model caricato: ")

            }catch (error){
                console.log("modello non caricato")
            }
        })();
    }, [])

    useEffect(() => {
        return () => {
            cancelAnimationFrame(requestAnimationFrameId);
        };
    }, [requestAnimationFrameId]);

    if (hasPermission === null) {
        return <View/>
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>
    }
    return (
        <View style={styles.container}>
            {predictionFound ?
                <LottoImage /> :
                <View>{isFocused &&
                    <TensorCamera
                        style={styles.camera}
                        type={Camera.Constants.Type.back}
                        zoom={0}
                        cameraTextureHeight={textureDims.height}
                        cameraTextureWidth={textureDims.width}
                        resizeHeight={tensorDims.height}
                        resizeWidth={tensorDims.width}
                        resizeDepth={3}
                        autorender={true}
                        onReady={(imageAsTensor) => handleCameraStream(imageAsTensor)}
                    />
                }
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start"
    },
    camera:{
        width: '100%',
        height: '100%',
    }
})
