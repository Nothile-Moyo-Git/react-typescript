/**
 * TodoItem component, takes a todo item from the array of Todos from the todos component
 * Renders the todo on the page, and handles all the necessary logic required for it
 * 
 * @returns a list item containing the todo information and handlers for logic (<li>)
 */

import './TodoItem.scss';

interface ComponentProps {
    key : string,
    task : string,
    position : number
};

const TodoItem = ({task, position} : ComponentProps) => {

    return(
        <li className="todo-item" style={{ animationDelay : `${position / 2}s`}}>
            <p className="todo-item__task">{task}</p>
            <div className="todo-item__buttons">
                <button className="todo-item__button">Edit</button>
                <button className="todo-item__button">Delete</button>
            </div>
        </li>
    );

}

export default TodoItem;