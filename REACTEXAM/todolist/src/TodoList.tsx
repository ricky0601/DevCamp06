import React, { useState } from "react"

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


    return(
        <div className="container">
            <h1>{title}</h1>
            <p></p>
            <div>
                <div className="board">
                    <ul>
                        {
                            todos.map((todo , idx) => (
                                <li key={idx}>{todo.text}</li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default TodoList;