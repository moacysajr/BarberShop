import React,{useState} from 'react';
import { 
    Container,
    SearchArea,
    SearchInput,
    
    Scroller,
    LoadingIcon,

    ListArea,
    EmptyWarning

} from './styles';

import BarberItem from '../../components/BarberItem';
import Api from '../../Api';


export default () => {

    const [searchText,setSearchText] = useState('');
    const [loading, setLoading] = useState(false);
    const [list,setList] = useState([]);
    const [emptyList,setEmptyList] = useState(false);

    const searchBarber =async () =>{
        setEmptyList(false);
        setLoading(true);
        setList([]);

        if(searchText!=''){
            let res = await Api.search(searchText);
            if(res.error==''){
                if(res.list.length>0){
                setList(res.list);
            }else{
                    setEmptyList(true);

            }
            }else{
                alert("erro:"+res.error);
            }
        }
        setLoading(false);

    }

    return (
        <Container>
            <SearchArea>
                <SearchInput
                    placeholder="Procure seu barbeiro"
                    placeholderTextColor="#FFFFFF"
                    value={searchText}
                    onChangeText={t=>setSearchText(t)}
                    onEndEditing={searchBarber}
                    returnKeyType="search"
                    autoFocus
                    selectTextOnFocus
                
                />
            </SearchArea>
            <Scroller>
                {loading &&
                    <LoadingIcon  size= "large" color="#000000"/>
                
                }

                {emptyList&&
                    <EmptyWarning>não achamo o barbeiro "{searchText}"</EmptyWarning>
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