import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/Credencial";
import LoginScreen from "../screens/Login";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Horarios from "../screens/Horarios";
import Reportes from "../screens/Reportes";
import Fichaje from "../screens/Fichaje";

const Tab = createBottomTabNavigator();

export default function RootNavigator() {

const Stack = createNativeStackNavigator();

 function HomeTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Perfil"
          component={HomeScreen}
          options={{
            tabBarLabel: "Credencial",
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name=" "
          component={Fichaje}
          options={{
            tabBarLabel: "Fichar",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="clock" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="      "
          component={Horarios}
          options={{
            tabBarLabel: "Horarios",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="calendar" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Avisos"
          component={Reportes}
          options={{
            tabBarLabel: "Avisos",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="chat"
                color={color}
                size={26}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Logueo"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Hometabs"
        component={HomeTabs}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
