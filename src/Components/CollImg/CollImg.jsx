import React, {Component} from "react";
import {Grid, GridRow, GridColumn} from "semantic-ui-react";
import ModalComp from "../ModalComp/Modal";
import getData from "../../func/fetch";

export default class CollImg extends Component {

    state = {
        arrImgURL: [],
        gridColumn: 3
    };

    componentDidMount() {
          getData(this.props.mainURL)
            .then(r => this.setState({arrImgURL: r}))
    }


    render() {
        return (
            <Grid>
                <GridRow columns={3} style={{justifyContent: 'center'}}>
                    {this.state.arrImgURL.map(el => {
                        return (
                            <GridColumn key={el.id} style={{width: 'auto'}}>
                                <ModalComp {...el}/>
                            </GridColumn>
                        )
                    })}
                </GridRow>
            </Grid>
        );
    }
}