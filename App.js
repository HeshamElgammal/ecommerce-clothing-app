import React from 'react';
import { Provider } from 'react-redux';
import { configStore } from "./assets/pages/redux/store"
import Details_product from './assets/pages/home/detailsProduct';
import Home from './assets/pages/home/home';
import Products from './assets/pages/home/products';
import Sign_in from './assets/pages/sign/sign_in';
import Sign_Up from './assets/pages/sign/sign_up';
import Favorite from './assets/pages/home/favorite';
import Cart from './assets/pages/home/cart';
import Cards from './assets/pages/home/cards';
import VerificationScreen from './assets/pages/sign/verificationScreen';
import Register_phoneScreen from './assets/pages/sign/registerPhone';
import Recover_password from './assets/pages/sign/recover_password';
import Reset_password from './assets/pages/sign/reset_pass';
import MainProfileScreen from './assets/pages/profile/mainProflieScreen';
import InfoProfileScreen from './assets/pages/profile/infoProfileScreen';
import NavigationScreen from './assets/pages/navigationScreen';
import Adresses_Profile from './assets/pages/profile/adressesScreen';
import Explore_location from './assets/pages/profile/explore_location';
const App = () => {
  return (
    <>
      <Provider store={configStore}>
        <NavigationScreen />
      </Provider>

    </>
  )
}



export default App;











{/*
 _onChange = (formData) => console.log(JSON.stringify(formData, null, " "));
  _onFocus = (field) => console.log("focusing", field);

  import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
<CreditCardInput
              autoFocus

              requiresName
              requiresCVC
              requiresPostalCode

              labelStyle={s.label}
              inputStyle={s.input}
              validColor={"black"}
              invalidColor={"red"}
              placeholderColor={"darkgray"}

              onFocus={this._onFocus}
              onChange={this._onChange} />
          {/* )
*/}