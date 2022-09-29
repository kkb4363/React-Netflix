import { getPopularMovies, IGetMoviesResult } from "../api"
import {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import styled from "styled-components";
import {motion, AnimatePresence,useScroll} from 'framer-motion';
import { Navigate, useNavigate } from "react-router-dom";
import { makeImagePath } from "../utils";

const Slider = styled.div`
position:relative;
top: 200px;
`

const SliderText = styled.div`
left:0;
position:absolute;
font-size:35px;
width:300px;
height:200px;
top:-50px;
font-weight:400;
`

{/*display:grid 에 대한 설명
https://studiomeal.com/archives/533
*/}
const Row = styled(motion.div)`
display:grid;
gap:5px;
grid-template-columns:repeat(6,1fr);
margin-bottom:5px;
position:absolute;
width:100%;
`
const rowVariants = {
    hidden : {
      x:window.outerWidth +5,
    },
    visible: {
      x:0,
    },
    exit : {
      x:-window.outerWidth -5,
    },
  }

const offset = 6;

const Box = styled(motion.div)<{bgPhoto:string}>`
background-color:white;
height:200px;
background-image:url(${props => props.bgPhoto});
background-size:cover;
background-position:center center;
font-size:66px;
position:relative;
cursor:pointer;
&:first-child{
    transform-origin:center left;
}
&:last-child{
    transform-origin:center right;
}
`

const boxVariants = {
    normal:{
        scale:1,
    },
    hover:{
        zIndex:999,
        scale:1.3,
        y:-80,
        transition:{
            delay:0.5,
            duaration:0.1,
            type:'tween',
        },
    },
}

const Info = styled(motion.div)`
padding:10px;
background-color: ${(props) => props.theme.black.lighter};
opacity:0;
position:absolute;
width:100%;
bottom:0;
h4{
    text-align:center;
    font-size:18px;
}
`

const infoVariants = {
    hover: {
        opacity:1,
        transition:{
            delay:0.5,
            duaration:0.1,
            type:'tween',
        }
    }
}

const BTN = styled.button`
position:absolute;
width:70px;
height:70px;
border-radius:35px;
background-color:tomato;
right:0;
top:65px;
`
export function PopularMovieSlider(){
const {data} = useQuery<IGetMoviesResult>(
    ['movies', 'popular'],
    getPopularMovies
);
const [leaving2,setLeaving] = useState(false);
const toggleLeaving = () => setLeaving(prev => !prev);

const [index,setIndex] = useState(0);
const increaseIndex = () => {
    if(data){
        if(leaving2) return;
    toggleLeaving();
    const totalMovies = data.results.length-2;
    console.log(totalMovies);
    const maxIndex = (totalMovies/ offset) -2;
    setIndex((prev) => prev === maxIndex ? 0 : prev + 1);
    }
}

const navigate = useNavigate();
const onBoxClicked = (movieId:number) => {
    navigate(`/movies/${movieId}`);
}

return(
    <Slider>
        <SliderText>Upcoming Movies</SliderText>
        <AnimatePresence 
            initial={false}
            onExitComplete={toggleLeaving}>
            <Row
            variants={rowVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
            transition={{type:'tween', duration:1}}
            key={index}>
                {data?.results.slice(2).slice(offset*index, offset*index+offset)
                .map((movie) => (
                    <Box
                    layoutId={movie.id+''}
                    variants={boxVariants}
                    key={movie.id}
                    whileHover='hover'
                    initial='normal'
                    onClick={()=>onBoxClicked(movie.id)}
                    transition={{type:'tween'}}
                    bgPhoto={makeImagePath(movie.backdrop_path, 'w400' || "")}
                    >
                    <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                    </Info>
                    </Box>
                ))}
            </Row>
            <BTN onClick={increaseIndex}>Next</BTN>
            </AnimatePresence>
    </Slider>

)

}