import React, { Component } from 'react';
import { Image, Alert } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Icon, Right, Left, Button, Title, Body, Footer, FooterTab, Form, Item, Label, Input } from 'native-base';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCoffee, faComments, faMapMarkerAlt, faUserFriends, faUser } from '@fortawesome/free-solid-svg-icons'
import firebase from '../../config/Firebase'
class Editprofile extends Component {
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
    handleEdit = () => {
        firebase.database().ref('users/' + this.state.uid).update({
            name: this.state.name,
            telp: this.state.telp,
            status: this.state.status
        })
            .then(() => {
                Alert.alert('Edit Profile success')
                this.props.navigation.navigate('Myprofile')
            })
            .catch(() => {
                Alert.alert('Ada masalah coba lagi nanti')
                this.props.navigation.navigate('Myprofile')
            })
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
                        <Content>
                            <Form>
                                <Item floatingLabel>
                                    <Label>Name </Label>
                                    <Input onChangeText={(name) => this.setState({ name })} value={this.state.name} />
                                </Item>
                                <Item floatingLabel>
                                    <Label>No Telp</Label>
                                    <Input onChangeText={(telp) => this.setState({ telp })} value={this.state.telp} />
                                </Item>
                                <Item floatingLabel style={{ marginBottom: 20 }}>
                                    <Label>Status</Label>
                                    <Input onChangeText={(status) => this.setState({ status })} value={this.state.status} />
                                </Item>
                            </Form>
                        </Content>
                    </Card>
                    <Button block warning style={{ margin: 10 }} onPress={() => this.handleEdit()}>
                        <Text>Edit </Text>
                    </Button>
                    <Button block info style={{ margin: 10 }} onPress={() => this.props.navigation.navigate('Myprofile')}>
                        <Text>Cancel </Text>
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
export default Editprofile