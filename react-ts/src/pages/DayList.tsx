import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

import '../styles/DayList.scoped.css';

export default function DayList() {
  const [isLoading, setIsLoading] = useState(false);
  const [days, setData] = useState([]);
  const url = `http://localhost:5000`;

  const getDays = useCallback(async () => {
    setIsLoading(true);
    axios.get(`${url}/days`).then((res) => {
      setData(res.data);
      setIsLoading(false);
    });
  }, [url]);

  useEffect(() => {
    getDays();
  }, [getDays]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ul className="days" id="days">
      {days.map((day: any) => (
        <li key={day.id}>
          <Link to={`/wordList/${day.day}`}>DAY {day.day}</Link>
        </li>
      ))}
    </ul>
  );
}
