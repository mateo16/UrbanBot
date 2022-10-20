import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, Button, TouchableOpacity, Image} from "react-native";
import { TextInput } from 'react-native-gesture-handler';
import {getAuth,updateProfile,createUserWithEmailAndPassword} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase-config";



export default function CreateAccount() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [type, setType] = useState("");

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
 
  const CreateUser = () =>{
    console.log('aaa')
    createUserWithEmailAndPassword(auth,email, password).then(function(){
      // Handle Errors here.
      handleUpdate()
    }, function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
      } else {
          console.error(error);
      }
      // [END_EXCLUDE]
  });}
  
  const handleUpdate = () => {
    updateProfile(auth.currentUser, {
      displayName: userId,
      photoURL: type,
    })
      .then(() => {
        console.log("Profile updated!");
        // ...
      })
      .catch((error) => {
        console.log(error);
        // ...
      });
  };

  return (
    <>
   
      <View style={styles.container2} >

      <Image style={styles.img} source={require('../assets/logo.jpg')} />

        <TextInput style={styles.textardo} type="email" placeholderTextColor={"white"}placeholder="Mail" onChangeText={(email) => setEmail(email)}/>
        <TextInput style={styles.textardo} type="password" placeholderTextColor={"white"} placeholder="Password" onChangeText={(password) => setPassword(password)}/>
        <TextInput style={styles.textardo} type="text" placeholderTextColor={"white"} placeholder="Id" onChangeText={(userId) => setUserId(userId)}/>
        <TextInput style={styles.textardo} type="text" placeholderTextColor={"white"} placeholder="Clase" onChangeText={(type) => setType(type)}/>
  
      <TouchableOpacity style={styles.loginBtn} o>
        <Text onPress={CreateUser}style={styles.loginText}>Create Account</Text>
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
