import axios from 'axios';
import { useRef, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

import '../styles/CreateWord.scoped.css';

export default function CreateWord() {
  const [isLoading, setIsLoading] = useState(false);
  const [days, setData] = useState([]);
  const [day, setDay] = useState(1);

  const url = `http://localhost:5000`;

  const navigate = useNavigate();

  const getDays = useCallback(async () => {
    setIsLoading(true);
    axios.get(`${url}/days`).then((res) => {
      if (res.data.length === 0) {
        alert('등록된 날짜가 없습니다.');
        navigate(`/createDay`);
      } else {
        setData(res.data);
        setDay(res.data.length);
        setIsLoading(false);
      }
    });
  }, [url, navigate]);

  useEffect(() => {
    getDays();
  }, [getDays]);

  function onChange(e: any) {
    e.preventDefault();

    dayRef.current.value = e.target.value;
    setDay(e.target.value);
  }

  function createWord(e: any) {
    e.preventDefault();

    if (!isLoading) {
      const word = {
        day: dayRef.current.value,
        eng: engRef.current.value.trim(),
        kor: korRef.current.value.trim(),
        isComplete: false,
      };

      if (word.eng === '' || word.kor === '') {
        alert('단어를 입력해주세요.');
      } else {
        setIsLoading(true);
        axios.post(`${url}/words`, word).then((res) => {
          if (res.status === 201) {
            alert('단어가 추가되었습니다.');
            setIsLoading(false);
            navigate(`/wordList/${word.day}`);
          }
        });
      }
    }
  }

  const engRef = useRef<any>(null);
  const korRef = useRef<any>(null);
  const dayRef = useRef<any>(null);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <form onSubmit={createWord}>
      <div className="inputWrap">
        <label htmlFor="eng">Eng</label>
        <input type="text" id="eng" placeholder="English" ref={engRef} />
      </div>
      <div className="inputWrap">
        <label htmlFor="kor">Kor</label>
        <input type="text" id="kor" placeholder="영어" ref={korRef} />
      </div>
      <div className="inputWrap">
        <label htmlFor="day">Day</label>
        <select id="day" ref={dayRef} value={day} onChange={onChange}>
          {days.map((day: any) => (
            <option key={day.id} value={day.day}>
              {day.day}
            </option>
          ))}
        </select>
      </div>
      <div className="inputWrap">
        <button
          type="submit"
          className={`btnCreate${isLoading ? 'disabled' : ''}`}
        >
          단어 추가
        </button>
      </div>
    </form>
  );
}
