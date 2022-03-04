import { writeMsg, btnReply } from './functions/reply.js'
import { onScroll, scrollTop, btnTop } from './functions/scroll.js'
import { readTitles } from './functions/title.js'

// 스크롤 이벤트
window.addEventListener('scroll', onScroll);
btnTop.addEventListener('click', scrollTop);

// 댓글 작성 이벤트
if (btnReply) {
  btnReply.addEventListener('click', writeMsg);
}

// 게임 데이터베이스 읽기
readTitles("popular");
readTitles("new");
readTitles("sale");