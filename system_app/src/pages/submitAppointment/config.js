export default {
    // 查询所有卡类型
  query_all_cards: {
    url: "/api/v1/card",
    method: "get"
  },
  // 获取用户某个卡的余额
  query_user_card_remain: {
    url: "/api/v1/user_card_remain"
  },
  // 提交预定信息
  handle_submit_reserve: {
    url: "/api/v1/reserve",
    method: "post"
  }
}
