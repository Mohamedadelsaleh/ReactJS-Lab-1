// import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';


export function TodoInput({ onAdd }) {
  let [value, setValue ] = useState("");
  return (
    <div>
      <input 
        type="text"
        value={value}
        onChange={ (e) => {
        setValue(e.target.value);
      }} 
      />
      <button 
        onClick={ () => {
        onAdd(value);
        setValue("");
      }}
      > Add Record
      </button>
    </div>
  );

}

export function TodoList({ items, onDelete }) {
  return (
    <ul>
      {items.map((item) => (
        <TodoItem
          key={item.id}
          value={item}
          onDelete={() => {
            onDelete(item);
          }}
          />
      ))}
    </ul>
  );
}

export function TodoItem({ value, onDelete }) {
  return (
    <li>
      <input 
        type="checkbox" 
        defaultChecked={value.completed} 
        />
      {value.title}
      <button onClick={() => onDelete()}> Delete </button>
    </li>
  );
  
}


export function App() {

  const [items, setItems] = useState([
    {id: 1, title: "Item1", completed: true},
    {id: 2, title: "Item2", completed: false}
  ]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response => response.json())
    .then((json) => setItems(json));
  }, []);

  return (
    <div>
      <TodoInput
        onAdd={(value) => {
          setItems([
            ...items,
            { id: Math.random(), title: value, completed:false},
          ]);
        }}
      />
      <TodoList 
        items={items} 
        onDelete={(item) => {
          setItems(items.filter((todoItem) => todoItem.id !== item.id));
      }}
      />
    </div>

  );
}

export default App;
