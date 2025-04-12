import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
// 타입 스크립트 => 추론을 못하면 => 개발자가 직접 타입을 지정 (= annotate)

export const useTypedSelector : TypedUseSelectorHook<RootState> = useSelector;
export const useTypedDispatch = () => useDispatch<AppDispatch>();

// export const logger = useTypedSelector( (state) => state.logger);
// interface Obj<T>{
//     name: T;
// }

// interface State {
//     state: {
//         data: string,
//         loading: boolean
//     }
// }

// const obj : Obj<State> = {
//     name : {
//         state: {
//             data: 'abcd',
//             loading: false
//         }
//     }
// }