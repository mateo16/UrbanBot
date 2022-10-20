import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {StyleSheet, Text, View, TextInput, TouchableOpacity, Alert,Image} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {getAuth, signInWithEmailAndPassword, updateProfile,createUserWithEmailAndPassword} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase-config";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigation.navigate("Index");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert(errorMessage);
      });
  };
  return (
    <View style={styles.container}>
      <Image style={styles.img} source={require('../assets/logo.jpg')} />
      <StatusBar style="auto" />
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="white"
          onChangeText={(email) => setEmail(email)}
        />


        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="white"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />

      <TouchableOpacity onPress={handleSignIn} style={styles.loginBtn}>
        <Text style={styles.loginBtnText}>LOG IN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  inputView: {
    backgroundColor: "#e0103b",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  TextInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    color: "white",
    borderColor: "white",
    borderRadius: 10,
    width: "80%",
    padding: 10,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#e0103b",
  },
  loginBtnText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  img: {
    width: 300,
    height: 75,
    marginBottom: 20,
  }
});
