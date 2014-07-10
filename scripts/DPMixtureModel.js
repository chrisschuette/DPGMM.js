define([], function () {
    var DPMixtureModel = function (ComponentCreator, dirichletParameters, priorParameters) {
    	var D = dirichletParameters.D;
    	var alpha = dirichletParameters.alpha;
    	var id2cluster = { 0: new ComponentCreator({
    				D: D,
	    			priorParameters: priorParameters
	    })};
	    var z = {};
	    var n_components = 1;

    	console.log("DPMixtureModel:");
    	console.log("* D: " + D);
    	console.log("* alpha: " + alpha);

    	var newClusterIndex = 0;

    	//var component = new ComponentCreator(priorParameters);

    	this.getClusters = function() {
    		return id2cluster;
    	}

    	this.cluster = function(X) {
	    	var N = X.length;
	    	if(D != X[0].length) 
	    		throw Error("Dimension of data not compatible with priorParameters.");

	    	console.log("Clustering " + N + " datapoints of dimension " + D);

	    	// calculate empiric mean
	    	var mean_data = Array.apply(null, new Array(D)).map(Number.prototype.valueOf,0);
	    	X.map(function(x) { numeric.addeq(mean_data, x) });
	    	numeric.diveq(mean_data, N);
	    	priorParameters.mu0 = mean_data;

	    	// initialise clusters
	    	// one cluster for every data point
	    	id2cluster = {};
	    	for (var i = 0; i < X.length; i++) {
	    		var clusterData = {};
	    		clusterData[i] = X[i];
	    		id2cluster[i] = new ComponentCreator({
	    			D: D,
	    			priorParameters: priorParameters, 
	    			initialData: clusterData
	    		});
	    		z[i] = i;
	    	}
	    	n_components = X.length;
	    	newClusterIndex = N + 1;

	    	console.log("Initialized collapsed Gibbs sampling with " + n_components + " cluster");

	    	var n_iter = 0;

	    	while(n_iter < 20) {
	    		n_iter += 1;
	    		for(var i = 0; i < N; i++) {
	    			// remove point from its cluster
	    			var clusterIndex = z[i];
	    			var cluster = id2cluster[clusterIndex];
	    			// remove point from cluster z[i] and update sufficient statistics
	    			//console.log(i + " << " + z[i]);
	    			cluster.remove(i);
	    			// check if the cluster is now empty
	    			if(cluster.count() <= 0) {
	    				// remove cluster
	    				delete id2cluster[clusterIndex];
	    				n_components -= 1;
	    				//console.log("removed empty cluster " + clusterIndex);
	    			}

	    			// iterate over clusters
	    			var probabilities = Array.apply(null, new Array(n_components + 1)).map(Number.prototype.valueOf,0);
	    			var clusterIds = Array.apply(null, new Array(n_components + 1)).map(Number.prototype.valueOf,0);
	    			var c = 0;
	    			for (var clusterIndex in id2cluster) {
  						if (id2cluster.hasOwnProperty(clusterIndex)) {
    						var cluster = id2cluster[clusterIndex];
    						var marginal_likelihood_Xi = cluster.pdf(X[i]);
    						var mixing_Xi = cluster.count() / (alpha + N - 1);
    						probabilities[c] = marginal_likelihood_Xi * mixing_Xi;
    						clusterIds[c] = clusterIndex;
                			c += 1;
                		}
					}

					// new cluster
					var base_distrib = 	new ComponentCreator({
	    				D: D,
	    				priorParameters: priorParameters
	    			});			
                	var prior_predictive = base_distrib.pdf(X[i]);
                	var prob_new_cluster = alpha / (alpha + N - 1);
                	probabilities[c] = prior_predictive * prob_new_cluster;
                	clusterIds[c] = newClusterIndex;

                	var psum = probabilities.reduce(function(a, b) { return a + b; }, 0);
                	probabilities = probabilities.map( function(p) { return p / psum; } );

                	// choose cluster
                	var p =  Math.random();
                	var total = probabilities[0];
                	var k = 0;
                	while( p > total ) {
                		k += 1;
                		total += probabilities[k];
                	}

                	if(k == n_components) { // new cluster
                		var clusterIndex  = newClusterIndex; // new key
                		n_components += 1;
                		newClusterIndex += 1;
                		z[i] = clusterIndex;
	    				var cluster = new ComponentCreator({
	    					D: D,
	    					priorParameters: priorParameters, 
	    				});
	    				cluster.add(i,X[i]);
	    				id2cluster[clusterIndex] = cluster;
	    				//console.log(i + " ||>> " + z[i]);

                	} else { // existing cluster
                		var clusterIndex  = clusterIds[k];
                		z[i] = clusterIndex;
                		var cluster = id2cluster[clusterIndex];
                		cluster.add(i, X[i]);
                		//console.log(i + " >> " + z[i]);
                	}

	    		}

	    		console.log("Currently " + n_components + " clusters");

	    	}

	    };
    };

    return DPMixtureModel;
});