# ch005 목표
- props를 사용한 데이터 전달 

## 사전준비
- ch004_class_components

## 설명
자식요소에 값을 전달해 봅시다

### data 추가
src/academy-best-picture-nominations.js 파일을 추가합니다
```
export default {
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
```

### data 전달
App.js 파일에 아래 내용을 추가합니다
```
...
import nominations from "../academy-best-picture-nominations";

...

    <Body data={nominations}/>

...
```

### data 전달받기
부모요소에서 전달한 attributes는 자식요소가 function인 경우는 첫 번째 인자에 매핑됩니다.  
src/Body.js를 아래와 같이 수정합니다
```
...
export default props => {
    return <article>
        {JSON.stringify(props.data)}
    </article>;
}
```

### 결과확인
Body component에 임시로 넣어놨던 "Body"라는 텍스트가 
```
{"data":[{"id":"1","title":"기생충","director":"봉준호"},{"id":"2","title":"아이리쉬맨","director":"마틴 스콜세지"},{"id":"3","title":"원스 어폰 어 타임... 인 할리우드","director":"쿠엔틴 타란티노"}]}
``` 
로 바뀌었는지 확인합니다.
