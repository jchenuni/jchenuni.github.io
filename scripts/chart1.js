charts.chart1 = function() {
  // initialise layout variables
  const margin = {top: 50, right: 20, bottom: 50, left: 60};
  const width = 600;
  const height = 400;

  const parseDateTime = d3.timeParse("%B %d, %Y");

  // initialise charts
  const svg = d3.select('#svg1')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  // get data
  const file = 'data/company_revenue.csv';
  d3.csv(file, function(data) {


    finalData = data.map(
      function (item) {
        return {
          companyName: item['Company Name'],
          revenue: +item['Revenue ($)']/1000000
        };
      }
    ).sort((a, b) => (a.revenue < b.revenue) ? 1 : -1);

    var l = Math.min(finalData.length-1, 10);
    finalData = finalData.slice(0,l);

    draw(finalData);
  });

  function draw(data) {
    // X axis
    const x = d3.scaleBand()
        .range([0, width])
        .domain(data.map(function (d) {
          return d.companyName;
        }))
        .padding(0.2);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    // Add Y axis
    const y = d3.scaleLinear()
        .domain([0, "5000"])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    // Bars
    svg.selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function(d) { return x(d.companyName); })
        .attr("y", function(d) { return y(d.revenue); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.revenue); })
        .attr("fill", "#69b3a2")

    // Features of the annotation
    const annotations = [
      {
        note: {
          label: "ABC Supplier 4911 million"
        },
        connector: {
          end: "arrow"
        },
        type: d3.annotationLabel,
        x: 100,
        y: 75,
        dx: 0,
        dy: -25
      },
      {
        note: {
          label: "Sutherland Global Services 771 million"
        },
        connector: {
          end: "arrow"
        },
        type: d3.annotationLabel,
        x: 560,
        y: 375,
        dx: 0,
        dy: -25
      }
    ]

    // Add annotation to the chart
    const makeAnnotations = d3.annotation()
        .annotations(annotations)
    d3.select("#svg1")
        .append("g")
        .call(makeAnnotations)
  }
}
