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

require(['d3','utils','numericjs','data','DPMixtureModel','GaussianComponent','GaussianDistribution','Canvas'],function(d3,Utils,numericjs,input,DPMixtureModel,GaussianComponent,GaussianDistribution,Canvas){

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

    var svg = d3.select("body").append("svg")
        .attr("width", diameter)
        .attr("height", diameter)
        .append("g")
        .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

    var colors = {};
    colors["Calories"] = "hsl(0,80%,80%)";
    colors["Total Fat (g)"] = "hsl(40,80%,80%)";
    colors["Saturated Fat (g)"] = "hsl(40,80%,80%)";
    colors["Trans Fat (g)"] = "hsl(40,80%,80%)";
    colors["Iron"] = "rgb(183,65,14)";

    d3.text("data/n.csv", function(text) {
        var rows = d3.csv.parseRows(text);
        var labels = rows[0];
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
            maxIterations: 10
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
        	kappa0:     10,
        	nu0:        10
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
                        var item = items[itemID];

                        var item_node={};
                        item_node["name"] = table[itemID][0];
                        item_node["children"] = [];

                        for(var i = 0; i < item.length; i++) {
                            var attribute_node = {};
                            attribute_node["name"] = labels[i+2];
                            attribute_node["value"] = data[itemID][i];
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


        /* visualize root */


          var focus = root,
              nodes = pack.nodes(root),
              view;

          var circle = svg.selectAll("circle")
              .data(nodes)
              .enter().append("circle")
              .attr("class", function(d) { return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root"; })
              .style("fill", function(d) { if(d.children)
              								return color(d.depth);
              							   else {
              							   	return colors[d.name];
              							   } });

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
              .text(function(d) { return Math.round(d.value); });


          var node = svg.selectAll("circle,text");
          

          d3.select("body")
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

            transition.selectAll("text")
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
    });
  d3.select(self.frameElement).style("height", diameter + "px");
return;










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
     console.log(input.data.length);
     console.log(input.data[0].length);
     var i;

     /**
      * Dirichlet parameters
      * 
      * D: dimensionality of the input data
      * alpha: concentration parameter
      * maxIterations: maximum Markov chain sweeps
      */
     var dirichletParameters = {
        D: input.data[0].length,
        alpha: 1,
        maxIterations: 10
     };

    var priorParameters = {
        kappa0:     10,
        nu0:        10
    };

    var DPMM = new DPMixtureModel(GaussianComponent,dirichletParameters,priorParameters);
    DPMM.cluster(input.data);
    var clusters = DPMM.getClusters();

    var c = 0;
    var clusterId;
    for(clusterId in clusters) {
        console.log("--------------------------------");
        console.log("Cluster " + clusterId);
        console.log("--------------------------------");
        var cluster = clusters[clusterId];
        var data = cluster.getData();
        var i;

        var mean = Array.apply(null, new Array(dirichletParameters.D)).map(Number.prototype.valueOf,0);
        var counter = 0;
        for(i in data) {
            console.log(input.labels[i]);
            numeric.addeq(mean,input.data_unscaled[i]);
            counter += 1;

        }
        numeric.diveq(mean,counter);
        console.log(mean);
        c += 1;
    }

});