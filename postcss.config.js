module.exports = {
    plugins: {
        // postcss-pxtorem插件进行rem适配
        // 注意 postcss-pxtorem不对行内样式进行rem转换
      'postcss-pxtorem': {
        // rootValue设置为设计稿宽度的十分之一
        // 采用flexible适配方案
        // 下载npm i -S amfe-flexible包可以把html根标签的font-size大小设置为屏幕宽度的10/1
        // 但是vant是基于375的设计稿写的
        // 我们的设计稿宽度为750 所以我们在写样式时要把我们量的大小除以二
        // 有没有更好的方法？
        // 如果vant的样式 按照37.5转换
        // 如果是自己的样式 按照75转换
        // rootValue: 37.5,
        rootValue ({file}){
            if(file.indexOf('vant') !== -1){
                return 37.5
            }
            return 75
        },

        // 配置要转换的css属性
        // *表示所有的css属性都要转换
        propList: ['*'],
      }
    }
  };