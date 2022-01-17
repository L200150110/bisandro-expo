import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";
import { Button, Card, Title, Paragraph } from "react-native-paper";

export default function VideoDictionaryScreen({ route, navigation }) {
  const video = React.useRef(null);
  const [status, setStatus] = useState({});
  let videoUrl = route.params.videoUrl;
  let title = route.params.title;

  return (
    <View style={styles.container}>
      <Card>
        <Card.Content>
          <Video
            ref={video}
            style={styles.video}
            source={{
              uri: videoUrl
            }}
            resizeMode="contain"
            isLooping
            onReadyForDisplay={() => video.current.playAsync()}
          />
          {/* <Paragraph>Card content</Paragraph> */}
        </Card.Content>
      </Card>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center"
  },
  video: {
    width: "100%",
    height: 300
  }
});
