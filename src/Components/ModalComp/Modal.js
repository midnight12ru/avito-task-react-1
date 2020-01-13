import React, {Component} from 'react'
import {Modal, Container, Grid, GridRow, GridColumn, Image, Form, Button, Header, List} from 'semantic-ui-react'
import fetch from "../../func/fetch";

export default class ModalComp extends Component {
    state = {
        data: [],
        listComments: []
    };

    constructor(props) {
        super(props);

        this.setComment=this.setComment.bind(this);
        this.renderComment=this.renderComment.bind(this);
        this.inputName= React.createRef();
        this.inputComment= React.createRef();
    }

    componentDidMount() {
        fetch(`https://boiling-refuge-66454.herokuapp.com/images/${this.props.id}`)
            .then(r => {
                let arrList = r.comments;
                let newList = [];

                arrList.map(el => {
                    let date = new Date(el.date);
                    return newList.push(this.renderComment(el.text, new Date(date)))
                });

                return newList
            })
            .then((newList)=>{
                this.setState({listComments: newList})
            })
    }
    setComment=()=>{
        let [name, comment] = [this.inputName.current.value || `NoName`, this.inputComment.current.value];
        if(comment.trim()==='') return alert('коментарий пустой')
        let date = new Date()

        let newComment = this.state.listComments //renderComment(comment, date)
        newComment.push(this.renderComment(comment, date, name))
     
        this.setState({listComments: newComment})
        this.inputName.current.value=null
        this.inputComment.current.value=null
    }

    renderComment=(text, date, name='NoName')=>{
        return(
            <List.Item key={Math.floor(Math.random()*10000)}>
              <List.Header>{(date+'').match(/[0-2][0-9:]{4}/gm)}<span style={{paddingLeft: '20px'}}>{name}</span></List.Header>
              {text}
            </List.Item>
        )
    }

    render() {
        let {url} = this.props;
        return (
            <>
                <Modal trigger={<div><img src={url} alt=""/></div>} closeIcon>
                    <Container>
                        <Grid columns={2} style={{margin: 0}}>
                            <GridRow>
                                <GridColumn>
                                    <Image src={url} style={{marginBottom: '15px',width: '100%'}}/>
                                    <Form>
                                        <Form.Field>
                                            <input ref={this.inputName} placeholder='Ваше имя'/>
                                        </Form.Field>
                                        <Form.Field>
                                            <input ref={this.inputComment} placeholder='Ваш комментарий'/>
                                        </Form.Field>
                                        <Button onClick={this.setComment} type='submit'>Оставить комментарий</Button>
                                    </Form>
                                </GridColumn>
                                <GridColumn>
                                    <Header>Комментарии</Header>
                                    <List>
                                        {this.state.listComments}
                                    </List>
                                </GridColumn>
                            </GridRow>
                        </Grid>
                    </Container>
                </Modal>
            </>
        );
    }
}
