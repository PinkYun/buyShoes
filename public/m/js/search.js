var letao;
$(function () {
    // 声明letao new一个乐淘对象
    letao = new Letao();
    // 通过乐淘来调用里面的方法
    letao.addHistory();
    letao.queryHistory();
    letao.deleteHistory();
    letao.clearHistory();
})

// 创建一个乐淘的构造函数
var Letao = function () {};
// 通过原型 是对象
Letao.prototype = {
    // 添加历史记录
    addHistory: function () {
        // 1.找到元素绑定事件
        $('.btn-search').click(function () {
            // 2.获取当前输入的内容
            var text = $('.form-search').val();
            // console.log(text);
            //3. 获取当前文本的存储的值
            var arr = window.localStorage.getItem('searchData');
            var id = 0;
            // 4.判断arr是否有值  因为空数组是字符串类型的 它的长度为2 所以判断的时候
            // 就应该判断的是arr数组的长度要大于2
            if (arr.length>2) {
                // 如果有值 就JSON的字符串改为数组
                arr = JSON.parse(arr);
                // id为数组最后一个值的+1
                id = arr[arr.length - 1].id + 1;
            } else {
                // 如果为空 那就直接把arr变为一个空数组
                arr = [];
                // 如果没有值的话  id就是0
                id = 0;
            }
            // 定义一个搜索的内容是否存储中存在
            var flag =false;
            for(var i=0 ; i< arr.length;i++){
                //如果本地存储已有了 那就把flag改为true
                if(arr[i].search ==text){
                    flag =true;
                }
            }
            // 如果flag还是等于false的话 那就说明本地没有存储有这个值 就添加到数组中
            if(flag==false){
                // 5.把每次获取的数新增到数组中
                arr.push({
                    "search": text,
                    "id": id
                });
            }

            // console.log(arr);
           
            // 7.把数组存储在本地中
            window.localStorage.setItem('searchData', JSON.stringify(arr));
            // 8.再次调用一次 刷新页面
            letao.queryHistory();
            // $('.form-search').val("");
            window.location.href ='product.html';
        })
    },
    // 获取搜索记录 渲染页面
    queryHistory: function () {
        // 1.直接获取本地存储的数据
        var arr = window.localStorage.getItem('searchData');
        // console.log(arr);
        //2. 判断arr是否有值
        if (arr && JSON.parse(arr).length>0) {
            // 如果有值 就JSON的字符串改为数组
            arr = JSON.parse(arr);
        } else {
            // 如果为空 那就直接把arr变为一个空数组
            arr = [];
        }
        // console.log(arr);
        // 使用数组颠倒的方法 reverse()
        arr = arr.reverse();
        //3. 获取到一个数组的 使用模板引擎渲染页面
        var result = template('queryHistoryTmp', {
            "rows": arr
        });
        // console.log(result);
        // 4.渲染页面
        $('.search-list ul').html(result);
    },
    // 清除搜索记录
    deleteHistory: function () {
        // 1.找到元素绑定点击事件
        $(".search-list ul").on("click",'.delete-search', function () {
            // console.log("aaa");
            //2. 获取当前的id 就是data-id属性的值
            var id = $(this).data('id');
            // console.log(id);
            //3. 直接获取本地存储的数据
            var arr = window.localStorage.getItem('searchData');
            // console.log(arr);
            //4. 判断arr是否有值
            if (arr && JSON.parse(arr).length>0) {
                // 如果有值 就JSON的字符串改为数组
                arr = JSON.parse(arr);
            } else {
                // 如果为空 那就直接把arr变为一个空数组
                arr = [];
            }
            //5. 遍历数组arr
            for (var i = 0; i < arr.length; i++) {
                // 判断当前的数组中的id有没有跟点击时获取的id的值一致
                if (arr[i].id == id) {
                    // 如果相等的话 就删除当前数组的id
                    // 使用数组的splice的方法  参数1是数组的下标  参数2是删除的个数
                    arr.splice(i, 1);

                }
            }
            //6.删除的成功的话  数组长度变短
            // console.log(arr);
            // 7.把删除后的数组重新获取 存储在本地中
            window.localStorage.setItem('searchData', JSON.stringify(arr));
            // 8. 再次调用一次 查询本地数据 生成页面
            letao.queryHistory();
        })
    },

    //清空搜索记录
    clearHistory:function(){
        $('.clear-search').on('click',function(){
            // console.log('aaa');
            //清空所有的搜索记录 就是把本地存储的数据清空
            window.localStorage.setItem('searchData', "");
             // 8.再次调用一次 刷新页面
             letao.queryHistory();
        })
    }
}