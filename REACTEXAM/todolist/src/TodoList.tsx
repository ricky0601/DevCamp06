import React, { useState } from "react";
import { Button } from 'react-bootstrap';

type Todo = {
    id : number;
    text : string;
    isChecked : boolean;
};

const TodoList : React.FC = () =>{
    const title : string = "오늘의 할일";

    // 구조분해할당
    const [todos, setTodos] = useState<Todo[]>([
        {id : 1, text : '공부하기' , isChecked : false},
        {id : 2, text : '잠자기' , isChecked : false},
        {id : 3, text : '미팅하기' , isChecked : false},
    ]);

    const [newTodo, setNewTodo] = useState<string>('');


    const handleCheckedChange = (id:number) => {
        setTodos((prevItems) => 
            prevItems.map((item) => 
                item.id === id ? { ...item , isChecked : !item.isChecked } : item
            )
        )
    };

    const addTodo = () => {
        if(newTodo.trim() !== ''){
            setTodos([...todos, {id: Date.now(), text: newTodo, isChecked: false}]);
            setNewTodo('');
        }
    }

    return(
        <div className="container">
            <h1>{title}</h1>
            <p></p>
            <div style={{ marginBottom: '10px'}}>
                <input type="text" placeholder="할일을 입력하세요" style={{marginRight: '10px', writingMode: 'horizontal-tb',}} onChange={(e)=>setNewTodo(e.target.value)}/>
                <Button variant="primary" onClick={addTodo}>추가</Button>
            </div>
            <div>
                <div className="board">
                    <ul>
                        {
                            todos.map((todo , idx) => (
                                <li key={todo.id}>
                                    <input type="checkbox"
                                        onChange={()=>{
                                            handleCheckedChange(todo.id);
                                        }}
                                    />
                                    <span>
                                        {
                                            todo.isChecked ? 
                                            <del>{todo.text}</del>
                                            : <>{todo.text}</>
                                        }
                                    </span>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default TodoList;