define(['jquery','text!tpls/chartData.html',"echarts","arttemplate"],function($,chartDataTpls,echarts,template){
    return function(dateTime,BranchNo,DataType){
        // 线图
            // 请求数据
           
             $.ajax({
               url:"http://192.168.248.9/LxjApi/api/KPI/GetBranchKpiStatistics",
               type:"get",
               data:{
                "token":"9001",
                "BranchNo":BranchNo,
                "DataType":DataType,
                "BusinessDate":dateTime
               },
               datatype:"json",
               success:function(res){
                   console.log(res)
                  var data=res.data[0]
                  var chartDataTpl=template.render(chartDataTpls,data)
                   $(".content").html(chartDataTpl)

                   var myChart = echarts.init(document.getElementById('someline'))
                    var option = {
                        title: {
                            text: '综合报表',
                            x:'center'
                        },
                        tooltip : {
                            trigger: 'axis'
                        },
                        legend:{
                        data:['销售金额(元)',"来客人数(人)","人均消费(元/人)"]
                    },
                        toolbox: {
                            feature: {
                                saveAsImage: {}
                            }
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis : [
                            {
                                type : 'category',
                                boundaryGap : false,
                                data : ['1月','2月','3月','4月',"5月","6月","7月","8月","9月","10月","11月","12月"]
                            }
                        ],
                        yAxis : [
                            {
                                type : 'value'
                            }
                        ],
                        series : [
                            {
                                name:'销售金额',
                                type:'line',
                                stack: '销量',
                                label: {   
                                    normal: {
                                        show: true,
                                        position: 'top'
                                    }
                                },
                                data:[1270, 6382, 2091, 1034,4545,4545,2252]
                            },
                            {
                                name:'来客人数',
                                type:'line',
                                stack: '人流量',
                                label: {   
                                    normal: {
                                        show: true,
                                        position: 'top'
                                    }
                                },
                                data:[120, 682, 291, 104,455,455,222]
                            },
                            {
                                name:'人均消费',
                                type:'line',
                                stack: '人均消费',
                                label: {   
                                    normal: {
                                        show: true,
                                        position: 'top'
                                    }
                                },
                                data:[12, 68, 29, 10,45,45,22]
                            }
                            
                            
                        ]
                    };

                    myChart.setOption(option);
                    window.onresize = myChart.resize

                //    第一个图标结束
                   var myChart = echarts.init(document.getElementById('balance'))

        // 指定图表的配置项和数据
                option = {
                    color: ['#3398DB'],
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : ['本期销售', '上期销售', '去年同期销售'],
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            name:'销售金额',
                            type:'bar',
                            barWidth: '40%',
                            data:[data.SaleAmt,data.SaleMonAmt,data.SaleYearAmt]
                        }
                    ]
                }
                
                myChart.setOption(option);
                window.onresize = myChart.resize
          
              }
                   
                })
    }
})