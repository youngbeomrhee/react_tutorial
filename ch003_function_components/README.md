# ch003 목표
- function component를 생성 및 사용

## 사전준비
- ch000_setting
- ```npx create-react-app 폴더명```으로 샘플 생성 및 해당 폴더로 이동

## 설명

### component 생성
src 하위에 App.js, index.js를 제외하고 나머지 파일을 삭제합니다.  
App.js에서 삭제된 리소스를 모두 삭제하고 아래의 코드만 남깁니다.

```
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
``` 
src 하위에 아래와 같이 3개의 function으로 된 component를 추가합니다.  

- Header.js
```
import React from 'react';
export default _=><h1>Header</h1>;
```

- Body.js
```
import React from 'react';
export default _=><h1>Body</h1>;
```

- Footer.js
```
import React from 'react';
export default _=><h1>Footer</h1>;
```

### component 사용
App.js를 아래와 같이 수정합니다
```
import React from 'react';
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";

function App() {
  return (
    <>
      <Header />
      <Body />
      <Footer />
    </>
  );
}

export default App;
```

### 실행
터미널에서 ```npm start```로 실행 후에 브라우져에서 내용을 확인합니다