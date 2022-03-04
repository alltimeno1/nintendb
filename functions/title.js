// 데이터
const titleData = [
  {
    "title": "젤다의 전설 야생의 숨결",
    "image": "images/zelda.jpeg",
    "date": "2022.03.01",
    "rating": "⭐⭐⭐⭐⭐",
    "discount": "50,000원 -20%",
  },
  {
    "title": "슈퍼 마리오 오딧세이",
    "image": "images/mario.jpeg",
    "date": "2022.04.01",
    "rating": "⭐⭐⭐⭐⭐",
    'discount': "45,000원 -30%",
  },
  {
    "title": "마리오 카트8 디럭스",
    "image": "images/marioKart8Deluxe.jpeg",
    "date": "2022.05.01",
    "rating": "⭐⭐⭐⭐",
    "discount": "40,000원 -40%",
  },
  {
    "title": "스플래툰2",
    "image": "images/splatoon2.jpeg",
    "date": "2022.06.01",
    "rating": "⭐⭐⭐⭐",
    "discount": "30,000원 -50%",
  },
]

// 노드 생성
function createNode() {
  const item = document.createElement("a");
  const img = document.createElement("img");
  const name = document.createElement("h5");
  const content = document.createElement("span");
  item.className = "item";
  item.href = "#";

  return [item, img, name, content];
}

// 인기 게임 리스트 생성
function readTitles(classname) {
  titleData.forEach(({title, image, date, rating, discount}) => {
    const [item, img, name, content] = createNode();
    const box = document.querySelector(`#${classname} .more`);
    
    img.src = image;
    name.textContent = title;

    if (classname === "popular") {
      content.textContent = rating;
    } else if (classname === "new") {
      content.textContent = date;
    } else if (classname === "sale") {
      content.textContent = discount;
    }

    item.appendChild(img);
    item.appendChild(name);
    item.appendChild(content);
    
    box.before(item);
  })
}

export { readTitles };