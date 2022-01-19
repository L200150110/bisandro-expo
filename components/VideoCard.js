import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Button, Card, Title, Paragraph } from "react-native-paper";
import { Video, AVPlaybackStatus } from "expo-av";

export default function VideoCard({ title, videoUrl, ...rest }) {
  const video = React.useRef(null);
  const [status, setStatus] = useState({});

  return (
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
            {...rest}
          />
          <Text style={styles.title}>
            {title}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    width: Dimensions.get("screen").width - 50,
    height: (Dimensions.get("screen").width - 25) / 4 * 3,
    marginBottom: 10
  },
  contentContainer: {
    width: "100%",
    alignItems: "center"
  },
  title: {
    marginTop: 10,
    fontSize: 30
  },
  video: {
    width: "100%",
    height: 200
  }
});
