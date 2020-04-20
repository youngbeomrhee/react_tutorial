# ch008 목표
- 이벤트처리

## 사전준비
- ch007_state

## 설명
사용자 event를 처리해 봅시다. 

### 시나리오
영화제목을 클릭할 때마다 해당 영화의 카운트가 1씩 올라가게 합니다.  
그리고 투표가 진행될때마다 투표현황을 Header에 표현해 봅니다. 

### event 처리
src/Body.js를 수정하여 event를 매핑합니다
```
...
    <li key={i} onClick={_=>alert('voted')}>
        {movie.title}
    </li>
...
```
영화 제목을 클릭하여 voted가 뜨는지 확인해 봅니다.

### event 전달
컴포넌트 사이에 데이터를 원활하게 전달하기 위해 가장 적합한 컴포넌트는 어떤 컴포넌트일까요?  
시나리오를 보면 Body에서 이벤트가 발생하고, 해당 정보를 Header에서 사용해야 합니다.  
이 둘을 연결해주기 가장 적합한 위치는 이 둘을 선언하고 데이터를 전달할 수 있는 App.js입니다.

src/App.js에 event handler를 선언하고 자식 컴포넌트에 해당 handler를 전달합니다.
```
...
    handleClick(event) {
        alert(event.target.innerHTML);
    }

    render() {
        return (
            <>
                <Header />
                <Body data={this.state.nominations} vote={this.handleClick}/>
                <Footer />
            </>
        );
    }
...
```

src/Body.js에서 props에 매핑된 해당 eventHandler(vote)를 onClick 메서드에 매핑합니다.
```
    <li key={i} no={movie.id} onClick={props.vote}>
        {movie.title}
    </li>
```
화면의 영화제목을 클릭시에 해당 제목이 alert로 뜨는지 확인합니다.

### 득표수 데이터 집계를 위한 votes 리스트 생성
src/App.js의 constructor의 state에 votes를 초기화하여 추가합니다.
```
...
        this.state = {
            nominations: [],
            votes: []
        }
...
``` 

### votes 데이터 state에 추가
getNominations의 callback 데이터를 가공하여 votes에 넣은 후 state에 업데이터 해줍니다.
```
    componentDidMount() {
        getNominations()
            .then(res => {
                const nominations = res.data;
                const votes = nominations.movies.map((ele, i) => ({
                    id: i+1,
                    title: ele.title,
                    voted: 0
                }));
                this.setState({
                    nominations,
                    votes
                });
            });
    }
```

### 데이터 전달 및 사용
src/App.js에서 해당 값을 Header에 전달합니다.

```
...
    <Header votes={this.state.votes}/>
...
```
src/Header.js에서 해당값을 사용하여 현황을 표시해 줍니다
```
export default props => {
    return (
        <>
            <h3>득표수</h3>
            {
                props.votes && props.votes.length > 0 ? (
                    <>
                        <ul>
                            {
                                props.votes.map((vote, i)=>
                                    <li key={i}>{vote.title} | {vote.voted} 표 획득</li>
                                )
                            }
                        </ul>
                    </>
                ) : (
                    <h4>후보가 등록되지 않았습니다.</h4>
                )
            }
        </>
    );
}
```

### 이벤트에 따른 state값 갱신
이벤트콜백을 담당하는 src/App.js의 handleClick에서 받아 온 이벤트를 확인하여 클릭 된 영화의 voted값을 1씩 올려줍니다. 
```
    handleClick(event) {
        // alert(event.target.innerHTML);
        const votedId = event.target.getAttribute('no');
        const tempVotes = this.state.votes.slice(); // 현황 복사
        tempVotes.forEach(vote => {
            if(vote.id === Number.parseInt(votedId)) {
                vote.voted = ++vote.voted;
            }
        });
        this.setState({votes: tempVotes});
    }
```

### 결과확인
후보 중에 하나를 클릭했을 때 득표수가 1씩 증가되는 것을 확인해 봅니다.




