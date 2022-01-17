import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView
} from "react-native";
import ItemCard from "./../components/ItemCard";
import { useKeepAwake } from "expo-keep-awake";

export default function HomeScreen({ navigation }) {
  useKeepAwake();
  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.blockContainer}>
          <Image
            source={require("../assets/logo/logo-bisandro-3.png")}
            style={styles.logo}
          />
        </View>
        <View style={styles.blockContainer}>
          <View style={styles.cardContainer}>
            <ItemCard
              icon={require("../assets/icon/icon-design-guide.png")}
              title="Dictionary"
              onPress={() => {
                navigation.navigate("Dictionary");
              }}
            />
            <ItemCard
              icon={require("../assets/icon/sign-language.png")}
              title="Sign to Text"
              onPress={() => {
                navigation.navigate("SignToText");
              }}
            />
          </View>
          <View style={styles.cardContainer}>
            <ItemCard
              icon={require("../assets/icon/voice-message.png")}
              title="Voice to Sign"
              onPress={() => {
                navigation.navigate("VoiceToSign");
              }}
            />
            <ItemCard
              icon={require("../assets/icon/122932.png")}
              title="Text to Sign"
              onPress={() => {
                navigation.navigate("TextToSign");
              }}
            />
          </View>
          <View style={styles.cardContainer}>
            <ItemCard
              icon={require("../assets/icon/images.png")}
              title="Voice to Text"
              onPress={() => {
                navigation.navigate("VoiceToText");
              }}
            />
            <ItemCard
              icon={require("../assets/icon/manual.png")}
              title="Manual"
              onPress={() => {
                navigation.navigate("Manual");
              }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    margin: 12.5
  },
  blockContainer: {
    backgroundColor: "#92c5eb",
    // borderColor: "#111",
    // borderWidth: 3,
    borderRadius: 15,
    width: "100%",
    alignItems: "center",
    padding: 12.5,
    marginBottom: 12.5
  },
  logo: {
    height: 320 / 2,
    width: 304 / 2
  },
  cardContainer: {
    flexDirection: "row"
  },
  scrollContainer: {
    backgroundColor: "#fff"
  }
});
