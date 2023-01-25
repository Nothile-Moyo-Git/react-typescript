/**
 * TodoItem component, takes a todo item from the array of Todos from the todos component
 * Renders the todo on the page, and handles all the necessary logic required for it
 * 
 * @returns a list item containing the todo information and handlers for logic (<li>)
 */

import './TodoItem.scss';
import Tilt from "react-parallax-tilt";
import { Link } from 'react-router-dom';

interface ComponentProps {
    id : string,
    key : string,
    task : string,
    position : number
};

const TodoItem = ({id, task, position} : ComponentProps) => {

    return(
        <Tilt 
            className="todo-item" 
            style={{ animationDelay : `${position / 2}s` }}
            tiltMaxAngleX={10}
            tiltMaxAngleY={10}
            glareEnable={true}
            glarePosition="all"
            glareMaxOpacity={0.8}
            glareBorderRadius={"90"}
            glareColor={"#861657"}
        >
            <p className="todo-item__task">{task}</p>
            <div className="todo-item__buttons">
                <Link to={`edit/${id}`} className="todo-item__button">Edit</Link>
                <button className="todo-item__button">Delete</button>
            </div>
            
        </Tilt>
    );

}

export default TodoItem;