import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function TheHeader() {
  const location = useLocation().pathname;
  const [pageStr, setPageStr] = useState('');

  const getPageStr = useCallback(async () => {
    if (location.indexOf('createWord') !== -1) {
      setPageStr('단어 추가');
    } else if (location.indexOf('createDay') !== -1) {
      setPageStr('날짜 편집');
    } else if (location.indexOf('wordList') !== -1) {
      setPageStr(`DAY ${location.substring(10)}`);
    }
  }, [location]);

  useEffect(() => {
    getPageStr();
  }, [getPageStr]);

  return (
    <h1>
      Voca Note
      {location !== '/dayList' && location !== '/' && <span> : {pageStr}</span>}
    </h1>
  );
}
