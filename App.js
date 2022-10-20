import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";




import Start from "./StartStack";


function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
    </View>
  );
}

function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
    </View>
  );
}
export default function App() {
  
  return (
      <Start/>
  )
    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
