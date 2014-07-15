define(['numericjs'], function (numericjs) {
    var GaussianDistribution = function (mean,covariance) {
        var N = mean.length;
        if(covariance.length != N || covariance[0].length != N) {
            throw Error("Invalid dimensions on covariance matrix");
        }
        var mean = mean;
        var covariance = covariance;

        // calculate eigensystem
        var eigenSystem = numeric.eig(covariance);
        var eigenValues = eigenSystem.lambda.x.map(Math.sqrt);
        var eigenVectors = numeric.transpose(eigenSystem.E.x);

        this.random = function() {
            var x = [];
            for (var i = 0; i < N; i++)
                x.push(this.rnd_bmt(eigenValues[i]));
            x = numeric.dot(eigenVectors,x);
            return numeric.add(x,mean);
        }
    };


    GaussianDistribution.prototype.rnd_bmt = function(sigma) {
        var x = 0, y = 0, rds, c;

        // Get two random numbers from -1 to 1.
        // If the radius is zero or greater than 1, throw them out and pick two new ones
        // Rejection sampling throws away about 20% of the pairs.
        do {
            x = Math.random()*2-1;
            y = Math.random()*2-1;
            rds = x*x + y*y;
        }
        while (rds == 0 || rds > 1)

        // This magic is the Box-Muller Transform
        c = Math.sqrt(-2*Math.log(rds)/rds);

        // It always creates a pair of numbers. I'll return them in an array.
        // This function is quite efficient so don't be afraid to throw one away if you don't need both.
        return x*c*sigma;
    };

    return GaussianDistribution;
});