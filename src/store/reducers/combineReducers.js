import { combineReducers } from 'redux'

import stopWatch from './stopWatch';
import competition from './competition';


export default combineReducers({
    stopWatch,
    competition
})