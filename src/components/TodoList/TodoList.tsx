import React, {
  memo,
  useState,
  DragEvent,
  useCallback,
  useEffect,
  DragEventHandler,
} from 'react';
import { useSelector } from 'react-redux';
import './TodoList.scss';
import { RootState } from '../../redux/store';
import TodoItem from '../TodoItem/TodoItem';
import { Todo } from '../TodoItem/TodoItem';
import { updateTodosOrder } from '../../redux/todosSlice';
import { useAppDispatch } from '../../redux/hooks';

const TodoList = memo(() => {
  const { todos } = useSelector((state: RootState) => state.todos);
  const { filter } = useSelector((state: RootState) => state.filter);
  const [showingTodos, setShowingTodos] = useState<Todo[]>(todos);

  useEffect(() => {
    switch (filter) {
      case '':
        setShowingTodos(todos);
        break;
      case 'doneFirst':
        setShowingTodos(
          [...todos].sort((a, b) =>
            a.completed === b.completed ? 0 : a.completed ? -1 : 1
          )
        );
        break;
      case 'undoneFirst':
        setShowingTodos(
          [...todos].sort((a, b) =>
            a.completed === b.completed ? 0 : a.completed ? 1 : -1
          )
        );
        break;
      default:
        setShowingTodos(todos);
    }
  }, [filter, todos]);

  const [draggingItem, setDraggingItem] = useState<Todo | null>(null);
  const dispatch = useAppDispatch();

  const handleDragStart = (e: DragEvent<HTMLLIElement>, item: Todo) => {
    e.dataTransfer.setData('text/plain', item.id.toString());
    setDraggingItem(item);
  };

  const handleDrop = useCallback(
    (e: DragEvent<HTMLLIElement>, targetItem: Todo) => {
      if (targetItem && draggingItem) {
        e.preventDefault();
        const newList = showingTodos.filter(
          (item) => item.id !== draggingItem.id
        );
        const targetIndex = newList.findIndex(
          (item) => item.id === targetItem.id
        );
        dispatch(
          updateTodosOrder([
            ...newList.slice(0, targetIndex + 1),
            draggingItem,
            ...newList.slice(targetIndex + 1),
          ])
        );
      }
    },
    [dispatch, draggingItem, showingTodos]
  );

  const handleDragOver: DragEventHandler<HTMLUListElement> = (e) => {
    e.preventDefault();
  };

  return (
    <ul className="todos" onDragOver={handleDragOver}>
      {showingTodos.length
        ? showingTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              handleDragStart={handleDragStart}
              handleDrop={handleDrop}
            />
          ))
        : 'Список задач пуст'}
    </ul>
  );
});

export default TodoList;
