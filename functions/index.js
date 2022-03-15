import { onScroll, scrollTop, btnTop } from './scroll.js'
import { readTitles } from './read_title.js'

// 스크롤 이벤트
window.addEventListener('scroll', onScroll);
btnTop.addEventListener('click', scrollTop);

// 게임 데이터베이스 읽기
readTitles("popular");
readTitles("new");
readTitles("sale");