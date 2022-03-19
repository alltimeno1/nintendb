// 데이터
const titleData = [
  {
    "name": "젤다의 전설 야생의 숨결",
    "image": "images/zelda.jpeg",
    "date": "2022.03.01",
    "rating": 97,
    "discount": "₩50,000 -20%",
  },
  {
    "name": "슈퍼 마리오 오딧세이",
    "image": "images/mario.jpeg",
    "date": "2022.04.01",
    "rating": 97,
    'discount': "₩45,000 -30%",
  },
  {
    "name": "마리오 카트8 디럭스",
    "image": "images/marioKart8Deluxe.jpeg",
    "date": "2022.05.01",
    "rating": 92,
    "discount": "₩40,000 -40%",
  },
  {
    "name": "스플래툰2",
    "image": "images/splatoon2.jpeg",
    "date": "2022.06.01",
    "rating": 82,
    "discount": "₩30,000 -50%",
  },
]

// 노드 생성
function createNode() {
  const item = document.createElement("a");
  const img = document.createElement("img");
  const game = document.createElement("h5");
  const content = document.createElement("span");
  item.className = "item";
  img.className = "small";

  return [item, img, game, content];
}

// 인기 게임 리스트 생성
function readTitles(classname) {
  titleData.forEach(({ name, image, date, rating, discount }, idx) => {
    const [item, img, game, content] = createNode();
    const box = document.querySelector(`#${classname} .more`);
    
    item.href = `/title/${idx + 1}`;
    img.src = image;
    game.textContent = name;

    if (classname === "best") {
      content.innerHTML = 
      `<img class="meta" src="../images/metacritic.png">${rating}`;
    } else if (classname === "new") {
      content.textContent = date + " 출시 예정";
    } else if (classname === "sale") {
      content.textContent = "🇰🇷 " + discount;
    }

    item.appendChild(img);
    item.appendChild(game);
    item.appendChild(content);
    
    box.before(item);
  })
}

function makeHtml(image, name, date, rating, discount) {
  const titleHtml = `
    <img class="big" src="${image}" width="100%">
    <h4>${name}</h4>
    <p>${date}</p>
    <p>
      <img id="banner" src="../images/metacritic.png" width=100%>
      ${rating}
    </p>
    <p>🇰🇷 ${discount}</p>`
  return titleHtml
}

function readAllTitles() {
  const box = document.querySelector("#contents");
  titleData.forEach(({ name, image, date, rating, discount }, idx) => {
    const item = document.createElement("a");
    item.className = "box2";
    item.href = `/title/${idx + 1}`;
    item.innerHTML = makeHtml(image, name, date, rating, discount);
    box.appendChild(item);
  })
}

export { readTitles, readAllTitles };