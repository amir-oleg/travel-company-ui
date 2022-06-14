/* eslint-disable import/no-cycle */
import {useState, useEffect} from 'react';
import {Row, Col} from "react-bootstrap";
import {getAdminStats} from "../API/PersonalCabinetService"


const adminCabinet = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [stats, setStats] = useState({})

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        getAdminStats().then(data => setStats(data))
    }, [])

    return (
    <div>
        <div>Статистика по менеджерам:</div>
        {Array.isArray(stats) && stats.length ? stats.map(stat => 
            <Row key={stat.managerName}>
                <Col>Менеджер: {stat.managerName}</Col>
                <Col>Прибыль: {stat.income}</Col>
            </Row>) : <p>Статистика отсутствует</p>}
    </div>
    );
};

export default adminCabinet