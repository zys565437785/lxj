define(["jquery","text!tpls/salesRank.html","echarts","arttemplate","veiw/dishType","veiw/big","veiw/small"],function($,salesRankTpls,echarts,template,veiwDishType,veiwBig,veiwSmall){
    return function(dateTime,BranchNo,DataType,saleType){
        
         
       
       $.ajax({
           url:"http://192.168.248.9/LxjApi/api/Operate/GetSaleStatistics",
           type:"get",
           data:{
               "token":"9001",
                "DataType":DataType,
                "SaleType":saleType,
                "OrderBy":"1",
                "BranchNo":BranchNo,
                "BusinessDate":dateTime
           },
           success:function(res){
               if(res.code=='0000'){
                   var res=res.data
                   console.log(res)
                var salesRankTpl=template.render(salesRankTpls,res)
                $(".content").html(salesRankTpl)
        var myChart = echarts.init(document.getElementById('rankpie'))
        option = {
            title : {
                text: '热门商品',
                subtext: '(销量)',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: [res.SaleName,'有机花菜炒肉饭','三丝炒米粉','荷包蛋','油条','白粥','其它']
            },
            series : [
                {
                    name: '销量比例',
                    type: 'pie',
                    radius : '50%',
                    center: ['50%', '60%'],
                    data:[
                        {value:res.SaleAmt, name:res.SaleName},
                        {value:310, name:'有机花菜炒肉饭'},
                        {value:234, name:'三丝炒米粉'},
                        {value:135, name:'荷包蛋'},
                        {value:1548, name:'油条'},
                        {value:158, name:'白粥'},
                        {value:148, name:'其它'}
                    ],
                    itemStyle: {  
                                normal: {label:{  
                                    show:true,  
                                    formatter:'{b} : {c} ({d}%)'  
                                },  
                                labelLine:{show:true}},  
                        
                    }
                }
            ]
        };
        myChart.setOption(option);
        window.onresize = myChart.resize
        //    点击categray下面的li标签触发事件
               var BranchNo=localStorage.oi;
           var dataTime=sessionStorage.dateTime;
           var DataType=sessionStorage.DataType;
            $(".type").on("click",function(){
                        var saleType=1
                        veiwDishType(dateTime,BranchNo,DataType,saleType)
                        $(this).addClass("active").siblings().removeClass("active")
                    })

                // 大类
                    $(".big").on("click",function(){
                        var saleType=3
                        veiwBig(dateTime,BranchNo,DataType,saleType)
                        $(this).addClass("active").siblings().removeClass("active")
                    })
                    // 小类
                $(".small").on("click",function(){
                        var saleType=2
                        veiwSmall(dateTime,BranchNo,DataType,saleType)
                        $(this).addClass("active").siblings().removeClass("active")
                    })    

             }
           }

           
       })
  
    }
})