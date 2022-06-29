import "./App.css";
import "./components/TodoItem";
import React, { Component } from "react";
import TodoItem from "./components/TodoItem";
import down from '../src/img/down.png';

class App extends Component {
  constructor() {
    super();
    this.state = {
      todoItems: [
        // {title: "Mua bim bim", isComplete: false, isShow: true },
        // {title: "Đi chơi", isComplete: false , isShow: true},
        // {title: "Xem phim", isComplete: false , isShow: true}
      ],
    };
  }

  onClickedItem(item){
    const isComplete = item.isComplete;
    const { todoItems } = this.state;
    const index = todoItems.indexOf(item);
    this.setState({
      todoItems: [
        ...todoItems.slice(0, index),
        {
          ...item,
          isComplete: !isComplete
        },
        ...todoItems.slice(index + 1)
      ]
    });      
  }

  itemLeft(){
    const { todoItems } = this.state;
    let count = 0;
    for(let i = 0; i < todoItems.length; i++){
      if(todoItems[i].isComplete === false) count++;
    }
    return count;
  }

  insertTodo(event){
    const { todoItems } = this.state;
    const input = document.getElementById('inputTodo');
    if(event.key === 'Enter' && input.value !== ''){
      this.setState({
        todoItems: [
          {title: input.value, isComplete: false, isShow: true},
          ...todoItems
        ]
      })
      input.value = '';
    }
  }

  showAll(){
    this.setState((state) => {
      return {
        todoItems: state.todoItems.map(item => (Object.assign(item, {isShow: true})))
      }
    })
  }

  showActive(){
    this.setState((state) => {
      return {
        todoItems: state.todoItems.map(item => {
          if(item.isComplete === false){
            return (Object.assign(item, {isShow: true}));
          }
          else {
            return (Object.assign(item, {isShow: false}));
          }
        })
      }
    })
  }

  showCompleted(){
    this.setState((state) => {
      return {
        todoItems: state.todoItems.map(item => {
          if(item.isComplete === true){
            return (Object.assign(item, {isShow: true}));
          }
          else {
            return (Object.assign(item, {isShow: false}));
          }
        })
      }
    })
  }

  clearCompleted(){
    this.setState((state) => {
      return {
        todoItems: state.todoItems.filter(item => {
          return item.isComplete === false;
        })
      }
    })
  }

  render() {
    return (
      <div className="App">
        <h1>todos</h1>
        <div className="TodoContainer">
        <span className="ButtonHeader"><img alt="" src={ down }></img></span>
        <input id="inputTodo" placeholder="What needs to be done?" onKeyDown={ (event) => this.insertTodo(event) } ></input>
          {
            this.state.todoItems.length > 0 && this.state.todoItems.map((item, index) => {
              if(this.state.todoItems[index].isShow === true){
                return (
                  <TodoItem
                    item={item}
                    key={index}
                    onClick={() => this.onClickedItem(item) }
                  ></TodoItem>
                );
              }
              else return '';
            })
          } 
          {
            this.state.todoItems.length === 0 && ''
          }
          <div className="Footer">
            <span> { this.itemLeft() } item left </span>

            <div className="Buttons">
              <span onClick={ () => this.showAll() }>All</span>
              <span onClick={ () => this.showActive() }>Active</span>
              <span onClick={ () => this.showCompleted() }>Completed</span>
            </div>
            <span onClick={ () => this.clearCompleted() } className="Clear">Clear completed</span>
          </div>
          
        </div>
      </div>
    );
  }
}

export default App;
