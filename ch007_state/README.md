# ch007 목표
- 상태변화에 따른 처리

## 사전준비
- ch006_flow_control

## 설명
비동기적으로 data가 전달되는 바로 그 시점에 화면을 그리는 로직(render 메서드)을 다시 실행해줘야 합니다.  
몇 가지 방법이 있습니다.

### setTimeout
과거에 비동기 처리에 대한 이해도가 낮을 때, 그리고 비동기로직을 직접 컨트롤 할 수 없을 때 많이 사용하던 방법입니다.  
src/App.js의 App class에서 해당 로직을 실행하려면 어떻게 해야 될까요?  

간략하게 기본 프로세스를 기술해보면 setTimeout으로 일정 시간을 잡고, 해당 로직이 변경된걸 감지할 수 있도록 setInterval을 설정하고, 값이 변경된걸 확인하면 setInterval을 clear 해주고, 다시 DOM에 접근하여 Data를 수정해서 re-render하도록 합니다
위의 로직을 의사(Pueudo)코드로 작성해보면 아래와 같습니다
```
const res = asyncLogic();

setTimeout(_=>{
   passData(res.data);
}, 1000);

setInterval(_=> {
    if(hasChanged(data)) {
        re_render(data);
        clearInterval();
    }
});

function re_render(data) {
    // data를 사용하여 DOM 조작
}
```

### Callback을 이용하는 방법
위의 로직과 유사하지만 setTimeout이나 setInterval을 사용하는 대신에 Callback에 받아 온 데이터를 처리하는 보다 나은 방법입니다.  
하지만 역시나 DOM에 직접 접근해서 화면을 그리는 로직을 직접적으로 실행해줘야 된다는 점은 동일합니다.
의사(Pueudo)코드로 작성해보면 아래와 같습니다
```
asyncLogic()
    .then(res => {
        re_render(res.data);
    }); 

function re_render(data) {
    // data를 사용하여 DOM 조작
}
```

### 문제점
위의 2가지 방식에는 몇 가지 문제점이 있습니다  

#### 로직의 복잡도
미묘한 타이밍 차이로 발생하는 각종 오류들, 그런 사항들을 확인하기 위해 필요한 부수적인 코드들이 늘어납니다.  
그리고 Application의 규모가 커지면서 컴포넌트가 많아질수록 이런 복잡도는 더욱 증가하게 됩니다.  

#### DOM을 직접 Handling
DOM에 직접 접근하는 비용은 일반적인 로직처리보다 더 많은 리소스와 처리시간을 필요로 합니다.

## React의 State
위의 문제상황을 처리하려면 상태값에 따른 모든 처리를 해줘야 합니다.  
그런 처리의 Best practices를 모아놓은게 React의 State입니다.  
State를 사용하여 위의 문제상황을 처리해 봅시다.

### State 사용
#### State 초기화
초기화하기 가장 좋은 위치는 생성자가 실행되는 시점입니다. src/App.js의 App class에 생성자를 추가합니다.
```

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nominations: []
        }
    }
...
```

#### 비동기로직 처리 위치 결정
비동기로직은 언제 실행되야 될까요?  
최종목적은 DOM의 랜더링이므로 해당 로직을 처리할 Component가 실제로 Mount 되었을 때 해당 로직이 실행되야 합니다.  
React에서 제공하는 [컴포넌트의 Lifecycle](https://ko.reactjs.org/docs/state-and-lifecycle.html) 중에 해당 역할에 가장 적합한 메서드는 componentDidMount입니다.
  
src/App.js의 App class에 아래 메서드를 추가합니다.
```
...
    componentDidMount() {
        getNominations()
            .then(res => {
                this.setState({ nominations: res.data });
            });
    }
...
```

#### render 변경
기존에 data에 전달했던 nominations를 아래와 같이 state의 값을 사용하도록 변경합니다.
```
    render() {
        return (
            <>
                <Header />
                <Body data={this.state.nominations}/>
                <Footer />
            </>
        );
    }
```

## render 자동화
다른 처리를 하지 않더라도 state의 변경사항이 발생하면 render가 재실행되며 변경된 데이터가 화면에 그려지게 됩니다.