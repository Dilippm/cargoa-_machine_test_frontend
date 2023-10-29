import React from 'react'
import Home from './Home'; 
import Dashboard from './Dashboard';

const Board = () => {
    const type = localStorage.getItem("type");

  return (
    <div>
        {type === 'user' ? <Home /> : <Dashboard />}
    </div>
  )
}

export default Board
