import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Table, Divider, Tag} from 'antd';
import {Icon} from 'antd';
import {Link} from 'react-router-dom';
import {Input, Button, Modal} from 'antd';
import {deleteElement, fetchAllElements} from '../actions';
import {store} from '../index'

const confirm = Modal.confirm;
const Search = Input.Search;

class ElementList extends React.Component {

    COLUMNS = (cls) => {
        return [
        {
            title: 'Название объекта',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => <Link to={`/element/${record.id}`}>{text}</Link>,
        },
        {
            title: 'Действия',
            key: 'actions',
            render: (record) => (
                <span>
                <Link to={`/edit/${record.id}`}><Icon type="edit" theme="outlined"/></Link>
                <Divider type="vertical"/>
                <a onClick={() => cls.showDeleteConfirm(record.id, cls)}> <Icon type="delete" theme="outlined"/></a>
            </span>
            ),
        }]};

    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }

    componentWillMount() {
        if (this.props.elements.length === 0) {
            this.props.fetchAll();
        }
    }

    showDeleteConfirm(id, cls) {
        confirm({
            title: 'Вы действительно хотите удалить этот объект из списка?',
            okText: 'Да',
            okType: 'danger',
            cancelText: 'Нет',
            onOk() {
                cls.props.onDelete(id);
                // store.dispatch(deleteElement(id));
            },
            onCancel() {
                console.log('NO');
            },
        });
    }


    // filterList(event) {
    //     let updatedList = this.props.elements;
    //     updatedList = updatedList.filter(function (item) {
    //         return item.title.toLowerCase().search(
    //             event.target.value.toLowerCase()) !== -1;
    //     });
    //     this.setState({items: updatedList});
    // };


    render() {
        console.log("Element list", store.getState())
        // let items = this.props.elements;
        // console.log("my"+items);
        // this.setState = {
        //     items: items
        // };
        return (
            <div>
                <Link to={"/add"}>
                    <Button className={"add_button"} type="primary" ghost>Добавить объект</Button>
                </Link>

                {/*<Search*/}
                {/*className='search_field'*/}
                {/*placeholder="Введите название объекта..."*/}
                {/*// enterButton="Найти"*/}
                {/*size="large"*/}
                {/*onSearch={value => console.log(value)}*/}
                {/*onChange={this.filterList(this.props.elements)}*/}
                {/*/>*/}

                <Table columns={this.COLUMNS(this)} dataSource={this.props.elements} pagination={false}/>
                {/*{this.props.posts.map((post) => <Element key={post.id} post={post} />)}*/}

            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        elements: state.elements
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onDelete: id => {
            dispatch(deleteElement(id));
        },
        fetchAll: () => {
            dispatch(fetchAllElements())
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ElementList);





