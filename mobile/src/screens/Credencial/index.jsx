import { Text, View, StyleSheet } from "react-native";
import { Avatar } from "@rneui/themed";
import { Card } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@rneui/base";
import { URLBase } from "../../url/variable";

function Credencial({ navigation }) {
  const user = useSelector((state) => state.user);
  const [empleado, setEmpleado] = useState({});
  const id = user.id;

  useEffect(() => {
    URLBase.get(`/guards/${id}`).then((res) => setEmpleado(res.data));
  }, []);

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem("user");
    } catch (e) {
      console.log(e);
    }
    console.log("Done.");
  };

  const handleLogOut = () => {
    removeValue();
    alert("Sesión cerrada correctamente :)");
    navigation.navigate("Logueo");
  };

  return (
    <View
      style={{ alignContent: "center", alignItems: "center", marginTop: 100 }}
    >
      <Card style={{ alignItems: "center", alignItems: "center" }}>
        <Card.Title> CREDENCIAL </Card.Title>
        <Card.Divider />
        <View
          style={{
            alignContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Avatar
            size={200}
            rounded
            source={{
              uri: "https://img.freepik.com/psd-premium/avatar-masculino-profesion-policial-renderizado-3d_52659-1093.jpg?w=2000",
            }}
            title="Bj"
          ></Avatar>
        </View>

        <View style={{ marginTop: 40 }}>
          <Text style={styles.datos}> Nombre: {empleado.name} </Text>
          <Text style={styles.datos}> Apellido: {empleado.lastname} </Text>
          <Text style={styles.datos}> CUIL: {empleado.cuil} </Text>
          <Text style={styles.datos}>
            {" "}
            Domicilio: {`${empleado.street} ${empleado.number}`}{" "}
          </Text>
          <Text style={styles.datos}> Ciudad: {empleado.city} </Text>
          <Text style={styles.datos}> Provincia: {empleado.province} </Text>
        </View>
        <View
          style={{
            alignContent: "center",
            alignItems: "center",
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <Button
            title="Cerrar Sesión"
            onPress={handleLogOut}
            buttonStyle={{
              backgroundColor: "rgba(90, 154, 230, 1)",
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 30,
              width: 150,
              marginTop: 40,
              alignItems: "center",
              alignContent: "center",
            }}
          />
        </View>
      </Card>
    </View>
  );
}

export default Credencial;

const styles = StyleSheet.create({
  legajo: {
    fontWeight: "350",
    fontSize: 30,
  },
  datos: {
    fontSize: 20,
    margin: 1,
    marginLeft: 35,
    marginRight: 35,
  },
});
