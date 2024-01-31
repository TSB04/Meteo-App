import * as React from "react";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import App from "./screens/index";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#2E335A",
    secondary: "#102B33",
  },
};

export default function Main() {
  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <App />
      </PaperProvider>
    </NavigationContainer>
  );
}
