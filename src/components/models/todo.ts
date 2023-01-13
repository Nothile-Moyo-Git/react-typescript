/**
 * To do data model
 * Handles the data flow of the todo list
 * Is currently instantiated when each item is generated for the list
 * Note: This is a dummy file from the course, the real solution for this can be found in /src/backend/queryDB.ts
 * 
 * @param todoText : string
 * 
 */

class TodoClass{

    id : string
    text : string

    // Executes on instantiation in order to create a todo item
    constructor( todoId : string,  todoText : string ) {
        this.text = todoText;
        this.id = todoId;
    }

}

export default TodoClass;