import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView, } from "react-native";

const WIDTH = Dimensions.get('window').width;
const HEIGHT_MODAL = Dimensions.get('window').height ;

const HORARIOS = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
const HORARIOS_STRING = ['7:00 a 8:00', '8:00 a 9:00', '9:00 a 10:00', '10:00 a 11:00', '11:00 a 12:00', '12:00 a 13:00', '13:00 a 14:00', '14:00 a 15:00', '15:00 a 16:00', '16:00 a 17:00', '17:00 a 18:00', '18:00 a 19:00', '19:00 a 20:00', '20:00 a 21:00', '21:00 a 22:00',];

const ModalPicker = (props) => {

    const selectedTime = props.week[props.selectedDate].horarios;

    console.log(selectedTime)

    const onPressItem = (horario, update, setUpdate) => {
        props.setData(horario);
        setUpdate(!update);
    }

    const Salir = () => {
        props.changeModalVisibility(false);
    }

    const horario = HORARIOS.map((item, index) => {
        
        const [update, setUpdate] = useState(false); 

        return (
            <TouchableOpacity
                key={index}
                style={styles.horario}
                onPress={() => onPressItem(item, update, setUpdate)}
            >
                
                <Text style={(selectedTime.indexOf(item) === -1 ? styles.textHorario :  styles.textHorario2)}>
                    Book at {HORARIOS_STRING[index]}              
                </Text>
            </TouchableOpacity>
        );

    });

    useEffect(() => {
        console.log('ModalPicker: ', props.week[props.selectedDate].horarios);
    }, [props.week[props.selectedDate].horarios]);

    return (
        <TouchableOpacity
            onPress={() => props.changeModalVisibility(true)}
        style={styles.container}
        >
          

            <View style={styles.modal} >

                <TouchableOpacity style={styles.salir} onPress={() => Salir()}>
                    <Text style={styles.salir} >Go Back</Text>
                </TouchableOpacity>

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
        fontSize: 18,
        margin: 20,
        fontWeight: 'bold',
    },
    textHorario2: {
        fontSize: 18,
        margin: 20,
        fontWeight: 'bold',
        color: "green",
    },
    salir: {
        fontSize: 16,
        marginLeft: 2,
        marginTop : -5,
        fontWeight: 'bold',
        color: "#e0103b",
       
        alignItems: 'center',
        justifyContent: 'center',
        
    },


});

export default ModalPicker;