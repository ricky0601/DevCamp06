import React from 'react';
import TodoList from './TodoList';
import Timer from './Timer';
import './App.css';

/*
  작성자 : 1dg
  작성일 : 2025.04.07
  내용 : 기능에 대한 내용
*/

function App() {
  return (
    <div className='container'>
      <TodoList />
      <Timer />
    </div>
  );
}


export default App;
