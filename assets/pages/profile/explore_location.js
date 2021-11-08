import React, { useEffect } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    StatusBar,

} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Colors } from '../colors';


const { width, height } = Dimensions.get("window");


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
    navigation.navigate('Details_check_out')
    // We have handled the back button
    // Return `true` to prevent react-navigation from handling it
    return true;
};
const Explore_location = ({navigation}) => {
    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor={Colors.back_ground_color}
                barStyle="dark-content"
            />
            <MapView provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
            >
                <Marker
                    coordinate={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                    }}
                    image={require('../images/map_marker.png')}
                    title="test mark"
                    description="this is my location"
                />
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height
    },
    map: {
        height: "100%"
    },
    
})

export default Explore_location;