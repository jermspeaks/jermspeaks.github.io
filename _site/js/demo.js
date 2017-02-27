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
  var windowHeight = window.innerHeight;

  // console.log(windowHeight);

  // svg attributes
  var w = container.clientWidth;
  var h = windowHeight >= 700 ? 250 : 100;
  var p = 20;
  var smallWidth = w <= 480;

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

  var textFont = smallWidth ? "2em" : "4em";
  // setTimeout(() => {
    var text = svg.append("text")
      // .attr("fill-opacity", 0)
      .attr("x", w / 2)
      .attr("y", h / 2)
      // .attr("dx", "-2em")
      // .attr("dy", "-1em")
      .style("text-anchor", "middle")
      .style("font-size", textFont)
      .text("JEREMY WONG")
      // .transition()
      // .duration(3000)
      // .attr("fill-opacity", 1);
  // }, 2000);
  var subtextFont = smallWidth ? "1em" : "1.5em";
  var subtext = svg.append("text")
    // .attr("fill-opacity", 0)
    .attr("x", w / 2)
    .attr("y", h / 1.5)
    // .attr("dx", "-2em")
    // .attr("dy", "-1em")
    .style("text-anchor", "middle")
    .style("font-size", subtextFont)
    .text("writing, programming, miscellany")

}

redraw();

window.addEventListener("resize", redraw);
