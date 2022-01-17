import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Button, Card, Title, Paragraph } from "react-native-paper";
import { useKeepAwake } from "expo-keep-awake";
import ItemCard from "./../components/ItemCard";

export default function DictionaryScreen({ navigation }) {
  useKeepAwake();
  const [category, setCategory] = useState(null);
  const [imageLocation, setImageLocation] = useState("");

  const getData = () => {
    return fetch("https://bisindo-surakarta.com/api/kosakata/kategori")
      .then(response => response.json())
      .then(json => {
        setImageLocation(json.location_image);
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
                    title={item[0].jenis}
                    onPress={() => {
                      navigation.navigate("DetailDictionary", {
                        jenis: item[0].jenis
                      });
                    }}
                  />
                  <ItemCard
                    icon={{ uri: imageLocation + item[1].gambar }}
                    title={item[1].jenis}
                    onPress={() => {
                      navigation.navigate("DetailDictionary", {
                        jenis: item[1].jenis
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
