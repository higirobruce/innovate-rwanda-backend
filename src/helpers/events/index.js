import { eventEmitter } from '../../config/eventEmitter';
import * as events from '../../constants/eventNames';

import logActivity from '../logActivity';

eventEmitter.on(events.LOG_ACTIVITY, logActivity);

export default logActivity;
