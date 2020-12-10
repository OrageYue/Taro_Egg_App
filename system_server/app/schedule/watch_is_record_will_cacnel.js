/*
 * @Author: yuncheng
 * @Date: 2020-07-20 23:20:13
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-21 18:08:18
 * @FilePath: /booking_system_server/app/schedule/watch_is_record_will_cacnel.js
 */ 
module.exports = {
    // 配置定时任务
    schedule: {
         interval: '20s', // 5 分钟间隔
        type: 'all', 
        cron: '0 0 */1 * * *',
    },
    // 具体操作
    // 检查订单是否超时
    // task 的入参为 ctx，匿名的 Context 实例，可以通过它调用 service 等。
    async task (ctx) {
        const res = ctx.service.reserve.check_status()
    },

}