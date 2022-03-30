
import Notification from './Notification';

const notify = ({
  type,
  parameters,

}) => {
  Notification.notify(type, parameters);
};

export default notify;
