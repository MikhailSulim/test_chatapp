import './App.scss';
import TodoList from './components/TodoList/TodoList';
import TodoForm from './components/TodoForm/TodoForm';

const App = () => {
  return (
    <main className="main">
      <div className="content">
        <TodoForm />
        <TodoList />
      </div>
    </main>
  );
};

export default App;
