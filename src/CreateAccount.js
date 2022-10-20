import React from 'react'
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, Button, TouchableOpacity, Image} from "react-native";

function CreateAccount() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginText}>Create Account</Text>
      </TouchableOpacity>
    </View>)

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    marginTop:40,
    marginBottom:10
  },
  })

export default CreateAccount