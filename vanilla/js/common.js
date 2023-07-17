window.onload = () => {
  let url = window.location.origin;
  let pathname = window.location.pathname;
  let api = `http://localhost:5000`;

  /**
   * Init
   */
  if (pathname.indexOf('wordList') !== -1) {
    let day = window.location.search.substring(1);
    getWords(day);
  } else {
    getDays();
  }

  /**
   * 데이터 SET
   */
  async function getWords(day) {
    const WORDS = await fetchWords(day);

    createWordList(day, WORDS);
  }

  async function getDays() {
    const DAYS = await fetchDays();

    if (pathname.indexOf('dayList') !== -1) {
      createDayList(DAYS);
    } else if (pathname.indexOf('createWord') !== -1) {
      if (DAYS.length > 0) {
        createDayOption(DAYS);

        let btnCreateWord = document.getElementById('createWord');
        btnCreateWord.addEventListener('click', createWordValid);
      } else {
        alert('등록된 날짜가 없습니다.');
        movePage('/vanilla/html/createDay.html');
      }
    } else if (pathname.indexOf('createDay') !== -1) {
      getDayCount(DAYS);
      editDay(DAYS);
    }
  }

  async function fetchDays() {
    const response = await fetch(`${api}/days`);

    if (response.status == 200) {
      data = await response.json();
      return data;
    }
  }
  async function fetchWords(day) {
    const response = await fetch(`${api}/words?day=${day}`);

    if (response.status == 200) {
      data = await response.json();
      return data;
    }
  }

  /**
   * 페이지 이동
   * @param {*} path
   */
  function movePage(path) {
    window.location.href = url + path;
  }

  /**
   * 날짜 목록 생성
   * @param {*} data
   */
  function createDayList(data) {
    let days = document.getElementById('days');

    for (let index = 0; index < data.length; index++) {
      let daysItem = document.createElement('li');

      daysItem.innerHTML = `<a href="wordList.html?${index + 1}">DAY ${
        data[index].day
      }</a>`;
      days.appendChild(daysItem);
    }
  }

  /**
   * 해당 날짜 타이틀 표기
   * 단어 목록 생성
   * @param {*} day
   * @param {*} data
   */
  function createWordList(day, data) {
    let wordListTable = document.getElementById('wordList');

    document.querySelector('h1').innerText = 'Voca Note : DAY ' + day;

    for (let index = 0; index < data.length; index++) {
      let wordListItem = document.createElement('tr');

      wordListItem.innerHTML = `<tr>
          <td>
            <input type="checkbox" id="checkbox${index}" data-number="${data[index].id}" />
            <label for="checkbox${index}"></label>
          </td>
          <td>${data[index].eng}</td>
          <td class="hide">${data[index].kor}</td>
          <td>
            <button type="button" class="btnToggleItem" id="btnToggle${index}">뜻 보기</button>
            <button type="button" class="btnDeleteItem" id="btnDelete${index}" data-number="${data[index].id}">삭제</button>
          </td>
        </tr>`;
      wordListTable.appendChild(wordListItem);

      if (data[index].isComplete) {
        completeWord(index);
      }
    }

    // 등록된 단어가 없는 경우
    let wrap = document.querySelector('.wrap');

    if (data.length === 0) {
      let createWord = document.createElement('div');
      createWord.innerHTML = `
              <p class="text">등록된 단어가 없습니다.</p>
              <a href="createWord.html" class="btnCreate">단어 추가</a>
            `;
      wrap.appendChild(createWord);
    }

    toggleComplete(data);
    toggleShow();
    deleteItem();
  }

  /**
   * 암기 완료된 단어 처리
   * @param {*} index
   */
  function completeWord(index) {
    let target = `#wordList tr:nth-child(${index + 1})`;
    let targetTR = document.querySelector(target);
    let targetCheck = document.querySelector(`${target} input[type=checkbox]`);
    let targetToggle = document.querySelector(`${target} .btnToggleItem`);

    targetTR.classList.toggle('complete');
    targetCheck.checked = 'checked';
    targetTR.childNodes[5].classList.remove('hide');
    targetToggle.innerHTML = '뜻 숨기기';
    targetToggle.disabled = !targetToggle.disabled;
  }

  /**
   * 단어 암기 완료/미완료 체크
   * @param {*} data
   */
  function toggleComplete(data) {
    const checkboxs = document.querySelectorAll('input[type=checkbox]');

    checkboxs.forEach((el, index) => {
      el.onclick = () => {
        let target = `#wordList tr:nth-child(${index + 1})`;
        let targetTR = document.querySelector(target);
        let targetCheck = document.querySelector(
          `${target} input[type=checkbox]`
        );
        let targetToggle = document.querySelector(
          `${target} input[type=checkbox]`
        );

        targetTR.classList.toggle('complete');
        targetCheck.checked.toggle = 'checked';

        let word = data.find(
          (item) => item.id === Number(targetToggle.dataset.number)
        );
        word = { ...word, isComplete: !word.isComplete };

        fetch(`${api}/words/${targetToggle.dataset.number}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(word),
        }).then((res) => {
          if (res.ok) {
            console.log('ok');
          }
        });
      };
    });
  }

  /**
   * 단어 뜻 보기/숨기기
   */
  function toggleShow() {
    const btnToggles = document.querySelectorAll('.btnToggleItem');
    for (const btnToggle of btnToggles) {
      btnToggle.addEventListener('click', () => {
        btnToggle.parentNode.previousElementSibling.classList.toggle('hide');
        btnToggle.innerHTML =
          btnToggle.innerHTML === '뜻 숨기기' ? '뜻 보기' : '뜻 숨기기';
      });
    }
  }

  /**
   * 단어 삭제
   */
  function deleteItem() {
    const btnDeletes = document.querySelectorAll('.btnDeleteItem');
    for (const btnDelete of btnDeletes) {
      btnDelete.addEventListener('click', () => {
        if (window.confirm('삭제하시겠습니까?')) {
          fetch(`${api}/words/${btnDelete.dataset.number}`, {
            method: 'DELETE',
          }).then((res) => {
            if (res.ok) {
              console.log('삭제되었습니다.');
            }
          });
        }
      });
    }
  }

  /**
   * 단어 추가 페이지 : 날짜 옵션 생성
   * 가장 최근의 날짜로 자동 선택
   * @param {*} data
   */
  function createDayOption(data) {
    let dayCount = document.getElementById('dayCount');

    for (let index = 0; index < data.length; index++) {
      let daysItem = document.createElement('option');

      daysItem.value = data[index].day;
      daysItem.innerHTML = data[index].day;
      dayCount.appendChild(daysItem);
    }

    if (data.length > 0) {
      dayCount.lastElementChild.selected = 'selected';
    }
  }

  /**
   * 단어 추가
   */
  function createWordValid() {
    let word = {
      day: Number(document.getElementById('dayCount').value),
      eng: document.getElementById('eng').value,
      kor: document.getElementById('kor').value,
      isComplete: false,
    };

    if (word.eng === '' || word.kor === '') {
      alert('단어를 입력해주세요.');
    } else {
      createWord(word);
    }
  }
  /**
   * 단어 추가
   * @param {*} word
   */
  function createWord(word) {
    fetch(`${api}/words`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(word),
    }).then((res) => {
      if (res.ok) {
        // alert('단어가 추가되었습니다.');
        movePage('/vanilla/html/wordList.html?' + word.day);
      }
    });
  }

  /**
   * 날짜 편집 : 현재 날짜 표시
   * @param {*} data
   */
  function getDayCount(data) {
    let dayCount = document.getElementById('dayCount');
    dayCount.innerHTML = data.length;
  }

  /**
   * 날짜 편집
   * @param {*} DAYS
   */
  function editDay(DAYS) {
    let btnDeleteDay = document.getElementById('deleteDay');
    if (DAYS.length > 0) {
      btnDeleteDay.addEventListener('click', () => {
        deleteDay(DAYS);
      });
    } else {
      btnDeleteDay.remove();
    }

    let btnCreateDay = document.getElementById('createDay');
    btnCreateDay.addEventListener('click', () => {
      createDay(DAYS);
    });
  }

  /**
   * 날짜 편집 : 삭제
   * @param {*} data
   */
  function deleteDay(data) {
    if (window.confirm('마지막 날짜를 삭제하시겠습니까?')) {
      fetch(`${api}/days/${data.length}`, {
        method: 'DELETE',
      }).then((res) => {
        if (res.ok) {
          // alert('마지막 날짜가 삭제되었습니다.');
          movePage('/vanilla/html/dayList.html');
        }
      });
    }
  }

  /**
   * 날짜 편집 : 추가
   * @param {*} data
   */
  function createDay(data) {
    let day = {
      day: data.length + 1,
    };

    fetch(`${api}/days`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(day),
    }).then((res) => {
      if (res.ok) {
        // alert('날짜가 추가되었습니다.');
        movePage('/vanilla/html/dayList.html');
      }
    });
  }
};
