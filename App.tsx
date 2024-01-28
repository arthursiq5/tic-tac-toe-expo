import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image, Pressable } from 'react-native';

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
  const [newGameButton, setNewGameButton] = useState(true);

  const newGame = () => {
    setBoard(getEmptyBoard())
    setRefresh(!refresh)
    const newPlayer = 'X'
    setCurrentPlayer(newPlayer)
    setNotification(`Player ${newPlayer} to move`)
  }

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
    newGame()
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
      <Image
        source={require('./assets/background.jpg')}
        style={styles.backgroundImage}
      />
      <StatusBar style='auto' />
      <Text style={styles.txtTitle}>TicTacToe</Text>
      <Text style={styles.txtNotification}>{notification}</Text>

      <View style={styles.flatListContainer}>
        <Image
          source={require('./assets/board.png')}
          style={styles.boardImage}
        />
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
      {newGameButton && <TouchableOpacity style={styles.newGame} onPress={() => newGame()}>
        <Text style={styles.txtNewGame}>new game</Text>
      </TouchableOpacity> }
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
    height: 300,
    width: '100%'
  },
  txtTitle: {
    fontSize: 50,
    position: 'absolute',
    top: 60,
    color: '#fff',
  },
  txtNotification: {
    fontSize: 20,
    position: 'absolute',
    top: 130,
    color: '#fff',
  },
  txtOption: {
    fontSize: 60,
    color: '#fff',
    textShadowColor: '#F06292',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 3
  },
  list: {
    width: 300,
    height: 300,
  },
  square: {
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boardImage: {
    width: 300,
    height: 300,
    position: 'absolute',
    backgroundColor: '#90A4AE70'
  },
  backgroundImage: {
    position: 'absolute',
    zIndex: -1,
    width: '100%',
    height: '100%',
  },
  newGame: {
    backgroundColor: '#3a0053',
    position: 'absolute',
    bottom: 50,
    padding: 10,
    borderRadius: 15,
  },
  txtNewGame: {
    fontSize: 25,
    color: '#fff'
  },
});
