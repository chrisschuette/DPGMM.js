define([], function () {
	var labels = ["Big Mac",
"Quarter Pounder with Cheese+",
"Bacon Clubhouse Burger",
"Quarter Pounder Bacon Habanero Ranch+",
"Quarter Pounder Bacon & Cheese+",
"Quarter Pounder Deluxe+",
"Double Quarter Pounder with Cheese++",
"Hamburger",
"Cheeseburger",
"BBQ Ranch Burger",
"Grilled Onion Cheddar",
"Double Cheeseburger",
"McDouble",
"Bacon McDouble",
"Daily Double ",
"Bacon Clubhouse Crispy Chicken Sandwich",
"Bacon Clubhouse Grilled Chicken Sandwich",
"Premium Crispy Chicken Classic Sandwich",
"Premium Grilled Chicken Classic Sandwich",
"Premium Crispy Chicken Club Sandwich",
"Premium Grilled Chicken Club Sandwich",
"Premium Crispy Chicken Ranch BLT Sandwich",
"Premium Grilled Chicken Ranch BLT Sandwich",
"McChicken ¨",
"Buffalo Ranch McChicken",
"Bacon Buffalo Ranch McChicken",
"Bacon Cheddar McChicken",
"Southern Style Crispy Chicken Sandwich",
"Filet-O-Fish",
"McRib ¨ ",
"Premium McWrap Southwest Chicken",
"Premium McWrap Southwest Chicken",
"Premium McWrap Chicken & Bacon",
"Premium McWrap Chicken & Bacon",
"Premium McWrap Chicken & Ranch",
"Premium McWrap Chicken & Ranch",
"Premium McWrap Chicken Sweet Chili",
"Premium McWrap Chicken Sweet Chili",
"Chipotle BBQ Snack Wrap",
"Chipotle BBQ Snack Wrap",
"Honey Mustard Snack Wrap",
"Honey Mustard Snack Wrap",
"Ranch Snack Wrap¨",
"Ranch Snack Wrap¨",
"Mac Snack Wrap ",
"Chicken McNuggets¨ (4 piece)",
"Bacon Clubhouse Crispy Chicken Sandwich",
"Bacon Clubhouse Grilled Chicken Sandwich",
"Premium Crispy Chicken Classic Sandwich",
"Premium Grilled Chicken Classic Sandwich",
"Premium Crispy Chicken Club Sandwich",
"Premium Grilled Chicken Club Sandwich",
"Premium Crispy Chicken Ranch BLT Sandwich",
"Premium Grilled Chicken Ranch BLT Sandwich",
"McChicken ¨",
"Buffalo Ranch McChicken",
"Bacon Buffalo Ranch McChicken",
"Bacon Cheddar McChicken",
"Southern Style Crispy Chicken Sandwich",
"Filet-O-Fish",
"Premium McWrap Southwest Chicken",
"Premium McWrap Southwest Chicken",
"Premium McWrap Chicken & Bacon",
"Premium McWrap Chicken & Bacon",
"Premium McWrap Chicken & Ranch",
"Premium McWrap Chicken & Ranch",
"Premium McWrap Chicken Sweet Chili",
"Premium McWrap Chicken Sweet Chili",
"Chipotle BBQ Snack Wrap",
"Chipotle BBQ Snack Wrap",
"Honey Mustard Snack Wrap",
"Honey Mustard Snack Wrap",
"Ranch Snack Wrap¨",
"Ranch Snack Wrap¨",
"Premium Bacon Ranch Salad with Crispy Chicken",
"Premium Bacon Ranch Salad with Grilled Chicken",
"Premium Southwest Salad with Crispy Chicken",
"Premium Southwest Salad with Grilled Chicken",
"Chicken McNuggets¨ (10 piece)",
"Chicken McNuggets¨ (20 piece)**",
"Chicken McNuggets¨ (6 piece)",
"Spicy Chicken McBitesª Shareable Size ",
"Chicken McNuggets¨ (40 piece) ",
"Mighty Wings (10 piece)",
"Mighty Wings (5 piece)",
"Spicy Chicken McBitesª Snack Size ",
"Fruit 'n Yogurt Parfait",
"Egg McMuffin¨",
"Egg White Delight",
"Sausage McMuffin¨",
"Sausage McMuffin¨ with Egg",
"Steak & Egg McMuffin",
"Bacon",
"Sausage Biscuit (Regular Size Biscuit)",
"Sausage Biscuit with Egg (Regular Size Biscuit)",
"Steak & Egg Biscuit (Regular Biscuit)",
"Bacon",
"Sausage McGriddles¨",
"Sausage",
"Bacon",
"Steak",
"Big Breakfast¨ (Regular Size Biscuit)",
"Big Breakfast with Hotcakes (Regular Size Biscuit)",
"Cinnamon Melts",
"Hotcakes",
"Hotcakes and Sausage",
"Southern Style Chicken Biscuit (Regular Size Biscuit)",
"Sausage Burrito",
"Hash Brown",
"Bacon",
"Big Breakfast with Hotcakes (Large Size Biscuit)",
"Big Breakfast¨ (Large Size Biscuit)",
"Sausage Biscuit (Large Size Biscuit)",
"Sausage Biscuit with Egg (Large Size Biscuit)",
"Southern Style Chicken Biscuit (Large Size Biscuit)",
"Bacon",
"Bacon",
"Bacon",
"Bacon",
"Big Breakfast with Egg Whites (Large Size Biscuit)",
"Big Breakfast with Egg Whites (Regular Size Biscuit)",
"Big Breakfast with Hotcakes and Egg Whites",
"Big Breakfast with Hotcakes and Egg Whites",
"Fruit & Maple Oatmeal  ",
"Fruit & Maple Oatmeal without Brown Sugar ",
"Sausage Biscuit with Egg Whites (Large Size Biscuit)",
"Sausage Biscuit with Egg Whites (Regular Size Biscuit)",
"Sausage McMuffin with Egg Whites",
"Sausage",
"Salads Premium Bacon Ranch Salad",
"Premium Bacon Ranch Salad with Crispy Chicken",
"Premium Bacon Ranch Salad with Grilled Chicken",
"Premium Southwest Salad",
"Premium Southwest Salad with Crispy Chicken",
"Premium Southwest Salad with Grilled Chicken",
"Side Salad",
"Small French Fries",
"Apple Slices ",
"Strawberry Gogurt",
"Fruit 'n Yogurt Parfait",
"Side Salad",
"Chipotle BBQ Snack Wrap",
"Chipotle BBQ Snack Wrap",
"Honey Mustard Snack Wrap",
"Honey Mustard Snack Wrap",
"Ranch Snack Wrap¨",
"Ranch Snack Wrap¨",
"Mac Snack Wrap ",
"Large French Fries",
"Medium French Fries",
"Kids Fries"];

	var data = [
[0.27309852309816174, 0.39341699072248904, 0.13420320079478698, 0.13785814579259628],
[0.3171455680547971, 0.28664348076007545, 0.3735254390454512, 0.9970523971120141],
[0.44610032094911406, 0.6674261186983222, 0.4431464538092805, 0.8868033129823135],
[0.3300175576089015, 0.33729463920936636, 0.15619806546723172, 1.210482685665938],
[0.40617682913735614, 0.26097924553416996, 0.47123220408332545, 1.363953863046731],
[-0.21124461399797506, -0.07600949984075982, -0.012757120406610383, 0.21370780638570347],
[0.40617682913735614, 0.7295348543728444, -0.062397051123526975, 1.5246146811696863],
[0.2255705566555927, -0.47036416508704193, 0.6999304563148335, 0.26555847383876935],
[0.40617682913735614, -0.1728685404275658, 0.7380468316867517, 0.5606497724319531],
[0.9303755224380847, 0.4535653358879163, 0.6924931147788499, 0.7005982202742492],
[0.43701204639034086, -0.054354023286798864, 0.6924931147788499, 0.47668070372657584],
[0.44977144663295476, 0.49735148754090885, 0.15841505447930848, 1.0750809634660476],
[0.3346158532483555, 0.23314750077436053, 0.2799311503299257, 1.1019598065389467],
[0.6241499166153466, 0.6170336353924222, 0.15841505447930848, 1.5499405244205955],
[-0.11439419154537413, 0.19462605474002204, -0.031007094934888475, 0.22312704528288688],
[0.40617682913735614, 0.38245662560345584, 0.577958055124696, 0.4229404997551342],
[-0.2459068704546955, -0.4286103932050102, 0.4431464538092805, 0.9834413990713097],
[0.05218853507309963, -0.21914563759681777, 0.29335578568104126, 0.0557157726169502],
[-0.8580670782349885, -1.3628510390654696, 0.09006845036414508, 0.7901652268933183],
[0.4636424612906447, 0.3477488027265171, 0.20441757647989925, 0.8736253921519964],
[-0.27925661461873486, -0.5826717502998561, 0.027612702766785416, 1.5423122583811648],
[0.34296463376873887, 0.08744013114947564, 0.33782489028161233, 0.7901652268933183],
[-0.4197958570125758, -0.9595791923048466, 0.15105465095921394, 1.5246146811696863],
[0.18307496313047203, -0.07759216390263532, -0.08332368858261915, -0.36191234844216086],
[0.08391857823852379, -0.21370127322396432, -0.08332368858261915, -0.36191234844216086],
[0.40617682913735614, 0.22379229245173557, 0.013835699620309052, 0.3967101621024069],
[0.6590256106118251, 0.5212879171112114, -0.062397051123526975, 0.48414462094483135],
[0.4964799653782382, 0.09983578217695376, 0.20441757647989925, 0.5606497724319531],
[0.5578860980220375, 0.38245662560345584, -0.062397051123526975, -0.127896590952142],
[0.07712704502674589, 0.21700015490243235, 0.4785421938806794, -0.11532040166658812],
[-0.06481599909939893, -0.009537609241970828, 0.02130949871284221, -0.45191840901524527],
[-0.7277326547945403, -0.8240874851288927, -0.13941570651420668, 0.05192995068769059],
[-0.08621290320766264, 0.00980421155632288, -0.45559755496015514, 0.21033671035934318],
[-0.8018784601295508, -0.867024997966343, -0.6553184457978075, 0.6881583582438227],
[-0.42388230196569826, -0.22195031015253, -0.375028331951784, -0.4710106036822635],
[-1.1270551436333598, -1.073795006594915, -0.5619648645086655, 0.047902480550180114],
[-0.2560461699624438, -0.4373090956804333, 0.2679448687664293, -0.36834135276881014],
[-1.1109158597094573, -1.474411898312773, 0.07101026267818614, 0.10161886350922306],
[0.3512097027298631, 0.008215752843419735, 0.7264461957039943, -0.08798085974146964],
[-0.32884869840470465, -0.9638840385531492, 0.6077420135548459, 0.533961928889934],
[0.4943798924424035, 0.16613810162625559, -0.38505660078348425, 0.1069564322176269],
[-0.3030331676812758, -0.9008862885779906, -0.6090416540183514, 0.7005982202742492],
[0.6360393577505098, 0.5843930496147365, -0.4019793044369786, 0.24767415271190998],
[-0.13564198830793484, -0.2720337486473914, -0.6214372232449915, 0.6152963092084685],
[0.40617682913735614, 0.7421558808735497, -0.4019793044369786, 0.03902373956521425],
[0.7909467139898092, 1.3663479523758097, -1.129655561537232, 0.7103337644719744],
[0.40617682913735614, 0.38245662560345584, 0.577958055124696, 0.4229404997551342],
[-0.2459068704546955, -0.4286103932050102, 0.4431464538092805, 0.9834413990713097],
[0.05218853507309963, -0.21914563759681777, 0.29335578568104126, 0.0557157726169502],
[-0.8580670782349885, -1.3628510390654696, 0.09006845036414508, 0.7901652268933183],
[0.4636424612906447, 0.3477488027265171, 0.20441757647989925, 0.8736253921519964],
[-0.27925661461873486, -0.5826717502998561, 0.027612702766785416, 1.5423122583811648],
[0.34296463376873887, 0.08744013114947564, 0.33782489028161233, 0.7901652268933183],
[-0.4197958570125758, -0.9595791923048466, 0.15105465095921394, 1.5246146811696863],
[0.18307496313047203, -0.07759216390263532, -0.08332368858261915, -0.36191234844216086],
[0.08391857823852379, -0.21370127322396432, -0.08332368858261915, -0.36191234844216086],
[0.40617682913735614, 0.22379229245173557, 0.013835699620309052, 0.3967101621024069],
[0.6590256106118251, 0.5212879171112114, -0.062397051123526975, 0.48414462094483135],
[0.4964799653782382, 0.09983578217695376, 0.20441757647989925, 0.5606497724319531],
[0.5578860980220375, 0.38245662560345584, -0.062397051123526975, -0.127896590952142],
[-0.06481599909939893, -0.009537609241970828, 0.02130949871284221, -0.45191840901524527],
[-0.7277326547945403, -0.8240874851288927, -0.13941570651420668, 0.05192995068769059],
[-0.08621290320766264, 0.00980421155632288, -0.45559755496015514, 0.21033671035934318],
[-0.8018784601295508, -0.867024997966343, -0.6553184457978075, 0.6881583582438227],
[-0.42388230196569826, -0.22195031015253, -0.375028331951784, -0.4710106036822635],
[-1.1270551436333598, -1.073795006594915, -0.5619648645086655, 0.047902480550180114],
[-0.2560461699624438, -0.4373090956804333, 0.2679448687664293, -0.36834135276881014],
[-1.1109158597094573, -1.474411898312773, 0.07101026267818614, 0.10161886350922306],
[0.3512097027298631, 0.008215752843419735, 0.7264461957039943, -0.08798085974146964],
[-0.32884869840470465, -0.9638840385531492, 0.6077420135548459, 0.533961928889934],
[0.4943798924424035, 0.16613810162625559, -0.38505660078348425, 0.1069564322176269],
[-0.3030331676812758, -0.9008862885779906, -0.6090416540183514, 0.7005982202742492],
[0.6360393577505098, 0.5843930496147365, -0.4019793044369786, 0.24767415271190998],
[-0.13564198830793484, -0.2720337486473914, -0.6214372232449915, 0.6152963092084685],
[-1.6412270208550248, -0.903882862968402, -0.46852197101546783, -0.7697274193573753],
[-2.3096063792921253, -1.67687419842825, -0.6355543993086649, -0.33191032825113326],
[-1.5364418578006367, -1.0701927416362291, -0.0016587619129909525, -1.1653810842896948],
[-2.1437388484441526, -1.7847233655599806, -0.1347535603041172, -0.7814321222997577],
[0.7832320295817395, 1.398117126633877, -1.129655561537232, 0.6613144454413235],
[0.7832320295817395, 1.3372262093059142, -1.129655561537232, 0.6613144454413235],
[0.7780132724821637, 1.4196080386319818, -1.129655561537232, 0.6281543178617666],
[1.2152929298556567, 1.562522603419377, -1.0229297104958615, 1.341002317600594],
[0.7832320295817395, 1.3372262093059142, -1.0828459777471573, 0.6210485762375753],
[0.9870456514435691, 1.6844690081221358, -1.129655561537232, 2.0804142681896414],
[1.0268056563928711, 1.6571803021746652, -1.129655561537232, 2.12552787103217],
[1.1647231735607628, 1.678215346342507, -1.129655561537232, 1.402206438790292],
[-1.927811922934665, -1.9883546601443678, 3.5909109268310777, -2.175880646145861],
[-0.22594512454881618, -0.3753308405430424, -0.46261899252866634, 0.36938689371414923],
[-0.752713419287293, -1.098410483812602, -0.46261899252866634, 0.5606497724319531],
[1.4110886529461437, 1.8384052980822247, -0.582343504914819, 0.41352448111056583],
[0.6057942881961473, 1.154553457322025, -0.7551788912166337, 0.5002509686263307],
[-0.04117101500978086, 0.20090801363177596, -0.6370747105770603, 0.7901652268933183],
[1.002518294879028, 1.1499579163916138, -0.5255469707370215, 0.4090829628819952],
[1.9171024745335734, 2.315936319528538, -0.6090416540183514, -0.41898936246411705],
[1.138107512352924, 1.7634626306016543, -0.7551788912166337, 0.017060538181351757],
[0.45959558578689225, 0.8732545716379154, -0.678701261362427, 0.350529990178591],
[0.4269021390942798, 0.13438103913877839, 1.4947506116112228, -0.022545234805941335],
[0.8613046357914002, 0.7989505001267225, 2.072119969703883, -0.8623460452285101],
[0.5308205946529395, 0.775486056491609, 1.1251159393367929, -0.2959924167548317],
[1.1573942233730976, 0.8633360266230728, -0.04692953647985003, 1.1094910765786956],
[0.599531779676656, 0.6029533827040084, -0.2507367882553573, 0.682157954205617],
[0.5525629657804696, 1.2519789250467661, -0.7926265582486935, -0.17621563399664006],
[0.337839320630742, 0.3712000344001241, 0.09624948420823977, -0.6489587037833495],
[2.4289670809331074, 1.0419052602652943, 7.408412521772408, -1.5049893177203324],
[-0.04704268482631465, -1.0765816643931436, 1.6895178621970832, -1.4963283571746204],
[0.4805441178063175, 0.19462605474002204, 1.0676413716674549, -0.856945681594125],
[0.7601651232016126, 0.5212879171112114, -0.48930045528900895, 0.239328136186042],
[0.5034263604736908, 0.592483451217753, -0.582343504914819, -0.05727645111787527],
[0.40617682913735614, 0.8683661458806, -1.129655561537232, -2.423051135565793],
[1.147285326562524, 1.3351265225015019, -0.3936152095277802, 0.12536184155695057],
[0.4144398612116853, 0.46684427338268003, 0.05618722781132918, -0.7219365907344986],
[0.6590256106118251, 1.3542756661577442, -0.8094780084131203, -0.3115089545212342],
[1.8902892421396742, 2.422672996456558, -0.43361740257177217, -0.6867168279015522],
[1.2626001212282993, 1.8872086883971924, -0.6132401532725359, -0.21674128300170262],
[0.9348606449476092, 0.773708447125312, -0.3534675539636283, -0.04443642569346388],
[0.6732706123850346, 0.18887496561376893, 0.07288923892891454, 0.9970523971120141],
[0.6418833203423694, 0.6860030087305818, -0.4060904697313303, 0.22999191430964744],
[0.45300067755855394, 0.31561192969231416, -0.5367341668629514, 0.518146910494663],
[-0.17577671552610435, -0.6025844427134756, 1.5808422426880502, 0.0323999169256366],
[0.06821063607742243, 0.5625249343907427, -0.706978923749626, -0.51875459260912],
[-0.01523780665342517, 0.4200567670534733, -0.7961372770329491, -0.3956646211570678],
[0.06138303621762532, -0.0015831807751405939, 0.11778945063463094, -0.7955779130215679],
[-0.026550951238412945, -0.11230455419935036, 0.08802193356565281, -0.7255609958582471],
[-1.8589268382380946, -1.9661060557360737, 2.4278728065084514, -2.4039248476940123],
[-2.0169573266596377, -1.9661060557360737, 0.8714541454884648, -2.4039248476940123],
[0.7222378059804423, 1.2154443746499886, -0.6293781347808077, -0.3000331817981658],
[0.5561718689950919, 0.9213102824725408, -0.5869817426828057, -0.08121548157016958],
[0.16219993473216635, 0.5456442840423966, -0.7551788912166337, 0.5002509686263307],
[0.12523373861016834, 0.2513381836239092, 1.09379966849132, -0.20440174243926343],
[-2.4903819966144716, -1.6402625709209304, -0.5892715056315586, -1.836188834284834],
[-1.6412270208550248, -0.903882862968402, -0.46852197101546783, -0.7697274193573753],
[-2.3096063792921253, -1.67687419842825, -0.6355543993086649, -0.33191032825113326],
[-2.512509722450649, -1.8696954366334657, -0.3390937019715245, -2.2020362534918854],
[-1.5364418578006367, -1.0701927416362291, -0.0016587619129909525, -1.1653810842896948],
[-2.1437388484441526, -1.7847233655599806, -0.1347535603041172, -0.7814321222997577],
[-3.060298400754556, -2.2553379130438973, -0.44110168385097065, -2.585933070989987],
[1.086923548491695, 0.6814778688509286, -1.129655561537232, -2.175880646145861],
[-2.754432939293505, -2.2553379130438973, 1.5384907144970303, -2.8820820444885227],
[-2.287212364829813, -2.1044343353180763, 1.654497074324607, -2.083767420275079],
[-1.927811922934665, -1.9883546601443678, 3.5909109268310777, -2.175880646145861],
[-3.060298400754556, -2.2553379130438973, -0.44110168385097065, -2.585933070989987],
[0.3512097027298631, 0.008215752843419735, 0.7264461957039943, -0.08798085974146964],
[-0.32884869840470465, -0.9638840385531492, 0.6077420135548459, 0.533961928889934],
[0.4943798924424035, 0.16613810162625559, -0.38505660078348425, 0.1069564322176269],
[-0.3030331676812758, -0.9008862885779906, -0.6090416540183514, 0.7005982202742492],
[0.6360393577505098, 0.5843930496147365, -0.4019793044369786, 0.24767415271190998],
[-0.13564198830793484, -0.2720337486473914, -0.6214372232449915, 0.6152963092084685],
[0.40617682913735614, 0.7421558808735497, -0.4019793044369786, 0.03902373956521425],
[0.9847291257314796, 0.5683493718596029, -1.129655561537232, -1.9484598568490716],
[1.022090527600807, 0.592483451217753, -1.129655561537232, -1.9404801800316402],
[0.892424485819027, 0.41449461595139925, -1.129655561537232, -2.175880646145861]
];

var data_unscaled = [
[550, 29, 9, 25],
[520, 26, 10, 30],
[720, 40, 14, 39],
[610, 31, 10, 37],
[600, 29, 12, 37],
[540, 27, 9, 29],
[750, 43, 10, 48],
[250, 9, 6, 12],
[300, 12, 7, 15],
[350, 16, 7, 16],
[310, 13, 7, 15],
[440, 23, 7, 25],
[390, 19, 7, 23],
[460, 24, 7, 28],
[440, 24, 7, 23],
[750, 38, 16, 36],
[590, 25, 14, 40],
[510, 22, 10, 24],
[350, 9, 8, 28],
[670, 33, 11, 36],
[510, 20, 9, 40],
[590, 27, 11, 32],
[440, 14, 9, 36],
[360, 16, 5, 14],
[350, 15, 5, 14],
[420, 20, 6, 20],
[480, 24, 6, 22],
[430, 19, 7, 21],
[390, 19, 5, 15],
[500, 26, 11, 22],
[670, 33, 11, 27],
[510, 20, 9, 31],
[620, 31, 6, 32],
[460, 18, 4, 35],
[580, 29, 7, 26],
[420, 16, 5, 30],
[520, 22, 11, 23],
[360, 9, 9, 26],
[340, 15, 8, 14],
[260, 8, 7, 16],
[330, 15, 3, 14],
[250, 8, 2, 16],
[350, 18, 3, 15],
[270, 12, 2, 16],
[330, 19, 3, 14],
[190, 12, 0, 9],
[750, 38, 16, 36],
[590, 25, 14, 40],
[510, 22, 10, 24],
[350, 9, 8, 28],
[670, 33, 11, 36],
[510, 20, 9, 40],
[590, 27, 11, 32],
[440, 14, 9, 36],
[360, 16, 5, 14],
[350, 15, 5, 14],
[420, 20, 6, 20],
[480, 24, 6, 22],
[430, 19, 7, 21],
[390, 19, 5, 15],
[670, 33, 11, 27],
[510, 20, 9, 31],
[620, 31, 6, 32],
[460, 18, 4, 35],
[580, 29, 7, 26],
[420, 16, 5, 30],
[520, 22, 11, 23],
[360, 9, 9, 26],
[340, 15, 8, 14],
[260, 8, 7, 16],
[330, 15, 3, 14],
[250, 8, 2, 16],
[350, 18, 3, 15],
[270, 12, 2, 16],
[390, 22, 7, 26],
[230, 9, 5, 30],
[450, 21, 13, 23],
[290, 8, 11, 27],
[470, 30, 0, 22],
[940, 59, 0, 44],
[280, 18, 0, 13],
[910, 55, 1, 46],
[1880, 118, 1, 87],
[960, 63, 0, 60],
[480, 31, 0, 30],
[270, 17, 0, 14],
[150, 2, 23, 4],
[300, 13, 3, 17],
[250, 8, 3, 18],
[370, 23, 2, 14],
[450, 28, 2, 21],
[430, 23, 3, 26],
[460, 26, 3, 19],
[430, 27, 2, 11],
[510, 33, 2, 18],
[540, 32, 3, 25],
[460, 21, 15, 19],
[420, 22, 15, 11],
[550, 31, 15, 20],
[620, 31, 7, 30],
[670, 35, 7, 33],
[740, 48, 3, 28],
[1090, 56, 17, 36],
[460, 19, 32, 6],
[350, 9, 14, 8],
[520, 24, 14, 15],
[410, 20, 3, 17],
[300, 16, 2, 12],
[150, 9, 0, 1],
[520, 30, 4, 19],
[1150, 60, 17, 36],
[800, 52, 3, 28],
[480, 31, 3, 11],
[570, 37, 3, 18],
[470, 24, 4, 17],
[570, 25, 8, 30],
[470, 25, 4, 20],
[410, 20, 3, 20],
[400, 15, 16, 20],
[690, 41, 4, 26],
[640, 37, 3, 26],
[1050, 50, 18, 35],
[990, 46, 17, 35],
[290, 4, 32, 5],
[260, 4, 18, 5],
[520, 32, 3, 18],
[460, 27, 3, 18],
[400, 23, 2, 21],
[500, 26, 15, 21],
[140, 7, 4, 9],
[390, 22, 7, 26],
[230, 9, 5, 30],
[140, 4.5, 6, 6],
[450, 21, 13, 23],
[290, 8, 11, 27],
[20, 0, 2, 1],
[230, 11, 0, 2],
[15, 0, 3, 0],
[50, 0.5, 6, 2],
[150, 2, 23, 4],
[20, 0, 2, 1],
[340, 15, 8, 14],
[260, 8, 7, 16],
[330, 15, 3, 14],
[250, 8, 2, 16],
[350, 18, 3, 15],
[270, 12, 2, 16],
[330, 19, 3, 14],
[510, 24, 0, 6],
[340, 16, 0, 4],
[110, 5, 0, 1]
];
return {
	labels: labels,
	data: data,
	data_unscaled: data_unscaled
	};
});