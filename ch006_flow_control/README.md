# ch006 목표
- 반복문과 조건문 사용

## 사전준비
- ch005_data_transfer

## 설명
반복문과 조건문을 사용해 봅시다

### 순수 자바스크립트(VanillJS) 사용 가능
src/Body.js를 아래와 같이 수정합니다.  
중괄호({}) 안에 순수 자바스크립트를 사용할 수 있습니다.  
movies 리스트에 담겨있는 data를 데이터를 담고있는 li 컴포넌트로 변환합니다.
```
export default props => {
    return <article>
        <h3>후보</h3>
        <ul>
            {
                props.data.movies.map(movie => (
                    <li>
                        {movie.title}
                    </li>
                ))
            }
        </ul>
    </article>;
}
```

### 문제상황
예제처럼 data를 어플리케이션 내부에 가지고 있는 경우는 별로 없습니다. 대부분의 경우에 data를 네트웤을 통해 혹은 DB 등의 다른 어플리케이션에서 조회해오게 되고, 조회에는 시간이 걸립니다.
    
data를 1초 이후에 받아오도록 아래처럼 src/academy-best-picture-nominations 코드를 수정합니다.  
```
const nominations = {
  "movies": [
    {
      "id": "1",
      "title": "기생충",
      "director": "봉준호"
    },
...
  ]
};

import {getNominations} from "./academy-best-picture-nominations";

export const getNominations = () => new Promise(resolver => {
  setTimeout(_ => resolver(nominations), 1000);
});
```

이제 data는 아래와 같은 형식으로 비동기적으로 받아올 수 있습니다
```
getNominations()
    .then(res => res.data)
``` 

### data를 받아오는 로직 수정
기존의 src/App.js에서 비동기적인 데이터(nominations)를 어떻게 받아서 전달해야 될까요?
먼저 아래처럼 수정해 봅니다
```
...
import {getNominations} from "./academy-best-picture-nominations";

let nominations = [];
getNominations()
    .then(res => {
       nominations = res.data;
    });
...
```

### 에러발생
실행해보면 에러가 발생합니다. 왜 에러가 발생하는지 잠시나마 고민해 봅시다.

### 에러 확인 및 조건문 추가
에러는 미세한 타이밍 차이로 발생하게 됩니다. src/App에서 nominations를 Body component에 넘기는 시점에 아직 데이터를 전달받지 못했기 때문에 초기값인 빈 배열이 넘어간거죠.  
if else 문으로도 제어할 수 있지만 좀더 간소화 된 문법인 && 연산자와 삼항연산자를 사용하여 아래와 같이 처리합니다.

src/Body.js
```
...
        <ul>
            {
                props.data && props.data.movies && props.data.movies.length > 0 ? props.data.movies.map(movie => (
                    <li>
                        {movie.title}
                    </li>
                )) : (
                    <li>데이터가 없습니다.</li>
                )
            }
        </ul>
...
```

### 결과 확인
에러 대신에 "데이터가 없습니다."라는 문구가 화면에 표시되는지 확인합니다.
