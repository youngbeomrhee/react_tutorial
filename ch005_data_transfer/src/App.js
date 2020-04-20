import React from 'react';
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import nominations from "./academy-best-picture-nominations";

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
