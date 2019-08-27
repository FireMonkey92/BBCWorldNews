import React, { Component } from 'react'
import {
    StyleSheet,
    Alert, Image,
    Text,
    KeyboardAvoidingView,
    ScrollView,
    TouchableNativeFeedback
} from 'react-native';
import * as firebase from 'firebase';
import { Container, View, Header, Icon as NBIcon, Form, Input, Item, Button, Label } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

import LoadingAnimation from '../widgets/loadingAnimation';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDYda0IrZFbLherJs5IffR6Phj5rr0jVB8",
    authDomain: "bbcworldnews-fe753.firebaseapp.com",
    databaseURL: "https://bbcworldnews-fe753.firebaseio.com",
    projectId: "bbcworldnews-fe753",
    storageBucket: "",
    messagingSenderId: "103217356836",
    appId: "1:103217356836:web:f9cbc28eb66c6d25"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isLoading: false,
            passwordView: true
        }

    }
    static navigationOptions = {
        header: null,
    }
    signUpUser = (email, pass) => {
        this.setState({ isLoading: true })
        try {
            if (pass.length <= 6) {
                Alert.alert('Hey There..!!', 'Please enter a password having more than 6 letters');
                this.setState({ isLoading: false })
                return;
            }
            firebase.auth().createUserWithEmailAndPassword(email, pass).catch(err => {
                Alert.alert('Authentication Error', err.message);
                this.setState({ isLoading: false })
            });
        } catch (error) {
            console.log(error.toString());
            this.setState({ isLoading: false })
        }
    }
    loginUser = (email, pass) => {
        this.setState({ isLoading: true })
        try {
            if (pass.length <= 6) {
                Alert.alert('Hey There..!!', 'Please enter a password having more than 6 letters');
                this.setState({ isLoading: false })
                return;
            }
            firebase.auth().signInWithEmailAndPassword(email, pass).then((user) => {
                this.setState({ isLoading: false })
                console.log(user)
                this.props.navigation.navigate('UserHomeScreen');

            }).catch((error) => {
                Alert.alert('Authentication Error', error.message);
                this.setState({ isLoading: false })
            });
        } catch (error) {
            console.log(error.toString())
            this.setState({ isLoading: false })
        }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user != null) {
                console.log(user);
            }
        })
    }


    async loginWithFacebook() {
        const { type, token } = await Facebook.logInWithReadPermissionsAsync('406442723410014', { permissions: ['public_profile'] })
        if (type == 'success') {
            const credential = firebase.auth.FacebookAuthProvider.credential(token);
            firebase.auth().signInWithCredential(credential).catch(err => console.log(err));
        }

    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} enabled>
                <Container style={styles.container} >
                    <Form>
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", marginBottom: 50 }}>
                            <Image
                                style={{ width: 280, height: 190 }}
                                source={require('../assests/images/bbcnewsLogo.png')}
                            />
                            {/* <Image source={{ uri: 'http://www.userlogos.org/files/logos/macleod.mac/bbcnews.8.o.png' }} style={{ height: 400, width: "100%" }} /> */}
                            {/* <Image source={{ uri: 'https://senderlogos.images.dvbdata.com/302x190_w/67.png' }} style={{ height: 300, width: 190 }} /> */}
                        </View>
                        <Item floatingLabel>
                            <NBIcon name='mail' />
                            <Label>Email</Label>
                            <Input autoCapitalize="none"
                                autoCorrect={false}
                                returnKeyType={"next"}
                                onSubmitEditing={(event) => {
                                    this._inputPass._root.focus();
                                }}
                                autoFocus={true}
                                onChangeText={(email) => {
                                    this.setState({ email: email.trim() });
                                }} />
                        </Item>
                        <Item floatingLabel>
                            <NBIcon name='key' />
                            <Label>Password</Label>
                            <Input
                                onChangeText={(password) => this.setState({ password: password.trim() })}
                                getRef={(c) => this._inputPass = c}
                                secureTextEntry={this.state.passwordView}
                                autoCapitalize="none"
                                autoCorrect={false} />
                            <NBIcon name='eye' onPress={() => this.setState((prevState, props) => {
                                return {
                                    passwordView: !prevState.passwordView
                                }
                            })} />
                        </Item>
                        {this.state.isLoading ? <LoadingAnimation></LoadingAnimation> : <Text></Text>}
                        <Button onPress={() => this.loginUser(this.state.email, this.state.password)} style={{ marginTop: 20, }} full rounded success><Text style={{ color: 'white' }}>Login</Text></Button>
                        <Button onPress={() => this.signUpUser(this.state.email, this.state.password)} style={{ marginTop: 20, }} full rounded primary><Text style={{ color: 'white' }}>Sign Up</Text></Button>
                        <View style={{ marginTop: 20, justifyContent: 'space-around', alignItems: "stretch", display: 'flex', flexDirection: "row" }}>
                            <Icon.Button
                                style={{ height: 50, padding: 10 }}
                                name="facebook"
                                backgroundColor="#3b5998"
                                onPress={this.loginWithFacebook}>
                                Login with Facebook
                           </Icon.Button>
                            <Icon.Button
                                style={{ height: 50, padding: 10 }}
                                name="google"
                                onPress={() => Alert.alert('Hey There!!', 'This features comming soon..!')}
                                backgroundColor="#DB4437">
                                Login with Google
                           </Icon.Button>
                        </View>
                    </Form>
                </Container>
            </KeyboardAvoidingView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#fff',
        justifyContent: 'center',
    }
});

export default Login;
