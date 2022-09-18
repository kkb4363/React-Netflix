import React from 'react';
import {Draggable} from 'react-beautiful-dnd';
import styled from 'styled-components';

const Card = styled.div<{ isDragging: boolean }>`
border-radius:5px;
margin-bottom:5px;
padding: 10px;
background-color: ${(props) =>
  props.isDragging ? "#e4f2ff" : props.theme.cardColor};
box-shadow: ${(props) =>
  props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.05)" : "none"};
`;

interface IDragabbleCardProps{
    index:number;
    toDoId: number;
    toDoText: string;
}
function DragabbleCard({ toDoId, toDoText, index }: IDragabbleCardProps) {

    return(
        <Draggable draggableId={toDoId + ""} index={index}>

            {(magic, snapshot) => (
            <Card ref={magic.innerRef} 
            isDragging={snapshot.isDragging}
                      {...magic.draggableProps} 
                      {...magic.dragHandleProps}
                      >
                      {toDoText}
            </Card>
            )}
          </Draggable>
    )
}

export default React.memo(DragabbleCard);