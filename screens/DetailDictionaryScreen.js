import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useKeepAwake } from "expo-keep-awake";
import ItemCard from "./../components/ItemCard";

export default function DetailDictionaryScreen({ route, navigation }) {
  useKeepAwake();
  const [category, setCategory] = useState(null);
  const [imageLocation, setImageLocation] = useState("");
  const [videoLocation, setVideoLocation] = useState("");
  let jenis = route.params.jenis;

  const getData = () => {
    return fetch("https://bisindo-surakarta.com/api/kosakata/get_data/" + jenis)
      .then(response => response.json())
      .then(json => {
        setImageLocation(json.location_image);
        setVideoLocation(json.location_video);
        setCategory(pembagi(json.data));
      })
      .catch(err => {
        console.log(err);
      });
  };

  const pembagi = data => {
    var dataTerbagi = [];
    var dataSementara = [];
    data.forEach((item, i) => {
      if (i % 2 === 1 || i === 0) {
        dataSementara.push(item);
        if (i !== 0) {
          dataTerbagi.push(dataSementara);
          dataSementara = [];
        }
      } else {
        dataSementara.push(item);
      }
    });

    return dataTerbagi;
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {category
        ? <View style={styles.blockContainer}>
            {category.map((item, index) => {
              return (
                <View style={styles.cardContainer} key={index}>
                  <ItemCard
                    icon={{ uri: imageLocation + item[0].gambar }}
                    title={item[0].nama}
                    onPress={() => {
                      navigation.navigate("VideoDictionary", {
                        title: item[0].nama,
                        videoUrl: videoLocation + item[0].video
                      });
                    }}
                  />
                  <ItemCard
                    icon={{ uri: imageLocation + item[1].gambar }}
                    title={item[1].nama}
                    onPress={() => {
                      navigation.navigate("VideoDictionary", {
                        title: item[1].nama,
                        videoUrl: videoLocation + item[1].video
                      });
                    }}
                  />
                </View>
              );
            })}
          </View>
        : <View />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 12.5
  },
  blockContainer: {
    backgroundColor: "#92c5eb",
    borderRadius: 15,
    width: "100%",
    alignItems: "center",
    padding: 12.5,
    marginBottom: 12.5
  },
  cardContainer: {
    flexDirection: "row"
  }
});
