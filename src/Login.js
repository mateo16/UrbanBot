import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {StyleSheet, Text, View, TextInput, TouchableOpacity, Alert,} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {getAuth, signInWithEmailAndPassword, updateProfile,} from "firebase/auth";
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
  const handleUpdate = () => {
    updateProfile(auth.currentUser, {
      displayName: "1858b64d-40bd-47ee-8025-547e68833fcb",
      photoURL: "FORCE 6",
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
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email."
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <TouchableOpacity onPress={handleUpdate} style={styles.loginBtn}>
        <Text style={styles.loginBtnText}>update</Text>
      </TouchableOpacity>

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
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
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
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});
