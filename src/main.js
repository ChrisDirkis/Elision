import './main.css';
import './index.html';

import * as d3 from "d3"

const svg = d3.select(".main").create("svg").attr("viewBox", [0, 0, 200, 200]);
console.log("test")