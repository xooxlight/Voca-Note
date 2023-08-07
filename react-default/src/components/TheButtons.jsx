import { Link, useLocation } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';

import '../styles/TheButtons.scoped.css';

export default function TheButtons() {
  const location = useLocation().pathname;
  const [pageInfo, setPageInfo] = useState('');

  const getPageInfo = useCallback(async () => {
    if (location.indexOf('createWord') !== -1) {
      setPageInfo('CreateWord');
    } else if (location.indexOf('createDay') !== -1) {
      setPageInfo('CreateDay');
    } else if (location.indexOf('wordList') !== -1) {
      setPageInfo('WordList');
    } else if (location.indexOf('dayList') !== -1) {
      setPageInfo('DayList');
    }
  }, [location]);

  useEffect(() => {
    getPageInfo();
  }, [getPageInfo]);

  return (
    <div className="btns">
      {pageInfo !== 'CreateWord' && pageInfo !== 'CreateDay' && (
        <Link to="/createWord">단어 추가</Link>
      )}
      {pageInfo === 'DayList' && <Link to="/createDay">날짜 편집</Link>}
      {pageInfo !== 'DayList' && <Link to="/">돌아가기</Link>}
    </div>
  );
}
