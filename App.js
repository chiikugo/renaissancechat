import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, PanResponder, Text } from 'react-native';
import { Svg, Path } from 'react-native-svg';

export default function App() {
  const [strokes, setStrokes] = useState([]);
  const [pathData, setPathData] = useState('');
  const [previousPoint, setPreviousPoint] = useState({ x: 0, y: 0 });

  const handlePressIn = (event) => {
    const { locationX, locationY } = event.nativeEvent;

    setPathData(`M${locationX},${locationY}`);
    setPreviousPoint({ x: locationX, y: locationY });
  };

  const handlePressOut = () => {
    setStrokes((prevStrokes) => [...prevStrokes, pathData]);
  };

  const handlePressMove = (event) => {
    const { locationX, locationY } = event.nativeEvent;

    const pathSegment = `L${locationX},${locationY}`;
    setPathData((prevPathData) => prevPathData.concat(pathSegment));
    setPreviousPoint({ x: locationX, y: locationY });
  };

  const handleClear = () => {
    setStrokes([]);
    setPathData('');
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: handlePressIn,
    onPanResponderMove: handlePressMove,
    onPanResponderRelease: handlePressOut,
  });

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <Svg
        width="100%"
        height="100%"
      >
        {strokes.map((stroke, index) => (
          <Path
            key={index}
            d={stroke}
            fill="none"
            stroke="black"
            strokeWidth="2"
          />
        ))}
        <Path
          d={pathData}
          fill="none"
          stroke="black"
          strokeWidth="2"
        />
      </Svg>
      <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
        <Text style={styles.clearButtonText}>Clear</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  clearButton: {
    position: 'absolute',
    bottom: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'red',
  },
  clearButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
