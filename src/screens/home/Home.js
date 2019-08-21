import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Left, Body, Right, Title } from 'native-base';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCoffee, faComments, faMapMarkerAlt, faUserFriends, faUser } from '@fortawesome/free-solid-svg-icons'
export class Home extends Component {
    render() {
        return (
            <Container>
                <Header style={{ backgroundColor: "#eee" }}>
                    <Left>
                        <Button transparent>
                            <Icon name='menu' style={{ color: "salmon" }} />
                            <Text>Back</Text>
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
                <Content />
                <Footer >
                    <FooterTab style={{ backgroundColor: "#eee" }}>
                        <Button vertical style={{ backgroundColor: "#d1d1d1" }}>
                            <FontAwesomeIcon icon={faComments} color={"salmon"} size={25} />
                            <Text style={{ color: "salmon" }}>Chat</Text>
                        </Button>
                        <Button vertical>
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

export default Home
