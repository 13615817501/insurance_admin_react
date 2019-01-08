import request from '../../axiosConfig/axiosConfig';

export function getInitialList() {
  return request('/fx?api=gate.user.userList');
}
