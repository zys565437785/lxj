define(["jquery","echarts","arttemplate","text!tpls/visitor.html"], function($,echarts,template,visitorTpls) {
    return function(dateTime,BranchNo,DataType){
        
        $.ajax({
            url:"http://192.168.248.9/LxjApi/api/Operate/GetGuestStatistics",
            type:"get",
            dataType: 'json',
            data:{
                "token":"9001",
                "BranchNo":BranchNo,
                "DataType":DataType,
                "BusinessDate":dateTime
            },
            success:function(res){
                if(res.code=="0"){
                    var res=res.data[0]
                     console.log(res)
                   var visitorTpl=template.render(visitorTpls,res)
                   $(".content").html(visitorTpl)
        var myChart = echarts.init(document.getElementById('visitor'))
        option = {
            title : {
                text: '来客人员分析图标',
                subtext: '(地区)',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: '50',
                top:"100",
                data: ['会员','散客']
            },
            series : [
                {
                    name: '销量比例',
                    type: 'pie',
                    radius : '50%',
                    center: ['50%', '60%'],
                    data:[
                        {value:res.VipNumber, name:'会员'},
                        {value:res.GuestNumebr, name:'散客'},
                        
                    ],
                    itemStyle: {  
                                normal: {label:{  
                                    show:true,  
                                    formatter:'{b} : {c} ({d}%)'  
                                },  
                                labelLine:{show:true}},  
                                emphasis: {  
                                   label:{
                                    normal:{
                                    position:'inside',
                                    }
                               },
                        }  
                    }
                }
            ]
        };
        myChart.setOption(option);
        window.onresize = myChart.resize

        // 散客会员消费的图表开始
         var myChart = echarts.init(document.getElementById('visitor2'))
        option = {
            title : {
                text: '来客消费金额分析',
                subtext: '(地区)',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: '50',
                top:"100",
                data: ['会员消费','散客消费']
            },
            series : [
                {
                    name: '销量比例',
                    type: 'pie',
                    radius : '50%',
                    center: ['50%', '60%'],
                    data:[
                        {value:res.VipAmt, name:'会员消费'},
                        {value:res.GuestAmt, name:'散客消费'},
                        
                    ],
                    itemStyle: {  
                                normal: {label:{  
                                    show:true,  
                                    formatter:'{b} : {c} ({d}%)'  
                                },  
                                labelLine:{show:true}},  
                                emphasis: {  
                                   label:{
                                    normal:{
                                    position:'inside',
                                    }
                               },
                        }  
                    }
                }
            ]
        };
        myChart.setOption(option);
        window.onresize = myChart.resize
        // 散客会员消费的图表结束


        // var myChart = echarts.init(document.getElementById('dayRank'))
        //     var option = {
        //         title: {
        //             text: '单日每个时段的来客人员分析走势(/人)'
        //         },
        //         tooltip : {
        //             trigger: 'axis'
        //         },
        //         legend:{
        //         data:['早上时段']
        //       },
        //         toolbox: {
        //             feature: {
        //                 saveAsImage: {}
        //             }
        //         },
        //         grid: {
        //             left: '3%',
        //             right: '4%',
        //             bottom: '3%',
        //             containLabel: true
        //         },
        //         xAxis : [
        //             {
        //                 type : 'category',
        //                 boundaryGap : false,
        //                 data : ['04:00','08:00','12:00','16:00',"20:00","24:00"]
        //             }
        //         ],
        //         yAxis : [
        //             {
        //                 type : 'value'
        //             }
        //         ],
        //         series : [
        //             {
        //                 name:'来客人数',
        //                 type:'line',
        //                 stack: '人流量',
        //                 label: {   
        //                     normal: {
        //                         show: true,
        //                         position: 'top'
        //                     }
        //                   },
        //                 data:[120, 682, 291, 104,455,455,222]
        //             },
        //         ]
        //     };

        //     myChart.setOption(option);
        //     window.onresize = myChart.resize
                }
            }
        })
        
    }


    
});