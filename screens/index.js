import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./home.screen";

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <Stack.Navigator initialRouteName="HomeScreen" headerMode="none">
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default App;
