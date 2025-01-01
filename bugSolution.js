import * as React from 'react';
import { Camera, CameraType } from 'expo-camera';
import { useState, useEffect } from 'react';

const App = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [cameraReady, setCameraReady] = useState(false);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraReady) {
      const data = await cameraRef.current.takePictureAsync();
      setPhoto(data.uri);
    }
  };

  const cameraRef = React.useRef(null);
  
  const handleCameraReady = () => {
    setCameraReady(true);
  };

  if (hasPermission === null) {
    return <View/>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type} ref={cameraRef} onCameraReady={handleCameraReady}>
       </Camera>
      <Button title="Take Picture" onPress={takePicture} />
      {photo && <Image source={{ uri: photo }} style={{ width: 300, height: 300 }}/>}
    </View>
  );
};
export default App;