import React, { Component } from 'react';
import * as d3 from 'd3';
import './Guidelines.css';
class Barchart extends Component {
  componentDidMount() {
    this.drawChart();
  }


drawChart() {
  console.log("title",this.props.title);
  console.log(this.props.graph);
  var color_dictionary={'H':'#FFFFFF','C':'#909090','N':'#3050F8','Br':'#A62929','O':"#FF0D0D",'S':'#FFFF30','Cl':'#1FF01F'}
  var svg = d3.select("#graph_"+String(this.props.id)).append("svg")
  .attr("preserveAspectRatio", "xMidYMid meet")
  .attr("viewBox", "0 0 145 130")


  //intialize data
  var graph = {
    nodes: [
      { name: "Alice" ,value:"hii",title:"hi"},
      { name: "Bob" ,value:"hii",title:"hi" },
      { name: "Chen" ,value:"hii",title:"hi" },
      { name: "Dawg" ,value:"hii" },
     {name:"George",value:"hii"},
      { name: "Hanes"  ,value:"hii"},
      {name:"islans",value:"hii"}
    ],
    links: [
      { source: "Alice", target: "Bob" },
        { source: "Bob", target: "Chen" },
      { source: "Chen", target: "Dawg" },
      { source: "Dawg", target: "Hanes" },
      { source: "Hanes", target: "George" },
      {source:"George",target:"islans"}


    
    ]
  };
  var isTooltipHidden = true;

  var simulation = d3
    .forceSimulation(this.props.graph.nodes)
    .force(
      "link",
      d3
        .forceLink()
        .id(function(d) {
          return d.name;
        })
        .links(this.props.graph.links)
    )

    .force("charge", d3.forceManyBody().strength(-10))
    .force("center", d3.forceCenter(100 / 2, 100 / 2))
    .on("tick", ticked);

  var link = svg
    .append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(this.props.graph.links)
    .enter()
    .append("line")
    .attr("stroke","#263da5")
    .attr("stroke-opacity",2)
   
    .attr("stroke-width", function(d) {
      return 2;
    });
 var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 1e-6);
  
  
   

  var node = svg
    .append("g")
    .attr("class", "nodes")
    .selectAll("circle")
    .data(this.props.graph.nodes)
    .enter()
    .append("circle")
    
    .attr("r", 6)
    .attr("fill", function(d) {
      if(d.value in color_dictionary){
        return color_dictionary[d.value];
      }
      else{
      return "green";
      }
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

  function mouseover(d,event){
    div.transition()
    .duration(1)
    .style("opacity", 1);
  }
  function unPinNode(d) {
    node.fx = null;
    node.fy = null;
 }
 
 // add html content to tooltip
 function loadTooltipContent(node) {
     var htmlContent = "<div>";
     htmlContent += "<h4>" + node.value + "<\/h4>"
     
     htmlContent += "<\/div>"
     tooltip.html(htmlContent)
    
 }
 
 // add tooltip to HTML body
 var tooltip = d3.select("body")
   .append("div")
   .attr("class", "tooltip")
   .style("position", "absolute")
   .style("padding", "2px")
   .style("z-index", "1")
   .style("width", "70px")
   .style("height", "25px")
   .style("background-color", "rgba(0,0,0, 0.8)")
   .style("border-radius", "5px")
   .style("visibility", "hidden")
   .style("font-size","13px")
   .style("color","rgb(76, 177, 202)")
   .style("font-weight","strong")
   .style("padding-left","1ch")
   .style("padding-right","0.3ch")
   .text("");

 

   function mousemove(d) {
    isTooltipHidden = !isTooltipHidden;
       var visibility = (isTooltipHidden) ? "hidden" : "visible";

       // load tooltip content (if it changes based on node)
       loadTooltipContent(d);
       
       if (isTooltipHidden) {
         unPinNode(d);
       }
    
       // place tooltip where cursor was
       return tooltip.style("top", (d3.event.pageY -20) + "px").style("left", (d3.event.pageX + 10) + "px").style("visibility", "visible");

 /* 
     div      
    .style("opacity",1)
    .style("left", (event.pageX-30) + "px")
    .style("top", (event.pageY-20) + "px")
    .style("position", "absolute")
    .style("background", "white")
    .style("color","green")
    .style("font-size","10px")
    .style("display","block")
    .style("background-color","white")
    .style("width","50px")
    .style("overflow","auto")
    .text("Label - "+String(d.name))
    
   
*/
    /*.html(
        "<div style='font-size: 10px; font-family: sans-serif; background-color:black ;height:10px' >"+
        "<div style='color:green;font-weight:bold; margin:1ch;'>Label   "+d.name+"</div>"+
        "</div>"
    );*/
    
    
    
    
    }
    function mouseout(d){
      isTooltipHidden = !isTooltipHidden;
         var visibility = (isTooltipHidden) ? "hidden" : "visible";
  
         // load tooltip content (if it changes based on node)
         loadTooltipContent(d);
         
         if (isTooltipHidden) {
           unPinNode(d);
         }
      
         // place tooltip where cursor was
         return tooltip.style("top", (d3.event.pageY -10) + "px").style("left", (d3.event.pageX + 10) + "px").style("visibility", "hidden");
  
      
     console.log();
    }
  
}
render(){
  return <div id={"graph_"+String(this.props.id)}></div>
}


}
export default Barchart;