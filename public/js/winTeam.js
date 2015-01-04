
$(function () {
    fetchMonthlySales();
    fetchTopMovies();

    function fetchTopMovies(){
        $.ajax({
            url: "/proxy/top10/movies",
            type: "GET",
            dataType: "json"
        }).done(function(data) {

            $('#top-ten-transaction-titles').highcharts({
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'Top 5 Transacting Titles'
                },
                xAxis: {
                    categories: [data[0].content_title, data[1].content_title, data[2].content_title, data[3].content_title, data[4].content_title]
                },
                yAxis: {
                    title: {
                        text: 'Transactions'
                    }
                },
                series: [{
                    name: 'Transactions',
                    data: [data[0].transactions, data[1].transactions, data[2].transactions, data[3].transactions, data[4].transactions]
                }]
            });

        });
    }

    function fetchMonthlySales(){
        $.ajax({
          url: "/proxy/monthly",
          type: "GET",
          dataType: "json"
        }).done(function(data) {

            var allData = [].concat(data,data,data,data);
            allData = $.map( allData, function( val, i ) {
              return val.total_revenue;
            });

            $('#sales-by-month').highcharts({
                chart: {
                    zoomType: 'column'
                },
                title: {
                    text: 'Average Monthly Title Sales'
                },

                xAxis: [{
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                }],
                yAxis: [{ // Primary yAxis
                    labels: {
                        format: '${value}',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    }
                }, { // Secondary yAxis
                    title: {
                        text: 'USD',
                        style: {
                            color: Highcharts.getOptions().colors[0]
                        }
                    },
                    labels: {
                        format: '\${value}',
                        style: {
                            color: Highcharts.getOptions().colors[0]
                        }
                    },
                    opposite: true
                }],
                tooltip: {
                    shared: true
                },
                legend: {
                    layout: 'vertical',
                    align: 'left',
                    x: 60,
                    verticalAlign: 'top',
                    y: 40,
                    floating: true,
                    backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
                },
                plotOptions: {
                    series: {
                        cursor: 'pointer',
                        point: {
                            events: {
                                click: function () {
                                    displayMonthlyTransactions(this.category);
                                }
                            }
                        }
                    }
                },
                series: [{
                    name: 'Average Monthly Sale',
                    type: 'column',
                    yAxis: 1,
                    data: allData,
                    tooltip: {
                        valueSuffix: ' mm',
                        valuePrefix: ' $'
                    }

                }]
            }
            );
        });
    }
    var mappings = {
        "Jan": "July",
        "Feb": "August",
        "Mar": "September",
        "Apr": "July",
        "May": "August",
        "Jun": "September",
        "Jul": "July",
        "Aug": "August",
        "Sep": "September",
        "Oct": "July",
        "Nov": "August",
        "Dec": "September"
    }
    $('#one-modal').modal({show: false});
    function displayMonthlyTransactions(month){
        $.ajax({
          url: "/proxy/weekly",
          type: "GET",
          dataType: "json"
        }).done(function(data) {
            var d = data.filter(function(x){return x.month === mappings[month]});
            var html = "";
            console.log(d.length);
            for(var i = 0; i < d.length; i++){
                console.log(d[i]);
                html += "<div style='text-align: center;margin:10px 0;'>" + d[i].month + " - W0" + d[i].week + "</br>$";
                html += d[i].total_revenue + " - " + d[i].transactions + " transactions</div>";
            }
            $('.modal-body').html(html);
            $('#one-modal').modal('show');
        });
    }

    $('#overall-sales').highcharts({
        chart: {
            zoomType: 'xy'
        },
        title: {
            text: 'Gross Monthly Sales'
        },
        xAxis: [{
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        }],
        yAxis: [{ // Primary yAxis
            labels: {
                format: '{value}°C',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            }
        }, { // Secondary yAxis
            title: {
                text: 'USD',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            labels: {
                format: '{value} mm',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            opposite: true
        }],
        tooltip: {
            shared: true
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            x: 120,
            verticalAlign: 'top',
            y: 100,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        series: [{
            name: 'Average Sales',
            type: 'column',
            yAxis: 1,
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 0, 0, 0],
            tooltip: {
                valueSuffix: ' mm'
            }

        }]
    });


    $('#customers-new-accounts').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'New Customers Per Month'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Total New Customers'
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: '<b>{point.y:.1f} million</b>'
        },
        series: [{
            name: 'Population',
            data: [
                ['Jan', 23.7],
                ['Feb', 16.1],
                ['March', 14.2],
                ['April', 14.0],
                ['May', 12.5],
                ['Jun', 12.1],
                ['July', 17.8],
                ['August', 15.7],
                ['Sep', 19.1],
                ['Oct', 0],
                ['Nov', 0],
                ['Dec', 0]

            ],
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                x: 4,
                y: 10,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif',
                    textShadow: '0 0 3px black'
                }
            }
        }]
    });

    $('#world-weekly-personas').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Weekly Customer Personas'
        },
        subtitle: {
            text: 'Genres most likely to be purchased by our customer on a certain'
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: '<br>'
            }
        },
        legend: {
            enabled: true
        },
        tooltip: {
            headerFormat: '{series.name}: ',
            pointFormat: '<b>{point.y:.1f}</b>'
        },
        series: [{
            name: 'Romance',
            data: [
                ['M', 23.7],
                ['T', 16.1],
                ['W', 14.2],
                ['Th', 14.0],
                ['F', 12.5],
                ['S', 12.1],
                ['S', 11.8]

            ],
            dataLabels: {
                enabled: false,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                x: 4,
                y: 10,
                style: {
                    fontSize: '7px',
                    fontFamily: 'Verdana, sans-serif',
                    textShadow: '0 0 3px black'
                }
            }
        },{
            name: 'Sci-Fi',
            data: [
                ['M', 123.7],
                ['T', 216.1],
                ['W', 14.2],
                ['Th', 114.0],
                ['F', 12.5],
                ['S', 12.1],
                ['S', 11.8]

            ],
            dataLabels: {
                enabled: false,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                x: 4,
                y: 10,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif',
                    textShadow: '0 0 3px black'
                }
            }
        },
        {
            name: 'Comedy',
            data: [
                ['M', 123.7],
                ['T', 216.1],
                ['W', 14.2],
                ['Th', 114.0],
                ['F', 12.5],
                ['S', 12.1],
                ['S', 11.8]

            ],
            dataLabels: {
                enabled: false,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                x: 4,
                y: 10,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif',
                    textShadow: '0 0 3px black'
                }
            }
        },
        {
            name: 'Action',
            data: [
                ['M', 123.7],
                ['T', 216.1],
                ['W', 14.2],
                ['Th', 114.0],
                ['F', 12.5],
                ['S', 12.1],
                ['S', 11.8]

            ],
            dataLabels: {
                enabled: false,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                x: 4,
                y: 10,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif',
                    textShadow: '0 0 3px black'
                }
            }
        },
        {
            name: 'Drama',
            data: [
                ['M', 123.7],
                ['T', 216.1],
                ['W', 14.2],
                ['Th', 114.0],
                ['F', 12.5],
                ['S', 12.1],
                ['S', 11.8]

            ],
            dataLabels: {
                enabled: false,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                x: 4,
                y: 10,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif',
                    textShadow: '0 0 3px black'
                }
            }
        }]
    });


    $('#gross-by-genre').highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Fruit Consumption'
        },
        xAxis: {
            categories: ['Apples', 'Bananas', 'Oranges']
        },
        yAxis: {
            title: {
                text: 'Fruit eaten'
            }
        },
        series: [{
            name: 'Jane',
            data: [1, 0, 4]
        }, {
            name: 'John',
            data: [5, 7, 3]
        }]
    });

    $('#operation-summary').highcharts({

        chart: {
            type: 'column'
        },
        title: {
            text: 'Daily Encode Performance'
        },
        xAxis: {
            categories: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        legend: {
            align: 'right',
            x: -70,
            verticalAlign: 'top',
            y: 20,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.x + '</b><br/>' +
                    this.series.name + ': ' + this.y + '<br/>' +
                    'Total: ' + this.point.stackTotal;
            }
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                    style: {
                        textShadow: '0 0 3px black, 0 0 3px black'
                    }
                }
            }
        },
        series: [{
            name: 'Feature',
            data: [5, 3, 4, 7, 2, 6, 2]
        }, {
            name: 'TV',
            data: [2, 2, 3, 2, 1, 6, 2]
        }, {
            name: 'Library',
            data: [3, 4, 4, 2, 5, 6, 2]
        }]
    });

    $('#title-sales-by-genre').highcharts({
        chart: {
            zoomType: 'xy'
        },
        title: {
            text: 'Monthly Title Sales By Genre'
        },

        xAxis: [{
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        }],
        yAxis: [{ // Primary yAxis
            labels: {
                format: '{value}°C',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            title: {
                text: 'Temperature',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            }
        }, { // Secondary yAxis
            title: {
                text: 'USD',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            opposite: true
        }],
        tooltip: {
            shared: true
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            x: 120,
            verticalAlign: 'top',
            y: 100,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        series: [{
            name: 'USD',
            type: 'column',
            yAxis: 1,
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
            tooltip: {
                valueSuffix: ' mm'
            }

        }]
    });

    $('#transaction-by-actor').highcharts({
        chart: {
            zoomType: 'xy'
        },
        title: {
            text: 'Monthly Title Sales By Actor'
        },

        xAxis: [{
            categories: ['Tom C', 'Harrison F.', 'Matt D.', 'Cameron Diaz']
        }],
        yAxis: [{ // Primary yAxis
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            title: {
                text: '',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            }
        }, { // Secondary yAxis
            title: {
                text: 'USD',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            opposite: true
        }],
        tooltip: {
            shared: true
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            x: 120,
            verticalAlign: 'top',
            y: 100,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        series: [{
            name: 'Sales',
            type: 'column',
            yAxis: 1,
            data: [49.9, 71.5, 106.4, 129.2],
            tooltip: {
                valueSuffix: ''
            }

        }]
    });

    $('#transaction-by-genre').highcharts({

        chart: {
            zoomType: 'xy'
        },
        title: {
            text: 'Monthly Transactions Sales By Genre'
        },

        xAxis: [{
            categories: ['Romance', 'Sci-Fi', 'Comedy', 'Action']
        }],
        yAxis: [{ // Primary yAxis
            labels: {
                format: '{value}°C',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            title: {
                text: 'Transactions',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            }
        }, { // Secondary yAxis
            title: {
                text: 'Transactions',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            opposite: true
        }],
        tooltip: {
            shared: true
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            x: 120,
            verticalAlign: 'top',
            y: 100,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        series: [{
            name: 'Transactions',
            type: 'column',
            yAxis: 1,
            data: [6292, 18246, 77132, 61824],
            tooltip: {
                valueSuffix: ' mm'
            }

        }]
    });


    $('#sales-by-pricepoint').highcharts({
        chart: {
            type: 'spline'
        },
        title: {
            text: 'Sales By Price Point'
        },
        subtitle: {
            text: 'Summary of price points and sale values'
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: { // don't display the dummy year
                month: '%e. %b',
                year: '%b'
            },
            title: {
                text: 'Date'
            }
        },
        yAxis: {
            title: {
                text: 'Snow depth (m)'
            },
            min: 0
        },
        tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: '{point.x:%e. %b}: {point.y:.2f} m'
        },

        series: [{
            name: 'Winter 2007-2008',
            // Define the data points. All series have a dummy year
            // of 1970/71 in order to be compared on the same x axis. Note
            // that in JavaScript, months start at 0 for January, 1 for February etc.
            data: [
                [Date.UTC(1970,  9, 27), 0   ],
                [Date.UTC(1970, 10, 10), 0.6 ],
                [Date.UTC(1970, 10, 18), 0.7 ],
                [Date.UTC(1970, 11,  2), 0.8 ],
                [Date.UTC(1970, 11,  9), 0.6 ],
                [Date.UTC(1970, 11, 16), 0.6 ],
                [Date.UTC(1970, 11, 28), 0.67],
                [Date.UTC(1971,  0,  1), 0.81],
                [Date.UTC(1971,  0,  8), 0.78],
                [Date.UTC(1971,  0, 12), 0.98],
                [Date.UTC(1971,  0, 27), 1.84],
                [Date.UTC(1971,  1, 10), 1.80],
                [Date.UTC(1971,  1, 18), 1.80],
                [Date.UTC(1971,  1, 24), 1.92],
                [Date.UTC(1971,  2,  4), 2.49],
                [Date.UTC(1971,  2, 11), 2.79],
                [Date.UTC(1971,  2, 15), 2.73],
                [Date.UTC(1971,  2, 25), 2.61],
                [Date.UTC(1971,  3,  2), 2.76],
                [Date.UTC(1971,  3,  6), 2.82],
                [Date.UTC(1971,  3, 13), 2.8 ],
                [Date.UTC(1971,  4,  3), 2.1 ],
                [Date.UTC(1971,  4, 26), 1.1 ],
                [Date.UTC(1971,  5,  9), 0.25],
                [Date.UTC(1971,  5, 12), 0   ]
            ]
        }, {
            name: 'Winter 2008-2009',
            data: [
                [Date.UTC(1970,  9, 18), 0   ],
                [Date.UTC(1970,  9, 26), 0.2 ],
                [Date.UTC(1970, 11,  1), 0.47],
                [Date.UTC(1970, 11, 11), 0.55],
                [Date.UTC(1970, 11, 25), 1.38],
                [Date.UTC(1971,  0,  8), 1.38],
                [Date.UTC(1971,  0, 15), 1.38],
                [Date.UTC(1971,  1,  1), 1.38],
                [Date.UTC(1971,  1,  8), 1.48],
                [Date.UTC(1971,  1, 21), 1.5 ],
                [Date.UTC(1971,  2, 12), 1.89],
                [Date.UTC(1971,  2, 25), 2.0 ],
                [Date.UTC(1971,  3,  4), 1.94],
                [Date.UTC(1971,  3,  9), 1.91],
                [Date.UTC(1971,  3, 13), 1.75],
                [Date.UTC(1971,  3, 19), 1.6 ],
                [Date.UTC(1971,  4, 25), 0.6 ],
                [Date.UTC(1971,  4, 31), 0.35],
                [Date.UTC(1971,  5,  7), 0   ]
            ]
        }, {
            name: 'Winter 2009-2010',
            data: [
                [Date.UTC(1970,  9,  9), 0   ],
                [Date.UTC(1970,  9, 14), 0.15],
                [Date.UTC(1970, 10, 28), 0.35],
                [Date.UTC(1970, 11, 12), 0.46],
                [Date.UTC(1971,  0,  1), 0.59],
                [Date.UTC(1971,  0, 24), 0.58],
                [Date.UTC(1971,  1,  1), 0.62],
                [Date.UTC(1971,  1,  7), 0.65],
                [Date.UTC(1971,  1, 23), 0.77],
                [Date.UTC(1971,  2,  8), 0.77],
                [Date.UTC(1971,  2, 14), 0.79],
                [Date.UTC(1971,  2, 24), 0.86],
                [Date.UTC(1971,  3,  4), 0.8 ],
                [Date.UTC(1971,  3, 18), 0.94],
                [Date.UTC(1971,  3, 24), 0.9 ],
                [Date.UTC(1971,  4, 16), 0.39],
                [Date.UTC(1971,  4, 21), 0   ]
            ]
        }]
    });

    $('#movie-transactions-by-week').highcharts({
        title: {
            text: 'Transactions By Week'
        },
        xAxis: {
            categories: $('.weekly-date').text().split(":")
        },
        series: [{
            data: $('.weekly-data').text().split('$').splice(1).map(function(x){return parseInt(x)})
        }]

    });

    $(".def-type").on('click', function(){
        var $this = $(this),
            def = $this.children('input').val();

        if(def === "HD"){
            $('.cd-defs[data-def="HD"]').parent().show();
            $('.cd-defs[data-def="SD"]').parent().hide();
        } else if(def === "SD"){
            $('.cd-defs[data-def="SD"]').parent().show();
            $('.cd-defs[data-def="HD"]').parent().hide();
        } else {
            $('.cd-defs[data-def="SD"]').parent().show();
            $('.cd-defs[data-def="HD"]').parent().show();
        }
    });
});
