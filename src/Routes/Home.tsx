import { useQuery } from "@tanstack/react-query";
import { getMovies,  getPopularMovies,  IGetMoviesResult } from "../api";
import styled from 'styled-components';
import { makeImagePath } from "../utils";
import { PopularMovieSlider } from "../Slider/PopularMovies";
import { NowPlayingSlider } from "../Slider/NowPlayingMovies";

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


function Home(){
  
  
  const {data, isLoading} = useQuery<IGetMoviesResult>(
    ['movies', 'nowPlaying'],
    getMovies);

  return (
        <Wrapper>
          {isLoading ? <Loader>Loading...</Loader> 
          : <>
          <Banner
          bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <PopularMovieSlider/>
          <NowPlayingSlider/>
          
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

{/*React Router 5 => 6 변경점
  1. useHistory() => useNavigate()
  history.push('***') => navigate('***')
  
  2. useRouteMatch() => useMatch()
*/}

{/*bgPhoto가 타입스크립트에 정의되어있지 않아서 에러가뜸
  그럴땐 위로 올려서 box에 정의해주면 됌.*/}

{/* slice(1)을 하는 이유
메인페이지에 사용한 data[0]번의 영화를 제외하기위해서*/}

{/*initial={false}를 해주는 이유
새로고침을 하거나 다른 페이지에서 넘어올때
박스들이 오른쪽에서 슬라이딩하면서 넘어온다.
그래서 그걸 방지하기 위해 해줌.*/}

{/* useQuery([식별자이름,식별자이름],불러올 함수)
  fetch 해온 데이터를 가져와서 데이터가 있는지 , 아직 로딩중인지에 대한 알림을
  전해주는 함수이다.
*/}