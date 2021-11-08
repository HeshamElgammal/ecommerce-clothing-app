// import React, { useState } from "react";
// import {
//     View,
//     TouchableOpacity,
//     Text,
//     StatusBar,
//     Dimensions,
//     ScrollView
// } from "react-native"
// const { width, height } = Dimensions.get("window")

// import { Colors } from "../colors";
// import { Style_home } from "./style_home";
// // import { CreditCardInput } from "react-native-credit-card-input"
// import { CreditCardInput } from "react-native-payment-card"
// import AntDesign from "react-native-vector-icons/AntDesign"

// const Cards = () => {

//     // _onFocus = feild => console.log('focusing', feild)
//     const _onChange = formData => console.log(JSON.stringify(formData, null, ' '))
//     return (
//         <>
//             <ScrollView style={{ flex: 1 }}>
//                 <View style={[Style_home.back_ground, { height: height, width: width,paddingHorizontal:0 }]}>
//                     <StatusBar
//                         backgroundColor={Colors.back_ground_color}
//                         barStyle="dark-content"
//                     />
//                     <View style={Style_home.back_header_container}>
//                         <View style={{ width: "16%" }}></View>
//                         <View style={Style_home.view_name_in_header}>
//                             <Text style={Style_home.name_header}>Add Credit</Text>
//                         </View>
//                         <TouchableOpacity style={{ width: "16%" }}>
//                             <AntDesign
//                                 name="arrowleft"
//                                 size={25}
//                                 color="#000"
//                             />
//                         </TouchableOpacity>
//                     </View>
//                     {/* <View style={{
//                         width: "95%",
//                         height: height * .4,
//                         backgroundColor: "#ffffff",
//                         marginTop: height * .02
//                     }}> */}
//                     {/* <CreditCardInput
//                         autoFocus
//                         requireName={true}
//                         requireCVC={true}
//                         requirePostalCode={true}
//                         validColor="black"
//                         invalidColor="red"
//                         placeholderColor="blackgray"
//                         cardScale={.9}
//                         allowScroll={true}
//                         // cardImageFront={require("./images/backCard.png")}
//                         // cardImageBack={require("./images/backCard.png")}
//                         labelStyle={{ color: "#000", fontSize: 12 }}
//                         inputStyle={{ color: "#000", fontSize: 16 }}
//                         onFocus={_onFocus}
//                         onChange={_onChange}
//                     /> */}

//                     <CreditCardInput
//                         autoFocus
//                         requiresName
//                         requiresCVC
//                         labelStyle={{ width: width }}
//                         inputStyle={{ width: width }}
//                         validColor={"black"}
//                         invalidColor={"red"}
//                         placeholderColor={"darkgray"}
//                         onChange={_onChange}
//                     />
//                     {/* </View> */}
//                 </View>
//             </ScrollView>
//         </>
//     )
// };

// export default Cards
// import React from 'react'
// import { FormProvider, useForm } from 'react-hook-form'
// import {
//   Alert,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
//   SafeAreaView,
// } from 'react-native'
// import AppLoading from 'expo-app-loading'
// import {
//   useFonts,
//   RobotoMono_400Regular,
//   RobotoMono_700Bold,
// } from '@expo-google-fonts/roboto-mono'
// import LottieView from 'lottie-react-native'

// import CreditCardForm, { Button, FormModel } from 'rn-credit-card'

// const App: React.FC = () => {
//   let [fontsLoaded] = useFonts({
//     RobotoMono_400Regular,
//     RobotoMono_700Bold,
//   })
//   const formMethods = useForm<FormModel>({
//     // to trigger the validation on the blur event
//     mode: 'onBlur',
//     defaultValues: {
//       holderName: '',
//       cardNumber: '',
//       expiration: '',
//       cvv: '',
//     },
//   })
//   const { handleSubmit, formState } = formMethods

//   function onSubmit(model: FormModel) {
//     Alert.alert('Success: ' + JSON.stringify(model, null, 2))
//   }

//   if (!fontsLoaded) {
//     return <AppLoading />
//   }

//   return (
//     <FormProvider {...formMethods}>
//       <SafeAreaView style={styles.container}>
//         <KeyboardAvoidingView
//           style={styles.avoider}
//           behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         >
//           <CreditCardForm
//             LottieView={LottieView}
//             horizontalStart
//             overrides={{
//               labelText: {
//                 marginTop: 16,
//               },
//             }}
//           />
//         </KeyboardAvoidingView>
//         {formState.isValid && (
//           <Button
//             style={styles.button}
//             title={'CONFIRM PAYMENT'}
//             onPress={handleSubmit(onSubmit)}
//           />
//         )}
//       </SafeAreaView>
//     </FormProvider>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   avoider: {
//     flex: 1,
//     padding: 36,
//   },
//   button: {
//     margin: 36,
//     marginTop: 0,
//   },
// })

// export default Appimport React from 'react'
// import { FormProvider, useForm } from 'react-hook-form'
// import {
//   Alert,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
//   SafeAreaView,
// } from 'react-native'

// import {
//   useFonts,
//   RobotoMono_400Regular,
//   RobotoMono_700Bold,
// } from '@expo-google-fonts/roboto-mono'
// import LottieView from 'lottie-react-native'

// import CreditCardForm, { Button, FormModel } from 'rn-credit-card'

// const Cards = () => {
//   let [fontsLoaded] = useFonts({
//     RobotoMono_400Regular,
//     RobotoMono_700Bold,
//   })
//   const formMethods = useForm<FormModel>({
//     // to trigger the validation on the blur event
//     mode: 'onBlur',
//     defaultValues: {
//       holderName: '',
//       cardNumber: '',
//       expiration: '',
//       cvv: '',
//     },
//   })
//   const { handleSubmit, formState } = formMethods

//   function onSubmit(model: FormModel) {
//     Alert.alert('Success: ' + JSON.stringify(model, null, 2))
//   }

  

//   return (
//     <FormProvider {...formMethods}>
//       <SafeAreaView style={styles.container}>
//         <KeyboardAvoidingView
//           style={styles.avoider}
//           behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         >
//           <CreditCardForm
//             LottieView={LottieView}
//             horizontalStart
//             overrides={{
//               labelText: {
//                 marginTop: 16,
//               },
//             }}
//           />
//         </KeyboardAvoidingView>
//         {formState.isValid && (
//           <Button
//             style={styles.button}
//             title={'CONFIRM PAYMENT'}
//             onPress={handleSubmit(onSubmit)}
//           />
//         )}
//       </SafeAreaView>
//     </FormProvider>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   avoider: {
//     flex: 1,
//     padding: 36,
//   },
//   button: {
//     margin: 36,
//     marginTop: 0,
//   },
// })

// export default Cards