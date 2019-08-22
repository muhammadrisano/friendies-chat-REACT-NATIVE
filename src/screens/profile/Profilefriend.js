import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Text, Icon, Right, Left } from 'native-base';
class Profilefriend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }
    }
    render() {
        return (
            <Container>
                <Header />
                <Content>
                    <Image source={{ uri: 'https://facebook.github.io/react/logo-og.png' }}
                        style={{ width: 400, height: 400 }} />
                    <Card>
                        <CardItem>
                            <Left><Text>Name : </Text></Left>
                            <Text>Google Plus</Text>
                        </CardItem>
                        <CardItem>
                            <Left><Text>No Hp : </Text></Left>
                            <Text>Google Plus</Text>
                        </CardItem>
                        <CardItem>
                            <Left><Text>Status : </Text></Left>
                            <Text>Google Plus</Text>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}
export default Profilefriend