requirejs.config({

    paths: {
        'numericjs': '../bower_components/numericjs/lib/numeric-1.2.6.min',
    },
    shim: {
        'numericjs': {
            exports: 'numericjs'
        }
    }
});

require(['numericjs','DPMixtureModel','GaussianComponent','GaussianDistribution','Canvas'],function(numericjs,DPMixtureModel,GaussianComponent,GaussianDistribution,Canvas){
// test data
    var X =[[0.68026725,-0.01634235],
            [3.80951844,0.79848348],
            [-1.6613724,-0.57766695],
            [-0.25730725,-0.15555173],
            [0.69801745,0.17456129],
            [2.47226496,0.56730505],
            [0.20684753,-0.02743377],
            [0.56724636,0.08908341],
            [-0.34876905,-0.23147121],
            [-1.45196276,-0.37294507],
            [1.11115161,0.51674642],
            [-1.26168053,-0.38330963],
            [-2.47242165,-0.80872173],
            [-0.31821255,-0.07944939],
            [2.49790991,0.43446559],
            [0.64287628,0.13577027],
            [-3.367354,-0.70354001],
            [0.26579325,0.0973308],
            [2.04404574,0.35792287],
            [-0.51391468,-0.08218842],
            [-2.41403049,-0.46315188],
            [3.31631817,0.95093718],
            [-0.74472631,-0.1242645],
            [1.3217336,0.43627568],
            [-0.36165848,0.07629367],
            [0.65773425,0.24430766],
            [-2.00707471,-0.42117236],
            [0.72816418,0.17415097],
            [0.51420223,0.11433704],
            [-0.61665998,-0.08166426],
            [-0.61124037,-0.07657522],
            [-2.93468042,-0.60919841],
            [-0.68302759,-0.17845499],
            [0.78672983,0.34813274],
            [0.08830717,0.11150799],
            [0.21927095,-0.02131589],
            [-2.09920389,-0.6078704],
            [-1.16417715,-0.3141582],
            [-0.98404443,-0.14446015],
            [0.09548108,0.05362139],
            [1.53140503,0.47684558],
            [-2.61161427,-0.66106372],
            [3.2230116,0.60953045],
            [-0.30587222,-0.18984789],
            [1.79256794,0.52885595],
            [2.07815662,0.52929572],
            [1.66028636,0.36982812],
            [1.20117439,0.24699263],
            [3.03597984,0.7132982],
            [0.68338192,0.14810454],
            [-4.68179451,2.05656866],
            [-6.8893395,3.6785777],
            [-6.82118638,4.36053483],
            [-6.28953329,2.47678163],
            [-4.65394058,4.03636035],
            [-4.69270873,3.63423126],
            [-6.60285798,4.33704547],
            [-6.18760236,3.56171948],
            [-5.33692362,2.89149293],
            [-5.57014444,3.64554467],
            [-5.73650213,2.23041945],
            [-5.79123328,3.92847013],
            [-6.4861975,2.89525582],
            [-6.30460749,4.29448461],
            [-5.52939367,3.28522329],
            [-6.53894125,3.37747443],
            [-6.47203286,3.02228139],
            [-6.44509225,3.47350331],
            [-5.59638643,2.85419087],
            [-5.7227953,2.23485694],
            [-7.04388031,3.30757419],
            [-5.88332855,3.44452201],
            [-4.33179866,3.66113564],
            [-6.63897556,3.7819114],
            [-6.92113519,2.67689078],
            [-6.04776912,4.19933991],
            [-6.52132838,2.42149302],
            [-6.06891677,2.5355652],
            [-5.21135485,2.24404794],
            [-6.80322806,2.69352597],
            [-6.34862272,4.35067244],
            [-5.33540544,3.06128587],
            [-6.85780486,3.59105408],
            [-6.70015074,1.91866023],
            [-5.16837915,3.22185983],
            [-5.35539882,3.22310936],
            [-5.40021857,2.54428208],
            [-6.72396999,3.47711616],
            [-6.56238676,2.51731516],
            [-6.31887275,3.01223541],
            [-6.24779574,2.03753409],
            [-6.45053288,1.44361779],
            [-5.56233798,1.87855964],
            [-6.77306834,3.03651556],
            [-6.5176941,4.08011022],
            [-6.90499984,3.18693561],
            [-6.02749797,2.18233455],
            [-5.63370634,2.87991757],
            [-5.45974661,3.57645291],
            [-4.48573484,3.93556956]];

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

     /**
      * Dirichlet parameters
      * 
      * D: dimensionality of the input data
      * alpha: concentration parameter
      */
     var dirichletParameters = {
        D: 2,
        alpha: 1
     };

     var phi = 0.3 * Math.PI / 4.0;
     var R = [[Math.cos(phi),-Math.sin(phi)],[Math.sin(phi),Math.cos(phi)]];
     var RT = numeric.transpose(R);

    var priorParameters = {
        kappa0:     0.0,
        nu0:        1.0001
        /*mu0:        [100.0,100.0],
        psi0:       numeric.dot(numeric.dot(RT,[[50.0,0.0],[0.0,50.0001]]),R)*/
    };

    var gaussian1 = new GaussianDistribution([-7,-2],[[0.1,0],[0,0.500001]]);
    var i;
    for(i=0;i<100;i++)
        X.push(gaussian1.random());

    var gaussian2 = new GaussianDistribution([7,2],[[0.5,0],[0,0.1]]);
    var i;
    for(i=0;i<100;i++)
        X.push(gaussian2.random());


    var DPMM = new DPMixtureModel(GaussianComponent,dirichletParameters,priorParameters);
    DPMM.cluster(X);
    var clusters = DPMM.getClusters();

    var canvas = new Canvas('canvas');
    // x: -4,4; y: -4,4
    var scaleX = canvas.getWidth() / (10.0 - (-10.0));
    var scaleY = canvas.getHeight() / (6.0 - (-3.0));

    var colors = [[255,0,0,255],
                  [0,255,0,255],
                  [0,0,255,255],
                  [0,255,255,255],
                  [255,0,255,255],
                  [255,255,0,255]];

    var c = 0;
    var clusterId;
    for(clusterId in clusters) {
        var cluster = clusters[clusterId];
        var data = cluster.getData();
        var i;
        for(i in data) {
            var x = data[i];
            x[0] = (x[0] + 10.0) * scaleX;
            x[1] = canvas.getHeight() - (x[1] + 3.0) * scaleY;
            x = x.map(Math.round);
            canvas.setPixel(x,colors[c]);
        }
        c += 1;
    }
    canvas.update();

    /*for(var i=0;i<X.length;i++) {
        var x = X[i];
        x[0] = (x[0] + 10.0) * scaleX;
        x[1] = canvas.getHeight() - (x[1] + 3.0) * scaleY;
        x = x.map(Math.round);
        canvas.setPixel(x,[255,0,0,255]);
    }*/
});