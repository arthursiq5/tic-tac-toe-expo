import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {

  const [ notification, setNotification ] = useState('Player X to start!')
  const [refresh, setRefresh] = useState(true)
  const [ board, setBoard ] = useState([
    ' ', ' ', ' ',
    ' ', ' ', ' ',
    ' ', ' ', ' ',
  ])
  const [currentPlayer, setCurrentPlayer] = useState('X')

  const pressField = (index) => {
    let newBoard = board
    newBoard[index] = currentPlayer
    setCurrentPlayer(currentPlayer == 'X' ? 'O' : 'X')
    setBoard(newBoard)
    setRefresh(!refresh)
  }

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <Text style={styles.txtTitle}>TicTacToe</Text>
      <Text style={styles.txtNotification}>{notification}</Text>

      <FlatList
        style={styles.list}
        data={board}
        numColumns={3}
        refreshing={true}
        extraData={refresh}
        renderItem={ ({item, index}) => 
          <TouchableOpacity style={styles.square} onPress={() => pressField(index)}>
            <Text>{item}</Text>
          </TouchableOpacity> 
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtTitle: {
    fontSize: 50,
  },
  txtNotification: {
    fontSize: 20
  },
  list: {
    width: 300,
    height: 400,
  },
  square: {
    height: 60,
    width: 30,
    backgroundColor: 'red',
    margin: 10
  }
});
