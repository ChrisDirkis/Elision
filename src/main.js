import './main.css';
import './index.html';

import * as d3 from "d3"

const width = 500;
const height = 500;

const graph = {
    "nodes": [
      {
        "id": 1,
        "name": "A"
      },
      {
        "id": 2,
        "name": "B"
      },
      {
        "id": 3,
        "name": "C"
      },
      {
        "id": 4,
        "name": "D"
      },
      {
        "id": 5,
        "name": "E"
      },
      {
        "id": 6,
        "name": "F"
      },
      {
        "id": 7,
        "name": "G"
      },
      {
        "id": 8,
        "name": "H"
      },
      {
        "id": 9,
        "name": "I"
      },
      {
        "id": 10,
        "name": "J"
      }
    ],
    "links": [
  
      {
        "source": 1,
        "target": 2
      },
      {
        "source": 1,
        "target": 5
      },
      {
        "source": 1,
        "target": 6
      },
  
      {
        "source": 2,
        "target": 3
      },
              {
        "source": 2,
        "target": 7
      }
      ,
  
      {
        "source": 3,
        "target": 4
      },
       {
        "source": 8,
        "target": 3
      }
      ,
      {
        "source": 4,
        "target": 5
      }
      ,
  
      {
        "source": 4,
        "target": 9
      },
      {
        "source": 5,
        "target": 10
      }
    ]
}

document.addEventListener("DOMContentLoaded", () => {

    const svg = d3.select("#main")
        .append("svg")  
        .attr("viewBox", [0, 0, width, height]);
        
    const g = svg.append("g")
        .attr("cursor", "grab");

    // Initialize the links
    const linkElements = updateLinks(g, graph.links);

    // Initialize the nodes
    const nodeElements = updateNodes(g, graph.nodes);

    // Let's list the force we wanna apply on the network
    const simulation = d3.forceSimulation(graph.nodes)              // Force algorithm is applied to data.nodes
        .force("link", d3.forceLink()                               // This force provides links between nodes
          .id(d => d.id)                                            // This provide  the id of a node
          .links(graph.links)                                       // and this the list of links
        )
        .force("charge", d3.forceManyBody().strength(-400))         // This adds repulsion between nodes. Play with the -400 for the repulsion strength
        .force("center", d3.forceCenter(width / 2, height / 2))     // This force attracts nodes to the center of the svg area
        .on("tick", ticked);

    const update = () => {
      simulation.nodes(graph.nodes)
      //  .on("tick", ticked)
      
      simulation.force("link").links(graph.links)
    }

    svg.call(d3.zoom()
        .extent([[0, 0], [width, height]])
        .scaleExtent([1, 8])
        .on("zoom", zoomed));

    function zoomed({transform}) {
        g.attr("transform", transform);
    }

    // This function is run at each iteration of the force algorithm, updating the nodes position.
    function ticked() {
        linkElements
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        nodeElements
            .attr("cx", function (d) { return d.x+6; })
            .attr("cy", function(d) { return d.y-6; });
    }

});



const updateNodes = (g, nodes) => {
  const u = g
      .selectAll("circle")
      .data(nodes);

  const elements = u.enter()
      .append("circle")
      .attr("r", 20)
      .style("fill", "#69b3a2")

  u.exit()
      .remove();

  return elements;
}

const updateLinks = (g, links) => {
  const u = g
      .selectAll("line")
      .data(links);

  const elements = u.enter()
      .append("line")
      .style("stroke", "#aaa");

  u.exit()
      .remove();

  return elements;
}