import React from 'react';
import { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import Icons from './components/Icons';
function App(): React.JSX.Element {
  //state declaration

  //used boolean so that it might not think its string
  const [iscross, setcross] = useState<boolean>(false);
  const [iswinner, setWinner] = useState<string>('');
  const [gameState, setGameState] = useState(new Array(9).fill('empty', 0, 9));


  //resetting or reloading the game
  const resetGame = () => {
    setcross(false);
    setWinner('');
    setGameState(new Array(9).fill('empty', 0, 9));
  };

  //checking winner
  //not used ' used `;
  const checkWinner = () => {
    if (
      gameState[0] === gameState[1] &&
      gameState[0] === gameState[2] &&
      gameState[0] !== 'empty'
    ) {
      setWinner(`${gameState[0]} won the game! 🥳`);
    } else if (
      gameState[3] !== 'empty' &&
      gameState[3] === gameState[4] &&
      gameState[4] === gameState[5]
    ) {
      setWinner(`${gameState[3]} won the game! 🥳`);
    } else if (
      gameState[6] !== 'empty' &&
      gameState[6] === gameState[7] &&
      gameState[7] === gameState[8]
    ) {
      setWinner(`${gameState[6]} won the game! 🥳`);
    } else if (
      gameState[0] !== 'empty' &&
      gameState[0] === gameState[3] &&
      gameState[3] === gameState[6]
    ) {
      setWinner(`${gameState[0]} won the game! 🥳`);
    } else if (
      gameState[1] !== 'empty' &&
      gameState[1] === gameState[4] &&
      gameState[4] === gameState[7]
    ) {
      setWinner(`${gameState[1]} won the game! 🥳`);
    } else if (
      gameState[2] !== 'empty' &&
      gameState[2] === gameState[5] &&
      gameState[5] === gameState[8]
    ) {
      setWinner(`${gameState[2]} won the game! 🥳`);
    } else if (
      gameState[0] !== 'empty' &&
      gameState[0] === gameState[4] &&
      gameState[4] === gameState[8]
    ) {
      setWinner(`${gameState[0]} won the game! 🥳`);
    } else if (
      gameState[2] !== 'empty' &&
      gameState[2] === gameState[4] &&
      gameState[4] === gameState[6]
    ) {
      setWinner(`${gameState[2]} won the game! 🥳`);
    } else if (!gameState.includes('empty', 0)) {
      setWinner('Draw game...');
    }
  }
//itemNumber will be passed by the flatlist that is when we preess on some box its respective no will be passed here
  const onChangeItem = (itemNumber: number) => 
  {
    if (iswinner)
    {
      return Snackbar.show({
        text: 'Game is already finished',
        backgroundColor: 'black',
        textColor:'#EAF0F1',
      })
    }
    //we are checking whose turn it is if empty and state is false then circle otherwise cross
    if (gameState[itemNumber] === 'empty')
    {
      gameState[itemNumber] = iscross ? 'cross' : 'circle'
      setcross(!iscross)
      
    }
    else {
      return Snackbar.show({
        text: 'Already marked',
        backgroundColor: 'black',
        textColor:'#EAF0F1',
      })
    }
    //call check winner again if the changed might be the winner
    checkWinner();
  }

//if game winner then game winner txt otherwise whose turn it is uska text


  return (
    <SafeAreaView >
      <StatusBar />
      {iswinner ? (
        <View style={[design.playerInfo, design.winnerInfo]}>
          <Text style={design.winnerTxt}>
            {iswinner}
          </Text>
        </View>
      ) : (
          <View style = {[design.playerInfo ,
            iscross ?   design.playerX : design.playerO
          ]}>
            <Text>
              Player{iscross ? 'X':'O'}'s turn
            </Text>

          </View>
      )}
      {/*game grid // in renderItem there are two component alwyas defined item and index whereas item can be anything but index is always a number */}
      <FlatList
      numColumns={3}
      data={gameState}
      style={design.grid}
      renderItem={({ item, index }) => (
        <Pressable
          key={index}
          style={design.card}
          onPress={() => onChangeItem(index)}
        >
          <Icons name={item}/>
        </Pressable> 
        )}
      />
      <Pressable
        style={design.gameBtn}
        onPress={resetGame}
      >
        <Text style={design.gameBtnText}>
          {iswinner ? 'Start New Game' : 'Reload Game'}
      </Text>
     </Pressable>
     
    </SafeAreaView>
  );
}

const design = StyleSheet.create({
  playerInfo: {
    height: 56,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 4,
    paddingVertical: 8,
    marginVertical: 12,
    marginHorizontal: 14,

    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  gameTurnTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  playerX: {
    backgroundColor: '#38CC77',
  },
  playerO: {
    backgroundColor: '#F7CD2E',
  },
  grid: {
    margin: 12,
  },
  card: {
    height: 100,
    width: '33.33%',

    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 1,
    borderColor: '#333',
  },
  winnerInfo: {
    borderRadius: 8,
    backgroundColor: '#38CC77',

    shadowOpacity: 0.1,
  },
  winnerTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  gameBtn: {
    alignItems: 'center',

    padding: 10,
    borderRadius: 8,
    marginHorizontal: 36,
    backgroundColor: '#8D3DAF',
  },
  gameBtnText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});

export default App;
