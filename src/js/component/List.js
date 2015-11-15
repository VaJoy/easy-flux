/**
 * Created by VaJoy on 2015/11/14.
 */
import React from 'react';
import Action from '../action/ListAction'
import Store from '../store/ListStore'
require('css/component/List');

let List = React.createClass({
    isInit: 1,
    storeChanged() {
        this.forceUpdate()
    },
    errorHandler() {
        alert('获取数据失败')
    },
    refresh() {
        Action.init();
    },
    componentDidMount() {
        Store.addChangeListener( this.storeChanged );
        Store.addErrorListener( this.errorHandler );
        Action.init();
        this.isInit = 0
    },
    componentWillUnmount() {
        Store.removeChangeListener( this.storeChanged );
        Store.removeErrorListener( this.errorHandler );
    },
    createNewItem() {
        var name = this.refs.key.value;
        if(!name){
            return;
        }
        this.refs.key.value = "";
        Action.new(name);
    },
    removeItem(key) {
        Action.remove(key);
    },
    render() {
        var list = Store.getList(),
            items = list.map(item => {
               return (
                   <li key={item.id}>
                       {item.name}
                       <button onClick={this.removeItem.bind(this, item.id)}>删除</button>
                   </li>
               )
            });
        if(!list.length) {
            items = this.isInit ? (<li>加载中...</li>) : (<li>暂无数据，请<a onClick={this.refresh}>刷新</a></li>)
        }
        return (
            <div className="list-container">
                <ul className="list">
                    {items}
                </ul>
                <input type="text" ref="key" /><button onClick={this.createNewItem}>添加</button>
            </div>
        );
    }
});

export default List;