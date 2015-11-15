/**
 * Created by VaJoy on 2015/11/14.
 */
import EventEmitter from 'events';
import {Dispatcher} from '../dispatcher/dispatcher';

let nameList = [],  //模拟model，用于存放数据
    keyProp = 0,  //“key” prop，具有唯一性
    initItem = data => {
        nameList = data;
        keyProp = data.length
    },
    addItem = name => {
        var item = {
            name: name,
            id: keyProp++
        };
        nameList = nameList.concat(item);
    },
    removeItem = key => {
        nameList = nameList.filter(item => {
            return item.id != key
        })
    };

class ListStore extends EventEmitter{
    emitChange() {
        this.emit("change");
    }
    emitError() {
        this.emit("error");
    }
    addChangeListener(callback) {
        this.on("change", callback);
    }
    addErrorListener(callback) {
        this.on("error", callback);
    }
    removeChangeListener(callback) {
        this.removeListener("change" ,callback)
    }
    removeErrorListener(callback) {
        this.removeListener("error" ,callback)
    }
    getList() {
        return nameList
    }

}
let Store = new ListStore();

//事件注册，才能获取Action派发过来的对应事件
Dispatcher.register( event => {
    switch( event.eventName ) {
        case 'init':
            initItem(event.data);
            Store.emitChange();
            break;
        case 'new':
            addItem(event.name);
            Store.emitChange();
            break;
        case 'remove':
            removeItem(event.key);
            Store.emitChange();
            break;
        case 'init-error':
            removeItem(event.key);
            Store.emitError();
            break;
    }

    return true;
});


export default Store;

