import React from 'react';
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import {getNominations} from "./academy-best-picture-nominations";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nominations: [],
            votes: []
        }
        this.handleClick = this.handleClick.bind(this);
    }

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

    render() {
        return (
            <>
                <Header votes={this.state.votes}/>
                <Body data={this.state.nominations} vote={this.handleClick}/>
                <Footer />
            </>
        );
    }
}

export default App;
