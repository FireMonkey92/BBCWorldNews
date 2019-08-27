import React, { Component } from 'react';
import { View, Text } from 'react-native';

class UserHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <View>
                <Text> Hi i am user </Text>
            </View>
        );
    }
}

export default UserHome
