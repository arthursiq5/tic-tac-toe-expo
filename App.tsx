import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const getEmptyBoard = () => [
  ' ', ' ', ' ',
  ' ', ' ', ' ',
  ' ', ' ', ' ',
];

const delay = (ms:number) => new Promise((res: any) => setTimeout(res, ms))

export default function App() {

  const [ notification, setNotification ] = useState('Player X to start!')
  const [refresh, setRefresh] = useState(true)
  const [ board, setBoard ] = useState(getEmptyBoard())
  const [currentPlayer, setCurrentPlayer] = useState('X')

  const pressField = (index: number) => {
    let newBoard = board
    if (newBoard[index] == ' ') {
      newBoard[index] = currentPlayer
      const player = currentPlayer == 'X' ? 'O' : 'X'
      setCurrentPlayer(player)
      setNotification(`Player ${player} to move!`)
      setBoard(newBoard)
      setRefresh(!refresh)
      checkIfPlayerWon(currentPlayer)
    }
  }

  const playerWon = async (player: string) => {
    setNotification(`PLAYER ${player} WON`)
    await delay(2000)
    setBoard(getEmptyBoard())
    setRefresh(!refresh)
    const newPlayer = 'X'
    setCurrentPlayer(newPlayer)
    setNotification(`Player ${newPlayer} to move`)
  }

  const checkIfPlayerWon = (player:string) => {
    if (
      (board[0] == board[1] && board[1] == board[2] && board[0] != ' ') ||
      (board[3] == board[4] && board[4] == board[5] && board[3] != ' ') ||
      (board[6] == board[7] && board[7] == board[8] && board[6] != ' ') ||
      (board[0] == board[3] && board[3] == board[6] && board[0] != ' ') ||
      (board[1] == board[4] && board[4] == board[7] && board[1] != ' ') ||
      (board[2] == board[5] && board[5] == board[8] && board[2] != ' ') ||
      (board[0] == board[4] && board[4] == board[8] && board[0] != ' ') ||
      (board[2] == board[4] && board[4] == board[6] && board[2] != ' ')
    ) {
      playerWon(player)
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <Text style={styles.txtTitle}>TicTacToe</Text>
      <Text style={styles.txtNotification}>{notification}</Text>

      <View style={styles.flatListContainer}>
        <FlatList
          style={styles.list}
          data={board}
          numColumns={3}
          refreshing={true}
          extraData={refresh}
          renderItem={ ({item, index}) => 
            <TouchableOpacity style={styles.square} onPress={() => pressField(index)}>
              <Text style={styles.txtOption}>{item}</Text>
            </TouchableOpacity> 
          }
        />
      </View>
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
  flatListContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 360,
    width: '100%'
  },
  txtTitle: {
    fontSize: 50,
  },
  txtNotification: {
    fontSize: 20,
  },
  txtOption: {
    fontSize: 60,
  },
  list: {
    width: 300,
    height: 300,
  },
  square: {
    height: 100,
    width: 100,
    backgroundColor: '#aaa',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
