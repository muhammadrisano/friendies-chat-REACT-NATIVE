import React, { Component } from 'react'
import { Text, View, TextInput, Alert, Dimensions } from 'react-native'
import { tsThisType } from '@babel/types';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import { styles } from '../../style/Style';
import firebase from '../../config/Firebase'
export class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            person: {
                name: props.navigation.getParam('name'),
                uid: props.navigation.getParam('uid')
            },
            textMessage: "",
            uid: null,
            messageList: []
        }

    }
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('name', null)
        }
    }

    sendMessage = () => {
        if (this.state.textMessage.length > 0) {
            let msgId = firebase.database().ref('message').child(this.state.uid).child(this.state.person.uid).push().key;
            let updates = {}
            let message = {
                message: this.state.textMessage,
                time: firebase.database.ServerValue.TIMESTAMP,
                from: this.state.uid
            }
            updates['messages/' + this.state.uid + '/' + this.state.person.uid + '/' + msgId] = message;
            updates['messages/' + this.state.person.uid + '/' + this.state.uid + '/' + msgId] = message;
            firebase.database().ref().update(updates);
            this.setState({ textMessage: '' });
        }
    }
    componentDidMount() {
        firebase.database().ref('messages').child(this.state.uid).child(this.state.person.uid)
            .on('child_added', (value) => {
                console.warn(value.val())
                this.setState((prevState) => {
                    return {
                        messageList: [...prevState.messageList, value.val()]
                    }
                })
            })
    }
    handletest = () => {
        Alert.alert(this.state.uid)
    }
    handleChange = key => val => {
        this.setState({ [key]: val })
    }

    convertTime = (time) => {
        let d = new Date(time);
        let c = new Date();
        let result = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':';
        result += (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
        if (c.getDay() !== d.getDay()) {
            result = d.getDay() + ' ' + d.getMonth() + ' ' + result;
        }
        return result;
    }
    componentWillMount() {
        var user = firebase.auth().currentUser;
        if (user != null) {
            this.setState({
                uid: user.uid
            })
        }
        console.warn(this.state.uid)

    }
    renderRow = ({ item }) => {
        return (
            <View style={{
                flexDirection: 'row',
                width: "60%",
                alignSelf: item.from === this.state.uid ? 'flex-end' : 'flex-start',
                backgroundColor: item.from === this.state.uid ? '#00897b' : '#7cb342',
                borderRadius: 5,
                marginBottom: 10,
            }}>
                <Text style={{ color: "#fff", padding: 7, fontSize: 16 }}>
                    {item.message}
                </Text>
                <Text style={{ color: '#eee', padding: 3, fontSize: 12 }}>
                    {this.convertTime(item.time)}
                </Text>
            </View>
        )
    }
    render() {
        let { height, width } = Dimensions.get('window')
        return (
            <Container>
                <Header style={{ backgroundColor: "#eee" }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate("Home")}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: "salmon" }}> {this.props.navigation.getParam('name')}</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon name='menu' />
                        </Button>
                    </Right>
                </Header>
                <FlatList
                    style={{ padding: 10, height: height * 0.8 }}
                    data={this.state.messageList}
                    renderItem={this.renderRow}
                    keyExtractor={(item, index) => index.toString()}
                />
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TextInput
                        style={styles.inputMessage}
                        value={this.state.textMessage}
                        placeholder="Type message..."
                        onChangeText={this.handleChange('textMessage')} />
                    <TouchableOpacity onPress={this.sendMessage} style={{ paddingBottom: 10, marginLeft: 5 }}>
                        <Text style={styles.btnText}>Send</Text>
                    </TouchableOpacity>
                </View>
            </Container >
        )
    }
}

export default Chat
