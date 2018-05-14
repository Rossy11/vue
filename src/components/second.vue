<template>
  <div id="app" class="login_area">
    <div id="myChart" class="echarts"></div>
  </div>
</template>

<script>
  export default {
    name: 'second',
    data () {
      return {

      }
    },
    created: function () {

    },
    mounted(){
      this.$axios.get("http://14.119.109.232:30666/center/report/?cmd=income_info").then(res => {
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
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.echarts{
  width: 700px;
  height: 300px;
}
</style>
