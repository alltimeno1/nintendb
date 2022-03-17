'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Titles', [
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
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Titles', null, {});
  }
};
