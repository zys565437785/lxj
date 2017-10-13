define(["jquery","text!tpls/collection.html","echarts","arttemplate"], function($,collectionTpls,echarts,template) {
    return function(dateTime,BranchNo,DataType){
    //    $(".content").html(collectionTpls)
       $.ajax({
           url:"http://192.168.248.9/LxjApi/api/Operate/GetAmountStatistics",
            type:"get",
            dataType: 'json',
            data: {
            "token":"9001",
            "DataType":DataType,
            "BranchNo":BranchNo,
            "BusinessDate":dateTime,
        },
            success:function(res) {
            if(res.code == '0'){
                var datas=res.data[0]
                console.log(res.data)
            var collectionTpl=template.render(collectionTpls,datas)
             $(".content").html(collectionTpl)
            var myChart = echarts.init(document.getElementById('collection'))
        option = {
            title : {
                text: '付款统计',
                subtext: '(/元)',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'right',
                data: ['现金支付','微信支付','支付宝支付','会员卡','银联卡','优惠卷']
            },
            series : [
                {
                    name: '销量比例',
                    type: 'pie',
                    radius : '50%',
                    center: ['50%', '60%'],
                    data:[
                        {value:datas.Amt, name:'现金支付'},
                        {value:0, name:'微信支付'},
                        {value:0, name:'支付宝支付'},
                        {value:0, name:'会员卡'},
                        {value:0, name:'银联卡'},
                        {value:0, name:'优惠卷'}
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
               
            }
            }
       })

      
    }
    
});