import React from 'react';
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import {getNominations} from "./academy-best-picture-nominations";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nominations: []
        }
    }

    componentDidMount() {
        getNominations()
            .then(res => {
                this.setState({ nominations: res.data });
            });
    }

    render() {
        return (
            <>
                <Header />
                <Body data={this.state.nominations}/>
                <Footer />
            </>
        );
    }
}

export default App;
