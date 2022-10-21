import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions} from "react-native";

const WIDTH = Dimensions.get('window').width;
const HEIGHT_MODAL = 150;


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
        height: HEIGHT_MODAL,
        width: WIDTH - 80,
        paddingTop: 10,
        backgroundColor: 'white',
        borderRadius: 10,
    },
});

export default SimpleModal;