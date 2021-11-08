import React from 'react';
import { View } from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { createAppContainer, createSwitchNavigator } from "react-navigation"
import { createStackNavigator } from 'react-navigation-stack'
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs"
import Home from './home/home';
import Favorite from './home/favorite';
import MainProfileScreen from './profile/mainProflieScreen';
import Products from './home/products';
import Details_product from './home/detailsProduct';
import { Colors } from '../pages/colors';
import Cart from './home/cart';
import Sign_in from './sign/sign_in';
import Sign_Up from './sign/sign_up';
import Recover_password from './sign/recover_password';
import Register_phoneScreen from './sign/registerPhone';
import VerificationScreen from './sign/verificationScreen';
import Reset_password from './sign/reset_pass';
import SplashScreen from './home/splashScreen';
import InfoProfileScreen from './profile/infoProfileScreen';
import Explore_location from './profile/explore_location';
import Details_check_out from './profile/adressesScreen';



const Sign_stack = createStackNavigator({
    SignIn_stack: {
        screen: Sign_in
    },
    SignUp_stack: {
        screen: Sign_Up
    },
    Email_stack: {
        screen: Recover_password
    },
    Phone_stack: {
        screen: Register_phoneScreen
    },
    Code_stack: {
        screen: VerificationScreen
    },
    ResetPass_stack: {
        screen: Reset_password
    }
}
    , {
        headerMode: 'none',
        initialRouteName: "SignIn_stack"
    })
const Home_stack = createStackNavigator({
    Home1_stack: {
        screen: Home
    },
    Products_stack: {
        screen: Products
    },
    Details_product_stack: {
        screen: Details_product
    },
    info_profile_stack: {
        screen: InfoProfileScreen
    },
    Details_check_out: {
        screen: Details_check_out
    },
    Explore_location: {
        screen: Explore_location
    }

}
    , {
        headerMode: 'none',
        initialRouteName: "Home1_stack"
    })

const Tabs = createMaterialBottomTabNavigator(
    {
        Profile_tab: {
            screen: MainProfileScreen,
            navigationOptions: {
                tabBarLabel: "Profile",
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        <FontAwesome name="user" color={tintColor} size={26} />
                    </View>
                ),
            }
        },
        Cart_tab: {
            screen: Cart,
            navigationOptions: {
                tabBarLabel: "Cart",
                tabBarIcon: ({ tintColor }) => (
                    <View>

                        <MaterialCommunityIcons name="cart" color={tintColor} size={26} />
                    </View>
                ),
            }
        },
        Favorite_tab: {
            screen: Favorite,
            navigationOptions: {
                tabBarLabel: "Favorite",
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        <MaterialCommunityIcons name="heart" color={tintColor} size={26} />
                    </View>
                ),
            }
        },
        Home_tab: {
            screen: Home,
            navigationOptions: {
                tabBarLabel: "Home",
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        <MaterialCommunityIcons name="home" color={tintColor} size={26} />
                    </View>
                ),
            }
        },

    }, {

    initialRouteName: 'Home_tab',
    activeColor: Colors.button_check_out,
    inactiveColor: "#999",
    barStyle:
    {
        backgroundColor: Colors.back_ground_color,
        elevation: 5,
        elevation: 3,
        borderTopWidth: .4,
        borderColor: Colors.button_check_out
    }
}
)
const Splash_stack = createStackNavigator({
    Splash: SplashScreen
}, {
    headerMode: 'none',
    initialRouteName: "Splash"
})
const NavigationScreen = createAppContainer(
    createSwitchNavigator(
        {
            Tab_switch: Tabs,
            Home_stack_switch: Home_stack,
            Sign_stack: Sign_stack,
            Splash_stack: Splash_stack

        }, {
        initialRouteName: 'Splash_stack'
    }
    )

)
export default NavigationScreen;