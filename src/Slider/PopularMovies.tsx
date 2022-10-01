import { useQuery } from "@tanstack/react-query";
import { getMovies,  getPopularMovies,  IGetMoviesResult } from "../api";
import styled from 'styled-components';
import { makeImagePath } from "../utils";
import {motion, AnimatePresence,useScroll} from 'framer-motion';
import { useState } from "react";
import {useNavigate, useMatch, PathMatch} from 'react-router-dom';
import { BsFillArrowRightCircleFill , BsFillArrowLeftCircleFill} from "react-icons/bs";

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
    hidden : (custom:boolean) => ({
      x: custom? window.outerWidth +5 : -window.outerWidth -5 ,
    }),
    visible: {
      x:0,
    },
    exit : (custom:boolean) => ( {
      x: custom? -window.outerWidth -5 : window.outerWidth +5,
    }),
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

const boxVariants1 = {
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

const PREV = styled.button`
position:absolute;
font-size:50px;
background-color:rgba(0,0,0,0);
left:0;
top:70px;
border:rgba(0,0,0,0);
color:white;
`

const Next = styled.button`
position:absolute;
font-size:50px;
background-color:rgba(0,0,0,0);
right:0;
top:70px;
border:rgba(0,0,0,0);
color:white;
`

const Overlay = styled(motion.div)`
position:absolute;
top:0;
width:100%;
height:200%;
background-color:rgba(0,0,0,0.5);
opacity:0;
`

const BigMovie = styled(motion.div)`
position:absolute; 
width:40vw; 
height:80vh;
left:0;
right:0;
margin:0 auto;
border-radius:15px;
overflow:hidden;
background-color:${props=>props.theme.black.lighter};
`
const BigCover = styled.div`
width:100%;
height:400px;
background-size:cover;
background-position:center center;
`

const BigTitle = styled.h3`
color:${props => props.theme.white.lighter};
font-size:46px;
position:relative;
top:-80px;
padding:20px;
`

const BigOverView = styled.p`
padding:20px;
margin-top:-80px;
color:${props => props.theme.white.lighter};
`

const boxVariants = {
    normal: {
      scale: 1,
    },
    hover: {
      zIndex:999,
      scale: 1.3,
      y: -80,
      transition: {
        delay: 0.5,
        duaration: 0.1,
        type: "tween",
      },
    },
  };

export function PopularMovieSlider(){
const {data} = useQuery<IGetMoviesResult>(
        ['movie', 'popular'],
        getPopularMovies);
const moviePathMatch:PathMatch<string>|null = useMatch('/movies/:movieId');
const onOverlayClick = () => navigate('/');
const clickedMovie = moviePathMatch?.params.movieId && data?.results.find(movie => movie.id+'' === moviePathMatch.params.movieId)
const PrevBtn = () => {
    if(data){
      if(leaving) return;
    toggleLeaving();
    const totalMovies2 = data.results.length -2;
    const maxIndex2 = Math.floor(totalMovies2/offset) -2;
    setIndex((prev) => prev === 0 ? maxIndex2 : prev -1);
    setback(false);
    }
  }

  const [back, setback] = useState(false);

  const toggleLeaving = () => setLeaving(prev => !prev);
  const [leaving, setLeaving] = useState(false);

  
  const onBoxClicked = (movieId:number) => {
    navigate(`/movies/${movieId}`);
  };
  const [index, setIndex] = useState(0);
  
  const NextBtn = () => {
    if(data){
      if(leaving) return;
    toggleLeaving();
    const totalMovies = data.results.length -2; {/*영화 개수 알아내기 , -1을 해주는 이유는 이미 메인페이지에 영화 하나 쓰고있으니깐 */}
    const maxIndex = Math.floor(totalMovies/ offset) -2 ; {/* 인덱스의 길이구하기 , Math.ceil은 올림, -1을 해주는 이유는 page가 0에서 시작하기 때문에 */}
    setIndex((prev) => prev === maxIndex ? 0 : prev + 1); 
    setback(true);
    }
  };
  const navigate = useNavigate();
  
  const {scrollY} = useScroll();
    return(
        <>
        <Slider>
            <SliderText>Popular Movies</SliderText>
            <AnimatePresence
            custom={back} 
            initial={false}
            onExitComplete={toggleLeaving}>
            <Row 
              custom={back}
              variants={rowVariants} 
              initial='hidden' 
              animate='visible' 
              exit='exit'
              transition={{type:"tween", duration:1.5}}
              key={index}
            >
              {data?.results.slice(1).slice(offset*index, offset*index+offset)
              .map((movie) => (
                <Box
                layoutId={movie.id+''}
                variants={boxVariants}
                key={movie.id} 
                whileHover='hover'
                initial='normal'
                onClick={()=> onBoxClicked(movie.id)}
                transition={{type:'tween'}}
                bgPhoto={makeImagePath(movie.backdrop_path, 'w400'  || "")}
                >
                <Info variants={infoVariants}>
                <h4>{movie.title}</h4>
                </Info>
                </Box>
              ))} 
            </Row>
            <PREV onClick={PrevBtn}><BsFillArrowLeftCircleFill/></PREV>
            <Next onClick={NextBtn}><BsFillArrowRightCircleFill/></Next>
            </AnimatePresence>
          </Slider>
          <AnimatePresence>
            {moviePathMatch ? 
            <>
            <Overlay 
            onClick={onOverlayClick}
            animate={{opacity : 1}}
            exit={{opacity:0}}
            />
            
            <BigMovie
              layoutId={moviePathMatch.params.movieId}
              style={{top:scrollY.get() + 100}
            }>

            {clickedMovie && 
            <>
            <BigCover 
            style={{
              backgroundImage:`url(${makeImagePath(clickedMovie.backdrop_path, 'w500')})`
              }}/>
            <BigTitle>{clickedMovie.title}</BigTitle>
            <BigOverView>{clickedMovie.overview}</BigOverView>
            </>}

            </BigMovie>
            </>
              : null}
          </AnimatePresence>
        
        </>
    )
}