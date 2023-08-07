import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

import '../styles/WordList.scoped.css';

export default function WordList() {
  const [isLoading, setIsLoading] = useState(false);
  const { day } = useParams();
  const [words, setData] = useState([]);
  const url = `http://localhost:5000`;

  const getWords = useCallback(async () => {
    setIsLoading(true);
    axios.get(`${url}/words?day=${day}`).then((res) => {
      const temp = res.data.map((e) => ({
        ...e,
        isShow: e.isComplete,
      }));
      setData(temp);
      setIsLoading(false);
    });
  }, [url, day]);

  useEffect(() => {
    getWords();
  }, [getWords]);

  function toggleComplete(item) {
    const temp = {
      ...item,
      isComplete: !item.isComplete,
    };
    delete temp.isShow;
    setIsLoading(true);

    axios.put(`${url}/words/${item.id}`, temp).then((res) => {
      if (res.status === 200) {
        getWords();
      }
    });
  }

  function toggleShow(item) {
    const findIndex = words.findIndex((e) => e.id === item.id);
    const temp = [...words];
    temp[findIndex].isShow = !temp[findIndex].isShow;

    setData(temp);
  }

  function deleteItem(item) {
    if (window.confirm('삭제하시겠습니까?')) {
      setIsLoading(true);
      axios.delete(`${url}/words/${item.id}`).then((res) => {
        if (res.status === 200) {
          alert('단어가 삭제되었습니다.');
          getWords();
        }
      });
    }
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {words.length === 0 && (
        <>
          <p className="text">등록된 단어가 없습니다.</p>
          <Link to="/createWord" className="btnCreate">
            단어 추가
          </Link>
        </>
      )}

      <table>
        <tbody>
          {words.map((word) => (
            <tr key={word.id} className={word.isComplete ? 'complete' : ''}>
              <td>
                <input
                  type="checkbox"
                  id={`word${word.id}`}
                  checked={word.isComplete}
                  onChange={() => toggleComplete(word)}
                />
                <label htmlFor={`word${word.id}`}></label>
              </td>
              <td>{word.eng}</td>
              <td>{word.isShow && word.kor}</td>
              <td>
                <button
                  type="button"
                  className="btnToggleItem"
                  onClick={() => toggleShow(word)}
                  disabled={word.isComplete}
                >
                  뜻 {word.isShow ? '숨기기' : '보기'}
                </button>
                <button
                  type="button"
                  className="btnDeleteItem"
                  onClick={() => deleteItem(word)}
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
