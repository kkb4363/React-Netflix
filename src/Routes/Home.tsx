import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../api";

function Home(){
  {/* useQuery([식별자이름,식별자이름],불러올 함수)
  fetch 해온 데이터를 가져와서 데이터가 있는지 , 아직 로딩중인지에 대한 알림을
  전해주는 함수이다.
*/}
  const {data, isLoading} = useQuery(['movies', 'nowPlaying'], getMovies)
  console.log(data,isLoading);  
  return (
        <div style={{ backgroundColor: "whitesmoke", height: "200vh" }}></div>
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