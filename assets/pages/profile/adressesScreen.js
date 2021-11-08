import React from "react"
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Dimensions,
    StatusBar,
    Alert,
    Linking,
    ToastAndroid,
    Image
} from "react-native"
import GetLocation from 'react-native-get-location'
import AntDesign from "react-native-vector-icons/AntDesign"
import { StylesProfile } from "./stylesProfile";
import { Colors } from "../colors";
import { RadioButton, Modal, Portal, Provider } from 'react-native-paper';
import FontAwesome from "react-native-vector-icons/FontAwesome"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Text_input_phone from '../../components/Text_input_phone';
import { CreditCardInput } from "react-native-credit-card-input";
const { width, height } = Dimensions.get("window")
import { Textarea } from "native-base";
const Details_check_out = ({ navigation }) => {
    const [phone, setPhone] = React.useState("")
    const [location, setLocation] = React.useState("")
    const [valid_sign_phone, set_valid_sign_phone] = React.useState(false)
    const [checked, setChecked] = React.useState();
    const isPhoneValid = () => {
        if (String(phone).length < 11 || String(phone).length > 14) {
            set_valid_sign_phone(false)
        } else {
            set_valid_sign_phone(true)
        }
    }
    React.useEffect(() => {
        BackHandler.addEventListener(
            'hardwareBackPress',
            handleBackButtonPressAndroid
        )
        return () => {
            BackHandler.removeEventListener(
                'hardwareBackPress',
                handleBackButtonPressAndroid
            );
        }
    }, [])

    const handleBackButtonPressAndroid = () => {
        navigation.navigate('Cart_tab')
        // We have handled the back button
        // Return `true` to prevent react-navigation from handling it
        return true;
    };

    const latitude1 = JSON.stringify(location.latitude);
    const longitude1 = JSON.stringify(location.longitude);


    const url = Platform.select({
        ios: "maps:" + latitude1 + "," + longitude1,
        android: "geo:" + latitude1 + "," + longitude1
    });



    // payment ///////////////////////////////////////////
    const _onChange = (formData) => console.log(JSON.stringify(formData, null, " "));
    const _onFocus = (field) => console.log("focusing", field);
    const [visible_credit_card, set_visible_credit_card] = React.useState(false);
    const showModalAccount = () => set_visible_credit_card(true);
    const hideModalAccount = () => set_visible_credit_card(false);
    const Credit_cart_inputs = () => (
        <>
            <Provider>
                <Portal>
                    <Modal
                        visible={visible_credit_card}
                        onDismiss={hideModalAccount}
                        contentContainerStyle={Style_in.modal}>
                        <View style={Style_in.containerModal}>
                        <Text style={[Style_in.title_update, { marginBottom: height * .02 }]}>Credit_Card</Text>
                            <View style={{ alignItems: 'center' }}>
                                <CreditCardInput
                                    autoFocus
                                    requiresName
                                    requiresCVC
                                    requiresPostalCode
                                    labelStyle={Style_in.label}
                                    inputStyle={Style_in.input}
                                    validColor={"black"}
                                    invalidColor={"red"}
                                    placeholderColor={"darkgray"}
                                    onFocus={_onFocus}
                                    onChange={_onChange} />
                            </View>
                            <View style={Style_in.container_buttons_update}>
                                <TouchableOpacity style={Style_in.button_update}
                                >
                                    <Text style={Style_in.text_in_button}>Pay</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[Style_in.button_update, { backgroundColor: "#FFFFFF" }]}
                                    onPress={() => {
                                        hideModalAccount()
                                    }}
                                >
                                    <Text style={[Style_in.text_in_button, { color: Colors.button_check_out }]}>Cancel</Text>
                                </TouchableOpacity>


                            </View>
                        </View>
                    </Modal>
                </Portal>
            </Provider>
        </>
    )


    const _requestLocation = () => {
        setLocation("")

        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 150,
        })
            .then(location => {
                setLocation(location)
                console.log(JSON.stringify(location))

            })
            .catch(ex => {
                const { code, message } = ex;
                console.warn(code, message);
                if (code === 'CANCELLED') {
                    Alert.alert('Location cancelled by user or by another request');
                }
                if (code === 'UNAVAILABLE') {
                    Alert.alert('Location service is disabled or unavailable');
                }
                if (code === 'TIMEOUT') {
                    Alert.alert('Location request timed out');
                }
                if (code === 'UNAUTHORIZED') {
                    Alert.alert('Authorization denied');
                }
                setLocation("")
            });

        ToastAndroid.show("Location Token", ToastAndroid.SHORT)
    }
    return (
        <>
            <ScrollView style={{ flex: 1 }}>
                <View style={StylesProfile.back_ground}>
                    <StatusBar
                        backgroundColor={Colors.back_ground_color}
                        barStyle="dark-content"
                    />
                    <View style={StylesProfile.back_header_container}>
                        <View style={{ width: "16%" }}></View>
                        <View style={StylesProfile.view_name_in_header}>
                            <Text style={StylesProfile.name_header}>Check Out</Text>
                        </View>
                        <TouchableOpacity style={{ width: "16%" }}>
                            <AntDesign
                                name="arrowleft"
                                size={25}
                                color="#000"
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={Style_in.box}>
                        <TouchableOpacity style={Style_in.box_location}
                            onPress={() => {
                                _requestLocation()
                                navigation.navigate("Explore_location")
                            }}
                        >
                            <Image
                            source={require('../images/google-map-99.jpg')}
                            style={{width:"100%",height:"100%",borderRadius:10}}
                            resizeMode="stretch"
                            />
                        </TouchableOpacity>
                        <Textarea
                            style={{
                                width: width * .9,
                                borderRadius: 10,
                            }}
                            rowSpan={5}
                            bordered
                            placeholder="Your Notice Adress" />

                        <RadioButton.Group
                            onValueChange={(value) => {
                                setChecked(value)
                                if (value == "credit") {
                                    showModalAccount()
                                } else if (value == "cash") {
                                    hideModalAccount()
                                }
                            }}
                            value={checked}
                        >
                            <View style={Style_in.container_radios_name}>
                                <View style={Style_in.box_radio}>
                                    <Text>Credit Card</Text>
                                    <FontAwesome
                                        name="credit-card-alt"
                                        size={20}
                                        color={Colors.dark}
                                        style={{ marginLeft: 8, marginRight: 15 }}
                                    />
                                    <RadioButton
                                        value="credit"
                                        color={Colors.button_check_out}
                                        uncheckedColor={"#777"}

                                    />
                                </View>
                                <View style={Style_in.box_radio}>
                                    <Text>Cash</Text>
                                    <MaterialCommunityIcons
                                        name="cash"
                                        size={30}
                                        color={Colors.dark}
                                        style={{ marginLeft: 8, marginRight: 15 }}
                                    />
                                    <RadioButton
                                        color={Colors.button_check_out}
                                        value="cash"
                                        uncheckedColor={"#777"}
                                    />
                                </View>
                            </View>
                        </RadioButton.Group>
                        <Text_input_phone
                            placeHolder="phone"
                            term={phone}
                            onTermChange={newPhone => setPhone(newPhone)}
                        />
                        <View style={Style_in.container_payment_summary}>
                            <View style={Style_in.box_suumary_text}>
                                <Text style={Style_in.summary_text}>Paymeny Summary</Text>
                            </View>
                            <View style={Style_in.item_box_details_payment}>
                                <Text style={Style_in.name_datails_text}>EGP {25}</Text>
                                <Text style={Style_in.name_datails_text}>Subtotal</Text>
                            </View>
                            <View style={Style_in.item_box_details_payment}>
                                <Text style={Style_in.name_datails_text}>EGP {2.5}</Text>
                                <Text style={Style_in.name_datails_text}>Service Charge</Text>
                            </View>
                            <View style={Style_in.item_box_details_payment}>
                                <Text style={Style_in.name_datails_text}>EGP {27.5}</Text>
                                <Text style={[Style_in.name_datails_text, { fontWeight: "600" }]}>Total Amount</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={Style_in.button_place_Order}
                            onPress={() => {
                                // Linking.openURL(url);
                                showModalAccount()
                            }}
                        >
                            <Text style={Style_in.place_order_text}>Place Order</Text>
                        </TouchableOpacity>
                    </View>
                    {Credit_cart_inputs()}
                </View>
            </ScrollView>

        </>
    )
}

const Style_in = StyleSheet.create({
    box: {
        width: width,
        height: height * .925,
        backgroundColor: Colors.back_ground_color,
        alignItems: "center",
    },
    box_location: {
        width: width * .8,
        height: height * .12,
        backgroundColor: Colors.dark,
        marginBottom: height * .02,
        borderRadius: 10
    },
    box_radio: {
        flexDirection: "row",
        alignItems: "center",
        //    justifyContent:"space-between"
    },
    container_radios_name: {
        backgroundColor: Colors.back_ground_color,
        alignItems: "flex-end",
        width: width * .9,
        borderWidth: .4,
        marginTop: height * .02,
        elevation: 2,
        borderRadius: 10,
        borderColor: "#999992",
        marginBottom: height * .02
    },
    summary_text: {
        fontSize: width * .05,
        fontWeight: "600",
        fontFamily: "san-serif",
        color: Colors.dark
    },
    box_suumary_text: {
        width: "100%",
        paddingVertical: height * .01,
        color: Colors.dark
    },
    container_payment_summary: {
        width: width * .9,
        backgroundColor: Colors.back_ground_color,
        marginTop: height * .01,
        alignItems: "center",
        paddingVertical: height * .01,
        borderRadius: 10
    },
    item_box_details_payment: {
        width: "100%",
        padding: height * .01,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row"
    },
    name_datails_text: {
        fontSize: width * .04,
        fontWeight: "400",
        color: Colors.dark
    },
    place_order_text: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: "400"
    }, panelHeader: {
        alignItems: "center"
    },
    panelHandle: {
        width: 50,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#00000060",
        marginBottom: height * .01
    },
    panelTitle: {
        fontSize: width * .055,
        // height: height*.05,
        fontWeight: "400"
    },
    panelSubtitle: {
        fontSize: width * .035,
        fontWeight: "300",
        marginBottom: 10,
    },
    panelButton: {
        padding: height * .007,
        borderRadius: 10,
        backgroundColor: Colors.button_check_out,
        alignItems: 'center',
        marginVertical: width * .02,
    },
    panelButtonTitle: {
        fontSize: width * .042,
        fontWeight: '400',
        color: 'white',
    },
    panel: {
        paddingHorizontal: width * .05,
        backgroundColor: '#FFFFFF',
        // backgroundColor: Colors.dark,
        paddingTop: height * .004,
    },
    header_sheet: {
        backgroundColor: "#ffffff",
        shadowColor: "#333333",
        shadowOffset: { width: -1, height: -3 },
        shadowRadius: 2,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    button_place_Order: {
        width: width * .8,
        height: height * .07,
        elevation: 2,
        backgroundColor: Colors.button_check_out,
        borderRadius: 10,
        marginTop: height * .03,
        alignItems: "center",
        justifyContent: "center"
    },
    label: {
        color: "black",
        fontSize: 12,
    },
    input: {
        fontSize: 16,
        color: "black",
    },
    modal: {
        backgroundColor: Colors.back_ground_color,
        alignItems: "center",
        width: width * .85,
        alignSelf: "center",
        borderRadius: width * .1,
        elevation: 5,
        paddingVertical: height * .05
    },
    containerModal: {
        width: width * .85,
        backgroundColor: Colors.back_ground_color,
        alignItems: "center",
        borderRadius: width * .1,
    },
    container_buttons_update: {
        width: "100%",
        justifyContent: "space-around",
        alignItems: 'center',
        flexDirection: "row",
        marginTop: height * .01
    },
    text_in_button: {
        fontSize: 13,
        color: "#FFFFFF"
    },
    button_update: {
        width: "40%",
        height: height * .06,
        backgroundColor: Colors.button_check_out,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: width * .02,
        elevation: 3,
        borderWidth: .7,
        borderColor: Colors.button_check_out
    },
    title_update: {
        fontSize: width * .045,
        fontWeight: "500",
        color: "#000"
    },

})

export default Details_check_out;