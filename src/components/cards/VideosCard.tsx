import React, { useRef, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Ionicons } from '@expo/vector-icons';
import Video, { VideoRef } from 'react-native-video';

import { verticalScale } from '@/utils/scaling-utils';

interface VideosCardProps {
  item: any;
}

const VideosCard: React.FC<VideosCardProps> = ({ item }) => {
  const videoRef = useRef<VideoRef>(null);
  const [pauseState, setPauseState] = useState(true);

  const onPressPause = () => {
    setPauseState(!pauseState);
  };

  return (
    <View style={styles.card}>
      <Video
        ref={videoRef}
        onLoad={() => videoRef.current?.seek(1.5)}
        poster={item?.url}
        source={{ uri: item?.url }}
        style={styles.video}
        resizeMode="contain"
        paused={pauseState}
        muted={false}
        volume={1}
        controls={pauseState ? false : true}
      />

      {pauseState ? (
        <TouchableOpacity style={styles.play} onPress={onPressPause}>
          <Ionicons name={pauseState ? 'play' : 'pause'} size={20} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default React.memo(VideosCard);

const styles = StyleSheet.create(theme => ({
  card: {
    width: '100%',
    height: verticalScale(170),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(12)
  },
  video: {
    backgroundColor: 'red',
    width: '100%',
    height: verticalScale(170)
  },
  play: {
    width: 45,
    height: 45,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    position: 'absolute',
    alignSelf: 'center'
  }
}));
