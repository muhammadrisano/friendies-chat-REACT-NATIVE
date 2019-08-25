import { createDrawerNavigator, createStackNavigator, createAppContainer } from 'react-navigation'

import Login from '../../screens/login/Login'
import Register from '../../screens/register/Register'
import Map from '../../screens/map/Map'
import Home from '../../screens/home/Home'
import Chat from '../../screens/chat/Chat'
import Friends from '../../screens/friends/Friends'
import Profilefriend from '../../screens/profile/Profilefriend'
import Myprofile from '../../screens/profile/Myprofile'
import Editprofile from '../../screens/profile/Editprofile'


const AppNavigation = createStackNavigator({
    Login,
    Register,
    Map,
    Home,
    Chat,
    Friends,
    Profilefriend,
    Myprofile,
    Editprofile

}, {
        initialRouteName: 'Login',
        headerMode: 'none'
    })

export default createAppContainer(AppNavigation)