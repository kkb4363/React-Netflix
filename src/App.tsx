import {DragDropContext, Draggable, Droppable, DropResult} from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { toDoState } from './components/atoms';
import Board from './components/Board';


const Wrapper = styled.div`
  display:flex;
  max-width:680px;
  width:100%;
  margin:0 auto;
  justify-content:center;
  align-items:center;
  height:100vh;
`;

const Boards = styled.div`
display:grid;
width:200px;
grid-template-columns:repeat(3,1fr);
gap:10px;
`;

const toDos = ['a','b','c','d','e','f'];

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState)
  const onDragEnd = ({draggableId,destination, source}:DropResult) => {
    
    if(!destination) return;
   /* setToDos(oldToDos => {
      const ToDosCopy = [...oldToDos];
      ToDosCopy.splice(source.index, 1);
      ToDosCopy.splice(destination?.index, 0, draggableId);
      return ToDosCopy; 
     })*/
  };
 
  return (
  <DragDropContext onDragEnd={onDragEnd}>
    <Wrapper>
      <Boards>
        {Object.keys(toDos).map((boardId) => <Board
        boardId={boardId} key={boardId} toDos={toDos[boardId]}/>)}
      </Boards>
    </Wrapper>
  </DragDropContext>
)}
export default App;