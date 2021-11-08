import React from "react"
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Dimensions,
    StatusBar,
    Image,
    PermissionsAndroid,
    BackHandler,
    ToastAndroid
} from "react-native"
import AntDesign from "react-native-vector-icons/AntDesign"
import DatePicker from 'react-native-date-picker'
import { RadioButton, Modal, Portal, Provider } from 'react-native-paper';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from 'react-native-image-picker';
import { StylesProfile } from "./stylesProfile";
import { Colors } from "../colors";
// import Text_input from "../../components/Text_input";
import { Change_data_user_Account } from "../redux/actions/update_data_user";
import Text_input_old_pass from "../../components/Text_input_old_pass";
import Text_input_pass from "../../components/Text_input_pass";
import Text_input_confirm_pass from "../../components/Text_input_confirm_pass";
import Text_input_name from "../../components/Text_input_name";
import Text_input_phone from "../../components/Text_input_phone";
const { width, height } = Dimensions.get("window")
const InfoProfileScreen = ({ navigation }) => {
    const select_data_user = useSelector(state => state.Global.data_user)
    const dispatch = useDispatch()

    React.useEffect(() => {
        requestCameraPermission()
    }, [])
    // ///////////////////////////////////////////////////////////
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
        navigation.navigate('Profile_tab')

        // We have handled the back button
        // Return `true` to prevent react-navigation from handling it
        return true;
    };
    // ///////////////////////////////////////////////////////////
    const [name, setName] = React.useState(select_data_user.name)
    const [checked, setChecked] = React.useState(select_data_user.type);
    const [date, setDate] = React.useState(new Date())
    const [open, setOpen] = React.useState(false)
    const [visibleAccount, setVisibleAccount] = React.useState(false);
    const showModalAccount = () => setVisibleAccount(true);
    const hideModalAccount = () => setVisibleAccount(false);
    const [valid_sign_name, set_valid_sign_name] = React.useState(false)
    const isNameValid = () => {
        if (String(name).length < 2) {
            set_valid_sign_name(false)
        } else {
            set_valid_sign_name(true)
        }
    }
    const updateAccountInfo = () => (
        <>
            <Provider>
                <Portal>
                    <Modal visible={visibleAccount}
                        onDismiss={hideModalAccount}
                        contentContainerStyle={Style_in.modal}>
                        <View style={Style_in.containerModal}>
                            <Text_input_name
                                placeHolder="Name"
                                term={name}
                                onTermChange={newName => setName(newName)}
                            />
                            <View style={Style_in.container_feild_type}>
                                <Text style={Style_in.title_update}>Type</Text>
                                <View style={{ alignSelf: "center" }}>
                                    <RadioButton.Group
                                        onValueChange={(value) => {
                                            setChecked(value)

                                        }}
                                        value={checked}

                                    >
                                        <View style={Style_in.container_radios_name}>
                                            <View style={Style_in.box_radio}>
                                                <Text>female</Text>
                                                <RadioButton
                                                    value="female"
                                                    color={Colors.button_check_out}
                                                    uncheckedColor={"#777"}
                                                />
                                            </View>
                                            <View style={Style_in.box_radio}>
                                                <Text>male</Text>
                                                <RadioButton
                                                    color={Colors.button_check_out}
                                                    value="male"
                                                    uncheckedColor={"#777"}
                                                />
                                            </View>
                                        </View>
                                    </RadioButton.Group>
                                </View>
                            </View>
                            <View style={[Style_in.container_feild_type, { marginTop: height * .03 }]}>
                                <Text style={Style_in.title_update}>Date-Of-Birth</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        setOpen(true)
                                    }}
                                >

                                    <Text style={[Style_in.title_update, {
                                        fontWeight: "300",
                                        marginTop: height * .01
                                    }]}> {date.toISOString()
                                        .substr(0, 10)
                                        .replace('T', ' ')} </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={Style_in.container_buttons_update}>

                                <TouchableOpacity style={Style_in.button_update}
                                    onPress={() => {
                                        if (valid_sign_name == true) {
                                            let data = {
                                                name: name,
                                                email: select_data_user.email,
                                                phone: select_data_user.phone,
                                                password: select_data_user.password,
                                                image: select_data_user.image,
                                                type: checked,
                                                birthDate: date.toISOString()
                                                    .substr(0, 10)
                                                    .replace('T', ' '),

                                            }
                                            dispatch(Change_data_user_Account({ ...data }))
                                            hideModalAccount()
                                            ToastAndroid.show("Updated", ToastAndroid.SHORT)
                                        } else {
                                            ToastAndroid.show("Error Name", ToastAndroid.SHORT)
                                            hideModalAccount()
                                        }
                                    }}
                                >
                                    <Text style={Style_in.text_in_button}>UpDate</Text>
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
    // /////////////////////////////////////////////////////////////////////////////////////////////////
    const [visiblePhone, setVisiblePhone] = React.useState(false);
    const showModalPhone = () => setVisiblePhone(true);
    const hideModalPhone = () => {
        setVisiblePhone(false)
        setPhone("")
    };

    const isPhoneValid = () => {
        if (String(phone).length < 11 || String(phone).length > 14) {
            set_valid_sign_phone(false)
        } else {
            set_valid_sign_phone(true)
        }
    }

    const [valid_sign_phone, set_valid_sign_phone] = React.useState(false)
    const [phone, setPhone] = React.useState("")
    const updatePhone = () => (
        <>
            <Provider>
                <Portal>
                    <Modal
                        visible={visiblePhone}
                        onDismiss={hideModalPhone}
                        contentContainerStyle={Style_in.modal}>
                        <View style={Style_in.containerModal}>
                            <Text style={[Style_in.title_update, { marginBottom: height * .02 }]}>Update Phone</Text>
                            <Text_input_phone
                                placeHolder="phone"
                                term={phone}
                                onTermChange={newPhone => setPhone(newPhone)}
                            />
                            <View style={Style_in.container_buttons_update}>
                                <TouchableOpacity style={Style_in.button_update}
                                    onPress={() => {
                                        if (valid_sign_phone == true) {
                                            let data = {
                                                name: select_data_user.name,
                                                email: select_data_user.email,
                                                phone: phone,
                                                password: select_data_user.password,
                                                image: select_data_user.image,
                                                type: select_data_user.type,
                                                birthDate: select_data_user.birthDate
                                            }
                                            dispatch(Change_data_user_Account({ ...data }))
                                            hideModalPhone()
                                            ToastAndroid.show("Updated", ToastAndroid.SHORT)
                                        } else {
                                            ToastAndroid.show("Error Phone", ToastAndroid.SHORT)
                                            hideModalPhone()
                                        }
                                    }}
                                >
                                    <Text style={Style_in.text_in_button}>UpDate</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[Style_in.button_update, { backgroundColor: "#FFFFFF" }]}
                                    onPress={() => {
                                        hideModalPhone()
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
    // ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const [visiblePass, setVisiblePass] = React.useState(false);
    const showModalPass = () => setVisiblePass(true);
    const hideModalPass = () => {
        setVisiblePass(false)
    };
    const [oldPass, setoldPass] = React.useState()
    const [newPassword, setPassword] = React.useState("")
    const [ConfirmPassword, setConfirmPassword] = React.useState()
    const isPassValid = () => {
        if (String(newPassword).length < 8) {
            set_valid_sign_pass(false)
        } else {
            set_valid_sign_pass(true)
        }
    }

    const isConfirmPassValid = () => {
        if (String(ConfirmPassword) != String(newPassword)) {
            set_valid_sign_confirm_pass(false)
        } else {
            set_valid_sign_confirm_pass(true)
        }
    }

    const [valid_sign_pass, set_valid_sign_pass] = React.useState(false)
    const [valid_sign_confirm_pass, set_valid_sign_confirm_pass] = React.useState(false)

    React.useEffect(() => {
        isConfirmPassValid()
        isNameValid()
        isPassValid()
        isPhoneValid()
    }, [ConfirmPassword, newPassword, name, phone])
    const updatePass = () => (
        <>
            <Provider>
                <Portal>
                    <Modal
                        visible={visiblePass}
                        onDismiss={hideModalPass}
                        contentContainerStyle={Style_in.modal}>
                        <View style={Style_in.containerModal}>
                            <Text style={[Style_in.title_update, { marginBottom: height * .02 }]}>Update Password</Text>
                            <Text_input_old_pass
                                term={oldPass}
                                placeHolder="Old Password"
                                onTermChange={newPassword => setoldPass(newPassword)}
                            />

                            <Text_input_pass
                                term={newPassword}
                                placeHolder="New Password"
                                onTermChange={newPassword => setPassword(newPassword)}
                            />

                            <Text_input_confirm_pass
                                pass={ConfirmPassword}
                                placeHolder="Confirm Password"
                                onTermChange={newConfirmPass => setConfirmPassword(newConfirmPass)}
                                term={ConfirmPassword}
                            />
                            <View style={Style_in.container_buttons_update}>
                                <TouchableOpacity style={Style_in.button_update}
                                    onPress={() => {
                                        if ((valid_sign_pass && valid_sign_confirm_pass) == true) {
                                            let data = {
                                                name: select_data_user.name,
                                                email: select_data_user.email,
                                                phone: select_data_user.phone,
                                                password: newPassword,
                                                image: select_data_user.image,
                                                type: select_data_user.type,
                                                birthDate: select_data_user.birthDate,

                                            }
                                            dispatch(Change_data_user_Account({ ...data }))
                                            ToastAndroid.show("updated", ToastAndroid.SHORT)
                                            hideModalPass()
                                        } else {
                                            ToastAndroid.show("Error Pass", ToastAndroid.SHORT)
                                            hideModalPass()
                                        }



                                    }
                                    }
                                >
                                    <Text style={Style_in.text_in_button}>UpDate</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[Style_in.button_update, { backgroundColor: "#FFFFFF" }]}
                                    onPress={() => {
                                        hideModalPass()
                                        setoldPass("")
                                        setPassword("")
                                        setConfirmPassword("")

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

    // ////////////////////////////////////////////////////////////////////////////////////////////////
    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "Cool Photo App Camera Permission",
                    message: "Cool Photo App needs access to your camera " + "so you can take awesome pictures.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                });
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the camera");
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const [date_photo, setData_photo] = React.useState()
    const [photo_uri, set_photo_uri] = React.useState()
    const selectFromGallery = () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.launchImageLibrary({ options, includeBase64: true }, (res) => {
            console.log('Response = ', res);

            if (res.didCancel) {
                console.log('User cancelled image picker');
            } else if (res.error) {
                console.log('ImagePicker Error: ', res.error);
            } else if (res.customButton) {
                console.log('User tapped custom button: ', res.customButton);
                alert(res.customButton);
            } else {
                setData_photo(res.assets[0])
                set_photo_uri(res.assets[0].uri + "")
                let data = {
                    name: select_data_user.name,
                    email: select_data_user.email,
                    phone: select_data_user.phone,
                    password: select_data_user.password,
                    image: res.assets[0].uri + "",
                    type: select_data_user.type,
                    birthDate: select_data_user.birthDate,
                }
                dispatch(Change_data_user_Account({ ...data }))
            }
        });

    }
    const launchCamera = () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.launchCamera(options, (res) => {
            console.log('Response = ', res);

            if (res.didCancel) {
                console.log('User cancelled image picker');
            } else if (res.error) {
                console.log('ImagePicker Error: ', res.error);
            } else if (res.customButton) {
                console.log('User tapped custom button: ', res.customButton);
                alert(res.customButton);
            } else {
                setData_photo(res.assets[0])
                set_photo_uri(res.assets[0].uri + "")
                let data = {
                    name: select_data_user.name,
                    email: select_data_user.email,
                    phone: select_data_user.phone,
                    password: select_data_user.password,
                    image: res.assets[0].uri + "",
                    type: select_data_user.type,
                    birthDate: select_data_user.birthDate,
                }
                dispatch(Change_data_user_Account({ ...data }))
            }
        });

    }
    // ////////////////////////////////////////////////////////////////////////////////////////////////
    const [snap, setSnap] = React.useState(1)
    const bs = React.createRef()
    const fall = new Animated.Value(1)
    const renderContent = () => (
        <>
            <View style={Style_in.panel}>
                <ScrollView style={{ width: "100%", height: "100%" }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={Style_in.panelTitle}>Upload Photo</Text>
                        <Text style={Style_in.panelSubtitle}>Choose Your Profile Picture</Text>
                    </View>
                    <TouchableOpacity style={Style_in.panelButton}
                        onPressIn={() => {
                            launchCamera()
                            bs.current.snapTo(1)
                            setSnap(1)
                        }}>
                        <Text style={Style_in.panelButtonTitle}>Take Photo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Style_in.panelButton}
                        onPressIn={() => {
                            selectFromGallery()
                            bs.current.snapTo(1)
                            setSnap(1)
                        }}
                    >
                        <Text style={Style_in.panelButtonTitle}>Choose From Library</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={Style_in.panelButton}
                        onPressIn={() => {
                            bs.current.snapTo(1)
                            setSnap(1)
               
                        }}>
                        <Text style={Style_in.panelButtonTitle}>Cancel</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </>
    )
    const renderHeader = () => (
        <>
            <View style={Style_in.header_sheet}>
                <View style={Style_in.panelHeader}>
                    <View style={Style_in.panelHandle} />
                </View>
            </View>
        </>
    )
    // ////////////////////////////////////////////////////////////////////////////////////////////////
    return (
        <>
            <ScrollView style={{ flex: 1 }}>
                <View style={[StylesProfile.back_ground]}>
                    <BottomSheet
                        ref={bs}
                        snapPoints={[height * .35, 0]}
                        borderRadius={10}
                        initialSnap={snap}
                        callbackNode={fall}
                        renderContent={renderContent}
                        renderHeader={renderHeader}
                        enabledHeaderGestureInteraction={true}
                    />
                    <StatusBar
                        backgroundColor={Colors.back_ground_color}
                        barStyle="dark-content"
                    />
                    {/*/////////////////////////////////////////////// */}
                    <View style={StylesProfile.header_main_profile}>
                        <Image
                            source={(select_data_user.image == "" || select_data_user.image == ("undefined" || null)) ?
                                require("../images/user.png") : { uri: select_data_user.image }
                            }
                            style={StylesProfile.image_style}
                            resizeMode={"cover"}
                        />
                        <TouchableOpacity
                            style={Style_in.button_cam}
                            onPress={() => {
                                bs.current.snapTo(0)
                                // selectFromGallery()
                            }}
                        >
                            <AntDesign
                                name="camera"
                                size={width * .1}
                                color={Colors.button_check_out}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={Style_in.button_icon_back}
                            onPress={() => {
                                navigation.navigate("Profile_tab")
                            }}
                        >
                            <AntDesign
                                name="arrowleft"
                                size={25}
                                color="#000"
                            />
                        </TouchableOpacity>
                    </View>
                    {/*/////////////////////////////////////////////// */}
                    <View style={Style_in.container_items}>
                        <View style={Style_in.header_data_items}>
                            <Text style={StylesProfile.text_title}>Account Info</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    showModalAccount()
                                }}
                            >
                                <AntDesign
                                    name="edit"
                                    size={25}
                                    color={Colors.button_check_out}
                                />
                            </TouchableOpacity>

                        </View>
                        <View
                            style={Style_in.data_in_items}
                        >
                            <View style={Style_in.in_data_items}>
                                <Text style={[StylesProfile.text_title]}>
                                    <Text style={{ fontSize: 15 }}>
                                        {select_data_user.name}
                                    </Text> : Name
                                </Text>
                                <Text style={[StylesProfile.text_title,
                                { marginTop: height * .008 }]}>
                                    <Text style={{ fontSize: 15 }}>
                                        {select_data_user.type}
                                    </Text> : type
                                </Text>
                                <Text style={[StylesProfile.text_title,
                                { marginTop: height * .008 }]}>
                                    <Text style={{ fontSize: 15 }}>
                                        {select_data_user.birthDate}
                                    </Text> : BirthDate
                                </Text>
                            </View>
                        </View>
                    </View>
                    {/*/////////////////////////////////////////////// */}
                    <View style={Style_in.container_items}>
                        <View style={Style_in.header_data_items}>
                            <Text style={StylesProfile.text_title}>Phone Number</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    showModalPhone()
                                }}
                            >
                                <AntDesign
                                    name="edit"
                                    size={25}
                                    color={Colors.button_check_out}
                                />
                            </TouchableOpacity>

                        </View>
                        <View
                            style={Style_in.data_in_items}
                        >
                            <View style={Style_in.in_data_items}>
                                <Text style={[StylesProfile.text_title]}>
                                    {select_data_user.phone}
                                </Text>
                            </View>
                        </View>
                    </View>
                    {/*/////////////////////////////////////////////// */}
                    <View style={Style_in.container_items}>
                        <View style={Style_in.header_data_items}>
                            <Text style={StylesProfile.text_title}>Password</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    showModalPass()
                                }}
                            >
                                <AntDesign
                                    name="edit"
                                    size={25}
                                    color={Colors.button_check_out}
                                />
                            </TouchableOpacity>

                        </View>
                        <View
                            style={Style_in.data_in_items}
                        >
                            <View style={Style_in.in_data_items}>
                                <Text style={[StylesProfile.text_title]}>
                                    {"************"}
                                </Text>
                            </View>
                        </View>
                    </View>
                    {/*/////////////////////////////////////////////// */}
                    <View style={[Style_in.container_items, {
                        borderBottomWidth: 0,
                        marginTop: height * .1
                    }]}>
                        <TouchableOpacity style={Style_in.button_log_out}
                            onPress={() => {
                                let data = {
                                    name: "",
                                    email: "",
                                    phone: "",
                                    password: "",
                                    image: "",
                                    type: "",
                                    birthDate: "",
                                }
                                dispatch(Change_data_user_Account({ ...data }))
                                ToastAndroid.show("Loged out", ToastAndroid.SHORT)
                                navigation.navigate("SignIn_stack")
                            }}
                        >
                            <Text style={{
                                fontSize: width * .05,
                                fontWeight: "400",
                                color: "#222"
                            }}>Log Out</Text>
                        </TouchableOpacity>
                    </View>
                    {/* /////////////////////////////////////////////////////// */}
                    <DatePicker
                        modal
                        open={open}
                        date={date}
                        mode="date"
                        androidVariant="iosClone"
                        textColor={"#ffffff"}
                        fadeToColor={"#ffffff", "none"}
                        onConfirm={(date) => {
                            setOpen(false)
                            // let date_birth=date.toISOString().substr(0, 10).replace('T', ' ')
                            setDate(date)
                            console.log(date.toISOString()
                                .substr(0, 10)
                                .replace('T', ' '))
                        }}
                        onCancel={() => {
                            setOpen(false)
                        }}
                    />
                    {updateAccountInfo()}
                    {updatePhone()}
                    {updatePass()}
                </View>
            </ScrollView>
        </>
    )
}
const Style_in = StyleSheet.create({
    button_cam: {
        position: "absolute",
        right: "56%",
        top: "79%",
        width: width * .12,
        height: width * .1
    },
    button_icon_back: {
        position: "absolute",
        right: "4%",
        top: "15%"
    },
    container_items: {
        width: "100%",
        backgroundColor: "#ffff",
        marginTop: height * .02,
        paddingVertical: width * .03,
        borderBottomWidth: 1,
        borderColor: "#888"
    },
    data_in_items: {
        width: "100%",
        alignSelf: "center",
        marginTop: height * .01,
        borderWidth: .5,
        borderColor: Colors.button_check_out,
        padding: width * .02,
        borderRadius: width * .02
    },
    in_data_items: {
        width: "100%",
        alignItems: "flex-start"
    },
    header_data_items: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    panelHeader: {
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
        paddingTop: height * .008,
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
    title_update: {
        fontSize: width * .04,
        fontWeight: "400",
        color: "#000"
    },
    box_radio: {
        flexDirection: "row",
        alignItems: "center"
    },
    container_radios_name: {
        width: "80%",
        marginTop: height * .01,
        justifyContent: "space-between",
        flexDirection: "row",
        alignSelf: "center"
    },
    container_feild_type: {
        width: "90%",
        padding: 5,
        alignItems: "flex-end"
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
    modal: {
        backgroundColor: Colors.back_ground_color,
        alignItems: "center",
        padding: 0,
        width: width * .75,
        alignSelf: "center",
        borderRadius: width * .1,
        elevation: 5,
    },
    containerModal: {
        width: width * .75,
        backgroundColor: Colors.back_ground_color,
        alignItems: "center",
        borderRadius: width * .1,
        paddingVertical: height * .03,
    },
    button_log_out: {
        width: width * .7,
        height: height * .07,
        backgroundColor: Colors.back_ground_color,
        borderRadius: width * .03,
        alignSelf: "center",
        borderWidth: .8,
        borderColor: Colors.button_check_out,
        alignItems: "center",
        justifyContent: "center"
    }
})
export default InfoProfileScreen;