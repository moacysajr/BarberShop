import React,{useState, useEffect} from 'react';
import {RefreshControl} from 'react-native';
import { 
    Container,
    HeaderArea,
    HeaderTittle,
    
    
    
    Scroller,
    LoadingIcon,

    ListArea,
    EmptyWarning

} from './styles';

import BarberItem from '../../components/BarberItem';
import Api from '../../Api';



export default () => {

 
    const [loading, setLoading] = useState(false);
    const [list,setList] = useState([]);

    useEffect (()=>{
        getFavorites();
        },[]);


    const getFavorites =async () =>{      
        setLoading(true);
        setList([]);

       
            let res = await Api.getFavorites();
            if(res.error==''){
                
                setList(res.list);
            }else{
                alert("erro:"+res.error);
            }
        
        setLoading(false);

    }

    return (
        <Container>
            <HeaderArea>
                <HeaderTittle>Favoritos</HeaderTittle>
            </HeaderArea>
            
            <Scroller refreshControl={
             <RefreshControl refreshing={loading} onRefresh={getFavorites} />
            }>

                {!loading && list.length===0&&
                    <EmptyWarning>não há favoritos</EmptyWarning>
                }

                <ListArea>
                    {list.map((item,k)=>(
                        <BarberItem key={k} data={item}/>
                    ))}
                </ListArea>
            </Scroller>
            
        </Container>
    );
}