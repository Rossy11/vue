<template>
  <div id="app" class="login_area">
    <div id="myChart" class="echarts"></div>
    <button @click="initWebSocket">链接</button>
    <button @click="websocketclose">断开</button>
    <button @click="websocketsend">发消息</button>
    <br>
    <button @click="clickBtn">父组件传值到子组件</button>
    <div>子组件穿过来的值：{{txt}}</div>
    <child :fatherData="datas" @send="reviceSondata">
      <p slot="my-header">我是头部</p>
      <p slot="my-footer">我是尾部</p>
    </child>
  </div>
</template>

<script>
  import child from "./child.vue";

  export default {
    name: 'second',
    components: {
      child: child
    },
    data () {
      return {
        websock: null,
        datas:"默认值",
        txt:"默认值"
      }
    },
    created: function () {

    },
    mounted(){
      this.$axios.get("xxx/?cmd=income_info").then(res => {
        let list = res.data.result.group;
        list.sort((a,b)=>{
          return b.index - a.index
        });
        let time = [];
        let datas = [];
        for(var value of list){
          time.push(value.recharge_day)
          datas.push(Number(value.mount))
        }
        this.drawLine(time, datas)
      });
    },
    methods: {
      clickBtn(){
          this.datas="哈哈哈哈"
      },
      reviceSondata(e){
          this.txt=e
      },
      drawLine(time, datas){
        let myChart = this.$echarts.init(document.getElementById('myChart'));
        myChart.setOption({
          color: ['#90bcf3'],
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['收益/元'],
            left: 20,
            top: 20,
            textStyle: {
              color: ['#90bcf3']
            }
          },
          toolbox: {
            show: false,
            feature: {
              mark: {show: true},
              dataView: {show: true, readOnly: false},
              magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          calculable: true,
          xAxis: [
            {
              type: 'category',
              name: '日期',
              boundaryGap: false,
              data: time,
              axisLine: {
                lineStyle: {
                  color: ['#90bcf3']
                }
              },
              axisLabel: {
                textStyle: {
                  color: ['#000']
                }
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              axisLine: {
                lineStyle: {
                  color: ['#90bcf3']
                }
              },
              axisLabel: {
                textStyle: {
                  color: ['#000']
                }
              }
            }
          ],
          series: [
            {
              name: '收益/元',
              type: 'line',
              smooth: true,//平滑
              stack: '总量',
              data: datas
            }
          ]
        });
        window.onresize = myChart.resize;
      },
      initWebSocket(){ //初始化weosocket
        //ws地址
        let wsuri = "xxx";
        this.websock = new WebSocket(wsuri);
        this.websock.onmessage = this.websocketonmessage;
        this.websock.onclose = this.websocketclose;
      },
      websocketonmessage(e){ //数据接收
        console.log(e);
      },
      websocketsend(agentData){//数据发送
        this.websock.send("这是一个数据");
      },
      websocketclose(e){  //关闭
        console.log("断开");
      }
    }
  }
</script>

<style scoped>
.echarts{
  width: 700px;
  height: 300px;
}
</style>
