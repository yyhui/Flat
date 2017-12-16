addLoadEvent(function() {
    var myChart = echarts.init(document.getElementById('line-chart')),
        secChart = echarts.init(document.getElementById('pie-chart')),
        data = [200, 690, 580, 600, 400, 500, 750, 820],
        option = {
            backgroundColor: '#fafbfd',
            tooltip: {
                trigger: 'item',
                formatter: 'New: {c}<br>Returning: {b}',
                backgroundColor: 'rgba(171, 183, 215, 1)'
            },
            grid: {
                top: 15,
                bottom: 0,
                height: 160,
                show: true,
                backgroundColor: '#f4f6f9'
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['11.02', '12.02', '13.02', '14.02', '15.02', '16.02', '17.02', '18.02'],
                axisLine: {
                    lineStyle: {
                        color: '#7e848b'
                    }
                }
            },
            yAxis: {
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: '#7e848b'
                    }
                }
            },
            series: [
                {
                    type: 'line',
                    data: data,
                    symbol: 'circle',
                    symbolSize: 8,
                    itemStyle: {
                        normal: {
                            color: 'rgb(143, 155, 200)'
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: 'rgba(171, 183, 215, 0.5)'
                        }
                    }
                }
            ]
        },
        secondOpt = {
            tooltip: {
                trigger: 'item',
                formatter: "{b}: {d}%"
            },
            series: [
                {
                    name:'Traffice source',
                    type:'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center',
                            formatter: "{d}%"
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '12',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    color: [
                        '#f3c17f', '#7bcfbb', '#9babda'
                    ],
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:[
                        {value:5, name:'Direct'},
                        {value:5, name:'Refferals'},
                        {value:10, name:'Search engines'}
                    ]
                }
            ]
        };
    myChart.setOption(option);
    secChart.setOption(secondOpt);
});
