import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Icon, Right, Left, Button, Title, Body, Footer, FooterTab } from 'native-base';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCoffee, faComments, faMapMarkerAlt, faUserFriends, faUser } from '@fortawesome/free-solid-svg-icons'
import firebase from '../../config/Firebase'
class Myprofile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: "",
            name: "",
            telp: "",
            status: "",
            avatar: ""
        }
    }

    componentWillMount = () => {
        var user = firebase.auth().currentUser;
        if (user != null) {
            this.setState({
                uid: user.uid
            })
        }
    }
    componentDidMount = () => {

        firebase.database().ref('users').child(this.state.uid).on('value', (val) => {
            console.warn(val.val())
            this.setState({
                name: val.val().name,
                telp: val.val().telp,
                status: val.val().status,
                avatar: val.val().avatar,
            })
        })
    }
    render() {
        return (
            <Container>
                <Header style={{ backgroundColor: "#eee" }}>
                    <Left>
                        <Image source={require('../../assets/images/iconfrendies.png')} style={{ width: 50, height: 30 }} />
                    </Left>
                    <Body>
                        <Title style={{ color: "salmon" }}>My Profile</Title>
                    </Body>
                </Header>
                <Content>
                    <Image source={{ uri: this.state.avatar }}
                        style={{ width: 250, height: 250, marginLeft: "auto", marginRight: "auto" }} />
                    <Card>
                        <CardItem>
                            <Left><Text>Name : </Text></Left>
                            <Text>{this.state.name}</Text>
                        </CardItem>
                        <CardItem>
                            <Left><Text>No Hp : </Text></Left>
                            <Text>{this.state.telp}</Text>
                        </CardItem>
                        <CardItem>
                            <Left><Text>Status : </Text></Left>
                            <Text>{this.state.status}</Text>
                        </CardItem>
                    </Card>
                    <Button block warning style={{ margin: 10 }} onPress={() => { this.props.navigation.navigate('Editprofile') }} >
                        <Text>Edit Profile</Text>
                    </Button>
                </Content>
                <Footer >
                    <FooterTab style={{ backgroundColor: "#eee" }}>
                        <Button vertical onPress={() => this.props.navigation.navigate("Home")}>
                            <FontAwesomeIcon icon={faComments} color={"salmon"} size={25} />
                            <Text style={{ color: "salmon" }}>Chat</Text>
                        </Button>
                        <Button vertical onPress={() => this.props.navigation.navigate('Map')}>
                            <FontAwesomeIcon icon={faMapMarkerAlt} color={"salmon"} size={25} />
                            <Text style={{ color: "salmon" }}>Map</Text>
                        </Button>
                        <Button vertical style={{ backgroundColor: "#d1d1d1" }}>
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
export default Myprofile