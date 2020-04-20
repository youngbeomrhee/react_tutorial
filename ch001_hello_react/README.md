# ch001 목표
- "Hello, React!"를 DOM에 담아서 화면에 표시

## 사전준비
- ch000_setting
- 실습을 진행 할 폴더를 생성하고 해당 폴더로 이동

## 설명
### package 초기화

먼저 터미널에서 아래 명령어로 현재 폴더를 초기화 해주세요
```
npm init -y
```

현재 폴더에 package.json 파일이 생성되었으면 성공입니다.

### 라이브러리 추가
React를 사용하여 DOM에 "Hello, React!"라는 문구를 출력해 봅시다

해당 기능을 위해서는 react와 react-dom 2가지의 라이브러리만 있으면 됩니다.  
추가적으로 react 개발환경을 쉽게 구축해주는 react-scripts도 설치해 줍니다.

터미널에 아래 명령어를 실행하여 react, react-dom, react-scripts를 설치합니다
```
npm i react react-dom react-scripts
```

package.json 파일에 
```
  "dependencies": {
    "react": "^16.13.1",
    "react-dom": "^16.13.1",
    "react-scripts": "^3.4.1"
  }
```
같이 추가되면 성공입니다

### Container 준비
화면을 그릴 영역을 준비합니다.  
public 폴더와 그 안에 index.html 파일을 만들고 아래 내용 body안에 추가하세요
```
<body>
<div id="root"></div>
</body>
```

### Component 선언
이제 실제로 React를 사용해 봅시다.  
src폴더와 그 안에 index.js 파일을 만들고 아래 내용을 추가하세요.
```
import React from 'react';
import {render} from 'react-dom';

render(
    <h1>Hello, React!</h1>,
    document.querySelector('#root')
);
```
코드에 HTML의 h1 엘리먼트를 바로 사용했습니다. 엘리먼트 뿐만 아니라 Component 또한 HTML tag 형식으로 바로 사용할 수 있습니다. 이런 기술방법을 [JSX](https://ko.reactjs.org/docs/introducing-jsx.html#gatsby-focus-wrapper)라고 합니다.

### 명령어 등록
package.json 파일을 열고 scripts의 값에 아래의 내용을 추가합니다
```
...
  "scripts": {
    "start": "react-scripts start",
...
```

### 어플리케이션 실행
터미널에서 실행합니다
```
npm start
```