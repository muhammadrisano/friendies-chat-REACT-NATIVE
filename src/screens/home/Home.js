import React, { Component } from 'react';
import { Container, Header, View, List, ListItem, Thumbnail, Content, Footer, FooterTab, Button, Icon, Text, Left, Body, Right, Title } from 'native-base';
import { ActivityIndicator, Alert, Image } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCoffee, faComments, faMapMarkerAlt, faUserFriends, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import firebase from '../../config/Firebase'
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import Geolocation from '@react-native-community/geolocation';

export class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            uid: null,
            keyid: [],
            loading: true
        }

    }

    componentWillMount() {

        var user = firebase.auth().currentUser;
        if (user != null) {
            this.setState({
                uid: user.uid
            })
        }
        Geolocation.getCurrentPosition(position => {
            // const { longitude, latitude } = position
            firebase.database().ref('users/' + this.state.uid).update({
                longitude: position.coords.longitude,
                latitude: position.coords.latitude,
                log: "online"
            })
        },
            error => Alert.alert(error.message),
            { timeout: 20000, maximumAge: 1000 }
        )


    }
    getmessage = async () => {

        await firebase.database().ref('messages').child(this.state.uid).orderByChild("time").on('child_added', (val) => {
            // let keyuser = []
            // keyuser = [...keyuser, val.key]
            // console.warn(keyuser)
            this.setState((prevState) => {
                return {
                    keyid: [...prevState.keyid, val.key]
                }
            })
            // console.warn(this.state.keyid)

            let dbRef = firebase.database().ref('users/' + val.key);

            dbRef.on('value', (val) => {
                console.warn(val.val())
                let person = val.val();
                person.uid = val.key;
                this.setState({
                    loading: false
                })
                if (person.uid !== this.state.uid) {
                    this.setState((prevState) => {
                        return {
                            users: [...prevState.users, person]
                        }
                    })
                }
            })
        })
        this.setState({
            loading: false
        })

    }
    handleLogout = () => {
        firebase.database().ref('users/' + this.state.uid).update({
            log: "offline"
        })
            .then(() => {
                firebase.auth().signOut()
                    .then(() => {
                        Alert.alert("berhasil logut silahkan login kembali");
                        this.props.navigation.navigate('Login')
                    })
            })
    }
    componentDidMount = () => {

        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.setState({
                users: []
            })
            this.getmessage()
        });

    }

    renderRow = ({ item }) => {
        return (

            <ListItem avatar onPress={() => this.props.navigation.navigate('Chat', item)}>
                <Left>
                    <Thumbnail small source={{ uri: item.avatar }} />
                </Left>
                <Body>
                    <Text>{item.name}</Text>
                    <Text note>{item.log}</Text>
                </Body>
                <Right>
                    <Text note></Text>
                </Right>
            </ListItem>
        )
    }

    render() {
        console.warn(this.state.users)
        return (
            <Container>
                <Header style={{ backgroundColor: "#eee" }}>
                    <Left>
                        <Image source={require('../../assets/images/iconfrendies.png')} style={{ width: 50, height: 30 }} />
                    </Left>
                    <Body>
                        <Title style={{ color: "salmon" }}>Friendies Chat</Title>
                    </Body>
                    <Right>
                        <TouchableOpacity onPress={() => {
                            this.handleLogout()
                        }}>
                            <FontAwesomeIcon icon={faSignOutAlt} color={"salmon"} size={25} />
                        </TouchableOpacity>
                    </Right>
                </Header>

                <List style={{ flex: 1 }}>
                    {(this.state.loading) ?
                        <ActivityIndicator size="large" color="#0000ff" /> :
                        <View></View>
                    }
                    <FlatList
                        data={this.state.users}
                        renderItem={this.renderRow}
                        keyExtractor={(item) => item.uid}
                    />

                </List>

                <Footer >
                    <FooterTab style={{ backgroundColor: "#eee" }}>
                        <Button vertical style={{ backgroundColor: "#d1d1d1" }} onPress={() => this.props.navigation.navigate("Home")}>
                            <FontAwesomeIcon icon={faComments} color={"salmon"} size={25} />
                            <Text style={{ color: "salmon" }}>Chat</Text>
                        </Button>
                        <Button vertical onPress={() => this.props.navigation.navigate('Map')}>
                            <FontAwesomeIcon icon={faMapMarkerAlt} color={"salmon"} size={25} />
                            <Text style={{ color: "salmon" }}>Map</Text>
                        </Button>
                        <Button vertical onPress={() => this.props.navigation.navigate('Myprofile')}>
                            <FontAwesomeIcon icon={faUser} color={"salmon"} size={25} />
                            <Text style={{ color: "salmon" }}>Profil</Text>
                        </Button>
                        <Button vertical onPress={() => this.props.navigation.navigate('Friends')}>
                            <FontAwesomeIcon icon={faUserFriends} color={"salmon"} size={25} />
                            <Text style={{ color: "salmon" }}>Friend</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

export default Home
