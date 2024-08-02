import React, { useState, useEffect } from 'react';
import { RefreshControl } from 'react-native';
import { 
    Container,
    HeaderArea,
    HeaderTitle,
    Scroller,
    LoadingIcon,
    ListArea,
    EmptyWarning
} from './styles';

import AppointmentItem from '../../components/AppointmentItem';
import Api from '../../Api';

export default () => {
    const [loading, setLoading] = useState(false);
    const [initialAppointments, setInitialAppointments] = useState([]);
    const [list, setList] = useState([]);

    useEffect(() => {
        getAppointments();
    }, []);

    const getAppointments = async () => {
        setLoading(true);

        let res = await Api.getAppointments();
        if (res.error === '') {
            setInitialAppointments(res.list);
            setList(res.list);
        } else {
            alert("Erro: " + res.error);
        }

        setLoading(false);
    };

    const handleCancelAppointment = async (appointmentId) => {
        // Remover o agendamento da lista localmente
        const updatedList = list.filter(item => item.id !== appointmentId);
        setList(updatedList);
    };

    const refreshAppointments = async () => {
        setLoading(true);

        let res = await Api.getAppointments();
        if (res.error === '') {
            setList(res.list);
        } else {
            alert("Erro: " + res.error);
        }

        setLoading(false);
    };

    return (
        <Container>
            <Scroller refreshControl={
                <RefreshControl refreshing={loading} onRefresh={refreshAppointments} />
            }>
                {!loading && list.length === 0 &&
                    <EmptyWarning>Não há agendamentos</EmptyWarning>
                }
                <ListArea>
                    {list.map((item, k) => (
                        <AppointmentItem 
                            key={k} 
                            data={item} 
                            onCancel={() => handleCancelAppointment(item.id)} // Passando a função de cancelamento para o componente filho
                        />
                    ))}
                </ListArea>
            </Scroller>
        </Container>
    );
};
