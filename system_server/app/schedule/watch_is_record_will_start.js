/*
 * @Author: yuncheng
 * @Date: 2020-07-20 23:20:13
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-21 18:13:11
 * @FilePath: /booking_system_server/app/schedule/watch_is_record_will_start.js
 */ 
module.exports = {
    // 配置定时任务
    schedule: {
         interval: '1800s', // 30 分钟间隔
        type: 'all', 
        cron: '0 0 */1 * * *',
    },
    // 具体操作
    // 检查订单是否快开始
    // task 的入参为 ctx，匿名的 Context 实例，可以通过它调用 service 等。
    async task (ctx) {
        console.log( '检查订单是否快开始' )
        const res = ctx.service.reserve.check_is_record_will_start()
        // const res = ctx.service.reserve.check_status()
    },

}