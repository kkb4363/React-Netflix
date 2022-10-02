import { useQuery } from "@tanstack/react-query";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import { getPopularTv, IGetTvResult,getAiringTv } from "../api";
import {motion, AnimatePresence,useScroll} from 'framer-motion';
import { useEffect, useState } from "react";
import styled from 'styled-components';
import { makeImagePath } from "../utils";
import { BsFillArrowRightCircleFill , BsFillArrowLeftCircleFill, BsFillPlayCircleFill} from "react-icons/bs";
const offset = 6;
const API_KEY = '505148347d18c10aeac2faa958dbbf5c';
const BASE_PATH = 'https://api.themoviedb.org/3';
const Wrapper = styled.div`
background:black;
`
const Loader = styled.div`
height:20vh;
display:flex;
justify-content:center;
align-items:center;
`
const Banner = styled.div<{bgPhoto:string}>`
height:100vh;
display:flex;
flex-direction:column;
justify-contents:center;
padding:60px;
background-image: linear-gradient(rgba(0,0,0,1), rgba(0,0,0,0)) , url(${props => props.bgPhoto});
background-size:cover;
`
const Title = styled.h2`
font-size:68px;
margin-bottom:20px;
`
const Overview = styled.p`
font-size:30px;
width:50%;
`
const PoSlider = styled.div`
position:relative;
top: -100px;
`
const SliderText = styled.div`
left:0;
position:absolute;
font-size:35px;
width:400px;
height:200px;
top:-50px;
font-weight:400;
`
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
  const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`
const infoVariants = {
    hover: {
      opacity: 1,
      transition: {
        delay: 0.5,
        duaration: 0.1,
        type: "tween",
      },
    },
  };
const AirSlider = styled.div`
position:relative;
top: 200px;
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
font-size:45px;
position:relative;
display:flex;
justify-content:center;
align-items:center;
top:-250px;
font-family:cursive;
padding:20px;
`
const BigGen = styled.h4`
color:${props => props.theme.white.lighter};
font-size:20px;
position:relative;
display:flex;
align-items:center;
justify-content:center;
top:-250px;
font-family:cursive;
div{
  margin:0 5px;
  width:120px;
  height:50px;
  border-radius:20px;
  display:flex;
  justify-content:center;
  align-items:center;
  background-color:rgba(0,0,0,0.2);
}

`
const BigOverView = styled.p`
padding:20px;
margin-top:-150px;
font-family:fantasy;
color:${props => props.theme.white.lighter};
`
const BigScore = styled.div`
position:absolute;
bottom:10px;
padding:20px;
color:${props=>props.theme.white.lighter};
font-size:30px;
`
const BigReleaseDate = styled.p`
padding:20px;
position:absolute;
right:0px;
bottom:10px;
font-size:30px;
color:${props=>props.theme.white.lighter};
`
const BigPlay = styled.div`
position:absolute;
padding:20px;
bottom:50px;
font-size:40px;
border-radius:5px;
cursor:pointer;
color:${props=>props.theme.white.lighter};
`
const Prev = styled.button`
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

function Tv(){
    const [gen,setgen] =useState<any[]>([]);
    useEffect(()=>{
        fetch(`${BASE_PATH}/genre/tv/list?api_key=${API_KEY}&language=ko-KR`)
        .then((res)=>res.json())
        .then((json)=>{
            setgen(json.genres);
        })
    },[])

    const {data:Popular , isLoading} = useQuery<IGetTvResult>(
        ['TV','popular'],
        getPopularTv
    );

    const {data:Airing} = useQuery<IGetTvResult>(
        ['TV','Airing'],
        getAiringTv
    );
    
    const navigate = useNavigate();
    const {scrollY} = useScroll();
    const tvPathMatch:PathMatch<string>|null = useMatch('/tv/:tvId');
    const onOverlayClick = () => navigate('/tv');
    const clickTv = tvPathMatch?.params.tvId && Popular?.results.find(tv => tv.id+'' === tvPathMatch.params.tvId)
    const clickTv2 = tvPathMatch?.params.tvId && Airing?.results.find(tv => tv.id+'' === tvPathMatch.params.tvId)

    const onBoxClicked = (tvId:number) => {
        navigate(`/tv/${tvId}`);
    };

    const [back, setback] = useState(false);
    const [back2, setback2] = useState(false);
    const [index, setIndex] = useState(0);
    const [index2, setIndex2] = useState(0);
    const [leaving, setLeaving] = useState(false);
    const toggleLeaving = () => setLeaving(prev => !prev);
    

    const PoPrevBtn = () => {
        if(Popular){
            if(leaving) return;
        toggleLeaving();
        const totalTv = Popular.results.length -2;
        const MaxIndex = Math.floor(totalTv/offset) -2;
        setIndex((prev) => prev === 0 ? MaxIndex : prev -1);
        setback(false);
        }
    }
    const PoNextBtn = () => {
        if(Popular){
            if(leaving) return;
        toggleLeaving();
        const totalTv = Popular.results.length -2;
        const MaxIndex = Math.floor(totalTv/offset) -2;
        setIndex((prev) => prev === MaxIndex ? 0 : prev +1);
        setback(true);    
    }
    }

    const AirPrevBtn = () => {
        if(Airing){
            if(leaving) return;
        toggleLeaving();
        const totalTv = Airing.results.length -2;
        const MaxIndex2 = Math.floor(totalTv/offset) -2;
        setIndex2((prev)=> prev === 0? MaxIndex2 : prev -1);
        setback2(false);
    }
}
    const AirNextBtn = () => {
        if(Airing){
            if(leaving) return;
        toggleLeaving();
        const totalTv = Airing.results.length -2;
        const MaxIndex2 = Math.floor(totalTv/offset) -2;
        setIndex2((prev)=> prev === MaxIndex2? 0 : prev+1);
        setback2(true);
    }
}

    return (
        <Wrapper>
        {isLoading ? <Loader>Loading...</Loader>
        :<>
        <Banner
        bgPhoto={makeImagePath(Popular?.results[0].backdrop_path || '')}>
        <Title>{Popular?.results[0].name}</Title>
        <Overview>{Popular?.results[0].overview}</Overview>
        </Banner>

        <PoSlider>
            <SliderText>Popular Tv</SliderText>
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
                transition={{type:'tween', duration:0.5}}
                key={index}>
                    {Popular?.results.slice(2).slice(offset*index, offset*index+offset)
                    .map((tv) => (
                        <Box
                        layoutId={tv.id+''}
                        variants={boxVariants}
                        key={tv.id}
                        whileHover='hover'
                        initial='normal'
                        onClick={()=> onBoxClicked(tv.id)}
                        transition={{type:'tween'}}
                        bgPhoto={makeImagePath(tv.backdrop_path, 'w400' || '')}>
                            <Info
                            variants={infoVariants}>
                                <h4>{tv.name}</h4>
                            </Info>
                        </Box>
                    ))}    
                </Row>
                <Prev onClick={PoPrevBtn}><BsFillArrowLeftCircleFill/></Prev>
                <Next onClick={PoNextBtn}><BsFillArrowRightCircleFill/></Next>
            </AnimatePresence>
        </PoSlider>
        
        <AirSlider>
            <SliderText>Airing Tv</SliderText>
            <AnimatePresence
            custom={back2}
            initial={false}
            onExitComplete={toggleLeaving}>
                <Row
                custom={back2}
                variants={rowVariants}
                initial='hidden'
                animate='visible'
                exit='exit'
                transition={{type:'tween', duration:0.5}}
                key={index2}>
                    {Airing?.results.slice(2).slice(offset*index2, offset*index2+offset)
                    .map((tv) => (
                        <Box
                        layoutId={tv.id+''}
                        variants={boxVariants}
                        key={tv.id}
                        whileHover='hover'
                        initial='normal'
                        onClick={()=> onBoxClicked(tv.id)}
                        transition={{type:'tween'}}
                        bgPhoto={makeImagePath(tv.backdrop_path, 'w400' || '')}>
                            <Info
                            variants={infoVariants}>
                                <h4>{tv.name}</h4>
                            </Info>
                        </Box>
                    ))}    
                </Row>
                <Prev onClick={AirPrevBtn}><BsFillArrowLeftCircleFill/></Prev>
                <Next onClick={AirNextBtn}><BsFillArrowRightCircleFill/></Next>
            </AnimatePresence>
        </AirSlider>

        <AnimatePresence>
            {tvPathMatch ? 
            <>
            <Overlay
            onClick={onOverlayClick}
            animate={{opacity:1}}
            exit={{opacity:0}}/>

            <BigMovie
            layoutId={tvPathMatch.params.tvId}
            style={{top:scrollY.get()+100}}>
                {clickTv && 
                <>
                <BigCover
                style={{backgroundImage:`url(${makeImagePath(clickTv.backdrop_path, 'w500')})`}}/>
                <BigTitle>{clickTv.name}</BigTitle>
                <BigGen>
              {clickTv.genre_ids.map((g) => (
                gen.map((v)=>(
                  v.id === g ? (
                    <div>{v.name}</div>
                    
                  ): null
                )) 
              ))}
            </BigGen>
                <BigOverView>{clickTv.overview}</BigOverView>
                <BigScore>{clickTv.vote_count}</BigScore>
                <BigReleaseDate>{clickTv.first_air_date}</BigReleaseDate>
                <BigPlay><BsFillPlayCircleFill/></BigPlay>
                </>}

                {clickTv2 && 
                <>
                <BigCover
                style={{backgroundImage:`url(${makeImagePath(clickTv2.backdrop_path, 'w500')})`}}/>
                <BigTitle>{clickTv2.name}</BigTitle>
                <BigGen>
              {clickTv2.genre_ids.map((g) => (
                gen.map((v)=>(
                  v.id === g ? (
                    <div>{v.name}</div>
                    
                  ): null
                )) 
              ))}
            </BigGen>
                <BigOverView>{clickTv2.overview}</BigOverView>
                <BigScore>{clickTv2.vote_count}</BigScore>
                <BigReleaseDate>{clickTv2.first_air_date}</BigReleaseDate>
                <BigPlay><BsFillPlayCircleFill/></BigPlay>
                </>}

            </BigMovie>
            </>   : null
        }
        </AnimatePresence>

        </>} 
        </Wrapper>
    )
    

}
export default Tv;