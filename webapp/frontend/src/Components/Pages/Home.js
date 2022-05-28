import React from 'react';
import { useHistory } from 'react-router-dom';
const Home=()=> {
  const history = useHistory();
  return (
    <div className="home1">
      
      <div className="go_to_scp" onClick={()=>history.push("/scp_patterns_home")}>
        
        <div className="go_to_scp1" >Subgraph Coverage Patterns</div>
      </div>
      <div  className="go_to_gtcp" onClick={()=>history.push("/gtcp_patterns_home")}>
        <div className="go_to_gtcp1">Graph Transactional Coverage Patterns</div>
      </div>
    </div>
  );
}

export default Home;