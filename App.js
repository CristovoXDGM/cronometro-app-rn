import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function App() {

  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);

  function startTimer() {
    setIsActive(!isActive);
  }

  function cleanTimer() {
    setTimer(0.0);
    setIsActive(false);
  }

  useEffect(() => {
    let interval = 1000;
    if (isActive) {
      interval = setInterval(() => {
        setTimer(timer => timer + 0.1);
      }, 100);
    } else if (!isActive && timer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timer]);

  return (
    <View style={styles.container}>

      <Image source={require("./src/cronometro.png")} style={styles.img} />
      <Text style={styles.counterText} >{timer.toFixed(1)}</Text>
      <View style={styles.goView}>
        <TouchableOpacity style={styles.goButton} onPress={startTimer}>
          <Text style={styles.goTextButton} >Go</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.goButton}>
          <Text style={styles.goTextButton} onPress={cleanTimer} >Clear/Stop</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterText: {
    margin: -100,
    fontSize: 50,
    fontWeight: "bold"
  },
  goButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width / 2.5,

    backgroundColor: "#000",
    margin: 5,
    borderRadius: 25
  },

  goTextButton: {
    color: "#f5f5f5",
    fontSize: 20,
    fontWeight: "bold"
  },
  goView: {
    flexDirection: "row",
    marginTop: 150,
    height: 60
  },
  img: {

    height: Dimensions.get("window").height / 4,
    width: Dimensions.get("window").width / 2.5
  }
});
