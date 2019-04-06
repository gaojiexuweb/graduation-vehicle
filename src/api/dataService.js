import axios from 'axios';
import CONFIG from './conf';

function doRequest(url, req, headers, param) {
  let h = headers ? headers : { 'Content-Type': 'application/json', 'BsmAjaxHeader': true }
  let r = req ? req : {}
  //return axios.post(CONFIG.baseUrl+"/login.do",obj,{'Content-Type': 'application/x-www-form-urlencoded','BsmAjaxHeader': true});
  return axios({
    url: url,
    method: 'POST',
    data: param ? $.param(r) : r,
    headers: h
  });
}

function doGetRequest(url, req, headers) {
  let h = headers ? headers : { 'Content-Type': 'application/json', 'BsmAjaxHeader': true }
  return axios.get(url, {
    params: req,
    headers: h
  })
}
export default {
  // 线路查询
  getLine(req){
    return doGetRequest('/price/line',req)
  },
   // 订单获取
   getOrder(req){
    return doGetRequest('order/getOrder',req)
  }
}
