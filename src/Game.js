import React, { useReducer } from 'react';

import '@fortawesome/fontawesome-free/js/all.js';
import './Game.scss';

import { Board } from './components/Board';

import { boardReducer } from './reducers/boardReducer';
import { BoardActions } from './actions/BoardActions';
import { GameLevel, GameInitialState } from './constants/gameConstants';

export const stateContext = React.createContext();
export const dispatchContext = React.createContext();


function Game() {
  const [state, dispatch] = useReducer(boardReducer, GameInitialState);

  function onResetClick() {
    dispatch({ type: BoardActions.INITIATE_DUMMY_BOARD, payload: { level: state.level } });
  }

  function onLevelSelect(event) {
    dispatch({ type: BoardActions.CHANGE_LEVEL, payload: { level: GameLevel[event.target.value] }});
  }

  return(
    <stateContext.Provider value={state}>
      <dispatchContext.Provider value={dispatch}>
        <div className="game_container">
          { state.gameClear ? 
            <i className="gameClear">GAME CLEAR</i> : '' }
          <div className="game">
            <div className="game_header">
              <div className="game_minesLeft">{state.minesLeft}</div>
              <button 
                className="restart"
                onClick={onResetClick}>Restart</button>
              <select
                className="levelSelector"
                value={state.level.name}
                onChange={(e) => onLevelSelect(e)}>
                <option value={GameLevel.EASY.name}>Easy</option>
                <option value={GameLevel.INTERMEDIATE.name}>Intermediate</option>
                <option value={GameLevel.EXPERT.name}>Expert</option>
              </select>
            </div>
            <Board />
          </div>
         <div className="credentials">
            <a className="github"
               href="https://github.com/Richard-Matabo/minesweeper">
              <div className="fab fa-github"/>
            </a>
            <a className="twitter"
               href="https://twitter.com/Richard_Matabo">
              <div className="fab fa-twitter"/>
            </a>
          </div>
        </div>
      </dispatchContext.Provider>
    </stateContext.Provider>
  );
}

export default Game;
