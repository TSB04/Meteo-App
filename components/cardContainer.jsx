import React from "react";
import { ScrollView, View } from "react-native";

const CardContainer = ({ children }) => {
  return (
    <View>
      <ScrollView
        horizontal
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
      >
        {React.Children.map(children, (child, index) => (
          <View style={{ marginRight: 10 }}>{child}</View>
        ))}
      </ScrollView>
    </View>
  );
};

export default CardContainer;
