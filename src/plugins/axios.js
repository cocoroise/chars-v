import axios from "axios";
import Vue from "vue";
const httpCodeMap = {
  400: "错误请求",
  // ->服务器不理解请求的语法。
  401: "未授权,请重新登录",
  // ->请求要求身份验证。 对于需要登录的网页，服务器可能返回此响应。
  403: "您当前没有权限，请联系管理员开通！",
  // -> 服务器拒绝请求。
  404: "未找到",
  // ->服务器找不到请求的网页。
  405: "方法禁用",
  // ->禁用请求中指定的方法。
  406: "不接受",
  // ->无法使用请求的内容特性响应请求的网页。
  407: "需要代理授权",
  // ->此状态代码与 401: '未授权',类似，但指定请求者应当授权使用代理。
  408: "请求超时",
  // ->服务器等候请求时发生超时。
  409: "冲突",
  // ->服务器在完成请求时发生冲突。 服务器必须在响应中包含有关冲突的信息。
  410: "已删除",
  // -> 如果请求的资源已永久删除，服务器就会返回此响应。
  411: "需要有效长度",
  // ->服务器不接受不含有效内容长度标头字段的请求。
  412: "未满足前提条件",
  // ->服务器未满足请求者在请求中设置的其中一个前提条件。
  413: "请求实体过大",
  // ->服务器无法处理请求，因为请求实体过大，超出服务器的处理能力。
  414: "请求的 URI 过长",
  // ->请求的 URI: '通常为网址', 过长，服务器无法处理。
  415: "不支持的媒体类型",
  // ->请求的格式不受请求页面的支持。
  416: "请求范围不符合要求",
  // ->如果页面无法提供请求的范围，则服务器会返回此状态代码。
  417: "未满足期望值",
  // ->服务器未满足”期望”请求标头字段的要求。
  // 5xx : '服务器错误',
  // ->这些状态代码表示服务器在尝试处理请求时发生内部错误。 这些错误可能是服务器本身的错误，而不是请求出错。
  // 代码详细及说明:
  500: "服务器内部错误",
  // ->服务器遇到错误，无法完成请求。
  501: "尚未实施",
  // ->服务器不具备完成请求的功能。 例如，服务器无法识别请求方法时可能会返回此代码。
  502: "错误网关",
  // ->服务器作为网关或代理，从上游服务器收到无效响应。
  503: "服务不可用",
  // -> 服务器目前无法使用: '由于超载或停机维护',。 通常，这只是暂时状态。
  504: "网关超时",
  // ->服务器作为网关或代理，但是没有及时从上游服务器收到请求。
  505: "HTTP 版本不受支持",
  // -> 服务器不支持请求中所用的 HTTP 协议版本。
};
/**
 * 
 * @param Array lsHeaders
 * {
      headerName: "lol", // 要添加的 headers 的属性名
      lsName: "sessionId" // 从 localstorage 中取对应的 headers 的值的 localstorage 的k ey
    }
 */
function $axios({
  // 请求失败
  fallbaclk = () => {},
  tokenName = "token",
  timeout = 10000,
  withCredentials = false, //跨域是否携带cookie 默认是false
  lsHeaders = [], // 从 localhost 中取值添加到 header
  headers = { "Content-Type": "application/json;charset=UTF-8" },
  // response 之前的处理，调用方可全局自定义
  // 比如出错的统一处理
  beforeRes = () => {},
} = {}) {
  const service = axios.create({
    // baseURL: process.env.VUE_APP_USER_ROOT,
    // 设置超时时间
    timeout,
    headers,
    // 携带凭证
    withCredentials,
  });

  // 添加请求拦截器
  service.interceptors.request.use(
    config => {
      const { url, method } = config;
      if (!url) {
        const urlError = {
          errMessage: `url 不能为空`,
        };
        return Promise.reject(urlError);
      }
      if (!method) {
        const methodError = {
          errMessage: `method 不能为空`,
        };
        return Promise.reject(methodError);
      }
      if (config.method === "post" || config.method === "put") {
        // post、put 提交时，将对象转换为string, 为处理Java后台解析问题
        config.data = JSON.stringify(config.data);
      }

      return config;
    },
    error => {
      // 请求错误处理
      return Promise.reject(error);
    },
  );

  /**
   * 响应(Response) 拦截器
   * 拦截错误请求，进行一次重试机制
   * */
  service.interceptors.response.use(
    response => {
      // 暴露一个response 之前的处理，调用方可全局自定义
      // 比如出错的统一处理
      const res = beforeRes(response);
      if (res) {
        return Promise.resolve(res);
      }
      return Promise.resolve(response);
    },
    error => {
      try {
        const { response, message } = error;
        if (!response) {
          // request reject
          fallbaclk({
            errMessage: message || "请求出错",
          });
        } else {
          const { errorMessage, status } = response;
          // 错误信息先走接口返回，在走默认信息
          let errMessage = errorMessage || httpCodeMap[status];
          let errData = {
            code: status,
            errMessage,
          };
          // 统一错误处理可以放这，例如页面提示错误...
          // 请求错误时做些事
          fallbaclk(errData, response);
        }
      } catch (e) {
        fallbaclk({
          errMessage: e.message || "请求出错",
        });
      }
      return Promise.reject(error);
    },
  );
  return service;
}

Vue.use($axios);

export default $axios;
