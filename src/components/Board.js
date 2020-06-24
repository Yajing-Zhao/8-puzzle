import React, {useState, useEffect} from 'react'
import Square from './Square'

export default function Board() {
  const [board_values, setBoard_values] = useState([1, 2, 3, 4, 5, 6, 7, 8, 0]);
  const [win_state, setWin_state] = useState(0);
  useEffect(()=>{
    if (JSON.stringify(board_values)===JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8, 0])){
      setWin_state(1);
    }
    else{
      setWin_state(0);
    }

  },[board_values]);
  function handleClick(num){
    const num_idx = board_values.indexOf(num);
    const num_row = parseInt(num_idx/3);
    const num_col = num_idx%3;
    const zero_idx = board_values.indexOf(0);
    const zero_row = parseInt(zero_idx/3);
    const zero_col = zero_idx%3;
    const differ = Math.abs(num_row-zero_row)+Math.abs(num_col-zero_col);
    if (differ===1){
      let board_values_copy = Array.from(board_values);
      [board_values_copy[num_idx], board_values_copy[zero_idx]] = [board_values_copy[zero_idx], board_values_copy[num_idx]];
      setBoard_values(board_values_copy);
    }
    
  }
  function handleShuffleClick(){
    let num_array = [1, 2, 3, 4, 5, 6, 7, 8]
    for (let i = num_array.length-1; i>=0; i--){
      const randomIndex = Math.floor(Math.random()*(i+1));  
      [num_array[randomIndex], num_array[i]] = [num_array[i], num_array[randomIndex]];
    }
    num_array.push(0)
    setBoard_values(num_array);
  }

  function handleModalClick(e) {
    if (e.target.className==='modal' || e.target.className==='close'){
      setWin_state(0);
    }  
  }

  
  return (
    <div>
      <div className='board'>
        {board_values.map(x => <Square num={x} key={x} handleClick={()=>handleClick(x)}/>)}
      </div>
      <button className='shuffle' onClick={handleShuffleClick}> Shuffle</button>
      <div id="myModal" className="modal" state={win_state} onClick={handleModalClick}>
        <div className="modal-content">
            <span className="close">&times;</span>
            <p>Congratulations! You won!</p>
      </div>

</div>
    
    </div>
  )
}

