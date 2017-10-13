define(["jquery","text!tpls/list.html","arttemplate","veiw/chartData"], function($,listTpls,template,veiwChartData) {

    return function(dateTime,DataType){
      
       var url = 'http://192.168.248.9/LxjApi/api/KPI/GetKpiStatisticsList'
      $.ajax({
        url,  
        type:"get",
        dataType: 'json',
        data: {
          "token":"9001",
          "DataType":DataType,
          "BusinessDate":dateTime
        },
        success:function(res) {
          if(res.code == '0000'){
            var res=res.data
            // console.log(res)
            var listTpl=template.render(listTpls,res);
             $("tbody").append(listTpl);

               $(".ttt").on("click",function(){
      
                  var BranchNo=$(this).attr("data-tt")
                      localStorage.oi=BranchNo
                  veiwChartData(dateTime,BranchNo) 
                  
             })
             
          }
        }
      });
     
        
    }
        
});