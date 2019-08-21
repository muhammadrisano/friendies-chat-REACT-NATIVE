import React, { Component } from 'react'
import { Text, View, Alert, ActivityIndicator } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { styles } from '../../style/Style';
import Geolocation from '@react-native-community/geolocation';




export class Map extends Component {

    constructor() {
        super();
        this.state = {
            latitude: null,
            longitude: null,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,

        }
    }

    componentDidMount = () => {
        Geolocation.getCurrentPosition(position => {
            // const { longitude, latitude } = position
            this.setState({
                longitude: position.coords.longitude,
                latitude: position.coords.latitude
            })
        },
            error => Alert.alert(error.message),
            { timeout: 20000, maximumAge: 1000 }
        )
        // this.setState({
        //     latitude: 37.78825,
        //     longitude: -122.4324,
        // })
    }
    render() {

        return this.state.latitude ? (
            <View style={{ flex: 1 }}>
                < MapView
                    provider={PROVIDER_GOOGLE}
                    initialRegion={this.state}
                    showsUserLocation
                    style={styles.containermap}
                />
            </View>

        ) : <ActivityIndicator size="large" color="#0000ff" />
    }
}

export default Map
