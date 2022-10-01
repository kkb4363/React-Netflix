import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { getSearch, IGetSearch } from "../api";
import styled from 'styled-components';

const Wrapper = styled.div`
background:black;
`
const Loader = styled.div`
height:20vh;
display:flex;
justify-content:center;
align-items:center;
`

function Search(){
    const {data, isLoading} = useQuery<IGetSearch>(
        ['search'],
        getSearch
    );
    const navigate = useNavigate();
    const location = useLocation();
    const keyword = new URLSearchParams(location.search).get('keyword');
    console.log(data);
    

    return (
        <Wrapper>
            {isLoading ? <Loader>Loading...</Loader> :
            <>

            </>}
        </Wrapper>
    )
}
export default Search;