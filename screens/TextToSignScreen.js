import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native";
import VideoCard from "./../components/VideoCard";

export default function TextToSignScreen() {
  const [hasil, setHasil] = useState(null);
  const [inputText, setInputText] = useState("");

  const searchHandler = () => {
    if (inputText == "") {
      setHasil(null);
    } else {
      fetch(
        "http://bisandro.com/api/vocabulary/mass/" +
          inputText.replace(/ /g, "_")
      )
        .then(response => response.json())
        .then(json => {
          setHasil(json.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  useEffect(
    () => {
      console.log(hasil);
    },
    [hasil]
  );

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View style={styles.searchBarContainer}>
          <TextInput style={styles.searchBar} onChangeText={setInputText} />
        </View>
        <TouchableOpacity
          style={styles.searchButtonContainer}
          onPress={() => {
            searchHandler();
          }}
        >
          <Image
            source={require("./../assets/icon/transparency.png")}
            style={styles.searchIcon}
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.bottomContainer}>
        {hasil
          ? <View style={styles.resultContainer}>
              {hasil.map((item, index) => {
                return (
                  <VideoCard
                    title={item.word}
                    videoUrl={item.sign}
                    key={index}
                  />
                );
              })}
            </View>
          : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  searchBarContainer: {
    position: "absolute",
    height: 50,
    backgroundColor: "#fff",
    top: 10,
    left: 10,
    right: 70,
    borderRadius: 10
  },
  searchBar: {
    position: "relative",
    height: "100%",
    width: "100%",
    color: "#000",
    marginHorizontal: 10,
    fontSize: 20
  },
  topBar: {
    position: "absolute",
    height: 70,
    top: 0,
    // width: "100%",
    backgroundColor: "#92c5eb",
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    flexDirection: "row",
    left: 12.5,
    right: 12.5
  },
  searchButtonContainer: {
    position: "absolute",
    height: 50,
    width: 50,
    backgroundColor: "#fff",
    right: 10,
    top: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  searchIcon: {
    height: 30,
    width: 30
  },
  bottomContainer: {
    width: "100%",
    marginTop: 70,
    padding: 12.5
  },
  resultContainer: {
    backgroundColor: "#92c5eb",
    borderRadius: 15,
    alignItems: "center",
    padding: 12.5
  }
});
