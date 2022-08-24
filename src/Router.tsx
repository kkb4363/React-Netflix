import { BrowserRouter, Routes, Route } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import Chart from "./routes/Chart";
import Price from "./routes/Price";
import {useParams} from 'react-router';

interface RouteParams {
    coinId: string;
   }
   
function Router() {
    const { coinId } = useParams<keyof RouteParams>() as RouteParams;
    
return (
<BrowserRouter>
<Routes>
<Route path="/" element={<Coins/>} />

<Route path="/:coinId" element={<Coin/>}>
    <Route path="price" element={<Price />} />
    <Route path='chart' element={<Chart coinId={coinId}/>}/>
</Route>

</Routes>
</BrowserRouter>
);
}
export default Router;


