import React ,{useState,useEffect} from 'react';
import './struct.css';
import * as d3 from 'd3';
import * as IoIcons from 'react-icons/io';

const Structure=()=>{
    const [number_of_graphs,set_number_of_graphs]=React.useState(0);
    const [list_of_graphs,set_list_of_graphs]=React.useState([]);
    const [list_of_words,set_list_of_words]=React.useState([]);
    const [download_data,set_downlaod_data]=React.useState("");

    var drawChart=()=>{
        const width = 500;
        const height = 500;
        const colors = d3.scaleOrdinal(d3.schemeCategory10);
        
        const svg = d3.select('#struct')
        .append('svg')
        .attr('id','svg')
        .on('contextmenu', () => { d3.event.preventDefault(); })
        .attr('width', width)
        .attr('height', height);
        let nodes = [];
        let lastNodeId =-1;
        let links = [];
        const force = d3.forceSimulation()
            .force('link', d3.forceLink().id((d) => d.id).distance(150))
            .force('charge', d3.forceManyBody().strength(-500))
            .force('x', d3.forceX(width / 2))
            .force('y', d3.forceY(height / 2))
            .on('tick', tick);
        
        const drag = d3.drag()
        // Mac Firefox doesn't distinguish between left/right click when Ctrl is held... 
        .filter(() => d3.event.button === 0 || d3.event.button === 2)
        .on('start', (d) => {
            if (!d3.event.active) force.alphaTarget(0.3).restart();
        
            d.fx = d.x;
            d.fy = d.y;
        })
        .on('drag', (d) => {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        })
        .on('end', (d) => {
            if (!d3.event.active) force.alphaTarget(0);
        
            d.fx = null;
            d.fy = null;
        });
        svg.append('svg:defs').append('svg:marker')
        .attr('id', 'end-arrow')
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 6)
        .attr('markerWidth', 3)
        .attr('markerHeight', 3)
        .attr('orient', 'auto')
      .append('svg:path')
        .attr('d', 'M0,-5L10,0L0,5')
        .attr('fill', '#000');
        svg.append('svg:defs').append('svg:marker')
        .attr('id', 'start-arrow')
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 4)
        .attr('markerWidth', 3)
        .attr('markerHeight', 3)
        .attr('orient', 'auto')
      .append('svg:path')
        .attr('d', 'M10,-5L0,0L10,5')
        .attr('fill', '#000');
        

        const dragLine = svg.append('svg:path')
      .attr('class', 'link dragline hidden')
      .attr('d', 'M0,0L0,0');
        
        // handles to link and node element groups
        let path = svg.append('svg:g').selectAll('path');
        let circle = svg.append('svg:g').selectAll('g');

        let selectedNode = null;
        let selectedLink = null;
        let mousedownLink = null;
        let mousedownNode = null;
        let mouseupNode = null;
        
        function resetMouseVars() {
          mousedownNode = null;
          mouseupNode = null;
          mousedownLink = null;
        }
        
        function tick() {
            // draw directed edges with proper padding from node centers
            path.attr('d', (d) => {
              const deltaX = d.target.x - d.source.x;
              const deltaY = d.target.y - d.source.y;
              const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
              const normX = deltaX / dist;
              const normY = deltaY / dist;
              const sourcePadding = d.left ? 17 : 12;
              const targetPadding = d.right ? 17 : 12;
              const sourceX = d.source.x + (sourcePadding * normX);
              const sourceY = d.source.y + (sourcePadding * normY);
              const targetX = d.target.x - (targetPadding * normX);
              const targetY = d.target.y - (targetPadding * normY);
          
              return `M${sourceX},${sourceY}L${targetX},${targetY}`;
            });
          
            circle.attr('transform', (d) => `translate(${d.x},${d.y})`);
          }
          function restart() {
            // path (link) group
            path = path.data(links);
          
            // update existing links
            path.classed('selected', (d) => d === selectedLink)
              .style('marker-start', (d) => d.left ? 'url(#start-arrow)' : '')
              .style('marker-end', (d) => d.right ? 'url(#end-arrow)' : '');
          
            // remove old links
            path.exit().remove();
          
            // add new links
            path = path.enter().append('svg:path')
              .attr('class', 'link')
              .classed('selected', (d) => d === selectedLink)
              .style('marker-start', (d) => d.left ? 'url(#start-arrow)' : '')
              .style('marker-end', (d) => d.right ? 'url(#end-arrow)' : '')
              .on('mousedown', (d) => {
                if (d3.event.ctrlKey) return;
          
                // select link
                mousedownLink = d;
                selectedLink = (mousedownLink === selectedLink) ? null : mousedownLink;
                selectedNode = null;
                restart();
              })
              .merge(path);
          
            // circle (node) group
            // NB: the function arg is crucial here! nodes are known by id, not by index!
            circle = circle.data(nodes, (d) => d.id);
          
            // update existing nodes (reflexive & selected visual states)
            circle.selectAll('circle')
              .style('fill', (d) => (d === selectedNode) ? d3.rgb(colors(d.id)).brighter().toString() : colors(d.id))
              .classed('reflexive', (d) => d.reflexive);
          
            // remove old nodes
            circle.exit().remove();
          
            // add new nodes
            const g = circle.enter().append('svg:g');
          
            g.append('svg:circle')
              .attr('class', 'node')
              .attr('r', 12)
              .style('fill', (d) => (d === selectedNode) ? d3.rgb(colors(d.id)).brighter().toString() : colors(d.id))
              .style('stroke', (d) => d3.rgb(colors(d.id)).darker().toString())
              .classed('reflexive', (d) => d.reflexive)
              .on('mouseover', function (d) {
                if (!mousedownNode || d === mousedownNode) return;
                // enlarge target node
                d3.select(this).attr('transform', 'scale(1.1)');
              })
              .on('mouseout', function (d) {
                if (!mousedownNode || d === mousedownNode) return;
                // unenlarge target node
                d3.select(this).attr('transform', '');
              })
              .on('mousedown', (d) => {
                if (d3.event.ctrlKey) return;
          
                // select node
                mousedownNode = d;
                selectedNode = (mousedownNode === selectedNode) ? null : mousedownNode;
                selectedLink = null;
          
                // reposition drag line
                dragLine
                  .style('marker-end', 'url(#end-arrow)')
                  .classed('hidden', false)
                  .attr('d', `M${mousedownNode.x},${mousedownNode.y}L${mousedownNode.x},${mousedownNode.y}`);
          
                restart();
              })
              .on('mouseup', function (d) {
                if (!mousedownNode) return;
          
                // needed by FF
                dragLine
                  .classed('hidden', true)
                  .style('marker-end', '');
          
                // check for drag-to-self
                mouseupNode = d;
                if (mouseupNode === mousedownNode) {
                  resetMouseVars();
                  return;
                }
          
                // unenlarge target node
                d3.select(this).attr('transform', '');
          
                // add link to graph (update if exists)
                // NB: links are strictly source < target; arrows separately specified by booleans
                const isRight = mousedownNode.id < mouseupNode.id | mousedownNode.id>mouseupNode.id;
                const source = mousedownNode ;
                const target =  mouseupNode ;
          
                const link = links.filter((l) => l.source === source && l.target === target)[0];
                if (link) {
                  link[isRight ? 'right' : 'left'] = true;
                } else {
                  links.push({ source, target, left: !isRight, right: isRight });
                  
                }
          
                // select new link
                selectedLink = link;
                selectedNode = null;
                restart();
              });
          
            // show node IDs
            
            g.append('svg:text')
              .attr('x', 0)
              .attr('y', 4)
              .attr('class', 'id')
              .text((d) => d.id);
          
            circle = g.merge(circle);
          
            // set the graph in motion
            force
              .nodes(nodes)
              .force('link').links(links);
          
            force.alphaTarget(0).restart();
          }
          d3.select("#delete-graph").on("click",function(){
            var dodelete=window.confirm("Press OK to delete this graph");
            if(dodelete){
             nodes=[];
             links=[];
             lastNodeId=-1;
            restart();
             
            }
          })
          d3.select("#download-input").on("click", ()=> {
            var saveEdges = [];
            links.forEach(function(val, i) {
              saveEdges.push({
                source: val.source.id,
                target: val.target.id
              });
            });
            
            
            var degrees=[]
            for(var i=0;i<nodes.length;i++){
              degrees.push(0);
            }
            for(var i=0;i<saveEdges.length;i++){
              degrees[saveEdges[i]["source"]]+=1;
              degrees[saveEdges[i]["target"]]+=1;
            }
            var list_of_words=[]
            for(var i=0;i<nodes.length;i++){
              list_of_words.push("v "+nodes[i]["id"]+" "+degrees[i])
            }
            for(var i=0;i<saveEdges.length;i++){
              list_of_words.push("e "+saveEdges[i]["source"]+" "+saveEdges[i]["target"])
        
            }
            var words=this.state.list_of_words;
            var new_words=[]
            for(var i=0;i<words.length;i++){
              
                new_words.push(words[i]);
              
            }
            new_words.push(list_of_words);
            this.setState({ number_of_graphs: this.state.number_of_graphs + 1,list_of_graphs:this.state.list_of_graphs.concat({nodes,saveEdges}),list_of_words:new_words })
            console.log(this.state.list_of_words);
            
            nodes=[];
            links=[];
            lastNodeId=-1;
          //   var blob = new Blob([
          //     window.Text.stringify({
          //     "nodes": nodes,
          //     "edges": saveEdges
          //   })
          //   // "t # "
          // ], {
          //     type: "text/plain;charset=utf-8"
          //   });
          //   saveAs(blob, "mydag.json");
            restart();
          });
          
        
      
          function mousedown() {
            // because :active only works in WebKit?
            svg.classed('active', true);
          
            if (d3.event.ctrlKey || mousedownNode || mousedownLink) return;
          
            // insert new node at point
            const point = d3.mouse(this);
            const node = { id: ++lastNodeId, reflexive: false, x: point[0], y: point[1] };
            nodes.push(node);
            console.log("mousedown");
            
            restart();
          }
          
          function mousemove() {
            if (!mousedownNode) return;
          
            // update drag line
            dragLine.attr('d', `M${mousedownNode.x},${mousedownNode.y}L${d3.mouse(this)[0]},${d3.mouse(this)[1]}`);
          }
          
          function mouseup() {
            if (mousedownNode) {
              // hide drag line
              dragLine
                .classed('hidden', true)
                .style('marker-end', '');
            }
          
            // because :active only works in WebKit?
            svg.classed('active', false);
          
            // clear mouse event vars
            resetMouseVars();
          }
          
          function spliceLinksForNode(node) {
            const toSplice = links.filter((l) => l.source === node || l.target === node);
            for (const l of toSplice) {
              links.splice(links.indexOf(l), 1);
            }
          }
          
          // only respond once per keydown
          let lastKeyDown = -1;
          
          function keydown() {
            d3.event.preventDefault();
          
            if (lastKeyDown !== -1) return;
            lastKeyDown = d3.event.keyCode;
          
            // ctrl
            if (d3.event.keyCode === 17) {
              circle.call(drag);
              svg.classed('ctrl', true);
              return;
            }
          
            if (!selectedNode && !selectedLink) return;
          
            switch (d3.event.keyCode) {
              case 8: // backspace
              case 46: // delete
                if (selectedNode) {
                  nodes.splice(nodes.indexOf(selectedNode), 1);
                  spliceLinksForNode(selectedNode);
                } else if (selectedLink) {
                  links.splice(links.indexOf(selectedLink), 1);
                }
                selectedLink = null;
                selectedNode = null;
                restart();
                break;
              case 66: // B
                if (selectedLink) {
                  // set link direction to both left and right
                  selectedLink.left = true;
                  selectedLink.right = true;
                }
                restart();
                break;
              case 76: // L
                if (selectedLink) {
                  // set link direction to left only
                  selectedLink.left = true;
                  selectedLink.right = false;
                }
                restart();
                break;
              case 82: // R
                if (selectedNode) {
                  // toggle node reflexivity
                  selectedNode.reflexive = !selectedNode.reflexive;
                } else if (selectedLink) {
                  // set link direction to right only
                  selectedLink.left = false;
                  selectedLink.right = true;
                }
                restart();
                break;
            }
          }
          
          function keyup() {
            lastKeyDown = -1;
          
            // ctrl
            if (d3.event.keyCode === 17) {
              circle.on('.drag', null);
              svg.classed('ctrl', false);
            }
          }
          
          // app starts here
          svg.on('mousedown', mousedown)
      
            .on('mousemove', mousemove)
            .on('mouseup', mouseup);
          d3.select(window)
            .on('keydown', keydown)
            .on('keyup', keyup);
          restart();
      
         
         
        
          
        }
       
        return(
            
            <div className="outer">
              {/* <IconContext.Provider value={{ color: 'navy' }}>
         */}
            <div className="display_flex">
            
              <div className="structure" id="struct">
              <div className='display_flex_buttons'>
              <button><div id="download-input">Add</div></button>
              <button><div id="delete-graph">Delete</div></button>
              </div>
              </div>
              
              <div>
                <div className="drawing_instruction">
                  <div className="instruction_heading">Instructions to draw Graph</div>
                  <p className="ins_description">1. Click to add a node.</p>
                  <p className="ins_description">2. Click and drag a node to another node to add a link.</p>
                  <p className="ins_description">3. Click a node or link and press "delete" or "backspace" to delete.</p>
                  <p className="ins_description">4. Click on "delete" button to delete the graph</p>
                  <p className="ins_description">5. Click on "add" button to add the graph</p>
        
        
        
        
        
                </div>
                <div>
                <div className="list_of_graphs_added">
                  <div className="instruction_heading">List of Graphs added</div>
                 <div className="display_buttons_box">
                    {list_of_graphs.map((item,index)=>{
                    return(
                       <div className="display_flex"><div className="buttons_delete_view"/* onClick={()=>{handledisplayselectedgraph(index+1)}} */>Graph {index+1}</div><IoIcons.IoMdCloseCircleOutline id="close_icon" /*onClick={()=>{handledeletegraph(index+1)}}*/ /></div> )
                     
                   })}
                 </div>
                </div>
                <div>
                <button className='transfer_to_file'  /*download='list.txt' href={()=>{URL.createObjectURL(this.state.download_data)}}*/><div className="submit_structure">Submit</div></button>
                </div>
                </div>
              </div>
            </div>
            {/* </IconContext.Provider> */}
            </div>
          )
         

}
export default Structure;