import React, {Component} from 'react';
import {connect} from 'react-redux';
import { addElement } from '../actions/index';
import { Card, Input, Button, Col, Row, Form } from 'antd';




class AddElement extends Component{

    constructor(props) {
        super(props);
        this.state = {
            object: {
                title: '',
                lng: '',
                lat: ''
            }
        };
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    onChange(event) {
        const field = event.target.id;
        const object = this.state.object;
        object[field] = event.target.value;
        return event.target.value
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onAddElement(this.state.object);
        this.props.history.goBack();
    }

    render() {
        return (
            <div className="Login">
                <Card
                    title="Добавление объекта"
                    style={{ width: '45%' }}
                >

                    <Form>
                        <Row>
                            <Col span={8}>
                                Название
                            </Col>
                            <Col span={16}>
                                <Input
                                    required={true}
                                    type={"text"}
                                    id={"title"}
                                    defaultValue={this.state.title}
                                    onChange={this.onChange}
                                />
                            </Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col span={8}>
                                Координаты
                            </Col>
                            <Col span={ 16}>
                                <Input
                                    style={{ width: '49%' }}
                                    id={"lat"}
                                    type={"number"}
                                    defaultValue={this.state.lat}
                                    onChange={this.onChange}
                                />
                                &nbsp;
                                <Input
                                    style={{ width: '49%' }}
                                    id={"lng"}
                                    type={"number"}
                                    defaultValue={this.state.lng}
                                    onChange={this.onChange}
                                />
                            </Col>
                        </Row>
                        <br/>
                        <Button
                            block
                            type={"submit"}
                            onClick={(event) => {this.handleSubmit(event)}}
                        >
                            Сохранить
                        </Button>
                    </Form>
                </Card>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddElement: element => {
            dispatch(addElement(element));
        }
    };
};


export default connect(
    null,
    mapDispatchToProps
) (AddElement);


