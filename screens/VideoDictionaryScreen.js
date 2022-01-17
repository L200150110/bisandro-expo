import React, { useState } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";
import { Button, Card, Title, Paragraph } from "react-native-paper";

export default function VideoDictionaryScreen({ route, navigation }) {
  const video = React.useRef(null);
  const [status, setStatus] = useState({});
  let videoUrl = route.params.videoUrl;
  let title = route.params.title;

  return (
    <View style={styles.container}>
      <View style={styles.blockContainer}>
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.contentContainer}>
              <Video
                ref={video}
                style={styles.video}
                source={{
                  uri: videoUrl
                }}
                resizeMode="cover"
                isLooping
                onReadyForDisplay={() => video.current.playAsync()}
              />
              <Text style={styles.title}>
                {title}
              </Text>
            </View>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 12.5
  },
  video: {
    width: "100%",
    height: 200
  },
  card: {
    width: Dimensions.get("screen").width - 50,
    height: (Dimensions.get("screen").width - 25) / 4 * 3
  },
  blockContainer: {
    backgroundColor: "#92c5eb",
    borderRadius: 15,
    width: "100%",
    alignItems: "center",
    padding: 12.5,
    marginBottom: 12.5
  },
  contentContainer: {
    width: "100%",
    alignItems: "center"
  },
  title: {
    marginTop: 10,
    fontSize: 30
  }
});
