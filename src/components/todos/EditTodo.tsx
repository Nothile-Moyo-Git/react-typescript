/**
 * Edit todo component
 * Currently houses a form which performs a PUT request to an endpoint in firebase
 * We use the id of the task to represent the id key in the database
 * We receive the relevant props from Todos
 * 
 * @returns EditTodo : JSX
*/

import './EditTodo.scss';
import { useParams } from "react-router-dom";

interface ParamTypes {
    id : string
}

const EditTodo = () => {

    // Get the slug from the URL
    const slug = useParams<ParamTypes>();

    // Get the post ID dynamically
    const id = slug.id;

    return (
        <div className="edit-todo">
            {`Current id is ${id}`}
        </div>
    );
};

export default EditTodo;

