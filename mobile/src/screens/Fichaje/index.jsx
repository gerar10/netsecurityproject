import React, { useState, useEffect } from "react";
import axios from "axios";
// import MapView, { Marker, Circle } from 'react-native-maps';
import * as Location from "expo-location";
import { URLBase } from "../../url/variable";
import { useDispatch, useSelector } from "react-redux";
import { Card, Avatar } from "@rneui/themed";
import {Alert, Modal, StyleSheet,Text,Pressable, View, Button, Platform} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CardTrabajo from "../../Commons/CardTrabajo";
import userEvent from "../../store/event";
import DiaDescanso from "../../Commons/DiaDescanso";


const fecha = new Date().toISOString();
const Fichaje = ({ navigation }) => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [botonEntrada, setBotonEntrada] = useState(false);
  const [botonSalida, setBotonSalida] = useState(false);
  const [horaEntrada, setHoraEntrada] = useState(null);
  const [horaSalida, setHoraSalida] = useState(null);
  const event = useSelector((state) => state.event);
  const user = useSelector((state) => state.user);
  const [horaTimeIn, setHoraTimeIn]  = useState(null)

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleSalida, setModalVisibleSalida] = useState(false); 
  const fecha = new Date().toISOString();
  const fechaEvento =(parseInt(fecha.slice(0,10).split("-").join("")))

  const [evento, setEvento] = useState([
    {
      id: null,
      date: "",
      time_in: null,
      position_in_latitude: "",
      position_in_longitude: "",
      time_out: null,
      position_out_latitude: "",
      position_out_longitude: "",
      branchId: 1,
      guardId: 1,
      shiftId: 1,
      branch: {
        fulladdress: "",
        coordinates: "",
        id: "",
        name: "",
        street: "",
        number: "",
        city: "",
        province: "",
        postalcode: "",
        latitude: "",
        longitude: "",
        active: "",
        createdAt: "",
        updatedAt: "",
        clientId: "",
      },
      shift: {
        id: "",
        type: "",
        start: "",
        end: "",
        createdAt: "",
        updatedAt: "",
      },
    },
  ]);

  useEffect(() => {
    URLBase.get(`/events/byDate/${fechaEvento}/${user.id}`).then((res) => {if(res.data.length) return setEvento(res.data)}).then(() => {
      if (evento[0].time_in) {
        const timeIn = new Date(evento[0].time_in)
        const prueba = `${timeIn.getHours()}:${timeIn.getMinutes()}:${timeIn.getSeconds()}`
        setHoraEntrada(prueba) 
      }
      if (evento[0].time_out) {
        const timeOut = new Date(evento[0].time_out)
        const prueba = `${timeOut.getHours()}:${timeOut.getMinutes()}:${timeOut.getSeconds()}`
        setHoraSalida(prueba) 
      }
    })
    }, [evento[0].time_in, evento[0].time_out]);




  const handleOnPress = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let locacion = await Location.getCurrentPositionAsync({}); 
      const horario = new Date()
      const update = await URLBase.put(`/events/checkin/${evento[0].id}`, {
        time_in: horario,
        position_in_latitude: locacion.coords.latitude,
        position_in_longitude: locacion.coords.longitude,
      })
      setHoraEntrada(
        `${horario.getHours()}:${horario.getMinutes()}:${horario.getSeconds()}`
      )
    setBotonEntrada(true);
    setModalVisible(!modalVisible)
  };

  const handleOnPressSalida = () => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let locacion = await Location.getCurrentPositionAsync({});
      const horario = new Date();
      const update = await URLBase.put(`/events/checkout/${evento[0].id}`, {
        time_out: horario,
        position_out_latitude: locacion.coords.latitude,
        position_out_longitude: locacion.coords.longitude,
      });
      setHoraSalida(
        `${horario.getHours()}: ${horario.getMinutes()}: ${horario.getSeconds()}`
      );
    })();
    setBotonSalida(true);
    setModalVisibleSalida(!modalVisibleSalida)

  };

  return (

    <View style={styles.container}>
    {
      evento[0].id ? (<View style={styles.container}>
        <CardTrabajo evento={evento}/>
        {botonEntrada || horaEntrada ? (<Text style={{ fontWeight: "bold", fontSize: 20, marginTop:5 }}> Su hora de entrada es: {horaEntrada} </Text> ) : null}
      <View style={{justifyContent:"center", alignItems:"center", marginTop:5}}>
            <Avatar
            size={130}
            rounded
            icon={{ name: 'login', type: 'MaterialIcons' }}
            containerStyle={{ backgroundColor: 'green' }}
            />
              <Text style={{fontSize:20, fontWeight:"bold"}}>{evento[0].shift.start} </Text>
        <View style={{ margin: 20 }}>
         

          {!botonEntrada && !evento[0].time_in ? ( <Button title="Ingrese la hora de entrada" onPress={() => setModalVisible(!modalVisible)} /> ) : null}
        </View>
        {botonSalida || horaSalida ? (<Text style={{ fontWeight: "bold", fontSize: 20, marginTop:5 }}> Su hora de salida es: {horaSalida} </Text>) : null}
      </View >
            <Avatar
            size={130}
            rounded
            icon={{ name: 'logout', type: 'MaterialIcons' }}
            containerStyle={{ backgroundColor: 'red' }}
            />
              <Text style={{fontSize:20, fontWeight:"bold"}}>{evento[0].shift.end} </Text>
        <View style={{ margin: 20 }}>

          {!botonSalida && horaEntrada && !evento[0].time_out ? (<Button title="Ingrese la hora de salida" onPress={() => setModalVisibleSalida(!modalVisibleSalida)} /> ) : null} 
      <View/>
      </View>
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>
                  ¿Deseas confirmar el horario de entrada?
                </Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={handleOnPress}
                >
                  <Text style={styles.textStyle}>Aceptar</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Cerrar</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisibleSalida}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>
                  ¿Deseas confirmar el horario de salida?
                </Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={handleOnPressSalida}
                >
                  <Text style={styles.textStyle}>Aceptar</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisibleSalida(!modalVisibleSalida)}
                >
                  <Text style={styles.textStyle}>Cerrar</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      </View>): <DiaDescanso/>
     }
</View>
 

 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "50%",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    margin: 10,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    width:150,
  },
  modalText: {
    marginBottom: 15,

  },
});

export default Fichaje;
