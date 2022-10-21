import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions} from "react-native";
const WIDTH = Dimensions.get('window').width;
const HEIGHT_MODAL = Dimensions.get('window').height ;

//https://www.youtube.com/watch?v=aSOsfpsMriI 


const SimpleModal = () => {


    return (
        <TouchableOpacity
        
        disabled={true}
        style={styles.container}
        >

            <View style={styles.modal} >

            </View>

        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        height: HEIGHT_MODAL - 100,
        width: WIDTH - 80,
        paddingTop: 10,
        backgroundColor: 'white',
        borderRadius: 10,
    },
});

export default SimpleModal;