import { React, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Alert,
  Modal,
  Text,
  Pressable,
  Button,
  Platform,
  Linking,
} from "react-native";
import { Icon } from "@rneui/themed";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function Reportes() {
  const handleEmailPress = async () => {
    await Linking.openURL(
      "mailto:empresasupercoto@gmail.com?subject=Reporte&body=Necesito reportar:"
    );
  };
  const handleWhatsappPress = async () => {
    await Linking.openURL(
      "https://wa.me/+542364313716?text=Necesito reportar la siguente urgencia:"
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        En caso de reportes de licencias / vacaciones enviar email:
      </Text>
      <MaterialCommunityIcons
        name="email"
        color={"rgba(90, 154, 230, 1)"}
        size={60}
        title="Email"
        onPress={handleEmailPress}
      />

      <Text style={styles.text}>
        En caso de necesitar reportar una urgencia enviar Whatsapp:
      </Text>
      <MaterialCommunityIcons
        name="message"
        color={"rgba(90, 154, 230, 1)"}
        size={60}
        title="Whatsapp"
        onPress={handleWhatsappPress}
      />
    </View>
  );
}

export default Reportes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    margin: 10,
  },
});
