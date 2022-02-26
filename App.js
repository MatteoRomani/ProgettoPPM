import React from 'react';
import {StyleSheet} from "react-native";

import TensorCamera from "./components/TensorCamera";
import LottoImage from "./components/LottoImage";
import AuthorPage from "./components/AuthorPage";
import ThreeDView from "./components/3DView";


import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";

const Stack = createStackNavigator();

export default function App() {
  return (

      <NavigationContainer>
        <Stack.Navigator
            initialRoutename={"Camera"}
            screenOptions={{
              headerStyle: {backgroundColor: "#f4511e"},
              headerTitleStyle: {fontWeight: 'bold'},
              headerTitleAlign: "center"
            }}
        >
          <Stack.Screen name="Camera" component={TensorCamera}/>
          <Stack.Screen name="Foto" component={LottoImage}/>
          <Stack.Screen name="Autore" component={AuthorPage} />
          <Stack.Screen name="3DView" component={ThreeDView} />
        </Stack.Navigator>
      </NavigationContainer>

  );
}
