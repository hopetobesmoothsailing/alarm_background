import React, {useEffect, useMemo, useState} from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import {normalize} from "./src/consts/consts";
import BackgroundService from 'react-native-background-actions';
import BackgroundJob from 'react-native-background-actions';
import Sound from 'react-native-sound';
import AnalogClock from 'react-native-clock-analog';
import RadioGroup from 'react-native-radio-buttons-group';
import Beep1 from './src/assets/beep1.mp3';
import Beep2 from './src/assets/beep2.mp3';
import Beep3 from './src/assets/beep3.mp3';
import Beep4 from './src/assets/beep4.mp3';
import Beep5 from './src/assets/beep5.mp3';
import Beep6 from './src/assets/beep6.mp3';
import { TextInput } from 'react-native-paper';

const options = {
    taskName: 'Demo',
    taskTitle: 'Demo Running',
    taskDesc: 'Demo',
    taskIcon: {
        name: 'ic_launcher',
        type: 'mipmap'
    },
    color: '#f0f',
    parameters: {
        delay: 10000
    },
    actions: '["Exit"]'
}

export default function App() {
    let intervalId;
    let beepArray = [Beep1, Beep2, Beep3, Beep3, Beep4, Beep5, Beep6];

    const beepRadioButtons = useMemo(() => ([
        {
            id: 1,
            label: 'Beep 1',
            color: '#FFF',
            labelStyle: {
                color: "#FFF",
            },
        },
        {
            id: 2,
            label: 'Beep 2',
            color: '#FFF',
            labelStyle: {
                color: "#FFF",
            },
        },
        {
            id: 3,
            label: 'Beep 3',
            color: '#FFF',
            labelStyle: {
                color: "#FFF",
            },
        },
        {
            id: 4,
            label: 'Beep 4',
            color: '#FFF',
            labelStyle: {
                color: "#FFF",
            },
        },
        {
            id: 5,
            label: 'Beep 5',
            color: '#FFF',
            labelStyle: {
                color: "#FFF",
            },
        },
        {
            id: 6,
            label: 'Beep 6',
            color: '#FFF',
            labelStyle: {
                color: "#FFF",
            },
        },
    ]))

    const [selectedBeepId, setSelectedBeepId] = useState(1);
    const [intervalBetween, setIntervalBetween] = useState('2500');

    const beep = (alarm) => new Sound(alarm, Sound.MAIN_BUNDLE, (err) => {
        if (err) {
            console.log('Failed to load sound', err);
        }
    });

    useEffect(() => {
        if (!BackgroundJob.isRunning()) {
            BackgroundService.start(veryIntensiveTask, options).then();
        }
        return () => {
            // BackgroundService.stop().then();
        }
    }, []);

    const veryIntensiveTask = async (taskArguments) => {
        await new Promise(async (resolve) => {
            intervalId = setInterval(() => {
                if (checkIfHour()) makeBeepSounds()
            }, 1000)
        })
    }
    const checkIfHour = () => {
        const now = new Date();
        return now.getMinutes() === 0
    }
    const makeBeepSounds = () => {
        const now = new Date();
        const count = (now.getHours() % 12);
        console.log(count);
        beep(beepArray[selectedBeepId - 1]).setNumberOfLoops(count === 0 ? 11 : count - 1, intervalBetween).play()
    }

    const handleIntervalInputChange = (value) => {
        setIntervalBetween(value);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeTxt}>Chime app</Text>
            <View style={{ marginTop: normalize(30) }}></View>
            <AnalogClock
                colorClock="#FFF"
                colorNumber="#000"
                colorCenter="#000"
                colorHour="#000"
                colorMinutes="#000"
                autostart={true}
                showSeconds />
            <View style={{ marginTop: normalize(30) }}></View>
            <RadioGroup
                radioButtons={beepRadioButtons}
                onPress={setSelectedBeepId}
                selectedId={selectedBeepId} />
            <TextInput 
                style={styles.intervalInput}
                keyboardType="numeric"
                placeholder="Enter interval..."
                value={intervalBetween} 
                onChangeText={handleIntervalInputChange} />
            {/* <Button title='click here!' onPress={() => console.log(selectedBeepId, intervalBetween)} /> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    welcomeTxt: {
        fontSize: normalize(30),
        color: 'blue',
        textAlign: 'center'
    },
    userSettingButton: {
        marginTop: normalize(100),
    },
    intervalInput: {
        height: 20,
        margin: 12,
        borderWidth: 1,
        padding: 5,
        borderRadius: 8,
        outline: 0,
    },
});
