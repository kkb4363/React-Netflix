import React from "react";
import {useForm} from 'react-hook-form';
import { atom, useRecoilState } from "recoil";

const toDoState = atom<IToDo[]>({
  key:'toDo',
  default:[],
})

interface IForm{
    toDo:string;
}

interface IToDo{
  text:string;
  id:number;
  category:"TO_DO"|"DOING"|"DONE";

}

function ToDoList(){
  const [ToDos, setToDos] = useRecoilState(toDoState);
 const {
    register,
    handleSubmit,
    setValue
 } = useForm<IForm>()

 const handleValid = ({toDo}:IForm) => {
    setToDos(prev => [{text:toDo , id:Date.now(), category:"TO_DO"}, ...prev])
    setValue('toDo',"");
 }

    return (
    <div>
      <h1>To Dos</h1>
      <hr/>
      <form onSubmit={handleSubmit(handleValid)} >
        <input {...register('toDo',
        {
            required:'please write a To Do',
        })} placeholder="Write a to do"/>
        <button>Add</button>
      </form>

      <ul>
        {ToDos.map(toDo => <li key={toDo.id}>{toDo.text}</li>)}
      </ul>
    </div>
  );
}
export default ToDoList; 