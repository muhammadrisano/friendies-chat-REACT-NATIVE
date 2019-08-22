import React, { Component } from 'react'
import { Alert, ActivityIndicator } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { View, Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Left, Body, Right, Title } from 'native-base';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCoffee, faComments, faMapMarkerAlt, faUserFriends, faUser } from '@fortawesome/free-solid-svg-icons'
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

                <Footer >
                    <FooterTab style={{ backgroundColor: "#eee" }}>
                        <Button vertical onPress={() => this.props.navigation.navigate("Home")}>
                            <FontAwesomeIcon icon={faComments} color={"salmon"} size={25} />
                            <Text style={{ color: "salmon" }}>Chat</Text>
                        </Button>
                        <Button vertical style={{ backgroundColor: "#d1d1d1" }} onPress={() => this.props.navigation.navigate('Map')}>
                            <FontAwesomeIcon icon={faMapMarkerAlt} color={"salmon"} size={25} />
                            <Text style={{ color: "salmon" }}>Map</Text>
                        </Button>
                        <Button vertical>
                            <FontAwesomeIcon icon={faUser} color={"salmon"} size={25} />
                            <Text style={{ color: "salmon" }}>Profil</Text>
                        </Button>
                        <Button vertical>
                            <FontAwesomeIcon icon={faUserFriends} color={"salmon"} size={25} />
                            <Text style={{ color: "salmon" }}>Friend</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </View>

        ) : <ActivityIndicator size="large" color="#0000ff" />
    }
}

export default Map
