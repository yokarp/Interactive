import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import Constants from 'expo-constants';

export default function App() {
    const [locacion, setLocacion] = useState({})

    const buscaLocation = async () => {
      const { status } = await Location.requestPermissionsAsync()
      if (status !== 'granted') {
        return Alert.alert('no tenemos los permisos para la localización')
      }
      const location = await Location.getCurrentPositionAsync({})
      setLocacion(location)
    }
    useEffect(() =>{
      buscaLocation()
    })

    return (
      <View style = { styles.container }>
        <MapView style={ styles.map }>
          {locacion.coords
            ? <Marker
                coordinate={locacion.coords}
                title="Tiitulo"
                description="Descripción del punto" />
                : null
          }
          </MapView>
      </View>
    );
}

const styles = StyleSheet.create({
    map:{
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'stretch',
        justifyContent: 'center',
        paddingTop: 22,
    },
});
