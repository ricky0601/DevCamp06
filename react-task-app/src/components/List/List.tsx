// import React from 'react'

import { GrSubtract } from "react-icons/gr"
import Task from "../Task/Task";
import ActionBotton from "../ActionBotton/ActionBotton";
import { IList, ITask } from "../../types";
import { FC } from "react";
import { useTypedDispatch } from "../../hooks/redux";
import { deleteList, setModalActive } from "../../store/slices/boardSlice";
import { addLog } from "../../store/slices/loggerSlice";
import { v4 } from "uuid";
import { setModalData } from "../../store/slices/modalSlice";

type TListProps = {
    boardId: string;
    list: IList;
}

const List: FC<TListProps> = ({
    list,
    boardId
}) => {

    const dispatch = useTypedDispatch();

    const handleListDelete = (listId: string) => {
        dispatch(deleteList({boardId, listId}));
        dispatch(
            addLog({
                logId: v4(),
                logMessage: `리스트 삭제하기: ${list.listName}`,
                logAuthor: "User",
                logTimestamp: String(Date.now())
            })
        )
    }

    const handleTaskChange = (
        boardId: string,
        listId: string,
        taskId: string,
        task: ITask
    ) => {
        dispatch(setModalData({
            boardId,
            listId,
            task
        }));
        dispatch(setModalActive(true));
    }

    return (
        <div>
            <div>
                <div>{list.listName}</div>
                <GrSubtract 
                    onClick={() => handleListDelete(list.listId)}
                />
            </div>

            {list.tasks.map((task, index) => (
                <div
                    onClick={() => handleTaskChange(boardId, list.listId, task.taskId, task)}
                    key={task.taskId}
                >
                    <Task 
                        taskName = {task.taskName}
                        taskDescription = {task.taskDescription}
                        boardId={boardId}
                        id={task.taskId}
                        index={index}
                    />
                </div>
            ))}
            <ActionBotton  />
        </div>
    )
}

export default List;