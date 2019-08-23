import React, { Component } from 'react';
import { Container, Header, List, ListItem, Thumbnail, Content, Footer, FooterTab, Button, Icon, Text, Left, Body, Right, Title, View } from 'native-base';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCoffee, faComments, faMapMarkerAlt, faUserFriends, faUser } from '@fortawesome/free-solid-svg-icons'
import firebase from '../../config/Firebase'
import { ActivityIndicator } from 'react-native'
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
export class Friends extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            uid: null,
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
    }

    getFriends = async () => {
        this.setState({
            loading: true
        })
        let dbRef = firebase.database().ref('users');
        await dbRef.on('child_added', (val) => {
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
    }

    componentDidMount = () => {
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.getFriends()
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
                    <Text note>{item.uid}</Text>
                </Body>
            </ListItem>
        )
    }

    render() {
        console.warn(this.state.users)
        return (
            <Container>
                <Header style={{ backgroundColor: "#eee" }}>
                    <Left>
                        <Button transparent>
                            <Icon name='menu' style={{ color: "salmon" }} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: "salmon" }}>Friendies Chat</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Text>Cancel</Text>
                        </Button>
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
            </Container>
        );
    }
}

export default Friends