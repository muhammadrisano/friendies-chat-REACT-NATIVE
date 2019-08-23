import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Icon, Right, Left, Button, Title, Body } from 'native-base';
import firebase from '../../config/Firebase'
class Profilefriend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: props.navigation.getParam('uid'),
            name: "",
            telp: "",
            status: "",
            avatar: ""
        }
    }

    componentDidMount = () => {
        console
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
                        <Button transparent onPress={() => this.props.navigation.navigate("Chat")}>
                            <Icon name='arrow-back' style={{ color: "salmon" }} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: "salmon" }}>Profile</Title>
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
                </Content>
            </Container>
        );
    }
}
export default Profilefriend