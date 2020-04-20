# ch004 목표
- Class 컴포넌트 생성 및 사용

## 사전준비
- ch000_setting
- ch003_function_components

## 설명

### class component 생성
React에서 제공하는 다양한 기능들을 사용하기 위해 src/App.js의 App function을 아래와 같이 class로 수정합니다.
```
class App extends React.Component {
    render() {
        return (
            <>
                <Header />
                <Body />
                <Footer />
            </>
        );
    }
}
```
React.Component를 상속하고 필수 구현요소인 render 메소드를 구현했습니다.

### 실행
터미널에서 ```npm start```로 실행 후에 브라우져에서 내용을 확인합니다

### Class vs function
Class를 사용할 경우 React.Component를 상속하게 됩니다.  
상속에 따른 몇 가지 규약들을 따라야 되지만 React.Component에서 제공하는 여러 메서드들(setState, componentDidMount 등등)을 사용할 수 있습니다.  

반면에 function은 순수 자바스크립트의 function이라 위의 메서드들을 사용할 수는 없지만 코드가 간결해지고 테스트하기 쉬워진다는 장점이 있습니다.

React에서는 상태에 따른 처리가 필요한 경우 Class를, 그 외에 상태가 없는 경우(Stateless) function 컴포넌트를 사용하도록 권장하고 있습니다.  