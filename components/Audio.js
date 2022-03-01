import React, {useState, useRef, useEffect} from "react";
import {Text, View, Pressable, StyleSheet} from 'react-native'
import {Audio} from 'expo-av'

const Tracks = [
    {
        id: 0,
        track: require('../assets/audio_prova.mp3'),
    },
]

export default function AudioPlayer(props) {
    const [loaded, setLoaded] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentSong, setCurrentSong] = useState(Tracks[0])
    const sound = useRef(new Audio.Sound())

    useEffect(() => {
        loadAudio();

        return () => {
            sound.current.unloadAsync()
        }
    }, [])

    const pauseAudio = async () => {
        try {
            const result = await sound.current.getStatusAsync();
            if (result.isLoaded) {
                if (isPlaying === true) {
                    await sound.current.pauseAsync()
                    setIsPlaying(false)
                }
            }
        } catch (error) {
            console.log("Errore pausa audio");
        }
    };

    const playAudio = async () => {
        try {
            const result = await sound.current.getStatusAsync();
            if (result.isLoaded) {
                if (isPlaying === false) {
                    await sound.current.playAsync();
                    setIsPlaying(true)
                }
            }
        } catch (error) {
            console.log("Errore nella riproduzione dell'audio");
        }
    };

    const loadAudio = async () => {
        setLoaded(false);
        setLoading(true);
        const checkLoading = await sound.current.getStatusAsync();
        if (checkLoading.isLoaded === false) {
            try {
                const result = await sound.current.loadAsync(
                    currentSong.track,
                    {},
                    true
                );
                if (result.isLoaded === false) {
                    setLoading(false);
                    console.log('Error in Loading Audio');
                } else {
                    setLoading(false);
                    setLoaded(true);
                }
            } catch (error) {
                console.log("Errore caricamento audio");
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    }


    return (
        <View>
            {props.play ?
                <View>
                    {isPlaying ?
                        <Pressable
                            style={styles.button}
                            onPress={() => {
                                pauseAudio()
                            }}
                        >
                            <Text>Pausa</Text>
                        </Pressable>
                        :
                        <Pressable
                            style={styles.button}
                            onPress={() => {
                                playAudio()
                            }}
                        >
                            <Text>Riproduci</Text>
                        </Pressable>
                    }
                </View>
                : pauseAudio()
            }
        </View>
    )
};

const styles = StyleSheet.create({
    button: {
        width: 200,
        height: 45,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF7F50',
    }
})