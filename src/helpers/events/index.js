import { eventEmitter } from '../../config/eventEmitter';
import * as events from '../../constants/eventNames';

import logActivity from '../logActivity';
import notify from '../Notify';

eventEmitter.on(events.LOG_ACTIVITY, logActivity);
eventEmitter.on(events.NOTIFY, notify);

export default logActivity;
