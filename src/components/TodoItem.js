import React, { Component } from 'react';
import './TodoItem.css'
import classNames from 'classnames'
import undone from '../img/undone.png'
import done from '../img/done.png'

class TodoItem extends Component {
    constructor(props){
        super(props);
        this.onItemClick = this.onItemClick.bind(this)    
    }

    onItemClick(){
        console.log(this.props.item);
    }

    // completeTodo(check){
    //     this.props.item.isComplete = !check;
    // }

    render(){
        const { item, onClick } = this.props;
        const title = this.props.item.title;
        //If we use onClick = this.onItemClick() it will automatically use that function when rendering
        //To advoid it, we can use anonymous function
        //Or we can overload it in constructor
  
        return <div onClick={ onClick } className = { classNames('TodoItem', {
            'TodoItem-complete': item.isComplete === true
        })}>
            {
                item.isComplete === true && <img alt='' src={ done }></img>
            }
            {
                item.isComplete === false && <img alt='' src={ undone }></img>
            }
            <p> { title } </p>
        </div>
    }
}

export default TodoItem;