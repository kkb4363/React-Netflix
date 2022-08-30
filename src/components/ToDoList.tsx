import { useRecoilValue } from "recoil";
import { toDoState } from "./atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";


function ToDoList(){

  const ToDos = useRecoilValue(toDoState);

    return (
    <div>
      <h1>To Dos</h1>
      <hr/>
      <CreateToDo/>

      <ul>
        {ToDos.map(toDo => <ToDo key = {toDo.id} {...toDo}/>)}
      </ul>
    </div>
  );
}
export default ToDoList; 