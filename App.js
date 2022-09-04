import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  SafeAreaView,
  Animated,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

const images = [
  require("./assets/lisa.jpg"),
  require("./assets/ana.jpg"),
  require("./assets/bale.jpg"),
];


const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const CONTAINER_WIDTH = width * 0.7;
const CONTAINER_SPACE = (width - CONTAINER_WIDTH) / 2;
const SPACE = 10;
const HEIGHT_BACKDROP = height * 0.5;

function Backdrop({ scrollX }) {
  return (
    <View
      style={[
        {
          position: "absolute",
          height: HEIGHT_BACKDROP,
          top: 0,
          width: width,
        },
        StyleSheet.absoluteFillObject,
      ]}
    >
      {images.map((imagen, index) => {
        const inputRange = [
          (index - 1) * CONTAINER_WIDTH,
          index * CONTAINER_WIDTH,
          (index + 1) * CONTAINER_WIDTH,
        ];

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0, 1, 0],
        });
        return (
          <Animated.Image
            key={index}
            source={imagen}
            style={[
              { width: width, height: HEIGHT_BACKDROP, opacity },
              StyleSheet.absoluteFillObject,
            ]}
          />
        );
      })}
      <LinearGradient
        colors={["transparent", "white"]}
        style={{
          width,
          height: HEIGHT_BACKDROP,
          position: "absolute",
          bottom: 0,
        }}
      />
    </View>
  );
}

export default function App() {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <Backdrop scrollX={scrollX} />
      <Animated.FlatList
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        snapToAlignment="start"
        contentContainerStyle={{
          paddingTop: 200,
          paddingHorizontal: CONTAINER_SPACE,
        }}
        snapToInterval={CONTAINER_WIDTH}
        decelerationRate={0}
        scrollEventThrottle={16}
        data={images}
        keyExtractor={(item) => item}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * CONTAINER_WIDTH,
            index * CONTAINER_WIDTH,
            (index + 1) * CONTAINER_WIDTH,
          ];

          const scrollY = scrollX.interpolate({
            inputRange,
            outputRange: [0, -50, 0],
          });
          return (
            <View style={{ width: CONTAINER_WIDTH }}>
              <Animated.View
                style={{
                  marginHorizontal: SPACE,
                  padding: SPACE,
                  borderRadius: 34,
                  // backgroundColor: "#fff",
                  alignItems: "center",
                  transform: [{ translateY: scrollY }],
                }}
              >
                <Image source={item} style={styles.posterImage} />
                
              </Animated.View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    justifyContent: "center",
  },
  posterImage: {
    width: "100%",
    height: CONTAINER_WIDTH * 1.2,
    resizeMode: "cover",
    borderRadius: 15,
    margin: 0,
    marginBottom: 10,
  },
});