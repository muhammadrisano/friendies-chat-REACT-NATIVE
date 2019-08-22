import React, { Component } from 'react'
import { Alert, ActivityIndicator, Image } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { View, Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Left, Body, Right, Title, Item } from 'native-base';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCoffee, faComments, faMapMarkerAlt, faUserFriends, faUser } from '@fortawesome/free-solid-svg-icons'
import { styles } from '../../style/Style';
import firebase from '../../config/Firebase';
import Geolocation from '@react-native-community/geolocation';




export class Map extends Component {

    constructor(props) {
        super(props);
        this.state = {
            latitude: null,
            longitude: null,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
            users: [],
            uid: null,
            title: null,
            nohp: null,
            status: null,
            image: null,
            item: null,
        }
    }


    getFriends = () => {
        let dbRef = firebase.database().ref('users');
        dbRef.on('child_added', (val) => {
            let person = val.val();
            person.uid = val.key;
            if (person.uid !== this.state.uid) {
                this.setState((prevState) => {
                    return {
                        users: [...prevState.users, person]
                    }
                })
            }

        })
    }

    // renderDetailMarker = () => (

    // )
    detailmaker = (item) => {
        this.setState({
            title: item.name,
            nohp: item.telp,
            status: item.status,
            image: item.avatar,
            item: item
        })
    }

    componentWillMount() {
        var user = firebase.auth().currentUser;
        if (user != null) {
            this.setState({
                uid: user.uid
            })
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
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.getFriends()
        });
    }
    render() {
        let myMap;
        let renderMarker = () => {
            return this.state.users.map(item => (
                <Marker
                    coordinate={{
                        latitude: item.latitude,
                        longitude: item.longitude
                    }}
                    title={item.name}
                    description={item.status}
                    onPress={() => {
                        this.detailmaker(item)
                        myMap.fitToCoordinates([{
                            latitude: item.latitude,
                            longitude: item.longitude
                        }], {
                                edgePadding: { top: 10, bottom: 10, left: 10, right: 10 },
                                animated: true
                            })
                    }}
                ></Marker>

            ))
        }
        return this.state.latitude ? (
            <View style={{ flex: 1 }}>
                < MapView
                    ref={ref => myMap = ref}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={this.state}
                    showsUserLocation={true}
                    style={styles.containermap}
                >
                    {renderMarker()}


                </ MapView>

                {(this.state.title) ?
                    <View style={{
                        height: 150,
                        position: 'absolute',
                        bottom: 0,
                        padding: 5,
                        width: '100%',
                        flexDirection: 'row',
                        backgroundColor: 'grey'
                    }}>
                        <Image
                            source={{ uri: this.state.image }}
                            resizeMode="cover"
                            style={{ width: 80, height: 80 }}
                        />
                        <View
                            style={{ flex: 4, padding: 3, flexDirection: 'column' }}>
                            <Text style={{ fontWeight: 'bold', color: "white" }}>{this.state.title}</Text>
                            <Text allowFontScaling={false} style={{ color: "white" }}>{this.state.nohp}</Text>
                            <Text allowFontScaling={false} style={{ color: "white" }}>{this.state.status}</Text>

                        </View>
                        <View style={{ flex: 2, padding: 3, flexDirection: 'column' }}>
                            <Button warning onPress={() => this.props.navigation.navigate('Chat', this.state.item)} ><Text> Chat </Text></Button>
                        </View>
                    </View> : <View></View>
                }
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
            </View >

        ) : <ActivityIndicator size="large" color="#0000ff" />
    }
}

export default Map
