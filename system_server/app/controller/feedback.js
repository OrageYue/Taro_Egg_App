const Controller = require( 'egg' ).Controller

class FeedbackController extends Controller{
    constructor ( ctx ) {
        super(ctx)
    }
    
    async create () {
        // 新增意见反馈
        const { ctx } = this
        const payload = ctx.request.body
        const res = ctx.service.feedback.create_feedback( payload )
        ctx.helper.success( { ctx, res } )
        
    }

    async index () {
        // 查询所有
        const { ctx } = this
        const res =await ctx.service.feedback.query_all()
        ctx.helper.success( { ctx, res } ) 
    }

    async destroy () {
        // 删除
        console.log('删除')
        const { ctx } = this
        const id = ctx.params.id
        const res = await ctx.service.feedback.delete_feedback( id )
        ctx.helper.success( { ctx, res } ) 
    }
}

module.exports = FeedbackController