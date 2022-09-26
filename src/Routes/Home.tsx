import { useQuery } from "@tanstack/react-query";
import { getMovies, IGetMoviesResult } from "../api";
import styled from 'styled-components';
import { makeImagePath } from "../utils";
import {motion, AnimatePresence} from 'framer-motion';
import { useState } from "react";

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

const Slider = styled.div`
position:relative;
top: -100px;
`

const Row = styled(motion.div)`
display:grid;
gap:5px;
grid-template-columns:repeat(6,1fr);
margin-bottom:5px;
position:absolute;
width:100%;
`
{/* 괄호가 있을땐 타입스크립트를 뒤에 정의해야함 아래처럼 */}
const Box = styled(motion.div)<{bgPhoto:string}>` 
background-color:white;
height:200px;
background-image:url(${props => props.bgPhoto});
background-size:cover;
background-position:center center;
`

{/*사용자 화면의 가로길이 확인하는 방법 
개발자도구 콘솔에 window.innerWidth , window.outerWidth 둘 중 하나 사용
*/}
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

{/*37개의 영화목록을 10개씩 4번 보여주는 방법
pagination 구글링 하거나 노마드코더 영상 #8.8 7분30초부터 보기
*/}
const offset = 6;


function Home(){
  {/* useQuery([식별자이름,식별자이름],불러올 함수)
  fetch 해온 데이터를 가져와서 데이터가 있는지 , 아직 로딩중인지에 대한 알림을
  전해주는 함수이다.
*/}
  const {data, isLoading} = useQuery<IGetMoviesResult>(
    ['movies', 'nowPlaying'],
    getMovies);
  const [index, setIndex] = useState(0);
  const increaseIndex = () => {
    if(data){
      if(leaving) return;
    toggleLeaving();
    const totalMovies = data.results.length -1; {/*영화 개수 알아내기 , -1을 해주는 이유는 이미 메인페이지에 영화 하나 쓰고있으니깐 */}
    const maxIndex = Math.floor(totalMovies/ offset) -1 ; {/* 인덱스의 길이구하기 , Math.ceil은 올림, -1을 해주는 이유는 page가 0에서 시작하기 때문에 */}
    setIndex((prev) => prev === maxIndex ? 0 : prev + 1); 
    }
  };
  const toggleLeaving = () => setLeaving(prev => !prev);
  const [leaving, setLeaving] = useState(false);
  return (
        <Wrapper>
          {isLoading ? <Loader>Loading...</Loader> 
          : <>
          <Banner
          onClick={increaseIndex}
          bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            {/*initial={false}를 해주는 이유
            새로고침을 하거나 다른 페이지에서 넘어올때
            박스들이 오른쪽에서 슬라이딩하면서 넘어온다.
            그래서 그걸 방지하기 위해 해줌.*/}
            <AnimatePresence 
            initial={false}
            onExitComplete={toggleLeaving}>
            <Row 
              variants={rowVariants} 
              initial='hidden' 
              animate='visible' 
              exit='exit'
              transition={{type:"tween", duration:1}}
              key={index}
            >
              {/* slice(1)을 하는 이유
              메인페이지에 사용한 data[0]번의 영화를 제외하기위해서*/}
              {data?.results.slice(1).slice(offset*index, offset*index+offset)
              .map((movie) => (
                <Box key={movie.id} bgPhoto={makeImagePath(movie.backdrop_path, 'w400'  || "")}></Box>
              ))} {/*bgPhoto가 타입스크립트에 정의되어있지 않아서 에러가뜸
                  그럴땐 위로 올려서 box에 정의해주면 됌.*/}
            </Row>
            </AnimatePresence>
          </Slider>
          </> }
          </Wrapper>
      );
}
export default Home;

{/* React-query 에러
react18과 react-query4 버전 충돌떄문에
1. package.json 에서 react-query 패키지 삭제
2. npm i @tanstack/react/query
3. import {} from '@tanstack/react-query';
이렇게 써줘야함 
변경 전 : react-query / 변경 후 : @tanstack/react-query
*/}

{/*themoviedb 사이트 api 설명
https://developers.themoviedb.org/3/getting-started/introduction
*/}