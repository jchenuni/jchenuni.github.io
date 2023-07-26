var finalDataChart2 = [];

// initialise layout variables
const marginChart2 = {top: 50, right: 20, bottom: 50, left: 60};
const widthChart2 = 600;
const heightChart2 = 400;

// initialise charts
const svg = d3.select('#svg2')
    .attr('width', widthChart2 + marginChart2.left + marginChart2.right)
    .attr('height', heightChart2 + marginChart2.top + marginChart2.bottom)
    .append('g')
    .attr('transform', 'translate(' + marginChart2.left + ',' + marginChart2.top + ')')
    .attr('id', 'svg-2-parent-g');

charts.chart2 = function() {
  getAndDrawData();
}

function getAndDrawData() {

  // get data
  const file = 'data/company_state_data.csv';
  d3.csv(file,  function(data) {

    params.forEach(function(param) {
      if (!d3.select('#' + param.id).property('checked')) {
        data = data.filter(d => d['Industry'] != param.id);
      }
    });

    const dataGroupedByState = Array.from(d3.group(data, d => d.State));
    finalDataChart2 = dataGroupedByState.map(
        function (item) {
          var sumScores = 0;
          item[1].forEach(d => sumScores += 1);
          return {
            State: item[0],
            Count: sumScores
          };
        }
    );

    drawChart2(finalDataChart2);
  });
}

function drawChart2(data) {
  d3.select('#svg-2-parent-g').selectAll('*').remove();
  svg.selectAll('rect').remove();

  // X axis
  const x = d3.scaleBand()
      .range([0, widthChart2])
      .domain(data.map(function (d) {
        return d.state;
      }))
      .padding(0.2);
  svg.append("g")
      .attr("transform", "translate(0," + heightChart2 + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

  // Add Y axis
  const y = d3.scaleLinear()
      .domain([0, 7])
      .range([heightChart2, 0]);
  svg.append("g")
      .call(d3.axisLeft(y));

  // Bars
  svg.selectAll("mybar")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", function(d) { return x(d.State); })
      .attr("y", function(d) { return y(d.Count); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return heightChart2 - y(d.Count); })
      .attr("fill", "#69b3a2")

  // Features of the annotation
  const annotations = [
    {
      note: {
        label: "Decline begins"
      },
      connector: {
        end: "arrow"
      },
      type: d3.annotationLabel,
      x: 250,
      y: 75,
      dx: 0,
      dy: -25
    },
    {
      note: {
        label: "Worst scores since 2014"
      },
      connector: {
        end: "arrow"
      },
      type: d3.annotationLabel,
      x: 615,
      y: 100,
      dx: 0,
      dy: -25
    }
  ]

  if (params.some(param => !d3.select('#' + param.id).property('checked'))) {
    // remove annotations
    d3.select('#svg-2-annotations').selectAll('*').remove();
    d3.select('#svg-2-annotations').remove();
  } else {
    // Add annotation to the chart
    const makeAnnotations = d3.annotation()
        .annotations(annotations);
    d3.select("#svg2")
        .append("g")
        .attr('id', 'svg-2-annotations')
        .call(makeAnnotations);
  }
}

const params = [
  {
    id: "Action",
  },
  {
    id: "Adventure",
  },
  {
    id: "Animation",
  },
  {
    id: "Anime",
  },
  {
    id: "Christmas",
  },
  {
    id: "Comedy",
  },
  {
    id: "Crime",
  },
  {
    id: "Documentary",
  },
  {
    id: "Drama",
  },
  {
    id: "Fantasy",
  },
  {
    id: "Family",
  },
  {
    id: "Musical",
  },
  {
    id: "Mystery",
  },
  {
    id: "Other",
  },
  {
    id: "Romance",
  },
  {
    id: "Science-Fiction",
  },
  {
    id: "Sports-film",
  },
  {
    id: "War",
  },
  {
    id: "Western",
  },
];

function updateChart2Data() {
  getAndDrawData();
}
