import React, {Component} from "react";
import CollImg from "./Components/CollImg/CollImg";

export default class App extends Component {
    state = {
        mainImgURL: `https://boiling-refuge-66454.herokuapp.com/images`
    };

    render() {
        return (
            <div>
                <h1 style={{textAlign: 'center'}}>Test App</h1>
                <CollImg mainURL={this.state.mainImgURL}/>
            </div>
        );
    }
}