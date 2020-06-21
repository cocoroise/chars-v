import echarts from 'echarts';
export default {
    "color": ["#5EF2CB","#2FD8C5","#2FBCD5","#3093DA","#3077D5","#3F2FD0","#672FD5","#862FD1","#BC2FD4","#E030A5","#E03075","#E0304A"],
    "textStyle": {},
    "title": {
        "textStyle": {
            "color": "#ffffff"
        },
        "subtextStyle": {
            "color": "#eeeeee"
        }
    },
    "line": {
        left: "center",
        top: "middle",
        itemStyle: {
          color: "#C622EF",
          borderWidth: 1,
          borderColor: "#fff",
          shadowColor: "rgba(0, 0, 0, .3)",
          shadowBlur: 0,
          shadowOffsetY: 2,
          shadowOffsetX: 2,
        },
        "lineStyle": {
            "normal": {
                "width": "3"
            }
        },
        "smooth": false,
        "showAllSymbol": true,
          "symbol": "circle",
          "symbolSize": 15,
          "areaStyle": {
            "color": new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: "rgba(224, 48, 165, .3)",
                },
                {
                  offset: 1,
                  color: "rgba(224, 48, 165, 0)",
                },
              ],
              false,
            ),
            shadowColor: "rgba(198, 34, 239, .3)",
            "shadowBlur": 40
          }
    },
    "radar": {
        "itemStyle": {
            "normal": {
                "borderWidth": "2"
            }
        },
        "lineStyle": {
            "normal": {
                "width": "3"
            }
        },
        "symbolSize": "8",
        "symbol": "pin",
        "smooth": false
    },
    "bar": {
        left: "center",
        top: "middle",
        label: {
          show: true,
          position: "top",
          textStyle: {
            color: "#C622EF",
          },
        },
        itemStyle: {
          show: true,
          color: "#3077D5",
          barBorderRadius: 10,
          borderWidth:0
        },
        barWidth: 10,
    },
    "pie": {
        left: "center",
        top: "middle",
        "itemStyle": {
            "normal": {
                "borderWidth": "0",
                "borderColor": "#ffffff"
            },
            "emphasis": {
                "borderWidth": "0",
                "borderColor": "#ffffff"
            }
        }
    },
    "scatter": {
        "itemStyle": {
            "normal": {
                "borderWidth": "0",
                "borderColor": "#ffffff"
            },
            "emphasis": {
                "borderWidth": "0",
                "borderColor": "#ffffff"
            }
        }
    },
    "boxplot": {
        "itemStyle": {
            "normal": {
                "borderWidth": "0",
                "borderColor": "#ffffff"
            },
            "emphasis": {
                "borderWidth": "0",
                "borderColor": "#ffffff"
            }
        }
    },
    "parallel": {
        "itemStyle": {
            "normal": {
                "borderWidth": "0",
                "borderColor": "#ffffff"
            },
            "emphasis": {
                "borderWidth": "0",
                "borderColor": "#ffffff"
            }
        }
    },
    "sankey": {
        "itemStyle": {
            "normal": {
                "borderWidth": "0",
                "borderColor": "#ffffff"
            },
            "emphasis": {
                "borderWidth": "0",
                "borderColor": "#ffffff"
            }
        }
    },
    "funnel": {
        "itemStyle": {
            "normal": {
                "borderWidth": "0",
                "borderColor": "#ffffff"
            },
            "emphasis": {
                "borderWidth": "0",
                "borderColor": "#ffffff"
            }
        }
    },
    "gauge": {
        "itemStyle": {
            "normal": {
                "borderWidth": "0",
                "borderColor": "#ffffff"
            },
            "emphasis": {
                "borderWidth": "0",
                "borderColor": "#ffffff"
            }
        }
    },
    "candlestick": {
        "itemStyle": {
            "normal": {
                "color": "#ffee51",
                "color0": "#ffffff",
                "borderColor": "#ff715e",
                "borderColor0": "#797fba",
                "borderWidth": "1"
            }
        }
    },
    "graph": {
        "itemStyle": {
            "normal": {
                "borderWidth": "0",
                "borderColor": "#ffffff"
            }
        },
        "lineStyle": {
            "normal": {
                "width": "1",
                "color": "#888888"
            }
        },
        "symbolSize": "8",
        "symbol": "pin",
        "smooth": false,
        "color": [
            "#22efe1",
            "#225cef",
            "#da22ef",
            "#22d3ef",
            "#264880"
        ],
        "label": {
            "normal": {
                "textStyle": {
                    "color": "#ffffff"
                }
            }
        }
    },
    "map": {
        "itemStyle": {
            "normal": {
                "areaColor": "#555555",
                "borderColor": "#999999",
                "borderWidth": 0.5
            },
            "emphasis": {
                "areaColor": "rgba(255,175,81,0.5)",
                "borderColor": "#ffaf51",
                "borderWidth": 1
            }
        },
        "label": {
            "normal": {
                "textStyle": {
                    "color": "#ffffff"
                }
            },
            "emphasis": {
                "textStyle": {
                    "color": "#ffee51"
                }
            }
        }
    },
    "geo": {
        "itemStyle": {
            "normal": {
                "areaColor": "#555555",
                "borderColor": "#999999",
                "borderWidth": 0.5
            },
            "emphasis": {
                "areaColor": "rgba(255,175,81,0.5)",
                "borderColor": "#ffaf51",
                "borderWidth": 1
            }
        },
        "label": {
            "normal": {
                "textStyle": {
                    "color": "#ffffff"
                }
            },
            "emphasis": {
                "textStyle": {
                    "color": "#ffee51"
                }
            }
        }
    },
    "categoryAxis": {
        "axisLine": {
            "show": true,
            "lineStyle": {
                "color": "#666666"
            }
        },
        "axisTick": {
            "show": false,
            "lineStyle": {
                "color": "#333"
            }
        },
        "axisLabel": {
            "show": true,
            "textStyle": {
                "color": "#999999"
            }
        },
        "splitLine": {
            "show": true,
            "lineStyle": {
                "color": [
                    "#555555"
                ]
            }
        },
        "splitArea": {
            "show": false,
            "areaStyle": {
                "color": [
                    "rgba(250,250,250,0.05)",
                    "rgba(200,200,200,0.02)"
                ]
            }
        }
    },
    "valueAxis": {
        "axisLine": {
            "show": true,
            "lineStyle": {
                "color": "#666666"
            }
        },
        "axisTick": {
            "show": false,
            "lineStyle": {
                "color": "#333"
            }
        },
        "axisLabel": {
            "show": true,
            margin: 10,
            color: "#fff",
        },
        "splitLine": {
            "show": false,
            "lineStyle": {
                "color": [
                    "#555555"
                ]
            }
        },
        "nameTextStyle": {
              color: "#fff",
            },
        "splitArea": {
            "show": false,
            "areaStyle": {
                "color": [
                    "rgba(250,250,250,0.05)",
                    "rgba(200,200,200,0.02)"
                ]
            }
        }
    },
    "logAxis": {
        "axisLine": {
            "show": true,
            "lineStyle": {
                "color": "#666666"
            }
        },
        "axisTick": {
            "show": false,
            "lineStyle": {
                "color": "#333"
            }
        },
        "axisLabel": {
            "show": true,
            "textStyle": {
                "color": "#999999"
            }
        },
        "splitLine": {
            "show": true,
            "lineStyle": {
                "color": [
                    "#555555"
                ]
            }
        },
        "splitArea": {
            "show": false,
            "areaStyle": {
                "color": [
                    "rgba(250,250,250,0.05)",
                    "rgba(200,200,200,0.02)"
                ]
            }
        }
    },
    "timeAxis": {
        "axisLine": {
            "show": true,
            "lineStyle": {
                "color": "#666666"
            }
        },
        "axisTick": {
            "show": false,
            "lineStyle": {
                "color": "#333"
            }
        },
        "axisLabel": {
            "show": true,
            "textStyle": {
                "color": "#999999"
            }
        },
        "splitLine": {
            "show": true,
            "lineStyle": {
                "color": [
                    "#555555"
                ]
            }
        },
        "splitArea": {
            "show": false,
            "areaStyle": {
                "color": [
                    "rgba(250,250,250,0.05)",
                    "rgba(200,200,200,0.02)"
                ]
            }
        }
    },
    "toolbox": {
        "iconStyle": {
            "normal": {
                "borderColor": "#ffffff"
            },
            "emphasis": {
                "borderColor": "#ffffff"
            }
        }
    },
    "legend": {
        "textStyle": {
            "color": "#ffffff"
        }
    },
    "tooltip": {
        "axisPointer": {
            "lineStyle": {
                "color": "#cccccc",
                "width": 1
            },
            "crossStyle": {
                "color": "#cccccc",
                "width": 1
            }
        }
    },
    "timeline": {
        "lineStyle": {
            "color": "#ffaf51",
            "width": 1
        },
        "itemStyle": {
            "normal": {
                "color": "#ffaf51",
                "borderWidth": 1
            },
            "emphasis": {
                "color": "#ffaf51"
            }
        },
        "controlStyle": {
            "normal": {
                "color": "#ffaf51",
                "borderColor": "#ffaf51",
                "borderWidth": 0.5
            },
            "emphasis": {
                "color": "#ffaf51",
                "borderColor": "#ffaf51",
                "borderWidth": 0.5
            }
        },
        "checkpointStyle": {
            "color": "#ff715e",
            "borderColor": "rgba(255,113,94,0.4)"
        },
        "label": {
            "normal": {
                "textStyle": {
                    "color": "#ff715e"
                }
            },
            "emphasis": {
                "textStyle": {
                    "color": "#ff715e"
                }
            }
        }
    },
    "visualMap": {
        "color": [
            "#22efe1",
            "#225cef",
            "#da22ef",
            "#22d3ef",
            "#264880"
        ]
    },
    "dataZoom": {
        "backgroundColor": "rgba(255,255,255,0)",
        "dataBackgroundColor": "rgba(222,222,222,1)",
        "fillerColor": "rgba(255,113,94,0.2)",
        "handleColor": "#cccccc",
        "handleSize": "100%",
        "textStyle": {
            "color": "#999999"
        }
    },
    "markPoint": {
        "label": {
            "normal": {
                "textStyle": {
                    "color": "#ffffff"
                }
            },
            "emphasis": {
                "textStyle": {
                    "color": "#ffffff"
                }
            }
        }
    }
}
