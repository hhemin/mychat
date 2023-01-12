/*
 * @Description: 
 * @Author: hm
 * @Date: 2020-10-21 09:52:32
 * @LastEditors: hm
 * @LastEditTime: 2021-12-13 10:51:39
 */
const os = require('os');

///////////////////获取本机ip///////////////////////
function getIPAdress() {
  var interfaces = os.networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];// 获取网络信息
    // console.log(iface);
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        console.log(alias.address)
        return alias.address;
      }
    }
  }
  // console.log(interfaces)
}

// export default getIPAdress;
exports.getIPAdress = getIPAdress;