import { Text, View, StyleSheet } from "react-native";
import { Card } from "@rneui/themed";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { URLBase } from "../../url/variable";
import React from "react";
import { ScrollView } from "react-native";

function Horarios({ navigation }) {
  const user = useSelector((state) => state.user);
  const [empleado, setEmpleado] = useState([
    {
      branch: { name: "", fulladress: "", type: "" },
      shift: { start: "", end: "" },
    },
  ]);


  useEffect(() => {
    if (user)
      URLBase.get(`/events/byGuard/${user.id}`).then((res) =>
        setEmpleado(res.data)
      );
  }, [user]);


  const handleBoton = () => {
    navigation.navigate("LoginScreen");
  };

  return (
    <ScrollView>
      <View style={styles.container}>
          <Card.Title style={{marginTop:30, fontSize:20, backgroundColor:"rgba(90, 154, 230, 1)", color:"white"}}>HORARIOS DE LA SEMANA:</Card.Title>
          {empleado.map((dato, i) => {
            return (
              <Card key={i}>
                <Card.Title style={{color:"rgba(90, 154, 230, 1)"}}>HORARIO DEL DÍA: {dato.date}</Card.Title>
                <View key={i} style={styles.user}>
                <Text style={styles.datos}> Nombre: {dato.branchName} </Text>
                <Text style={styles.datos}>
                  {" "}
                  Dirección: {dato.branchAddress}{" "}
                </Text>
                <Text style={styles.datos}>
                  {" "}
                  Hora de ingreso: {dato.mobileStart}{" "}
                </Text>
                <Text style={styles.datos}>
                  {" "}
                  Hora de salida: {dato.mobileEnd}{" "}
                </Text>
              </View>
        </Card>
            );
          })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  legajo: {
    fontWeight: "350",
    fontSize: 30,
  },
  datos: {
    fontSize: 20,

  },
});
export default Horarios;
