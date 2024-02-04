// SnackBar.js
import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Snackbar } from "react-native-paper";

const SnackBar = ({ message, visible, setVisible }) => {
  const onDismissSnackBar = () => setVisible(false);

  return (
    <View style={styles.container}>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: "Undo",
          onPress: () => {
            // Do something
          },
        }}
      >
        {message}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: -40,
    left: 0,
    right: 0,
    zIndex: 10,
  },
});

export default SnackBar;
