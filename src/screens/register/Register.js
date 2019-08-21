import React, { Component } from 'react'
import { Text, View, Alert, ImageBackground } from 'react-native'
import { styles, } from '../../style/Style'
import { Item, Input, H2, Button } from 'native-base'
import firebase from '../../config/Firebase'
import md5 from 'md5'
import { thisExpression } from '@babel/types';

// import { connect } from 'react-redux'
// import { registeruser } from '../../redux/actions/users'



export class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            password2: "",
            fullname: "",
            telp: "",
            loading: false,
            usersRef: firebase.database().ref('users'),
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handlehumanerror = () => {
        if (this.state.email === "") {
            Alert.alert("Email cannot be empty")
            return false
        } else if (this.state.password === "") {
            Alert.alert("Password cannot be empty")
            return false
        } else if (this.state.fullname === "") {
            Alert.alert("Fullname cannot be empty")
            return false
        } else if (this.state.telp === "") {
            Alert.alert("Telp cannot be empty")
            return false
        } else if (this.state.password !== this.state.password2) {
            Alert.alert("Confirm Password is not she same ")
            this.setState({
                password: "",
                password2: ""
            })
            return false
        } else {
            return true
        }
    }
    handleRegister = () => {
        if (this.handlehumanerror()) {
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(createdUser => {
                    createdUser.user.updateProfile({
                        displayName: this.state.fullname,
                        photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`

                    })
                        .then(() => {
                            this.saveUser(createdUser).then(() => {
                                Alert.alert("You succes Register")
                            })
                        })

                    this.props.navigation.navigate("Login")
                }).catch(function (error) {
                    // Handle Errors here.
                    // var errorCode = error.code;
                    // var errorMessage = error.message;

                    Alert.alert(error.message)
                });
        }

    }
    // componentDidMount = () => {
    //     firebase.database().ref('user').set({
    //         name: "muhammad risano",
    //         age: 2
    //     })
    // }
    saveUser = createdUser => {
        return this.state.usersRef.child(createdUser.user.uid).set({
            name: createdUser.user.displayName,
            avatar: createdUser.user.photoURL,
            telp: this.state.telp
        })
    }
    render() {
        return (
            // <ImageBackground source={require('../../assets/images/iconreg.png')} style={{ width: '100%', height: '100%' }}>
            <View style={[styles.flex1]}>
                <View style={[styles.flex1, styles.contentCenter, styles.itemCenter]}>
                    <H2>Form Register </H2>
                </View>
                <View style={styles.flex5}>
                    <Item regular style={styles.borderInput}>
                        <Input placeholder='email' name="email" onChangeText={(email) => this.setState({ email })} value={this.state.email} />
                    </Item>
                    <Item regular style={styles.borderInput}>
                        <Input placeholder='Password' name="password" secureTextEntry={true} onChangeText={(password) => this.setState({ password })} value={this.state.password} />
                    </Item>
                    <Item regular style={styles.borderInput}>
                        <Input placeholder='Confirm Password' name="password2" secureTextEntry={true} onChangeText={(password2) => this.setState({ password2 })} value={this.state.password2} />
                    </Item>
                    <Item regular style={styles.borderInput}>
                        <Input placeholder='Full Name' name="fullname" onChangeText={(fullname) => this.setState({ fullname })} value={this.state.fullname} />
                    </Item>
                    <Item regular style={styles.borderInput}>
                        <Input placeholder='Telp Number' name="telp" onChangeText={(telp) => this.setState({ telp })} value={this.state.telp} />
                    </Item>
                    <Button block style={{ marginTop: 30, width: "90%", marginLeft: "auto", marginRight: "auto" }} onPress={this.handleRegister}>
                        <Text style={styles.textWhite}>Register</Text>
                    </Button>
                    <Button block warning style={{ marginTop: 10, width: "90%", marginLeft: "auto", marginRight: "auto" }} onPress={() => this.props.navigation.navigate('Home')}>
                        <Text style={styles.textWhite}>Cancel</Text>
                    </Button>
                </View>
            </View >
            // </ImageBackground>
        )
    }
}



export default Register
