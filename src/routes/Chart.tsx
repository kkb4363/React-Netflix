import { fetchCoinHistory } from "../api";
import { useQuery } from 'react-query';
import ReactApexChart from 'react-apexcharts';
import { isDarkAtom } from "../atoms";
import { useRecoilValue } from "recoil";

interface ChartProps{
    coinId:  string ;
}

interface IHistorical {
    "time_open": string;
    "time_close": string;
    "open": number;
    "high": number;
    "low": number;
    "close": number;
    "volume": number;
    "market_cap": number;
}

function Chart({coinId}: ChartProps){
    const isDark = useRecoilValue(isDarkAtom)
    const {isLoading,data} = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId));
    console.log(data?.map((price) => price.close) ?? []);
    return(
        <div>{isLoading ? 'loading chart...' : 
        <ReactApexChart 
        type="line"
        series={[
                {
                name:'sales',
                data: data?.map((price) => price.close) ?? [],
                },
                ]}
        options={{
            theme:{
                mode:isDark? "dark" : "light",
            },
            chart: {
                height:500,
                width: 500,
                toolbar:{
                    show:false,
                },
            },
            grid:{show:false,},
            stroke: {
                curve:'smooth',
                width:5,
            }
        }}/>
}
</div>
    )
}

export default Chart; 