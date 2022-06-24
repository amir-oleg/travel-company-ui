/* eslint-disable import/no-cycle */
import {useState, useEffect} from 'react';
import {Table} from "react-bootstrap";
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
        <h2>Статистика по менеджерам:</h2>
        <Table striped bordered hover>
  <thead>
    <tr>
      <th>№</th>
      <th>Менеджер</th>
      <th>Доход</th>
    </tr>
  </thead>
  <tbody>
  {Array.isArray(stats) && stats.length ? stats.map((stat, index) =>
    <tr key={stat.managerName}>
        <td>{index}</td>
      <td>{stat.managerName}</td>
      <td>{stat.income}</td>
    </tr>) : null}
  </tbody>
</Table>
    </div>
    );
};

export default adminCabinet