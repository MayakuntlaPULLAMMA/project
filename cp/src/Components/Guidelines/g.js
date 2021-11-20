import React, { Component } from 'react';
import * as d3 from 'd3';
class Barchart extends Component {
  componentDidMount() {
    this.drawChart();
  }


drawChart() {
  
  var svg = d3.select("#graph").append("svg")
  .attr("width",1200)
  .attr("height",700)
  .style("margin-left", 400);


  //intialize data
  var graph = {
    nodes: [
      { name: "Alice" ,value:"hii"},
      { name: "Bob" ,value:"hii" },
      /*{ name: "Chen" ,value:"hii" },
      { name: "Dawg" ,value:"hii" },
      { name: "Ethan"  ,value:"hii"},
      { name: "George" ,value:"hii" },
      { name: "Frank"  ,value:"hii"},
      { name: "Hanes"  ,value:"hii"}*/
    ],
    links: [
      { source: "Alice", target: "Bob" },
     /* { source: "Chen", target: "Bob" },
      { source: "Dawg", target: "Chen" },
      { source: "Hanes", target: "Frank" },
      { source: "Hanes", target: "George" },
      { source: "Dawg", target: "Ethan" }*/
    ]
  };

  var simulation = d3
    .forceSimulation(graph.nodes)
    .force(
      "link",
      d3
        .forceLink()
        .id(function(d) {
          return d.name;
        })
        .links(graph.links)
    )

    .force("charge", d3.forceManyBody().strength(-30))
    .force("center", d3.forceCenter(900 / 2, 700 / 2))
    .on("tick", ticked);

  var link = svg
    .append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(graph.links)
    .enter()
    .append("line")
    .attr("stroke","#1f77b4")
    .attr("stroke-opacity",0.8)
   
    .attr("stroke-width", function(d) {
      return 5;
    });
  var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 1e-6);

  var node = svg
    .append("g")
    .attr("class", "nodes")
    .selectAll("circle")
    .data(graph.nodes)
    .enter()
    .append("circle")
    .attr("r", 6)
    .attr("fill", function(d) {
      return "blue";
    })
    .on("mouseover",mouseover)
        .on("mousemove", function(event,d){mousemove(event,d);})
        .on("mouseout", mouseout)
    
    
    .call(
      d3
        
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
    );

  

  function ticked() {
    link
      .attr("x1", function(d) {
        return d.source.x;
      })
      .attr("y1", function(d) {
        return d.source.y;
      })
      .attr("x2", function(d) {
        return d.target.x;
      })
      .attr("y2", function(d) {
        return d.target.y;
      });

    node
      .attr("cx", function(d) {
        return d.x;
      })
      .attr("cy", function(d) {
        return d.y;
      });
  }

  function dragstarted(event,d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(event,d) {
    d.fx = event.x;
    d.fy = event.y;
  }

  function dragended(event,d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  function mouseover(){
    div.transition()
    .duration(0)
    .style("opacity", 1);
  }

  function mousemove(event,d) {
    
    console.log("jii");
    div
    .style("left", (event.pageX) + "px")
    .style("top", (event.pageY-50) + "px")
    .html(
        "<table style='font-size: 10px; font-family: sans-serif;' >"+
        "<tr><td>Name: </td><td>"+d.name+"</td></tr>"+
        "<tr><td>Value: </td><td>"+d.value+"</td></tr>"+
        "</table>"
    );
}
  function mouseout(){
    div.transition()
    .duration(0)
    .style("opacity",1e-6)
  }
  
}
render(){
  return <div id="graph"></div>
}


}
export default Barchart;
