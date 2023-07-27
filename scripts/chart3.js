var finalDataChart3 = [];
// initialise layout variables
const marginChart3 = {top: 50, right: 20, bottom: 50, left: 60};
const widthChart3 = 600;
const heightChart3 = 400;

// initialise charts
const svgChart3 = d3.select('#svg3')
    .attr('width', widthChart3 + marginChart3.left + marginChart3.right)
    .attr('height', heightChart3 + marginChart3.top + marginChart3.bottom)
    .append('g')
    .attr('transform', 'translate(' + marginChart3.left + ',' + marginChart3.top + ')')
    .attr('id', 'svg-3-parent-g');

charts.chart3 = function() {
    getDataAndDraw();
}

function getDataAndDraw() {

    // get data
    const file = 'data/company_longest_strike';
    d3.csv(file, function(data) {


        paramsChart3.forEach(function(param) {
            var paramId = ('#' + param.id).replace(/\s/g,'').replace('&','')
            if (!d3.select(paramId).property('checked')) {
                data = data.filter(d => d['Industry'] != param.id);
            }
        });


        finalDataChart3 = data.map(
            function (item) {
                return {
                    companyName: item['Company Name'],
                    yearsOnList: item['Year On List']
                };
            }
        ).sort((a, b) => (a.yearsOnList < b.yearsOnList) ? 1 : -1);

        drawChart3(finalDataChart3);
    });
}

function drawChart3(data) {
    d3.select('#svg-3-parent-g').selectAll('*').remove();
    svgChart3.selectAll('rect').remove();

    // X axis
    const x = d3.scaleBand()
        .range([0, widthChart3])
        .domain(data.map(function (d) {
            return d.companyName;
        }))
        .padding(0.2);
    svgChart3.append("g")
        .attr("transform", "translate(0," + heightChart3 + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    // Add Y axis
    const y = d3.scaleLinear()
        .domain([0, 7])
        .range([heightChart3, 0]);
    svgChart3.append("g")
        .call(d3.axisLeft(y));

    // Bars
    svgChart3.selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function(d) { return x(d.companyName); })
        .attr("y", function(d) { return y(d.yearsOnList); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return heightChart3 - y(d.yearsOnList); })
        .attr("fill", "#69b3a2");
}

const paramsChart3 = [
    {
    id: "Health",
  },
  {
    id: "Manufacturing",
  },
  {
    id: "Education",
  },
  {
    id: "Retail",
  },
  {
    id: "Telecommunications",
  },
  {
    id: "Food & Beverage",
  },
  {
    id: "IT Services",
  },
  {
    id: "Advertising & Marketing",
  },
  {
    id: "Computer Hardware",
  },
  {
    id: "Business Products & Services",
  },
  {
    id: "Logistics & Transportation",
  },
  {
    id: "Government Services",
  },
  {
    id: "Human Resources",
  },
  {
    id: "Financial Services",
  },
  {
    id: "Real Estate",
  },
  {
    id: "Software",
  },
  {
    id: "Insurance",
  },
  {
    id: "Travel & Hospitality",
  },
  {
    id: "Environmental Services",
  },
  {
    id: "Consumer Products & Services",
  },
  {
    id: "Security",
  },
  {
    id: "Construction",
  },
  {
    id: "Media",
  },
];
function updateChart3Data() {
    getDataAndDraw();
}
