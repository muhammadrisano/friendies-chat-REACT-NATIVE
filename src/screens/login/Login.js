import React, { Component } from 'react'
import { Text, View, Alert, AsyncStorage, Image } from 'react-native'
import { Container, Header, Content, Form, Item, Input, Label, Button, H3, H2 } from 'native-base';
import { styles } from '../../style/Style'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { fasFaArrowRight } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { ScrollView } from 'react-native-gesture-handler';
import firebase from '../../config/Firebase'
// import { connect } from 'react-redux'
// import { loginUser } from '../../redux/actions/users'


export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }


    handleLogin = async () => {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((res) => {
                console.warn(res)
                Alert.alert("You Succes Login")
            })
            .catch(function (error) {
                // Handle Errors here.
                // var errorCode = error.code;
                // var errorMessage = error.message;
                Alert.alert(error.message)
            });
    }

    render() {
        return (
            <ScrollView>
                <Container style={{ backgroundColor: "#efefef" }}>
                    <View style={styles.flex3}>
                        <Image source={require('../../assets/images/iconreg.png')} style={{ marginTop: 30, marginLeft: 50 }} />
                        <H2 style={{ marginLeft: "auto", marginRight: "auto", marginTop: 30, color: "orange" }}>Login Here</H2>
                    </View>
                    <View style={[styles.flex2, styles.fluid, styles.contentCenter]}>
                        <View>

                            <Form>
                                <Item floatingLabel>
                                    <Label>Email</Label>
                                    <Input onChangeText={(email) => this.setState({ email })} value={this.state.email} />
                                </Item>
                                <Item floatingLabel last>
                                    <Label>Password</Label>
                                    <Input secureTextEntry={true} onChangeText={(password) => this.setState({ password })} value={this.state.password} />
                                </Item>
                            </Form>
                        </View>
                    </View>
                    <ImageBackground source={require("../../assets/images/backlog.png")} style={{ width: '100%', height: '100%' }}>

                    </ImageBackground>
                    <View style={[styles.flex1, styles.fluid, styles.contentCenter, styles.textLeftRight]}>
                        <View style={{ width: 200, marginTop: 10, }}><H3>Login</H3></View>
                        <View style={{ width: 60 }}>
                            <Button warning style={[styles.RoundButton, styles.textCenter]} onPress={() => this.handleLogin()}>
                                <FontAwesomeIcon icon={['fas', 'arrow-right']} size={30} color="white" />
                            </Button>
                        </View>
                    </View>


                    <View style={[styles.flex1, styles.fluid, styles.contentCenter, styles.textLeftRight, { alignItems: "flex-end" }]}>
                        <Text style={[styles.mb20, { color: "grey" }]} onPress={() => this.props.navigation.navigate('Register')}> Sign Up</Text><Text style={[styles.mb20, { color: "grey" }]} onPress={() => this.props.navigation.navigate('Home')}>Back Home</Text>
                    </View>
                </Container>
            </ScrollView >
        )
    }
}


export default Login
