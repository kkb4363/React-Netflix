import React from "react";
import {useForm} from 'react-hook-form';
function ToDoList(){
   const {register ,  handleSubmit} = useForm();
   const onValid = (data:any) => {
    console.log(data);
   }
    return (
        <div>
            <form 
            style={{display:'flex', flexDirection:'column'}}
            onSubmit={handleSubmit(onValid)}>
                <input {...register('email', {required:true})} placeholder="email"/>
                <input {...register('firstName', {required:true, minLength:10})} placeholder="firstName"/>
                <input {...register('LastName', {required:true, minLength:10})} placeholder="LastName"/>
                <input {...register('password', {required:true, minLength:5})} placeholder="password"/>
                <input {...register('password2', {required:true, minLength:5})} placeholder="password2"/>
                <button>Add</button>
            </form>
        </div>
    )
}

export default ToDoList;
