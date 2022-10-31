import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import './ResponsiveBar.css';


const sample = [
        {category:'Accident', quantity: 40},
        {category:'THEFT', quantity: 151},
        {category:'THEFT FROM AUTO', quantity: 89},
        {category:'ROBBERY- COMMERCIAL', quantity: 124}
]


function Chart() {

    const d3Chart = useRef();
    // updating dimension
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });
    // resize on event update
    const update = useRef(false);

    useEffect(() => {

        // listen for event updates- this is not done yet 
        window.addEventListener('resize', () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });

            // remove previous chart if there is an update- not done
            if (update.current) {
                d3.selectAll('g').remove();
            } else { update.current = true; }
        });

        // draw new chart with updated dimensions
        DrawChart(sample, dimensions);

    }, [dimensions]);

    const margin = { top: 50, right: 30, bottom: 30, left: 60 };

    function DrawChart(data, dimensions) {
        // console.log(dimensions.width, dimensions.height)

        const chartwidth = parseInt(d3.select('#d3demo').style('width')) - margin.left - margin.right;
        const chartheight = parseInt(d3.select('#d3demo').style('height')) - margin.top - margin.bottom;


        const svg = d3.select(d3Chart.current)
            .attr('width', chartwidth + margin.left + margin.right)
            .attr('height', chartheight + margin.top + margin.bottom);

        // x axis- figure out how to change these names automatically using Clearance_code_inc_type 
        const x = d3.scaleBand()
            .domain(d3.range(data.length))
            .range([margin.left, chartwidth - margin.right])
            .padding(0.1);

        svg.append('g')
            .attr('transform', 'translate(0,' + chartheight + ')')
            .call(d3.axisBottom(x).tickFormat(i => data[i].category).tickSizeOuter(0));

        const max = d3.max(data, function (d) { return d.quantity; });

        // y axis
        const y = d3.scaleLinear()
            .domain([0, max])
            .range([chartheight, margin.top]);

        svg.append('g')
            .attr('transform', 'translate(' + margin.left + ',0)')
            .call(d3.axisLeft(y));

        // Draw bars
        svg.append('g')
            .attr('fill', '#5f9ea0')
            .selectAll('rect')
            .data(data)
            .join('rect')
            .attr('x', (d, i) => x(i))
            .attr('y', d => y(d.quantity))
            .attr('height', d => y(0) - y(d.quantity))
            .attr('width', x.bandwidth());
            // Title
            /* svg.append('text')
            .attr('x', (200))
            .attr('y', (15))
            .attr('text-anchor', 'middle')
            .attr('font-size', '16px')
            .attr('fill', 'white')
            .text('Crime incidents in Prince Georges County'); */
    }

    return (
        <div id='d3demo'>
            <svg ref={d3Chart}></svg>
        </div>
    );
}

export default Chart