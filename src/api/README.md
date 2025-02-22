# 接口参数

```sh
url: '/...',
method: 'get',
headers: {
  isToken: false 
  repeatSubmit: false
  ...
},
timeout: 10000 //number
params: {...}
data {...}
```

#### url 为接口地址
#### method 为请求方式
#### headers 为请求头（常规调用无需设置此参数）
#### isToken 为 false 时，不会在请求头中携带 token（默认携带token，无需添加此参数）
#### repeatSubmit 防止数据重复提交，值为 false 时，不会在请求头中携带 repeatSubmit，即关闭提交节流（默认开启，无需添加此参数）
#### timeout 为接口超时时间，单位为毫秒（默认10000 毫秒，不需要延长响应时间时不需要添加此参数）
#### params 为get 请求参数，data 为post请求参数



# 接口调用方式
```sh
return request({
    url: '/auth/code',
    headers: {
      isToken: false
    },
    method: 'get',
    timeout: 20000
  });
```
## return 返回调用结果，具体返回格式需要与后端协商一致，响应编码请查看@/utils/errorCode.ts