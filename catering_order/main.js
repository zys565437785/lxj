require.config({
    baseUrl:"js",
    paths:{
        jquery:"libs/jquery-2.1.4",
        mui:"libs/mui.min",
        text:"libs/text",
        tpls:"../tpls", 
        echarts:"libs/echarts.min",    
        arttemplate:"libs/template-web",
        moment: 'libs/moment.min',
        mobiscroll: 'libs/mobiscroll.custom-3.0.0-beta6'
    },
    shim:{
        bootstrap:{
            deps:["jquery"]
        },
         mobiscroll: {
            deps: ['jquery']
        }
       
    }

})

require(["jquery","mobiscroll","moment","veiw/list","veiw/store"],function($,mobiscroll,moment,veiwList,veiwStore){

    // 时间格式化开始
   
    var now = moment().format('YYYY-MM-DD');
       
    $("#date").val(now);
    var obj = {
        theme: 'mobiscroll',
        lang: 'zh',
        display: 'center',
        select: 'multiple',
        controls: ['calendar'],
        preset: 'date', //日期类型--datatime --time,
        mode: "scroller", //操作方式【scroller】【clickpick】【mixed】
        dateFormat: 'yyyy-mm-dd', // 日期格式
        setText: '确定', //确认按钮名称
        cancelText: '清空', //取消按钮名籍我
        dateOrder: 'ddmmyy', //面板中日期排列格
        startYear: 2010, //开始年份
        endYear: (new Date()).getFullYear(), //结束年份
        showNow: true,
        showOnFocus: false,
        height: 45,
        width: 90,
        rows: 3,
        minDate: new Date() //从当前年， 当前月， 当前日开始
    }
    $("#date").mobiscroll().date(obj);

    var now = moment().add('days', 1).format('YYYY-MM-DD');
    var before = moment(now).subtract('days', 6).format('YYYY-MM-DD');

    // 监听日周月年的改变
    $('#option').on('change', function () {
        if ($(this).val() == 1) {
            changeDate("YYYY-MM-DD");
        } else if ($(this).val() == 2) {

            hebdomad(now, before);

        } else if ($(this).val() == 3) {
            changeDate("YYYY-MM");
        } else if ($(this).val() == 4) {
            changeDate("YYYY");
        }
    });
    //默认当前时间获取全部数据
     veiwList(moment().format('YYYY-MM-DD'))
   //获取到每一次选择后的时间在改变
   var dateTime;
   var DataType=1;//默认等于1
    $("#date").on("change",function(){
        dateTime=$("#date").val()
        if(dateTime=="YYYY-MM-DD"){
            DataType=1
        }else if(dateTime=="YYYY-DD"){
            DataType=3
        }else if(dateTime=="YYYY"){
            DataType=4
        }else{
            DataType=2
        }
        veiwList(dateTime,DataType)
        console.log(dateTime)
        console.log(DataType)
      sessionStorage.dateTime=dateTime;
      sessionStorage.DataType=DataType;
        
    })
     sessionStorage.dateTime=moment().format('YYYY-MM-DD');
     sessionStorage.DataType=DataType    

    // 点击加号
    $('#add').on('click', function () {
        
        addOrSubtract('add');
    });


    // 点击减号
    $('#subtract').on('click', function () {
        addOrSubtract('subtract');

    });

    // 日月周年
    function changeDate(type) {
        type=type.toLowerCase();
        obj.dateFormat=type;
        $("#date").mobiscroll().date(obj);
        type=type.toUpperCase();
        var now = moment().format(type);
        $("#date").val(now);
    }

    // 周
    function hebdomad(now, before) {
        var str = before + '至' + now;
        $('#date').val(str);
    }

    function addOrSubtract(type) {

        // 加号

        if (type == 'add') {
            if ($('#option').val() == 1) {
                var value = moment($('#date').val()).add('days', 1).format('YYYY-MM-DD');
                $('#date').val(value);
            } else if ($('#option').val() == 2) {
                now = moment(now).add('days', 7).format('YYYY-MM-DD');
                before = moment(now).subtract('days', 6).format('YYYY-MM-DD');
                hebdomad(now, before);
            } else if ($('#option').val() == 3) {
                var value = moment($('#date').val()).add('months', 1).format('YYYY-MM');
                $('#date').val(value);
            } else if ($('#option').val() == 4) {
                var value = moment($('#date').val()).add('years', 1).format('YYYY');
                $('#date').val(value);
            }
        } else if (type == 'subtract') {
            // 减号
            if ($('#option').val() == 1) {
                var value = moment($('#date').val()).subtract('days', 1).format('YYYY-MM-DD');
                $('#date').val(value);
            } else if ($('#option').val() == 2) {
                now = moment(now).subtract('days', 7).format('YYYY-MM-DD');
                before = moment(now).subtract('days', 6).format('YYYY-MM-DD');
                hebdomad(now, before);
            } else if ($('#option').val() == 3) {
                var value = moment($('#date').val()).subtract('months', 1).format('YYYY-MM');
                $('#date').val(value);
            } else if ($('#option').val() == 4) {
                var value = moment($('#date').val()).subtract('years', 1).format('YYYY');
                $('#date').val(value);
            }
        }
    }

//    时间格式化结束

     
    // 点门店运营的页面
  
    $(".store").on("click",function(){
      var BranchNo1=localStorage.oi
      var dateTime=sessionStorage.dateTime
       console.log(BranchNo1)
        veiwStore(dateTime,BranchNo1,DataType)
        $(this).addClass("mui-active").siblings().removeClass("mui-active")

    })
   
    // 点击返回按钮
    $(".back").on("click",function(){
        history.go(-1);
        location.href = "config.html"
    })
   
})

