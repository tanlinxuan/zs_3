/**
 * axios 封装
 * @author 谭邻宣
 * @date 2020/7/10 16:24
 **/
import axios from 'axios'
import CryptoJS from 'crypto-js'
import store from "@src/store";
import {  message } from 'ant-design-vue';
const HTTP = axios.create({
    timeout: 10 * 1000, //10s 超时
})
const baseUrl = process.env.NODE_ENV==='development'?'j-fin.ihdwork.com':window.location.host

HTTP.interceptors.request.use(config => {
        const { mac_key ,access_token} = store.getters.tokensInfo;
        config.headers['HD-App-Code'] = 'hd.youqi.web.v10';
        config.headers['Content-Type'] = 'application/json;charset=utf-8';
        if(config.url.indexOf('/v0.1/tokens') > 0){
            return config
        }else{
            if(access_token){
                const key = mac_key;
                var randomStr = '',
                    date = new Date().getTime(),
                    chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
                for (var i = 0; i < 8; ++i) {
                    randomStr += chars.charAt(Math.floor(Math.random() * 8));
                }
                var nonce = date + ':' + randomStr;
                var url_ = '';
                if (config.params) {
                    url_ = config.url;
                    var url_1 = '';
                    Object.getOwnPropertyNames(config.params).forEach(
                        function (key) {
                            var link = '&' + key + "=" + config.params[key];
                            url_1 += link;
                        });
                    url_ = url_ + "?" + (url_1.substr(1)).replace(' ', '');
                } else {
                    url_ = config.url;
                }
                var mac = nonce + '\n' + config.method.toUpperCase() + '\n' + url_ + '\n' + baseUrl + '\n';
                const hash = CryptoJS.HmacSHA256(mac, key);
                var macAsign = CryptoJS.enc.Base64.stringify(hash);
                config.headers['Authorization'] = 'MAC id=' + access_token + ', nonce="' + nonce + '", mac="' + macAsign + '"';
                return config
            }
        }
    },
    error => {
        return Promise.reject(error)
    }
)
HTTP.interceptors.response.use(response => {
        const res = response.data
        if (res.code !== '0000') {
            message.error(res.message || 'Error')
        }
        return res
       // return response.data
    },
    error => {
        message.error(error || 'Error')
        return Promise.reject(error)
    }
)
export default HTTP


