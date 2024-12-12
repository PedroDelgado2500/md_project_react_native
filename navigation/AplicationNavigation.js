import AceptCSV from "../screens/admin/AceptCSV";
import AceptClinic from "../screens/admin/AceptClinic";
import Dashboard from "../screens/admin/Dashboard";
import UpdateClinic from "../screens/admin/UpdateClinic";
import UploadProfile from "../screens/admin/UploadProfile";
import ClinicaMap from "../screens/clinica/ClinicaMap";
import Welcome from "../screens/auth/Welcome";
import RegistarScreen from "../screens/auth/RegistarScreen";
import RecuperaSenha from "../screens/auth/RecuperaSenha";
import Login from "../screens/auth/Login";
import EditarDados from "../screens/auth/EditarDados";
import EfetuarTroca from "../screens/auth/EfetuarTroca";
import ListagemTroca from "../screens/auth/ListagemTroca";
import HomeScreen from "../screens/clinica/HomeScreen";
import ClinicaServico from "../screens/clinica/ClinicaServico";
import ClinicaScreen from "../screens/clinica/ClinicaScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Contact from "../screens/auth/Contact";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import React, { useState } from "react";
import Sobre from "../screens/auth/Sobre";
import {UserContext} from "../context/context"

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const AplicationNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ClinicaScreen"
        component={ClinicaScreen}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="ClinicaServico"
        component={ClinicaServico}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ClinicaMap"
        component={ClinicaMap}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
        <Stack.Screen
          name="RegistarScreen"
          component={RegistarScreen}
          options={{ headerShown: false }}
        />
      <Stack.Screen
        name="EfetuarTroca"
        component={EfetuarTroca}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RecuperaSenha"
        component={RecuperaSenha}
        options={{ headerShown: false }}
      />


      <Stack.Screen
        name="UploadProfile"
        component={UploadProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UpdateClinic"
        component={UpdateClinic}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AceptCSV"
        component={AceptCSV}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AceptClinic"
        component={AceptClinic}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditarDados"
        component={EditarDados}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ListagemTroca"
        component={ListagemTroca}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Sobre"
        component={Sobre}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
    
  );
};

// TAB BAR NAVIGATION
const AplicationTabNavigator = ({}) => {
  // let user = useContext(UserContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let [user, setUser] = useState();

  const getTabBarVisibility = route =>{
    const routeName = getFocusedRouteNameFromRoute(route)??'Feed';
    if(['Homes', 'Login', 'Register', 'Forgot', 'Email', 'Waiting','Admin', 'Csv', 'HomeA','InboxA','ScheduleA'].includes(routeName)){
      return 'none';
    }
    return 'flex';
  }

  return (
    <UserContext.Provider value={{user, setUser}}>
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarLabelStyle: { color: "#009688" },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case "Clinica":
              iconName = focused ? "ios-home" : "ios-home-outline";
              break;
            case "Sobre":
              iconName = focused ? "md-list" : "md-list-outline";
              break;
            case "Contactar":
              iconName = focused ? "person" : "person-outline";
              break;
            case "Login":
              iconName = focused ? "ios-send" : "ios-send-outline";
              break;
          }
          return <Ionicons name={iconName} size={size} color={"#009688"} />;
        },
      })}
    >
      {!isLoggedIn && (
        <>
          <Tab.Screen
            name="Clinica"
            component={AplicationNavigation}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Sobre"
            component={Sobre}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Contactar"
            component={Contact}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
            dis
          />
        </>
      )}
    </Tab.Navigator>
    </UserContext.Provider>
  );
};
export default AplicationTabNavigator;
