import React from 'react'
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, Button, TouchableOpacity, Image} from "react-native";
import { TextInput } from 'react-native-gesture-handler';

function CreateAccount() {
  return (
    <>
   
      <View style={styles.container2} >

      <Image style={styles.img} source={require('../assets/logo.jpg')} />

        <TextInput style={styles.textardo} type="email" placeholderTextColor={"white"}placeholder="Mail" />
        <TextInput style={styles.textardo} type="password" placeholderTextColor={"white"} placeholder="Password" />
        <TextInput style={styles.textardo} type="text" placeholderTextColor={"white"} placeholder="Id" />
        <TextInput style={styles.textardo} type="date" placeholderTextColor={"white"} placeholder="Vencimiento" />
        <TextInput style={styles.textardo} type="text" placeholderTextColor={"white"} placeholder="Clase" />
  
      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginText}>Create Account</Text>
      </TouchableOpacity>
      </View>
      </>
    )

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#e0103b",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginBottom:10,
    marginTop:50
  },
  container2: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    color : "white"
  },
  textardo: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    color: "white",
    borderColor: "white",
    borderRadius: 10,
    width: "80%",
    padding: 10,
  },
  img: {
    width: 300,
    height: 75,
    marginBottom: 20,
  },
  })

export default CreateAccount