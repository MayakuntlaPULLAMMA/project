import React, {Component} from 'react';
import * as d3 from 'd3';
class Molcalc extends Component{
    componentDidMount() {
        this.drawChart();
      }
      constructor(props) {
        super(props);
        this.state={
            svg_content:""
        }
      }

      drawChart(){
        // var smiles = "CC(=O)Oc1ccccc1C(=O)O";
        // var mol = window.RDKit.get_mol(this.props.string);
        // var dest = document.querySelector("#graph"+this.props.id);
        var mol=this.props.mol;
        var svg = mol.get_svg();
        console.log(svg);
        // dest.innerHTML="<div id='drawing'>"+svg+"</div>";

        var canvas=document.querySelector("#graph"+this.props.id);
        var dataURL=canvas.toDataURL('image/png',1.0);

    }

render(){
return(
    // <div id={"graph"+this.props.id} string={this.props.string}></div>
    // <canvas id={"graph"+this.props.id} string={this.props.string}></canvas>
    <></>
)
}}
export default Molcalc;