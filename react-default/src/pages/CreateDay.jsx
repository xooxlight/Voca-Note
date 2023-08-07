import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

export default function CreateDay() {
  const [isLoading, setIsLoading] = useState(false);
  const [days, setData] = useState([]);
  const url = `http://localhost:5000`;

  const navigate = useNavigate();

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

  function deleteDay() {
    if (window.confirm('마지막 날짜를 삭제하시겠습니까?')) {
      setIsLoading(true);
      axios.delete(`${url}/days/${days.length}`).then((res) => {
        if (res.status === 200) {
          alert('마지막 날짜가 삭제되었습니다.');
          setIsLoading(false);
          navigate(`/`);
        }
      });
    }
  }

  function createDay() {
    setIsLoading(true);
    axios.post(`${url}/days`, { day: days.length + 1 }).then((res) => {
      if (res.status === 201) {
        alert('날짜가 추가되었습니다.');
        setIsLoading(false);
        navigate(`/`);
      }
    });
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <h2>
        현재 일수 :<span id="dayCount">{days.length}</span>일
      </h2>
      {days.length > 0 && (
        <button type="button" className="btnDelete" onClick={deleteDay}>
          날짜 삭제
        </button>
      )}
      <button type="button" className="btnCreate" onClick={createDay}>
        날짜 추가
      </button>
    </>
  );
}
