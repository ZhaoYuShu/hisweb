import request from '@/utils/request'
const web = 'http://192.168.0.101:8081'
export function login(username, password) {
  return request({
    url: web + '/api/login',
    method: 'post',
    data: {
      mobile: username,
      passWord: password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
