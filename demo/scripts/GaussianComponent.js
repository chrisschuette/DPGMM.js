define([], function () {
    var GaussianComponent = function (initialParameters) {
        var priorParameters = initialParameters.priorParameters;
        var initialData = initialParameters.initialData;

        // parameters for the calculation of pdf
        var mean, covariance;

        // n_points
        var n_points = 0;

        // n_var
        var n_var = initialParameters.D;

        // data
        var X = {};
        var X_sum = 0.0;
        var X_squared_sum = numeric.diag(Array.apply(null, new Array(n_var)).map(Number.prototype.valueOf,0));

        // mu 0
        var mu0 = Array.apply(null, new Array(n_var)).map(Number.prototype.valueOf,0);
        if(priorParameters.mu0 != undefined)
            mu0 = priorParameters.mu0;

    	// save prior parameters
        var kappa0 = typeof priorParameters.kappa0 !== 'undefined' ? priorParameters.kappa0 : 0;
        var nu0 = typeof priorParameters.nu0 !== 'undefined' ? priorParameters.nu0 : 1.0001;
        if(nu0 < n_var)
            nu0 = n_var;

        // psi 0
    	var psi0 = numeric.mul(numeric.identity(n_var),10.0);
        if(priorParameters.psi0 != undefined)
            psi0 = priorParameters.psi0;

        // getData
        this.getData = function() {
            return X;            
        }

        // recompute_ss
        this.recompute_ss = function() {
            // if no data, default values
            if(n_points <= 0) {
                /*mean = Array.apply(null, new Array(n_var)).map(Number.prototype.valueOf,0);
                covariance = numeric.mul(numeric.identity(n_var), 1.0);*/
                mean = mu0;
                covariance = numeric.mul(psi0, (kappa0+1.0) / (kappa0 * (nu0 - n_var + 1)) );
                return;
            }
            var kappa_n = kappa0 + n_points;
            var nu = nu0 + n_points;
            var mu = numeric.div(X_sum, n_points);
            var mu_mu_0 = numeric.sub(mu, mu0);

            var C = numeric.sub(X_squared_sum, numeric.mul(numeric.tensor(mu,mu), n_points));
            var psi = numeric.add(numeric.add(psi0, C), numeric.mul(numeric.tensor(mu_mu_0,mu_mu_0), kappa0 / kappa_n * n_points));
        
            mean = numeric.add(
                    numeric.mul(mu0, kappa0 / kappa_n),
                    numeric.mul(mu, n_points / kappa_n)
                );
            covariance = numeric.mul(psi, (kappa_n+1.0) / (kappa_n * (nu - n_var + 1)) );

            // debug
            if(Math.abs(numeric.det(covariance)) < 1e-12 ) {
                console.log(numeric.det(covariance));
                console.log(covariance);
                throw Error("covariance matrix singular!");
            }
        };

        // init
        this.init = function(data) {
            if(data != undefined) {
                X = data;

                // initialise with zeros
                X_sum = Array.apply(null, new Array(n_var)).map(Number.prototype.valueOf,0);

                // determine number of data points
                n_points = 0;
                var key;
                for (key in X) {
                    if (X.hasOwnProperty(key)) {
                        var x = X[key];
                        numeric.addeq(X_sum, x);
                        n_points++;

                        var d1, d2;
                        for(d1 = 0;  d1 < n_var; d1++)
                            for(d2 = 0; d2 < n_var; d2++)
                                X_squared_sum[d1][d2] += x[d1] * x[d2];
                    }
                }
            }
            this.recompute_ss();
        };

        this.init(initialData);

        // marginal likelihood
        this.ml = function(x) {

        }

        // (posterior predictive) pdf
        this.pdf = function(x) {
            var size = x.length;
            if(size != mean.length)
                throw Error("x has invalid dimensions.");
            if(size != covariance.length || size != covariance[0].length)
                throw Error("x has invalid dimensions.");
            var det = numeric.det(covariance);
            if(Math.abs(numeric.det(covariance)) < 1e-12 )
                throw Error("covariance matrix singular!");
            var norm_const = 1.0 / (Math.pow((2*Math.PI), size/2) * Math.pow(det, 1.0/2))
            var x_mu = numeric.sub(x, mean);
            var inv = numeric.inv(covariance);
            var result = Math.exp( -0.5 * (numeric.dot(x_mu, numeric.dot(inv, x_mu))) );
            return norm_const * result;
        }

        // count
        this.count = function() {
            // debug
            var key;
            var size = 0;
            for (key in X) {
                if (X.hasOwnProperty(key)) {
                    size += 1;
                }
            }
            if(n_points != size)
                throw Error("cluster inconsistent");
            return n_points;
        }

        // add datapoint
        this.add = function(label, x) {
            var y = X[label];
            if(y != undefined)
                throw Error("cluster already contains point with label " + label);

            // add to points
            X[label] = x;

            // update X_sum
            numeric.addeq(X_sum, x);

            // update X_squared_sum
            numeric.addeq(X_squared_sum, numeric.tensor(x,x));

            // increase cluster item count
            n_points += 1;

            // recompute cluster
            this.recompute_ss();

        }

        // remove datapoint
        this.remove = function(label) {
            // item to remove
            var x = X[label];
            if(x == undefined) {
                debugger
                throw Error("Cluster does not contain point with label " + label);
            }

            // update X_sum
            numeric.subeq(X_sum, x);

            // update X_squared_sum
            numeric.subeq(X_squared_sum, numeric.tensor(x,x));

            // remove from X
            delete X[label];

            // decrease cluster item count
            n_points -= 1;

            // recompute cluster
            this.recompute_ss();
        }
    };

    return GaussianComponent;
});