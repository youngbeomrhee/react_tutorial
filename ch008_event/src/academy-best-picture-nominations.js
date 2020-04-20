const nominations = {
  "movies": [
    {
      "id": "1",
      "title": "기생충",
      "director": "봉준호"
    },
    {
      "id": "2",
      "title": "아이리쉬맨",
      "director": "마틴 스콜세지"
    },
    {
      "id": "3",
      "title": "원스 어폰 어 타임... 인 할리우드",
      "director": "쿠엔틴 타란티노"
    },
  ]
};

export const getNominations = () => new Promise(resolver => {
  setTimeout(_ => resolver({data: nominations}), 1000);
});