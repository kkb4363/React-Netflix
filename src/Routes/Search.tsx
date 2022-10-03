import { useLocation, useNavigate, PathMatch, useMatch, Navigate } from "react-router-dom";
import styled from 'styled-components';
import { AnimatePresence, useScroll ,motion} from "framer-motion";
import { useEffect, useState } from "react";
import { makeImagePath } from "../utils";
import { BsFillPlayCircleFill,BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";

const API_KEY = '505148347d18c10aeac2faa958dbbf5c';
const BASE_PATH = 'https://api.themoviedb.org/3';
const offset = 6;

const Wrapper = styled.div`
background:black;
`
const Slider = styled.div`
position:relative;
top:300px;
`
const SliderText = styled.div`
left:30px;
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
  font-size:35px;
  position:relative;
  top:-25px;
  padding:20px;
  `
  const BigOverView = styled.p`
  padding:20px;
  margin-top:-50px;
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



function Search(){
   const [data,setdata] = useState<any[]>([]);
   const [data2,setdata2] = useState<any[]>([]);
   const location = useLocation()
   const navigate = useNavigate();
   const keyword = new URLSearchParams(location.search).get('keyword');
   useEffect(()=>{
    fetch(`${BASE_PATH}/search/multi?api_key=${API_KEY}&query=${keyword}`)
    .then((res) => res.json())
    .then((json)=>{
        setdata(json.results);
    })
   },[keyword])
   useEffect(()=>{
    fetch(`${BASE_PATH}/search/multi?api_key=${API_KEY}&query=${keyword}&page=2`)
    .then((res) => res.json())
    .then((json)=>{
        setdata2(json.results);
    })
   })

   const [back, setback] = useState(false);
   const [index, setIndex] = useState(0);
   const [leaving, setLeaving] = useState(false);
   const toggleLeaving = () => setLeaving(prev => !prev);
   const {scrollY} = useScroll();

   const PrevBtn = () => {
    if(data){
        if(leaving) return;
    toggleLeaving();
    const total = data.length ;
    const MaxIndex = Math.floor(total / offset) -1;
    setIndex((prev) => prev === 0? MaxIndex : prev -1);
    setback(false);
    }
   }
   const NextBtn = () => {
    if(data){
        if(leaving) return;
    toggleLeaving();
    const total = data.length ;
    const MaxIndex = Math.floor(total / offset)-1 ;
    setIndex((prev) => prev === MaxIndex? 0 : prev +1);
    setback(true);
    }
   }

   const onBoxClicked = (daId:number) => {
    navigate(`/search/${daId}`);
   }
   console.log(data)

   const SearchPathMatch:PathMatch<string>|null = useMatch(`/search/:daId`);
   const onOverlayClick = () => navigate(`/search?keyword=${keyword}`);

   const clickSearch = SearchPathMatch?.params.daId && data?.find(da => da.id+"" === SearchPathMatch.params.daId)
   
    return (
        <Wrapper>
            <Slider>
                <SliderText>search results</SliderText>
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
                    transition={{type:'tween',duration:0.5}}
                    key={index}>
                        {data?.slice(offset*index , offset*index+offset)
                        .map((da) => (
                            <Box
                            layoutId={da.id+''}
                            variants={boxVariants}
                            key={da.id}
                            whileHover='hover'
                            initial='normal'
                            onClick={()=> onBoxClicked(da.id)}
                            transition={{type:'tween'}}
                            bgPhoto={makeImagePath(da.backdrop_path,'w400' || '')}>
                                <Info
                                variants={infoVariants}>
                                    <h4>{da.title}</h4>
                                </Info>
                            </Box>
                        ))}
                    </Row>
                    <Prev onClick={PrevBtn}><BsFillArrowLeftCircleFill/></Prev>
                    <Next onClick={NextBtn}><BsFillArrowRightCircleFill/></Next>
                </AnimatePresence>
            </Slider>

            <AnimatePresence>
                {SearchPathMatch ? 
                <>
                <Overlay
                onClick={onOverlayClick}
                animate={{opacity:1}}
                exit={{opacity:0}}/>

                <BigMovie
                layoutId={SearchPathMatch.params.daId}
                style={{top:scrollY.get()+100}}>
                    {clickSearch &&
                    <>
                    <BigCover
                    style={{backgroundImage:`url(${makeImagePath(clickSearch.backdrop_path, 'w500')})`}}/>
                    <BigTitle>{clickSearch.title}</BigTitle>
                    <BigOverView>{clickSearch.overview}</BigOverView>
                    <BigScore>{clickSearch.vote_count}</BigScore>
                    <BigReleaseDate>{clickSearch.release_date}</BigReleaseDate>
                    <BigPlay><BsFillPlayCircleFill/></BigPlay>
                    </>}
                </BigMovie>

                </> : null }
            </AnimatePresence>

        </Wrapper>
    )
}
export default Search;