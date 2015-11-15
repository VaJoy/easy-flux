/**
 * Created by VaJoy on 2015/11/14.
 */
import {Dispatcher} from '../dispatcher/dispatcher';

var Action = {
    init() {  //初始化数据
        fetch('data/list.json')
            .then(res => res.json(),
                (err) => {
                    Dispatcher.dispatch({  //事件分发-初始化错误
                        eventName: 'init-error',
                        err : err
                    });
                })
            .then(json => {
                Dispatcher.dispatch({  //事件分发-初始化成功
                    eventName: 'init',
                    data : json
                });
            });
    },
    new(name) { //新增一项
        Dispatcher.dispatch({  //事件分发-新增一项
            eventName: 'new',
            name : name
        });
    },
    remove(key) { //移除
        Dispatcher.dispatch({  //事件分发-移除一项
            eventName: 'remove',
            key : key
        });
    }
};
export default Action;