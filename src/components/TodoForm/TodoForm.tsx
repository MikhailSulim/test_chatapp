import { useAppDispatch } from '../../redux/hooks';
import { addTodo } from '../../redux/todosSlice';
import './TodoForm.scss';

import React, { useState } from 'react';
import { handleFilter } from '../../redux/filterSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const TodoForm = () => {
  const [text, setText] = useState<string>('');
  const dispatch = useAppDispatch();
  const { filter } = useSelector((state: RootState) => state.filter);
  const [filterCurrent, setFilterCurrent] = useState<string>(filter);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim().length) dispatch(addTodo({ text: text }));
    setText('');
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterCurrent(e.target.value);
    dispatch(handleFilter(e.target.value));
  };

  return (
    <form className="form" onSubmit={(e) => handleSubmit(e)}>
      <h1 className="form__title">ToDo List</h1>
      <div className="form__input-field">
        <input
          className="form__input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
        />
        <button type="submit" className="form__button">
          Добавить
        </button>
        <select
          className="form__select"
          value={filter}
          onChange={(e) => handleFilterChange(e)}
        >
          <option className="form__select-option" value="">
            Сортировать
          </option>
          <option className="form__select-option" value="doneFirst">
            Сначала выполненные
          </option>
          <option className="form__select-option" value="undoneFirst">
            Сначала невыполненные
          </option>
        </select>
      </div>
    </form>
  );
};

export default TodoForm;
