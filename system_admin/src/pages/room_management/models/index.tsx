/*
 * @Author: yuncheng
 * @Date: 2020-06-12 11:16:34
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-16 16:49:32
 * @FilePath: /booking_system_admin/src/pages/room_management/models/index.tsx
 */
import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import { query_all_room } from '../../../services/room';
export interface RoomManagementModelState {
    // 自习室列表
    roomLists: Array<Object>;
}

export interface RoomManagementModelType {
    namespace: 'room_management';
    state: RoomManagementModelState;
    effects: {
        queryRoomList: Effect;

    };
    reducers: {
        save_lists: Reducer<RoomManagementModelState>;
    };
    subscriptions: { setup: Subscription; };
}

const RoomManagementModel: RoomManagementModelType = {
    namespace: 'room_management',
    state: {
        roomLists: [],
    },

    effects: {
        *queryRoomList({ payload }, { call, put }) {
            const { data } = yield call(query_all_room, payload);

            // 异步获取之后调用reducer改变state
            yield put({
                type: "save_lists",
                payload: { roomLists: data }
            });
        },
    },
    reducers: {
        // 保存用户列表
        save_lists(state, action) {
            return {
                ...state,
                ...action.payload,
            };
        },

    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname }) => {
                if (pathname === '/') {
                    dispatch({
                        type: 'query',
                    });
                }
            });
        }
    }
};

export default RoomManagementModel;
