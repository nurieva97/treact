import React, {Component} from 'react';
import {Card, Input, Button, Col, Row, Form} from 'antd';
import {connect} from "react-redux";
import {getElement, editElement} from "../actions";


const FormItem = Form.Item;

export class EditElement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            lng: "",
            lat: ""
        }
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        this.props.onGetElement(this.props.match.params.elementId)
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            title: newProps.title,
            lng: newProps.lng,
            lat: newProps.lat
        })
    }

    onChange(event) {
        const field = event.target.id;
        const object = this.state;
        object[field] = event.target.value;
        this.setState(object);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onEditElement(this.props.match.params.elementId, this.state);
        this.props.history.goBack();
    }

    render() {
        return (
            <div>
                <Card
                    title="Редактирование объекта"
                    style={{width: '45%'}}
                >
                    <Form>
                        <Row>
                            <Col span={8}>
                                Название
                            </Col>
                            <Col span={16}>
                                <Input
                                    required={true}
                                    id={"title"}
                                    defaultValue={this.state.title}
                                    onChange={this.onChange}/>
                            </Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col span={8}>
                                Координаты
                            </Col>
                            <Col span={16}>
                                <Input
                                    style={{width: '49%'}}
                                    id={"lat"}
                                    defaultValue={this.state.lat}
                                    onChange={this.onChange}/>
                                &nbsp;
                                <Input
                                    style={{width: '49%'}}
                                    id={"lng"}
                                    defaultValue={this.state.lng}
                                    onChange={this.onChange}/>
                            </Col>
                        </Row>
                        <br/>
                        <Button block type="primary" onClick={this.handleSubmit}>
                            Сохранить
                        </Button>
                    </Form>
                </Card>

            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return state.element;
};

const mapDispatchToProps = dispatch => {
    return {
        onGetElement: id => {
            dispatch(getElement(id))
        },
        onEditElement: (id, element) => {
            dispatch(editElement(id, element))
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditElement);


