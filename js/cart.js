$(function(){
    //1.全选和取消全选
    var isChecked=false;  //标记元素状态
    $(".checkAll").click(function(){
    /*  //自定义标签属性或属性值
        console.log($(this).prop("checked"));
        $(this).prop("a","b").attr("aa","bb");
        console.log($(this).prop("a")); */
        isChecked=!isChecked;
        if(isChecked){
            //修改显示图片
            $(".checkAll").attr("src","../images/cart/product_true.png");
            $(".checkItem").attr("src","../images/cart/product_true.png").attr("checked",true);
        }else{
            $(".checkAll").attr("src","../images/cart/product_normal.png");
            $(".checkItem").attr("src","../images/cart/product_normal.png").attr("checked",false);
            }
        sum();
    })
    //2.反选
    $(".checkItem").click(function(){
        //2.1点击选择
        if($(this).attr("checked")){
            //移除标记
            $(this).attr("checked",false).attr("src","../images/cart/product_normal.png");
        }else{
            $(this).attr("checked",true).attr("src","../images/cart/product_true.png");
        }
        //2.2全选扭的改变
        //获取被选中的商品数量==列表长度
        //console.log($(".checkItem").length);
        //console.log($(".checkItem[checked=checked]").length);
        if($(".checkItem[checked=checked]").length==$(".checkItem").length){
            $(".checkAll").attr("src","../images/cart/product_true.png");
            isChecked=true;
        }else{
            $(".checkAll").attr("src","../images/cart/product_normal.png");
            isChecked=false;
        }
        sum();
    })
    //3.数量的增减
    $(".add").click(function(){
        //获取输入框中的值 进行加一
        var value=$(this).prev().val();
        value++;
        $(this).prev().val(value);
        //1.价格联动
        changeSum($(this),value);
        sum();
    })
    $(".minus").click(function(){
        //获取输入框中的值 进行减一
        var value=$(this).next().val();
        if(value>1){
            value--;
             $(this).next().val(value);
            //2.价格联动
            changeSum($(this),value);
        }
        sum();
    })
    //4.价格联动
    function changeSum(that,n){
        var s1=that.parent().prev().find("p").html();//获取价格  方法一
        var s2=that.parents(".item").find(".price p").html();//方法二
        //console.log(s1,s2); // $299.00
        var price=s1.substring(1); //299.00
        var tolprice=(price*n).toFixed(2);//保留两位小数
        //console.log(tolprice);
        //显示总金额
        that.parents(".item").find(".sum").html("¥"+tolprice);
    }
    //5.移除商品
    $(".item .action").click(function(){
        $(this).parent().remove();
        sum();
    })
    //6.获取总数量和总价格
    function sum(){
        var num=0,price=0;
        //获取被选中的总商品数量和价格
        $(".checkItem[checked=checked]").each(function(){
            num+=Number($(this).parents(".item").find(".count input").val());
            var str=$(this).parents(".item").find(".sum").html();
            var s=Number(str.substring(1));
            price+=s;
        })
        //修改显示
        $(".total_count").html(num);
        price=price.toFixed(2);
        $(".total_price").html(price+"元");
    }
})