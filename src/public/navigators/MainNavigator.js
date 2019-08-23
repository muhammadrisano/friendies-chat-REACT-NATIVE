import { createDrawerNavigator, createStackNavigator, createAppContainer } from 'react-navigation'

import Login from '../../screens/login/Login'
import Register from '../../screens/register/Register'
import Map from '../../screens/map/Map'
import Home from '../../screens/home/Home'
import Chat from '../../screens/chat/Chat'
import Friends from '../../screens/friends/Friends'
import Profilefriend from '../../screens/profile/Profilefriend'
import Myprofile from '../../screens/profile/Myprofile'
// import Leaderboards from '../../screens/leaderboards/Leaderboards'
// import CustomsDrawer from '../../components/CustomsDrawer'
// import Home from '../../screens/home/Home'

const AppNavigation = createStackNavigator({
    Login,
    Register,
    Map,
    Home,
    Chat,
    Friends,
    Profilefriend,
    Myprofile

}, {
        initialRouteName: 'Login',
        headerMode: 'none'
    })

// const DrawerNavigation = createDrawerNavigator({
//     Menu: {
//         screen: AppNavigation
//     },
//     Login,
//     Register,
//     Leaderboards
// }, {

//         contentComponent: CustomsDrawer,

// })
export default createAppContainer(AppNavigation)