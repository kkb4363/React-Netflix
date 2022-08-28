import React from "react";
import {useForm} from 'react-hook-form';
import { atom, useRecoilState } from "recoil";
import styled from "styled-components";

const Background = styled.div`
position:absolute;
z-index:10;
width:100%;
height:100%;
background:url(https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=http%3A%2F%2Fcfile26.uf.tistory.com%2Fimage%2F9949574E5D41B4470475E1);
background-size:cover;
opacity:0.9;
`;

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
}

function ToDoList(){
  const [ToDos, setToDos] = useRecoilState(toDoState);
 const {
    register,
    handleSubmit,
    setValue
 } = useForm<IForm>()

 const handleValid = ({toDo}:IForm) => {
    setToDos(prev => [{text:toDo , id:Date.now()}, ...prev])
    setValue('toDo',"");
 }
 
    return (
    <Background className="kcaldiv">
      <h1>How many calories did you eat today?</h1>
      <form onSubmit={handleSubmit(handleValid)} >
        <input {...register('toDo',
        {   
            maxLength:4,
            required:'please write a calories',
        })} placeholder="pleaes write a calories"/>
        <button>Add</button>
      </form>

    <div className="Kcal_list-github">
      <div className="Kcal_list">
        {ToDos.map(toDo => <div className="Kcal_list_div" key={toDo.id}>{toDo.text}kcal</div>)}
      </div>
      <div className="github">
        {/* 여기에 깃허브 잔디 넣기*/}
      </div>  
    </div>    
      

      
    </Background>
  );
}
export default ToDoList;