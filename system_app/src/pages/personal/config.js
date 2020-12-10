export default {
  // 用户登录
  userLogin: {
        url: '/api/v1/login',
        method: "POST",
  },
  // 查询所有学习卡
  query_study_card_list: {
    url: "/api/v1/user_cards",
    method: "get"
  },
  // 查询用户协议记录
  query_agreement_record: {
    url: "/api/v1/useragreeRecord",
    method: "get"
  },
}
