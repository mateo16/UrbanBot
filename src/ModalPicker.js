import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView} from "react-native";

const WIDTH = Dimensions.get('window').width;
const HEIGHT_MODAL = Dimensions.get('window').height ;

const HORARIOS = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];

const ModalPicker = (props) => {

    const onPressItem = (horario) => {
        props.changeModalVisibility(false);
        props.setData(horario);
    }

    const horario = HORARIOS.map((item, index) => {
        return (
            <TouchableOpacity
                key={index}
                style={styles.horario}
                onPress={() => onPressItem(item)}
            >
                <Text style={styles.textHorario}>
                    {item}               
                </Text>
            </TouchableOpacity>
        );

    });

    return (
        <TouchableOpacity
            onPress={() => props.changeModalVisibility(true)}
        style={styles.container}
        >

            <View style={styles.modal} >
                <ScrollView>
                    {horario}
                </ScrollView>

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
        height: HEIGHT_MODAL - 115,
        width: WIDTH - 60,
        paddingTop: 10,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    horario: {
        alignItems: 'flex-start',
    },
    textHorario: {
        fontSize: 20,
        margin: 20,
        fontWeight: 'bold',
    },

});

export default ModalPicker;