define([], function () {
    var Utils = {};
	// Log-gamma function
	Utils.gammaln = function gammaln(x) {
	  var j = 0;
	  var cof = [
	    76.18009172947146, -86.50532032941677, 24.01409824083091,
	    -1.231739572450155, 0.1208650973866179e-2, -0.5395239384953e-5
	  ];
	  var ser = 1.000000000190015;
	  var xx, y, tmp;
	  tmp = (y = xx = x) + 5.5;
	  tmp -= (xx + 0.5) * Math.log(tmp);
	  for (; j < 6; j++)
	    ser += cof[j] / ++y;
	  return Math.log(2.5066282746310005 * ser / xx) - tmp;
	};


	// gamma of x
	Utils.gammafn = function gammafn(x) {
	  var p = [-1.716185138865495, 24.76565080557592, -379.80425647094563,
	           629.3311553128184, 866.9662027904133, -31451.272968848367,
	           -36144.413418691176, 66456.14382024054
	  ];
	  var q = [-30.8402300119739, 315.35062697960416, -1015.1563674902192,
	           -3107.771671572311, 22538.118420980151, 4755.8462775278811,
	           -134659.9598649693, -115132.2596755535];
	  var fact = false;
	  var n = 0;
	  var xden = 0;
	  var xnum = 0;
	  var y = x;
	  var i, z, yi, res, sum, ysq;
	  if (y <= 0) {
	    res = y % 1 + 3.6e-16;
	    if (res) {
	      fact = (!(y & 1) ? 1 : -1) * Math.PI / Math.sin(Math.PI * res);
	      y = 1 - y;
	    } else {
	      return Infinity;
	    }
	  }
	  yi = y;
	  if (y < 1) {
	    z = y++;
	  } else {
	    z = (y -= n = (y | 0) - 1) - 1;
	  }
	  for (i = 0; i < 8; ++i) {
	    xnum = (xnum + p[i]) * z;
	    xden = xden * z + q[i];
	  }
	  res = xnum / xden + 1;
	  if (yi < y) {
	    res /= yi;
	  } else if (yi > y) {
	    for (i = 0; i < n; ++i) {
	      res *= y;
	      y++;
	    }
	  }
	  if (fact) {
	    res = fact / res;
	  }
	  return res;
	};



	// lower incomplete gamma function P(a,x)
	Utils.gammap = function gammap(a, x) {
	  var aln = this.gammaln(a);
	  var ap = a;
	  var sum = 1 / a;
	  var del = sum;
	  var b = x + 1 - a;
	  var c = 1 / 1.0e-30;
	  var d = 1 / b;
	  var h = d;
	  var i = 1;
	  // calculate maximum number of itterations required for a
	  var ITMAX = -~(Math.log((a >= 1) ? a : 1 / a) * 8.5 + a * 0.4 + 17);
	  var an, endval;

	  if (x < 0 || a <= 0) {
	    return NaN;
	  } else if (x < a + 1) {
	    for (; i <= ITMAX; i++) {
	      sum += del *= x / ++ap;
	    }
	    return sum * Math.exp(-x + a * Math.log(x) - (aln));
	  }

	  for (; i <= ITMAX; i++) {
	    an = -i * (i - a);
	    b += 2;
	    d = an * d + b;
	    c = b + an / c;
	    d = 1 / d;
	    h *= d * c;
	  }

	  return 1 - h * Math.exp(-x + a * Math.log(x) - (aln));
	};


    return Utils;
});