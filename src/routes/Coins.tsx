import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react'
const Container = styled.div`
padding:0px 20px;
max-width:480px;
margin: 0 auto;
`;

const Header = styled.header`
height:10vh;
display:flex;
justify-content:center;
ailgn-items:center;
`;

const CoinsList = styled.ul`
`;

const Coin = styled.li`
background-color:white;
color:${props => props.theme.bgColor};
margin-bottom:10px;
border-radius:15px;
a{
  display:flex;
  align-items:center;
  padding:20px;
  transition : color 0.2s ease-in;
}
&:hover{
  a{
    color:${props => props.theme.accentColor};
  }
}
`;

const Title = styled.h1`
color:${(props)=> props.theme.accentColor};
`;

const Loader = styled.span`
text-align: center;
display:block;
`;

const Img = styled.img`
width:25px;
height:25px;
margin-right:10px;
`;

interface CoinInterface {
  id: string,
  name : string,
  symbol: string,
  rank : number,
  is_new: boolean,
  is_active: boolean,
  type: string,
}


function Coins() {
  const [coins,setcoins] = useState<CoinInterface[]>([]);
  const [loading,setloading] = useState(true);
  useEffect(()=>{
    (async()=>{
      const response = await fetch('https://api.coinpaprika.com/v1/coins');
      const json = await response.json();
      setcoins(json.slice(0,100));
      setloading(false);
    })(); 
    },[]); 
  
  return (
    <Container>
      <Header>
        <Title>코인</Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>) : (
        <CoinsList>
        {coins.map(coin => <Coin key={coin.id}>
          <Link to={`/${coin.id}`}
          state = {coin.name}>
          <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
            {coin.name} &rarr;
            </Link>
        </Coin>)}
      </CoinsList>
      )}
    </Container>
    )
  }
  export default Coins;
