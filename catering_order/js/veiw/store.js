define(["jquery","text!tpls/store.html","echarts","veiw/salesRank","veiw/visitor","veiw/collection","arttemplate"], function($,storeTpl,echarts,veiwSalesRank,veiwVisitor,veiwCollection,template) {
    return function(dateTime,BranchNo,DataType){
         
         $.ajax({
             url:"http://192.168.248.9/LxjApi/api/Operate/GetOperatestatistics",
             type:"get",
             data:{
                "token":"9001",
                "BusinessDate":dateTime,
                "DataType":DataType,
                "BranchNo":BranchNo
             },
             success:function(res){
                 if(res.code=="0"){
                     console.log(res)
                var res=res.data[0];
                var storeTpls=template.render(storeTpl,res)
              $(".content").html(storeTpls)          
         var myChart = echarts.init(document.getElementById('main'))

        // 指定图表的配置项和数据
        var option = {
            title: {
                text: ''
            },
            tooltip: {},
            legend:{
                data:['应收金额',"实收金额","优惠折扣","代收"]
            },
            xAxis: {
                data: ["1周"]
            },
            yAxis : [ {  
                type : 'value',
                 axisLine : {onZero: true}
            }],

            series: [{
                name: '应收金额',
                type: 'bar',
                 label: {   
                    normal: {
                        show: true,
                        position: 'top'
                    }
                 },
                data: [res.OughtAmt]
            },
            {
              name: '实收金额',
              type: 'bar',
              label: {   
                    normal: {
                        show: true,
                        position: 'top'
                    }
                 },
              data:[res.RealAmt]
            },
            {
              name: '优惠折扣',
              type: 'bar',
              label: {   
                    normal: {
                        show: true,
                        position: 'top'
                    }
                 },
              data:[res.DiscountAmt]  
            },
             {
              name: '代收',
              type: 'bar',
              label: {   
                    normal: {
                        show: true,
                        position: 'top'
                    }
                 },
              data:[res.ReceivableAmt]  
            }
            ]
        };

        // 使用刚指定的配置项和数据显示图表。
       
        myChart.setOption(option);
        window.onresize = myChart.resize

          // 点击销售排行的时候渲染的图表
          
           var BranchNo=localStorage.oi
           var dataTime=sessionStorage.dateTime
           var DataType=sessionStorage.DataType
           var saleType
           console.log(BranchNo)   
           console.log(saleType)
    var dateTime=sessionStorage.dateTime
       $(".salesRank").on("click",function(){
           if(saleType==undefined){
               saleType=1
               
              
           }else{
                  saleType=sessionStorage.saleType
                 
           }
           console.log(saleType)
           veiwSalesRank(dataTime,BranchNo,DataType,saleType);
            
    })
    // 点击来客统计跳转页面
    $(".visitor").on("click",function(){
        veiwVisitor(dateTime,BranchNo,DataType);
    })

    // 点击收款统计跳转页面
    $(".collection").on("click",function(){
        veiwCollection(dateTime,BranchNo,DataType)
    })


           
   }
 }
})

    }
});