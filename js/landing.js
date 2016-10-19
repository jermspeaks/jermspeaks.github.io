console.log(`%c ___________________________________
 < Mooooo. And welcome to the blog >
 -----------------------------------
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`, "font-family:monospace");

function redraw() {
  var svgElement = document.getElementById("splash-space")
  if (svgElement) {
    svgElement.parentNode.removeChild(svgElement);
  }

  // Generate random numbers
  var randomNormal5sigma2 = d3.randomNormal(5, 2);
  var random0to100 = d3.randomUniform(0, 100);

  var dataset = d3.range(200).map(i => {
    return {
      x: random0to100(),
      y: random0to100(),
      r: Math.abs(randomNormal5sigma2())
    }
  });

  var color = d3.scaleOrdinal(d3.schemeCategory20);
  var container = document.getElementById("home");

  // svg attributes
  var w = container.clientWidth;
  var h = 300;
  var p = 20;

  // Create SVG elements
  var svg = d3.select("#splash")
  .append("svg")
  .attr("id", "splash-space")
  .attr("width", w)
  .attr("height", h)

  var xScale = d3.scaleLinear()
  .domain([0, d3.max(dataset.map(d => d.x))])
  .range([p, w-p])

  var yScale = d3.scaleLinear()
  .domain([0, d3.max(dataset.map(d => d.y))])
  .range([p, h-p])

  var rScale = d3.scaleLinear()
  .domain([0, d3.max(dataset.map(d => d.r))])
  .range([1, 10])

  // Transition
  var t = d3.transition()
    .duration(2000)
    .ease(d3.easeLinear);

  svg.selectAll("circle")
    .data(dataset)
    .enter().append("circle")
    .attr('cx', d => xScale(d.x))
    .attr('cy', d => yScale(d.y))
    .attr('fill', (d,i) => color(i))
    .attr('r', 0);

  d3.selectAll("circle").transition(t)
  .attr('r', d => rScale(d.r));

  var text = svg.append("text")
    .attr("x", w / 2)
    .attr("y", h / 2)
    // .attr("dx", "-2em")
    // .attr("dy", "-1em")
    .style("text-anchor", "middle")
    .style("font-size","4em")
    .text("Craft By Zen");
}

redraw();

window.addEventListener("resize", redraw);
