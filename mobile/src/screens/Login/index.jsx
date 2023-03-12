import { View, Image, TextInput, Text } from "react-native";
import { useEffect, useState } from "react";
import images from "../../assets/images";
import styles from "./styles";
import { Button } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { URLBase } from "../../url/variable";
import { userLogin } from "../../store/user";

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    getPerfil();
  }, []);

  async function getPerfil() {
    try {
      const perfil = await AsyncStorage.getItem("user");
      const usuario = JSON.parse(perfil);
      if (usuario) {
        dispatch(userLogin(usuario));
        navigation.navigate("Hometabs");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const onChangeTextEmail = (text) => {
    setEmail(text);
  };

  const onChangeTextContrasena = (text) => {
    setPassword(text);
  };

  const onButtonPress = async () => {
    try {
      const LoginUser = await URLBase.post(`/guards/login`, {
        email,
        password,
      });
      const jsonValue = JSON.stringify(LoginUser.data);
      await AsyncStorage.setItem("user", jsonValue);
      dispatch(userLogin(LoginUser.data));
      navigation.navigate("Hometabs");
    } catch (error) {
      alert("usuario/contraseña incorrecta, consulte con recursos humanos :)");
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Image source={images.logoFull} style={styles.image} />
        <TextInput
          placeholder="Email"
          onChangeText={onChangeTextEmail}
          value={email}
          style={styles.textInput}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={onChangeTextContrasena}
          style={styles.textInput}
          secureTextEntry={true}
        />
        <View style={styles.loginBtn}>
          <Button
            title="Ingresar"
            onPress={onButtonPress}
            buttonStyle={{
              backgroundColor: "rgba(90, 154, 230, 1)",
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 30,
            }}
          />
        </View>
      </View>
      <Text style={{ marginTop: 20, alignContent: "center" }}>
        {" "}
        ¿Olvido su contraseña? Haga Click aquí
      </Text>
    </View>
  );
}

export default LoginScreen;
