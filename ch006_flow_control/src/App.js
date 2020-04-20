import React from 'react';
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import {getNominations} from "./academy-best-picture-nominations";

let nominations = [];
getNominations()
    .then(res => {
       nominations = res.data;
    });

class App extends React.Component {
    render() {
        return (
            <>
                <Header />
                <Body data={nominations}/>
                <Footer />
            </>
        );
    }
}

export default App;
