import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  Modal,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import ModalPicker from "./ModalPicker";
import React, { useEffect, useState } from "react";
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import { WeekContext} from "./context/weekContext";

const TASK_NAME = "BOOK_TASK"

const currentDate = dayjs().format("YYYYMMDD");


//console.log(today.getDay());
//console.log(user);



var myHeaders = new Headers({
  Authorization:
    "Bearer MjAyMjEwMTUxOTQwMjh8NmRmNDJiNzM0NWIzNDA1Yjg5NWU0YjY2YzRlMGY3Y2J8ZWMxZDM4ZDdkMzU5NDhkMGE2MGNkOGMwYjhmYjlkZjl8NnxBcmdlbnRpbmEgU3RhbmRhcmQgVGltZXxlcy1FU3wxODU4YjY0ZDQwYmQ0N2VlODAyNTU0N2U2ODgzM2ZjYnx8fHwxfDF8MHwxMDB8fHw1OHw1NTg1fDB8Y29tLm15d2VsbG5lc3M1.430C60AE825FD3A319D5A9B7BDD3A9CC37E3FDBAA342536197BBB8CDF3B95EEC5B05EC8AF7406DBA2F19704BD083850C1E42C7EE868BB5A965973660FE7E94F7",
  "Content-Type": "application/json",
  Cookie:
    "_mwapps=ec1d38d7-d359-48d0-a60c-d8c0b8fb9df9|MjAyMjEwMTUyMjAzMDd8NmRmNDJiNzM0NWIzNDA1Yjg5NWU0YjY2YzRlMGY3Y2J8ZWMxZDM4ZDdkMzU5NDhkMGE2MGNkOGMwYjhmYjlkZjl8NnxBcmdlbnRpbmEgU3RhbmRhcmQgVGltZXxlcy1FU3wxODU4YjY0ZDQwYmQ0N2VlODAyNTU0N2U2ODgzM2ZjYnx8fHwxfDF8MHwxMDB8fHw1OHw1NTg1fDB8Y29tLm15d2VsbG5lc3M1.79E7F833F6F53DC7CA86927EFACE10D42B1FFE178894D5D3287E5D0AE87C8345B9D61559B5FD3442BAD58600120B83FDF64D7357C111B4698E593ADD45BEA661",
});

var raw = JSON.stringify({
  timeScope: "Custom",
  dateLimit: 0,
  eventType: "Class",
  dateStart: currentDate,
});


var requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow",
};

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('user')
    if(value !== null) {
      return value
    }
  } catch(e) {
    // error reading value
  }
}

async function getClasses() {
  try {
    let res = await fetch(
      "https://services.mywellness.com/Core/Facility/1c00b0c2-d2b7-46fe-bb98-6eef3be0ed7c/SearchCalendarEvents?_c=es-AR",
      requestOptions
    );
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}
async function book(id) {
  const user = getData()
  console.log(user)

  var raw2 = JSON.stringify({
    station: "9",
    userId: user,
    partitionDate: currentDate,
  });
  var requestOptions2 = {
    method: "POST",
    headers: myHeaders,
    body: raw2,
    redirect: "follow",
  };
  fetch(
    "https://services.mywellness.com/core/calendarevent/" +
      id +
      "/book?_c=es-AR",
    requestOptions2
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}
function getId(classes) {
  let clases = classes.data.eventItems;
  let laclase = clases.find((o) => {
    if (o.startHour === 18 && o.name === "FORCE 6") {
      return true;
    }
  });
  return laclase.id;
}

async function reservar() {
  var today = new Date();
  if(today.getDay() === 3 ){console.log("Miercoles " + today.getMinutes()+" : "+ today.getSeconds());}

  let classes = await getClasses();
  let id = getId(classes);
  book(id);
}

TaskManager.defineTask(TASK_NAME, () => {
  try {
    reservar();
    const receivedNewData = "Simulated fetch " + Math.random()
    console.log("My task ", receivedNewData)
    return receivedNewData
      ? "newData"
      : BackgroundFetch.Result.NoData
  } catch (err) {
    console.log("Error in task ", err)
    return "Fallo"
  }
})

export default function Home({route}) {
  const [week, setWeek] = useState([{
    "horarios":[]
  },
  {
    "horarios":[]
  },
  {
    "horarios":[]
  },
  {
    "horarios":[]
  },
  {
    "horarios":[]
  },
  {
    "horarios":[]
  }
  ]);


  const RegisterBackgroundTask = async () => {
    console.log("Registering background task");
    try {
      await BackgroundFetch.registerTaskAsync(TASK_NAME, {
        minimumInterval: 5, // seconds,
      })
      console.log("Task registered")
    } catch (err) {
      console.log("Task Register failed:", err)
    }
  }

  const navigation = useNavigation();

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const [isModalVisible, setisModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(-1);

   const changeModalVisibility = (bool) => {
    setisModalVisible(bool);
  };


  const setData = (horario) => {
    if(week[selectedDate].horarios.length < 2 && week[selectedDate].horarios.indexOf(horario) == -1){
      week[selectedDate].horarios = [...week[selectedDate].horarios, horario]
    }else if(week[selectedDate].horarios.indexOf(horario) != -1){
      const index = week[selectedDate].horarios.indexOf(horario);
      week[selectedDate].horarios.splice(index, 1);
    }
  };

  const weekBtn = (i) =>{
    changeModalVisibility(true)
    setSelectedDate(i)
  } 

  return (
    <>
      <SafeAreaView style={styles.bigContainer}>
        <View style={styles.container}>
          <Image style={styles.img} source={require("../assets/logo.jpg")} />
          <TouchableOpacity style={styles.botonReserva}>
            <Text style={styles.textReserva} onPress={() => reservar()}>
              {" "}
              Reservar{" "}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botonReserva}>
            <Text style={styles.textReserva} onPress={() => RegisterBackgroundTask()}>
              {" "}
              Empezar Bot{" "}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={styles.botonLogin}
              onPress={() => navigation.navigate("CreateAccount")}
            >
              {" "}
              CreateAccount{" "}
            </Text>
          </TouchableOpacity>
          <StatusBar style="auto" />
          <View style={styles.week}>
            {days.map((day,i) => {
              return (
                <TouchableOpacity 
                onPress={() => weekBtn(i)}
                style={styles.weekDay}>
                  <Text style={styles.textDay}> {day} </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <Modal
            style={styles.modal}
            transparent={true}
            animationType='fade'
            visible={isModalVisible}
            nRequestClose={() => changeModalVisibility(false)}
          >
              
              
              <ModalPicker 
              changeModalVisibility={changeModalVisibility} 
              setData={setData}
              week={week}
              selectedDate={selectedDate}
              />
          </Modal>
        </View>
      </SafeAreaView>
    </>
  );
}


const styles = StyleSheet.create({
  bigContainer: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  week: {
    paddingTop: 20,
    flex: 1,
    flexDirection: "row",
    backgroundColor: "black",
    justifyContent: "center",
  },
  weekDay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 2,
    width: 55,
    height: 30,
    backgroundColor: "#e0103b",
    borderRadius: 15,
  },
  textDay: {
    fontWeight: "italic",
    color: "black",
    fontSize: 12,
  },
  botonWeek: {
    justifyContent: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    backgroundColor: "red",
    padding: 10,
    borderRadius: 1000,
    marginBottom: 20,
    width: 50,
    height: 50,
    marginLeft: 7,
  },
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 180,
  },
  container2: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    
  },
  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    marginBottom: 20,
  },
  botonReserva: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0103b",
    borderRadius: 10,
    marginBottom: 20,
    width: 280,
    height: 50,

   
  },
  textReserva: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
    backgroundColor: "#e0103b",
    
  },
  botonLogin: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    backgroundColor: "black",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  img: {
    width: 300,
    height: 75,
    marginBottom: 20,
  },
  goBackBtn: {
    backgroundColor: "black",
    width: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    position: "absolute",
  },
  goBackText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});


