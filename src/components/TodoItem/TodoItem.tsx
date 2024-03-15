import { useDispatch } from 'react-redux';
import './TodoItem.scss';

import React, { useState, DragEvent, memo, useCallback } from 'react';
import { deleteTodo, completeTodo, updateTodo } from '../../redux/todosSlice';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}
interface TodoProps {
  todo: Todo;
  handleDragStart: (e: DragEvent<HTMLLIElement>, todo: Todo) => void;
  handleDrop: (e: DragEvent<HTMLLIElement>, todo: Todo) => void;
}

const TodoItem: React.FC<TodoProps> = memo(
  ({ todo, handleDragStart, handleDrop }) => {
    const { id, text, completed } = todo;
    const [isEditable, setIsEditable] = useState(false);
    const [newText, setNewText] = useState(text);
    const [isDeleting, setIsDeleting] = useState(false);

    const dispatch = useDispatch();

    const handleCompleteTodo = useCallback(
      (todoId: number) => {
        dispatch(completeTodo(todoId));
      },
      [dispatch]
    );

    const handleEditTodo = useCallback(
      (todoId: number) => {
        if (isEditable) {
          dispatch(updateTodo({ id: todoId, text: newText }));
          setIsEditable(!isEditable);
        } else {
          if (completed) handleCompleteTodo(todoId);
          setIsEditable(!isEditable);
        }
      },
      [completed, dispatch, isEditable, newText, handleCompleteTodo]
    );

    const handleDeleteTodo = useCallback(
      (todoId: number) => {
        setIsDeleting(true);
        setTimeout(() => dispatch(deleteTodo(todoId)), 300);
      },
      [dispatch]
    );

    return (
      <li
        className={`todo ${isDeleting ? 'todo_deleting' : ''}`}
        draggable
        onDragStart={(e) => handleDragStart(e, todo)}
        onDrop={(e) => handleDrop(e, todo)}
      >
        <label className="todo__checkbox">
          <input
            type="checkbox"
            checked={completed}
            onChange={() => handleCompleteTodo(id)}
            value="value-1"
          />
          <span />
        </label>
        <input
          readOnly={!isEditable}
          value={isEditable ? newText : text}
          type="text"
          onChange={(e) => setNewText(e.target.value)}
          className={`todo__input ${completed ? 'todo__input_completed' : ''}`}
        />
        <button
          className={`${isEditable ? 'todo__apply-btn' : 'todo__edit-btn'}`}
          onClick={() => handleEditTodo(id)}
        >
          {isEditable ? String.fromCharCode(10004) : String.fromCharCode(9998)}
        </button>
        <button onClick={() => handleDeleteTodo(id)} className="todo__del-btn">
          &#10060;
        </button>
      </li>
    );
  }
);

export default TodoItem;
