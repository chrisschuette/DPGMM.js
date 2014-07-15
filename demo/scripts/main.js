requirejs.config({

    paths: {
        'numericjs': '../bower_components/numericjs/lib/numeric-1.2.6.min',
        'd3': '../bower_components/d3/d3.min'
    },
    shim: {
        'numericjs': {
            exports: 'numericjs'
        },
        'd3': {
            exports: 'd3'
        }        
    }
});

var drawCircleChart = function(root, colors) {
    var margin = 20,
        diameter = 960;

    var color = d3.scale.linear()
        .domain([-1, 5])
        .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
        .interpolate(d3.interpolateHcl);

    var pack = d3.layout.pack()
        .padding(2)
        .size([diameter - margin, diameter - margin])
        .value(function(d) { return d.size; })

    var svg = d3.select("#cir").append("svg")
        .attr("width", diameter)
        .attr("height", diameter)
        .append("g")
        .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");



        /* visualize root */


          var focus = root,
              nodes = pack.nodes(root),
              view;

          var circle = svg.selectAll("circle")
              .data(nodes)
              .enter().append("circle")
              .attr("class", function(d) { return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root"; })
              .style("fill", function(d) { return d.children ? color(d.depth) : colors[d.name]; })
              .on("click", function(d) { if (focus !== d) zoom(d), d3.event.stopPropagation(); });

        var texts = svg.selectAll("text")
              .data(nodes)
              .enter();

        texts.append("text")
              .attr("class", "label")
              .style("fill-opacity", function(d) { return d.parent === root ? 1 : 0; })
              .style("display", function(d) { return d.parent === root ? null : "none"; })
              .text(function(d) { return d.name; });

        texts.append("text")
              .attr("class", "label")
              .style("fill-opacity", function(d) { return d.parent === root ? 1 : 0; })
              .style("display", function(d) { return d.parent === root ? null : "none"; })
              .style("opacity", function(d) { return d.children ? 0 : 1; })
              .attr("dy", "1.1em") // vertical-align
              .text(function(d) { return Math.round(d.content); });


          var node = svg.selectAll("circle,text");
          

          d3.select("#cir")
              .style("background", color(-1))
              .on("click", function() { zoom(root); });

          zoomTo([root.x, root.y, root.r * 2 + margin]);

          function zoom(d) {
            var focus0 = focus; focus = d;

            var transition = d3.transition()
                .duration(d3.event.altKey ? 7500 : 750)
                .tween("zoom", function(d) {
                  var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
                  return function(t) { zoomTo(i(t)); };
                });

            transition.selectAll("#cir text")
              .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
                .style("fill-opacity", function(d) { return d.parent === focus ? 1 : 0; })
                .each("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
                .each("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
          }

          function zoomTo(v) {
            var k = diameter / v[2]; view = v;
            node.attr("transform", function(d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
            circle.attr("r", function(d) { return d.r * k; });
          }
}

function drawAvgBarChart(rootAvg, colors) {

    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var x0 = d3.scale.ordinal()
        .rangeRoundBands([0, width-150], .1);

    var x1 = d3.scale.ordinal();

    var y = d3.scale.linear()
        .range([height, 0]);

    var color = d3.scale.ordinal()
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    var xAxis = d3.svg.axis()
        .scale(x0)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(d3.format(".2s"));

    var svg = d3.select("#bar").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      console.log(rootAvg)
      var ageNames = d3.keys(rootAvg[0]).filter(function(key) { return key !== "name"; });

      rootAvg.forEach(function(d) {
        d.ages = ageNames.map(function(name) { return {name: name, value: +d[name]}; });
      });

      x0.domain(rootAvg.map(function(d) { return d.name; }));
      x1.domain(ageNames).rangeRoundBands([0, x0.rangeBand()]);
      y.domain([0, 100]);

      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Score");;

      var state = svg.selectAll(".state")
          .data(rootAvg)
        .enter().append("g")
          .attr("class", "g")
          .attr("transform", function(d) { return "translate(" + x0(d.name) + ",0)"; });

      state.selectAll("rect")
          .data(function(d) { return d.ages; })
        .enter().append("rect")
          .attr("width", x1.rangeBand())
          .attr("x", function(d) { return x1(d.name); })
          .attr("y", function(d) { return y(d.value); })
          .attr("height", function(d) { return height - y(d.value); })
          .style("fill", function(d) { return colors[d.name]; })
          .style("stroke", "black" )
          .style("stroke-width", 0.5);

      var legend = svg.selectAll(".legend")
          .data(ageNames.slice())
        .enter().append("g")
          .attr("class", "legend")
          .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

      legend.append("rect")
          .attr("x", width - 18)
          .attr("width", 18)
          .attr("height", 18)
          .style("fill", function(d) { return colors[d]; });

      legend.append("text")
          .attr("x", width - 24)
          .attr("y", 9)
          .attr("dy", ".35em")
          .style("text-anchor", "end")
          .text(function(d) { return d; });


}

require(['d3','numericjs','data','DPMixtureModel','GaussianComponent','GaussianDistribution','Canvas'],function(d3,numericjs,input,DPMixtureModel,GaussianComponent,GaussianDistribution,Canvas){

    var colorArray = [];
    colorArray.push("hsl(180,80%,80%)");
    colorArray.push("hsl(40,80%,80%)");
    colorArray.push("hsl(40,80%,80%)");
    colorArray.push("hsl(40,80%,80%)");
    colorArray.push("hsl(40,80%,80%)");
    colorArray.push("rgb(255,255,255)");
    colorArray.push("hsl(0,80%,80%)");
    colorArray.push("rgb(255,255,255)");
    colorArray.push("hsl(0,80%,80%)");
    colorArray.push("hsl(240,80%,80%)");
    colorArray.push("hsl(90,80%,80%)");
    colorArray.push("hsl(90,80%,80%)");
    colorArray.push("rgb(255,255,255)");
    colorArray.push("rgb(183,65,14)");

    var colors = {};


    d3.text("data/n.csv", function(text) {
        var rows = d3.csv.parseRows(text);
        var labels = rows[0];

        for(var i = 2; i < labels.length; i++)
          colors[labels[i]] = colorArray[i-2];

        rows.shift();
        var N_items = rows.length;

        var min = Array.apply(null, new Array(16)).map(Number.prototype.valueOf,99999);
        var max = Array.apply(null, new Array(16)).map(Number.prototype.valueOf,0);

        var table = rows.map(function(row) {
            return row.map(function(value,i) {
                /* first item is the product name string */
                if(i != 0) {
                    min[i] = Math.min(min[i], value);
                    max[i] = Math.max(max[i], value);

                    return +value;
                } else
                    return value;
            });
        });

        console.log(min);
        console.log(max);

        /* select data fields */
        var data = table.map(function(row) { return row.slice(2,16); });

        /* calculate mean and std. deviation */
        var mean = Array.apply(null, new Array(14)).map(Number.prototype.valueOf,0);
        var X_sqr_sum = Array.apply(null, new Array(14)).map(Number.prototype.valueOf,0);
        for (var i = 0; i < data.length; i++) {
            numeric.addeq(mean,data[i]);
            numeric.addeq(X_sqr_sum,numeric.mul(data[i],data[i]));
        }
        numeric.diveq(mean,N_items);
        var stddev = mean.map(function(x,i) {
            return Math.sqrt((X_sqr_sum[i] - (mean[i]*mean[i])*N_items)/(N_items - 1));
        });

        /* z - scaling */
        var data_scaled = data.map(function(row) {
            return numeric.sub(row,mean);
        });
        data_scaled = data_scaled.map(function(row) {
            return numeric.div(row,stddev);
        });

         /**
          * Dirichlet parameters
          * 
          * D: dimensionality of the input data
          * alpha: concentration parameter
          * maxIterations: maximum Markov chain sweeps
          */
         var dirichletParameters = {
            D: data_scaled[0].length,
            alpha: 1,
            maxIterations: 100
         };

        /**
         * The conjugate prior for a gaussian mixture
         * with unknown mean and unknown variance is
         * a normal inverse Wishnart distribution
         *
         * kappa0: 
         * nu0:
         * mu0:
         * psi0: 
         */
        var priorParameters = {
        	kappa0:     0.1,
        	nu0:        0.5,
          psi0: numeric.mul(numeric.identity(dirichletParameters.D),5)
        };

        console.log(data_scaled);

       var DPMM = new DPMixtureModel(GaussianComponent,dirichletParameters,priorParameters);
    	 DPMM.cluster(data_scaled);
    	 var clusters = DPMM.getClusters();

        var root = {};
        root["name"] = "Menu";
        root["children"] = [];

        var minSize = 100;
        var maxSize = 1000;

        
        /* iterate over clusters  */
        var cluster_counter = 1;
        for (var clusterID in clusters) {
            if (clusters.hasOwnProperty(clusterID)) {
                var cluster = clusters[clusterID];

                /* construct cluster node */
                var cluster_node = {};
                cluster_node["name"] = "C" + cluster_counter;
                cluster_node["children"] = [];

                var items = cluster.getData();
                for (var itemID in items) {
                    if (items.hasOwnProperty(itemID)) {
                        var item = data[itemID];

                        var item_node={};
                        item_node["name"] = table[itemID][0];
                        item_node["children"] = [];

                        for(var i = 0; i < item.length; i++) {
                            var attribute_node = {};
                            attribute_node["name"] = labels[i+2];
                            attribute_node["content"] = data[itemID][i];
                            var normalizedSize = (data[itemID][i] - min[i+2])/(max[i+2]-min[i+2]);
                            attribute_node["size"] = normalizedSize * (maxSize - minSize) + minSize;
                            item_node["children"].push(attribute_node);
                        }

                        cluster_node["children"].push(item_node);
                    }

                }

                /* add as child */
                root["children"].push(cluster_node);
                cluster_counter += 1;
            }
        }
        console.log(root);

        minSize = 0;
        maxSize = 100;

        rootAvg = [];
        /* iterate over clusters  */
        var cluster_counter = 1;
        for (var clusterID in clusters) {
            if (clusters.hasOwnProperty(clusterID)) {
                var cluster = clusters[clusterID];
                var clusterMean = Array.apply(null, new Array(14)).map(Number.prototype.valueOf,0);


                /* construct cluster node */
                var cluster_node = {};
                cluster_node["name"] = "C" + cluster_counter;

                var items = cluster.getData();
                var itemCounter = 0;
                for (var itemID in items) {
                    if (items.hasOwnProperty(itemID)) {
                        var item = items[itemID];
                        /*numeric.addeq(clusterMean, data[itemID]);*/
                        for(var i = 0; i < item.length; i++) {
                          var normalizedSize = (data[itemID][i] - min[i+2])/(max[i+2]-min[i+2]);
                          clusterMean[i] += normalizedSize * (maxSize - minSize) + minSize;
                        }
                        itemCounter += 1;
                    }
                }
                numeric.diveq(clusterMean,itemCounter);
                console.log(clusterMean);
                for(var i = 2; i < labels.length; i++)
                  cluster_node[labels[i]] = clusterMean[i-2];

                /* add as child */
                rootAvg.push(cluster_node);
                cluster_counter += 1;
            }
        }

        console.log(rootAvg);

        /*
         * Visualize it! 
         */

        drawCircleChart(root, colors);
        console.log("root");
        console.log(root);
        drawAvgBarChart(rootAvg,colors);

    });
  d3.select(self.frameElement).style("height", diameter + "px");
});