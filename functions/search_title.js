// 데이터 불러오기
import data from './data.js'
import { readAllTitles } from './read_title.js'

const titleData = data

const search = document.querySelector('.search_box input');

search.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const result = titleData.filter(title => title.name.includes(search.value));
    const list = document.querySelectorAll('.gamelist')
    for (let item of list) {
      item.remove();
    }
    
    readAllTitles(result);
  }
})

