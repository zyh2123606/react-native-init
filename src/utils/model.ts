import { Reducer, Action, ReducersMapObject, Dispatch } from 'redux'

interface EffectsCommandMap {
    put: <A extends Action>(action: A) => any,
    call: Function,
    select: Function,
    take: Function,
    cancel: Function,
    [key: string]: any
}

interface EffectsMapObject {
    [key: string]: Effect | EffectWithType
}

interface ReducerEnhancer {
    (reducer: Reducer<any>): void
}

interface SubscriptionAPI {
    dispatch: Dispatch<any>
}
type ActionWithPayload = { action: Action, payload: any }
type EffectType = 'takeEvery' | 'takeLatest' | 'watcher' | 'throttle'
type EffectWithType = [Effect, { type: EffectType }]
type Effect = (action: ActionWithPayload, effects: EffectsCommandMap) => void
type ReducersMapObjectWithEnhancer = [ReducersMapObject, ReducerEnhancer]
type Subscription = (api: SubscriptionAPI, done: Function) => void
interface SubscriptionsMapObject {
    [key: string]: Subscription
}

//公用model接口
export default interface Model {
    namespace: string
    state?: any
    reducers?: ReducersMapObject | ReducersMapObjectWithEnhancer
    effects?: EffectsMapObject
    subscriptions?: SubscriptionsMapObject
}