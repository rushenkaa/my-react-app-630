import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
//use TODO to keep track of code you want to revist 

export function LineChart() {

    const d3Chart = useRef();

    const parseDate = d3.timeParse('%Y-%m-%d');

    useEffect(() => {
        fetch('https://data.princegeorgescountymd.gov/resource/wb4e-w4nf.json') //await fetch?
            .then(response => response.json())
            .then(data => {

                // define crimeincidents
                const crimeincidents = data.filter(event => {
                    return event.eventtype === 'Incidents';
                });

                // get dates
                const dates = [...new Set(dates.map(each => each.date.slice(0, 10)))];
// NEW- try using data?.length and get a button to refresh 
                let CountsByDate = [];

                // Get counts of each crime
                dates.map(time => {
                    let date = time;
                    let count = 0;

                    crimeincidents.map(each => {
                        let timestamp = each.incident_case_id.slice(0, 10);
                        if (timestamp === date) { count += 1; }
                    });

                    const counts = { date: parseDate(date), count: count };

                    CountsByDate.push(counts);
                });

                console.log(CountsByDate);

                const margin = { top: 20, right: 30, bottom: 30, left: 30 };
                const width = parseInt(d3.select('#d3demo').style('width')) - margin.left - margin.right;
                const height = parseInt(d3.select('#d3demo').style('height')) - margin.top - margin.bottom;

                // drawing chart
                const svg = d3.select(d3Chart.current)
                    .attr('width', width + margin.left + margin.right)
                    .attr('height', height + margin.top + margin.bottom)
                    .append('g')
                    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

                // x axis 
                const x = d3.scaleTime()
                    .domain(d3.extent(CountsByDate, function (d) { return d.date; }))
                    .range([0, width]);

                svg.append('g')
                    .attr('transform', 'translate(0,' + height + ')')
                    .call(d3.axisBottom(x));

                // Get maximum count
                const max = d3.max(CountsByDate, function (d) { return d.count; });

                // y axis 
                const y = d3.scaleLinear()
                    .domain([0, max])
                    .range([height, 0]);

                svg.append('g')
                    .call(d3.axisLeft(y));


                // Bar
                svg.append('path')
                    .datum(CountsByDate)
                    .attr('fill', 'none')
                    .attr('stroke', 'white')
                    .attr('stroke-width', 3)
                    .attr('d', d3.line()
                        .x(function (d) { return x(d.date); })
                        .y(function (d) { return y(d.count); })
                    );

                // Title
                svg.append('text')
                    .attr('x', (width / 2))
                    .attr('y', (margin.top / 5 - 10))
                    .attr('text-anchor', 'middle')
                    .attr('font-size', '16px')
                    .attr('fill', 'white')
                    .text('Crime incidents in Prince Georges County');
            });
    }, []);

    return (
        <div id='d3demo'>
            <svg ref={d3Chart}></svg>
        </div>
    );
}
