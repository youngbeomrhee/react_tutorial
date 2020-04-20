import React from 'react';
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";

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

export default App;
