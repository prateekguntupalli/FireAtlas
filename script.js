// ═══ GLOBE ═══════════════════════════════════════
(function () {
  const canvas = document.getElementById("globe-canvas");
  const ctx = canvas.getContext("2d");
  let W, H, R, cx, cy;
  let rotation = 0;
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = rect.width;
    H = rect.height;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    R = Math.min(W, H) * 0.38;
    cx = W * 0.5;
    cy = H * 0.5;
  }

  // Continent outlines — detailed coastlines for recognizable shapes
  const continents = [
    // Africa
    [
      [-17.5, 14.8],
      [-17.3, 12.5],
      [-16.7, 11.5],
      [-15.9, 11.7],
      [-16, 10.4],
      [-15, 10.8],
      [-14.4, 10.1],
      [-13.8, 9.5],
      [-13.1, 8.5],
      [-12.3, 7.6],
      [-11.5, 7],
      [-10, 6.5],
      [-8.6, 5.2],
      [-7.4, 4.6],
      [-5.5, 5],
      [-4, 5.2],
      [-2.5, 5],
      [0, 5.6],
      [1, 6.1],
      [2.7, 6.4],
      [4, 6.3],
      [5.5, 5.5],
      [7.2, 4.5],
      [8.9, 4.2],
      [9.8, 3.6],
      [9.4, 2.2],
      [9.7, 1],
      [9.3, 0.3],
      [9, -0.5],
      [9, -2.2],
      [10, -3.5],
      [11.5, -5.2],
      [12.5, -6.5],
      [13.3, -8.8],
      [14, -10],
      [15, -12],
      [16, -14],
      [17.5, -15.5],
      [19, -17],
      [21, -18.5],
      [23.5, -19.5],
      [25, -21],
      [27, -23],
      [28.5, -25],
      [30, -27],
      [31.5, -29],
      [32, -30],
      [33, -32],
      [34.5, -33.5],
      [35.5, -34],
      [34, -34.2],
      [32, -33.5],
      [30.5, -32],
      [29, -30.5],
      [28, -29],
      [27.5, -27],
      [27.5, -25],
      [28.5, -23],
      [30, -21],
      [31, -19.5],
      [32, -17],
      [33.5, -16],
      [35.5, -14],
      [37, -12],
      [38.5, -10.5],
      [40, -9],
      [41, -7],
      [42.5, -4.5],
      [44, -2],
      [45, 0],
      [46, 2],
      [47, 4],
      [48.5, 5.5],
      [50, 7],
      [51, 9.5],
      [51, 11],
      [50, 12.5],
      [48, 12],
      [45, 12.5],
      [44, 11.5],
      [43.5, 12.5],
      [44, 14],
      [43, 15],
      [42, 15.5],
      [41, 16],
      [40, 15.5],
      [39, 15.5],
      [38, 15],
      [36.5, 14],
      [35, 12.5],
      [34.5, 10.5],
      [33.5, 8.5],
      [33, 10],
      [32, 11.5],
      [31, 12.5],
      [30, 13],
      [29, 14],
      [28, 15],
      [27, 16.5],
      [25, 18.5],
      [23, 20],
      [21, 22],
      [20, 24],
      [18, 26],
      [16, 28],
      [14, 30],
      [12, 32.5],
      [10.5, 34],
      [10, 36.5],
      [8.5, 36.5],
      [6, 37],
      [4, 36.5],
      [2, 36.5],
      [0, 35.5],
      [-2, 35.5],
      [-4, 35.5],
      [-5, 35.5],
      [-6, 34.5],
      [-7, 33.5],
      [-8, 33],
      [-9, 32],
      [-10, 31],
      [-10.5, 29.5],
      [-11, 28.5],
      [-12, 27],
      [-13, 25.5],
      [-14.5, 23],
      [-15.5, 21],
      [-16, 19.5],
      [-17, 18],
      [-17.5, 16.5],
      [-17.5, 14.8],
    ],
    // South America
    [
      [-77, 10],
      [-75, 11.5],
      [-73, 12],
      [-71.5, 12.5],
      [-70, 12],
      [-68, 11],
      [-66.5, 10.5],
      [-65, 10],
      [-63, 9],
      [-61, 8],
      [-60, 7],
      [-59, 5.5],
      [-57, 3.5],
      [-55, 3],
      [-52, 3],
      [-50, 2],
      [-48, 0],
      [-46, -1],
      [-44.5, -2.5],
      [-43, -3.5],
      [-42, -5],
      [-40, -7],
      [-39, -9],
      [-38, -10],
      [-37, -11.5],
      [-38, -13],
      [-39, -14.5],
      [-39, -17],
      [-40, -20],
      [-41, -22],
      [-42, -23],
      [-43, -23.5],
      [-44, -23],
      [-46, -24],
      [-48, -26],
      [-48.5, -28.5],
      [-49, -29],
      [-50, -30],
      [-51, -31],
      [-52, -33],
      [-53, -33.5],
      [-53.5, -34],
      [-54.5, -34.5],
      [-56, -35],
      [-57, -36],
      [-57.5, -38],
      [-59, -40],
      [-62, -42],
      [-63.5, -43],
      [-65, -44],
      [-66, -45],
      [-67, -47],
      [-68, -49],
      [-69, -50],
      [-69, -52],
      [-69.5, -53],
      [-70, -54.5],
      [-72, -53.5],
      [-72.5, -51.5],
      [-73, -49],
      [-74, -47],
      [-74.5, -45],
      [-74, -43],
      [-73.5, -41],
      [-73, -39],
      [-72, -37.5],
      [-71.5, -35],
      [-71, -33],
      [-70.5, -30],
      [-70.5, -27],
      [-70, -24],
      [-70, -21],
      [-70.5, -18.5],
      [-71, -17],
      [-72, -16],
      [-74, -15],
      [-75, -14.5],
      [-76, -13],
      [-77, -12],
      [-77, -10],
      [-78, -7.5],
      [-79, -5],
      [-80, -3],
      [-80, -1],
      [-80, 1],
      [-79.5, 3],
      [-79, 5],
      [-78.5, 7],
      [-77.5, 8.5],
      [-77, 10],
    ],
    // North America
    [
      [-105, 24],
      [-102, 23.5],
      [-100, 22],
      [-97.5, 21.5],
      [-96, 19.5],
      [-94, 18.5],
      [-92, 17],
      [-90, 16],
      [-88, 15.5],
      [-86, 14],
      [-84, 13],
      [-83.5, 15],
      [-84, 16],
      [-87.5, 18],
      [-88, 21],
      [-89.5, 21.5],
      [-90, 22],
      [-90.5, 24],
      [-90, 28],
      [-89, 29],
      [-88.5, 30],
      [-88, 30.5],
      [-86, 30.5],
      [-85, 30],
      [-84, 30.5],
      [-83, 29],
      [-82.5, 27.5],
      [-82, 25.5],
      [-81, 25],
      [-80, 26],
      [-80, 28],
      [-80.5, 30],
      [-80, 32],
      [-79, 33.5],
      [-78, 34.5],
      [-76.5, 36],
      [-76, 37],
      [-75.5, 38],
      [-74.5, 39],
      [-73.5, 40.5],
      [-72, 41],
      [-71, 42],
      [-70, 43],
      [-69, 44],
      [-68, 44.5],
      [-67, 45],
      [-66, 44.5],
      [-65, 43.5],
      [-64, 44.5],
      [-63, 45.5],
      [-61, 46],
      [-60, 47],
      [-59, 47.5],
      [-58, 48],
      [-56, 49],
      [-55, 50.5],
      [-54, 52],
      [-56, 53.5],
      [-58, 55],
      [-60, 56],
      [-62, 57],
      [-65, 58],
      [-68, 60],
      [-72, 61],
      [-77, 62],
      [-80, 63],
      [-84, 64],
      [-88, 65],
      [-92, 67],
      [-96, 68],
      [-100, 69],
      [-105, 70],
      [-110, 71],
      [-115, 70.5],
      [-120, 70],
      [-125, 69],
      [-130, 68.5],
      [-135, 68],
      [-140, 68],
      [-145, 67],
      [-148, 65],
      [-150, 63],
      [-155, 60],
      [-158, 58],
      [-160, 59],
      [-163, 61],
      [-165, 63],
      [-168, 65],
      [-170, 64],
      [-168, 62],
      [-165, 60],
      [-162, 58],
      [-160, 57],
      [-157, 57.5],
      [-155, 58],
      [-152, 57],
      [-149, 59],
      [-147, 61],
      [-145, 62],
      [-141, 63],
      [-137, 62],
      [-135, 60],
      [-133, 58],
      [-131, 56],
      [-129, 54],
      [-127, 52],
      [-125, 50.5],
      [-124, 49],
      [-123, 47.5],
      [-122.5, 45],
      [-122, 43],
      [-121, 40],
      [-120, 38],
      [-119, 36],
      [-118, 34],
      [-117, 33],
      [-117, 32],
      [-116, 31],
      [-114, 30],
      [-112, 29],
      [-110, 28],
      [-108, 27],
      [-106, 26],
      [-105, 24],
    ],
    // Eurasia (Europe + Russia + Middle East + Central Asia — one large mass)
    [
      [-10, 36],
      [-9, 37],
      [-8, 38],
      [-7, 39],
      [-6, 38],
      [-5, 36],
      [-3, 36],
      [-1, 37],
      [0, 38],
      [1, 40],
      [2, 41],
      [3, 43],
      [2, 44],
      [0, 46],
      [-2, 47],
      [-4, 48],
      [-5, 48.5],
      [-4, 49],
      [-2, 49],
      [0, 50],
      [2, 51],
      [4, 52],
      [5, 53],
      [6, 54],
      [8, 55],
      [9, 56],
      [10, 57],
      [11, 56],
      [12, 56],
      [13, 55],
      [14, 54],
      [15, 55],
      [16, 56],
      [18, 55.5],
      [19, 54.5],
      [20, 55],
      [21, 56],
      [22, 55],
      [24, 55],
      [26, 55.5],
      [28, 56],
      [29, 57],
      [30, 59],
      [31, 60],
      [28, 62],
      [26, 63],
      [25, 65],
      [26, 67],
      [28, 68],
      [30, 69.5],
      [32, 70],
      [35, 69.5],
      [37, 68],
      [40, 67.5],
      [42, 66.5],
      [45, 68],
      [48, 67],
      [50, 66],
      [53, 67],
      [55, 68.5],
      [58, 68.5],
      [60, 68],
      [62, 67],
      [64, 66.5],
      [68, 67],
      [70, 68.5],
      [72, 70],
      [75, 72],
      [80, 73],
      [85, 74],
      [90, 73.5],
      [95, 72],
      [100, 71],
      [105, 72.5],
      [110, 73],
      [115, 72],
      [120, 71],
      [125, 70],
      [130, 69.5],
      [135, 70],
      [138, 68],
      [140, 65],
      [142, 62],
      [145, 60],
      [148, 58],
      [150, 56],
      [152, 55],
      [154, 54],
      [155, 56],
      [158, 58],
      [160, 60],
      [162, 61.5],
      [163, 63],
      [165, 65],
      [168, 66],
      [170, 67],
      [172, 65],
      [175, 64],
      [178, 66],
      [180, 68],
      [-180, 68],
      [-178, 66],
      [-175, 65],
      [-170, 64],
      [-168, 65],
      [-165, 66],
      [-168, 66],
      [-170, 64],
      [-172, 62],
      [-175, 60],
      [-178, 62],
      [-180, 63],
      [180, 63],
      [178, 62],
      [175, 60],
      [170, 58],
      [168, 56],
      [165, 53],
      [163, 50],
      [160, 48],
      [155, 46],
      [152, 45],
      [150, 44],
      [148, 43.5],
      [146, 44],
      [145, 46],
      [143, 48],
      [142, 50],
      [140, 52],
      [138, 54],
      [135, 55],
      [132, 54],
      [130, 53.5],
      [128, 48],
      [127, 44],
      [126, 42],
      [127, 40],
      [128, 37],
      [129, 36],
      [129.5, 34],
      [128, 34],
      [126, 35],
      [124, 38],
      [122, 37],
      [121, 36.5],
      [120, 34],
      [118, 32],
      [117, 30],
      [115, 28],
      [112, 25],
      [110, 22],
      [108, 18],
      [106, 16],
      [105, 14],
      [104, 12],
      [103, 10],
      [102, 8],
      [101, 6],
      [100, 5],
      [99, 7],
      [98, 10],
      [97, 14],
      [96, 18],
      [95, 20],
      [93, 22],
      [91, 22.5],
      [90, 23],
      [89, 22],
      [88.5, 21],
      [88, 22],
      [87, 23],
      [86, 25],
      [84, 28],
      [82, 30],
      [80.5, 32],
      [78.5, 34],
      [76, 34.5],
      [74, 33],
      [72, 31],
      [70, 28],
      [68, 25],
      [66, 24],
      [64, 26],
      [62, 25],
      [59, 23],
      [56, 22],
      [55, 20],
      [54, 18],
      [52, 17],
      [51, 15],
      [50, 14],
      [48, 15],
      [46, 14],
      [44, 13],
      [43.5, 12.5],
      [43, 11.5],
      [44, 10],
      [46, 8],
      [48, 6],
      [50, 7],
      [51, 10],
      [52, 12],
      [53, 14],
      [55, 15],
      [56, 17],
      [57, 19],
      [56, 21],
      [55, 22],
      [52, 23.5],
      [50, 25],
      [48, 27],
      [46, 29],
      [45, 32],
      [44, 34],
      [42, 37],
      [40, 38.5],
      [38, 40],
      [37, 41],
      [36, 41.5],
      [35, 42],
      [34, 43],
      [33, 44],
      [32, 45],
      [31, 46],
      [30, 47],
      [28, 46.5],
      [27, 44],
      [26, 42],
      [25, 40],
      [24, 38],
      [23, 37.5],
      [22, 36],
      [20, 35],
      [18, 36],
      [16, 38],
      [15, 39],
      [14, 40],
      [13, 39],
      [12, 38],
      [11, 38],
      [10, 38],
      [9, 40],
      [8, 41],
      [7, 43],
      [6, 44],
      [5, 43.5],
      [4, 43],
      [3, 42],
      [2, 41],
      [1, 40],
      [0, 38],
      [-1, 37],
      [-3, 36],
      [-5, 36],
      [-7, 37],
      [-8, 38],
      [-9, 37],
      [-10, 36],
    ],
    // Australia
    [
      [114, -26],
      [114.5, -28],
      [115, -30],
      [115.5, -32],
      [116, -33.5],
      [117, -34.5],
      [118.5, -35],
      [120, -34],
      [122, -34],
      [124, -33],
      [126, -31.5],
      [128, -28],
      [129, -25.5],
      [130, -20],
      [131, -16],
      [132, -14.5],
      [133.5, -12],
      [135, -12],
      [136.5, -13],
      [138, -15],
      [139, -16],
      [140.5, -17.5],
      [141, -16],
      [142, -14],
      [143, -14.5],
      [144, -15],
      [145, -16.5],
      [146, -18],
      [147, -19.5],
      [148, -20.5],
      [149, -21.5],
      [150, -23.5],
      [151, -25],
      [152, -27],
      [153, -28.5],
      [153, -30],
      [152.5, -32],
      [151, -33.5],
      [150, -35.5],
      [148.5, -37],
      [147, -38],
      [145.5, -38.5],
      [144, -38],
      [142, -38],
      [140, -37.5],
      [138.5, -36],
      [137, -35.5],
      [136, -35],
      [134.5, -34],
      [133, -33.5],
      [131, -32.5],
      [129.5, -32],
      [128, -33],
      [126, -33.5],
      [124, -34],
      [122.5, -34.5],
      [121, -34.5],
      [119, -33.5],
      [117.5, -33],
      [116, -32],
      [115, -30],
      [114.5, -28],
      [114, -26],
    ],
    // Greenland
    [
      [-50, 61],
      [-48, 62],
      [-44, 64],
      [-42, 65],
      [-39, 67],
      [-35, 70],
      [-30, 73],
      [-25, 76],
      [-20, 78],
      [-18, 79],
      [-20, 80],
      [-25, 81.5],
      [-30, 82],
      [-35, 82.5],
      [-40, 83],
      [-45, 82.5],
      [-50, 82],
      [-53, 80],
      [-55, 78],
      [-57, 76],
      [-58, 73],
      [-58, 70],
      [-56, 67],
      [-54, 64],
      [-52, 62],
      [-50, 61],
    ],
    // New Zealand
    [
      [166, -46],
      [167, -44.5],
      [168, -43],
      [170, -42],
      [172, -41.5],
      [173, -41],
      [174, -40],
      [175, -39],
      [176, -38],
      [178, -37.5],
      [178, -39],
      [177, -40],
      [176.5, -41.5],
      [176, -42.5],
      [174, -43],
      [172, -44],
      [170, -45],
      [168, -46],
      [166, -46],
    ],
    // Indonesia (Sumatra + Java + Borneo rough)
    [
      [95, 5.5],
      [96, 4],
      [97, 2.5],
      [98, 1],
      [99, 0],
      [100, -1],
      [101, -2],
      [102, -3],
      [103, -4],
      [104, -5.5],
      [105, -6],
      [106, -6.5],
      [107, -6.5],
      [108, -7],
      [109, -7.5],
      [110, -7.5],
      [112, -7.5],
      [114, -8],
      [115, -8.5],
      [116, -8.5],
      [115, -7],
      [114, -5],
      [113, -3],
      [112, -1],
      [111, 0],
      [110, 1.5],
      [109, 2],
      [108, 2.5],
      [107, 3],
      [106, 3.5],
      [105, 3],
      [104, 2],
      [103, 1],
      [102, 0.5],
      [101, 1],
      [100, 2],
      [99, 3],
      [97, 4.5],
      [95, 5.5],
    ],
    // Arabia
    [
      [35, 30],
      [36, 28],
      [37, 26],
      [38, 24],
      [39, 22],
      [40, 20],
      [42, 18],
      [43, 16],
      [44, 14],
      [45, 13],
      [46, 12],
      [48, 14],
      [50, 16],
      [51, 18],
      [52, 20],
      [54, 22],
      [55, 23],
      [56, 24.5],
      [56, 26],
      [55, 27],
      [54, 26.5],
      [52, 25],
      [51, 24],
      [50, 26],
      [49, 27],
      [48, 28.5],
      [47, 29],
      [46, 29.5],
      [44, 30],
      [42, 31],
      [40, 31],
      [38, 32],
      [36, 31],
      [35, 30],
    ],
  ];

  // Fire hotspot locations [lon, lat, intensity 0-1, colorType]
  // colorType: 0=orange, 1=yellow, 2=red
  const fires = [
    // Brazil / Amazon (dense cluster)
    [-50, -12, 0.9, 0],
    [-48, -8, 0.8, 1],
    [-55, -15, 0.7, 0],
    [-52, -10, 0.85, 2],
    [-46, -14, 0.6, 1],
    [-53, -7, 0.75, 0],
    [-49, -5, 0.65, 1],
    [-51, -16, 0.7, 0],
    [-47, -11, 0.5, 1],
    [-54, -9, 0.8, 2],
    [-50, -6, 0.55, 0],
    [-56, -13, 0.6, 1],
    [-44, -10, 0.4, 1],
    [-58, -11, 0.72, 0],
    [-45, -7, 0.68, 0],
    [-52, -3, 0.5, 1],
    // Central Africa
    [25, -15, 0.6, 0],
    [28, -18, 0.5, 1],
    [30, -12, 0.7, 0],
    [22, -8, 0.4, 1],
    [35, -20, 0.55, 0],
    [18, -5, 0.65, 2],
    [24, -10, 0.5, 0],
    [32, -16, 0.45, 1],
    [27, -6, 0.6, 0],
    [20, -12, 0.55, 1],
    [26, -2, 0.4, 1],
    [30, -8, 0.5, 0],
    [22, -16, 0.35, 1],
    // West Africa
    [10, 8, 0.6, 0],
    [15, 10, 0.5, 1],
    [12, 6, 0.55, 0],
    [20, 12, 0.45, 1],
    [-2, 8, 0.5, 0],
    [5, 10, 0.4, 1],
    [8, 12, 0.35, 0],
    [18, 8, 0.55, 1],
    // Southeast Asia
    [100, 15, 0.5, 0],
    [105, 20, 0.45, 1],
    [108, 18, 0.6, 0],
    [98, 22, 0.4, 1],
    [102, 12, 0.55, 0],
    [106, 16, 0.5, 2],
    [103, 22, 0.45, 1],
    [110, 10, 0.4, 0],
    // Western US
    [-120, 38, 0.7, 2],
    [-118, 34, 0.85, 2],
    [-122, 40, 0.6, 0],
    [-115, 33, 0.5, 1],
    [-119, 36, 0.65, 2],
    [-121, 42, 0.55, 0],
    [-116, 38, 0.7, 2],
    [-117, 31, 0.4, 1],
    // Australia
    [130, -25, 0.65, 0],
    [135, -20, 0.55, 1],
    [128, -28, 0.5, 0],
    [140, -22, 0.45, 1],
    [132, -18, 0.6, 0],
    [137, -24, 0.5, 1],
    [142, -20, 0.4, 0],
    [126, -22, 0.55, 1],
    [145, -28, 0.45, 2],
    [133, -30, 0.35, 0],
    // Siberia
    [80, 55, 0.5, 0],
    [85, 58, 0.45, 1],
    [90, 56, 0.6, 0],
    [95, 60, 0.4, 1],
    [100, 58, 0.5, 0],
    [75, 52, 0.35, 1],
    [88, 54, 0.55, 0],
    [92, 62, 0.45, 1],
    [82, 60, 0.4, 0],
    [98, 56, 0.5, 1],
    // Indonesia
    [110, -5, 0.5, 0],
    [112, -2, 0.6, 1],
    [108, -3, 0.55, 0],
    [114, -1, 0.45, 1],
    [106, -6, 0.5, 0],
    [116, -3, 0.4, 1],
    // Southern South America
    [-65, -42, 0.3, 1],
    [-70, -38, 0.35, 0],
    [-62, -36, 0.4, 1],
    // Scandinavia
    [35, 62, 0.3, 1],
    [40, 60, 0.35, 0],
    [28, 64, 0.25, 1],
    // Mediterranean
    [-5, 38, 0.4, 0],
    [-3, 40, 0.35, 1],
    [8, 42, 0.3, 0],
    [15, 40, 0.4, 2],
    // Korea/Japan
    [127, 37, 0.3, 1],
    [129, 35, 0.35, 0],
    [132, 34, 0.25, 1],
    // India
    [78, 22, 0.5, 0],
    [80, 18, 0.45, 1],
    [76, 25, 0.4, 0],
    [82, 20, 0.5, 1],
    // Central America
    [-90, 16, 0.5, 0],
    [-88, 14, 0.45, 1],
    [-92, 18, 0.4, 0],
  ];

  function project(lon, lat, rot) {
    const phi = ((90 - lat) * Math.PI) / 180;
    const theta = ((lon + rot) * Math.PI) / 180;
    const x = Math.sin(phi) * Math.cos(theta);
    const y = Math.cos(phi);
    const z = Math.sin(phi) * Math.sin(theta);
    return { x: cx + R * x, y: cy - R * y, z: z, visible: z > -0.1 };
  }

  function drawGlobe(t) {
    ctx.clearRect(0, 0, W, H);

    // Atmospheric glow
    const glowGrad = ctx.createRadialGradient(cx, cy, R * 0.9, cx, cy, R * 1.4);
    glowGrad.addColorStop(0, "rgba(59, 130, 246, 0.08)");
    glowGrad.addColorStop(0.5, "rgba(59, 130, 246, 0.03)");
    glowGrad.addColorStop(1, "transparent");
    ctx.fillStyle = glowGrad;
    ctx.fillRect(0, 0, W, H);

    // Globe body
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    const bodyGrad = ctx.createRadialGradient(
      cx - R * 0.3,
      cy - R * 0.3,
      0,
      cx,
      cy,
      R,
    );
    bodyGrad.addColorStop(0, "#142638");
    bodyGrad.addColorStop(0.7, "#0d1c2e");
    bodyGrad.addColorStop(1, "#081220");
    ctx.fillStyle = bodyGrad;
    ctx.fill();

    // Grid lines
    ctx.strokeStyle = "rgba(59, 130, 246, 0.12)";
    ctx.lineWidth = 0.5;
    // Latitude lines
    for (let lat = -60; lat <= 60; lat += 30) {
      ctx.beginPath();
      let first = true;
      for (let lon = -180; lon <= 180; lon += 5) {
        const p = project(lon, lat, rotation);
        if (p.z > 0) {
          if (first) {
            ctx.moveTo(p.x, p.y);
            first = false;
          } else ctx.lineTo(p.x, p.y);
        } else {
          first = true;
        }
      }
      ctx.stroke();
    }
    // Longitude lines
    for (let lon = -180; lon < 180; lon += 30) {
      ctx.beginPath();
      let first = true;
      for (let lat = -90; lat <= 90; lat += 5) {
        const p = project(lon, lat, rotation);
        if (p.z > 0) {
          if (first) {
            ctx.moveTo(p.x, p.y);
            first = false;
          } else ctx.lineTo(p.x, p.y);
        } else {
          first = true;
        }
      }
      ctx.stroke();
    }

    // Continents
    ctx.strokeStyle = "rgba(160, 180, 200, 0.35)";
    ctx.fillStyle = "rgba(140, 170, 190, 0.08)";
    ctx.lineWidth = 1;
    continents.forEach((path) => {
      ctx.beginPath();
      let started = false;
      const projected = path.map(([lon, lat]) => project(lon, lat, rotation));
      projected.forEach((p, i) => {
        if (p.z > 0) {
          if (!started) {
            ctx.moveTo(p.x, p.y);
            started = true;
          } else ctx.lineTo(p.x, p.y);
        } else {
          started = false;
        }
      });
      ctx.fill();
      ctx.stroke();
    });

    // Fire hotspots — color by type: 0=orange, 1=yellow, 2=red
    const fireColors = [
      { glow: [232, 87, 43], core: [249, 115, 22], center: [255, 200, 150] }, // orange
      { glow: [251, 191, 36], core: [253, 224, 71], center: [255, 255, 200] }, // yellow
      { glow: [220, 38, 38], core: [239, 68, 68], center: [255, 180, 180] }, // red
    ];

    fires.forEach(([lon, lat, intensity, colorType]) => {
      const p = project(lon, lat, rotation);
      if (p.z > 0.05) {
        const alpha = p.z * intensity;
        const baseR = 2 + intensity * 4;
        const pulse = 1 + 0.3 * Math.sin(t * 0.002 + lon * 0.1);
        const fc = fireColors[colorType || 0];

        // Outer glow
        const glowR = baseR * 4 * pulse;
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR);
        glow.addColorStop(
          0,
          `rgba(${fc.glow[0]}, ${fc.glow[1]}, ${fc.glow[2]}, ${alpha * 0.4})`,
        );
        glow.addColorStop(
          0.4,
          `rgba(${fc.glow[0]}, ${fc.glow[1]}, ${fc.glow[2]}, ${alpha * 0.15})`,
        );
        glow.addColorStop(1, "transparent");
        ctx.fillStyle = glow;
        ctx.fillRect(p.x - glowR, p.y - glowR, glowR * 2, glowR * 2);

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, baseR * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${fc.core[0]}, ${fc.core[1]}, ${fc.core[2]}, ${alpha * 0.9})`;
        ctx.fill();

        // Bright center
        ctx.beginPath();
        ctx.arc(p.x, p.y, baseR * 0.4 * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${fc.center[0]}, ${fc.center[1]}, ${fc.center[2]}, ${alpha * 0.8})`;
        ctx.fill();
      }
    });

    // Specular highlight
    const specGrad = ctx.createRadialGradient(
      cx - R * 0.35,
      cy - R * 0.35,
      0,
      cx - R * 0.35,
      cy - R * 0.35,
      R * 0.6,
    );
    specGrad.addColorStop(0, "rgba(255, 255, 255, 0.04)");
    specGrad.addColorStop(1, "transparent");
    ctx.fillStyle = specGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.fill();

    // Edge atmosphere
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    const edgeGrad = ctx.createRadialGradient(
      cx,
      cy,
      R * 0.88,
      cx,
      cy,
      R * 1.02,
    );
    edgeGrad.addColorStop(0, "transparent");
    edgeGrad.addColorStop(0.7, "rgba(59, 130, 246, 0.12)");
    edgeGrad.addColorStop(1, "rgba(59, 130, 246, 0.04)");
    ctx.strokeStyle = edgeGrad;
    ctx.lineWidth = R * 0.14;
    ctx.stroke();
  }

  function animate(t) {
    if (!reducedMotion) {
      rotation += 0.25;
    }
    drawGlobe(t);
    requestAnimationFrame(animate);
  }

  window.addEventListener("resize", resize);
  resize();
  if (reducedMotion) {
    drawGlobe(0);
  } else {
    requestAnimationFrame(animate);
  }
})();

// ═══ CALENDAR HEATMAP ════════════════════════════
(function () {
  const container = document.getElementById("heatmap-container");
  const toggle = document.getElementById("harmonize-toggle");
  const labelRaw = document.getElementById("label-raw");
  const labelHarmonized = document.getElementById("label-harmonized");
  let harmonized = false;

  // Generate plausible fire data for Brazil — seasonal pattern
  // Dry season (Jun-Oct) has most fires, wet season (Nov-May) has few
  function generateData(isHarmonized) {
    const years = [];
    for (let y = 0; y < 25; y++) {
      // 2000-2024
      const days = [];
      for (let d = 0; d < 365; d++) {
        const month = Math.floor(d / 30.4);
        // Seasonal curve: peaks around Aug-Sep (month 7-8)
        const seasonalBase = Math.exp(-Math.pow((month - 7.5) / 2.2, 2));
        let value = seasonalBase * (0.5 + Math.random() * 0.8);

        if (!isHarmonized && y < 12) {
          // Pre-VIIRS era: MODIS-only data is lower (unscaled)
          value *= 0.22;
        }

        // Clamp
        value = Math.min(1, Math.max(0, value));
        days.push(value);
      }
      years.push(days);
    }
    return years;
  }

  const heatColors = [
    "#F3F4F6",
    "#FEF3C7",
    "#FDE68A",
    "#FBBF24",
    "#F97316",
    "#DC2626",
    "#991B1B",
  ];

  function getColor(value) {
    const idx = Math.min(6, Math.floor(value * 7));
    return heatColors[idx];
  }

  function renderHeatmap(data) {
    container.innerHTML = "";
    // Render as rows (years) × columns (days)
    // Show 7 rows per year-block (7 days per week, 52 weeks)
    data.forEach((year, yi) => {
      const row = document.createElement("div");
      row.className = "calendar-row";
      row.style.display = "flex";
      row.style.gap = "2px";

      // 52 weeks
      for (let w = 0; w < 52; w++) {
        const dayIdx = w * 7;
        if (dayIdx >= year.length) break;
        // Average the week
        let sum = 0,
          count = 0;
        for (let d = 0; d < 7 && dayIdx + d < year.length; d++) {
          sum += year[dayIdx + d];
          count++;
        }
        const avg = sum / count;
        const cell = document.createElement("div");
        cell.className = "calendar-cell";
        cell.style.background = getColor(avg);
        cell.title = `${2000 + yi}, Week ${w + 1}: ${(avg * 100).toFixed(0)}% intensity`;
        row.appendChild(cell);
      }
      container.appendChild(row);
    });
  }

  let rawData = generateData(false);
  let harmData = generateData(true);
  renderHeatmap(rawData);

  const annotation = document.getElementById("demo-annotation");
  const annotationText = document.getElementById("annotation-text");
  const statTotal = document.getElementById("stat-total");
  const statPeak = document.getElementById("stat-peak");
  const statRatio = document.getElementById("stat-ratio");
  const statCoverage = document.getElementById("stat-coverage");

  toggle.addEventListener("click", () => {
    harmonized = !harmonized;
    toggle.classList.toggle("on", harmonized);
    toggle.setAttribute("aria-checked", harmonized);
    labelRaw.classList.toggle("active", !harmonized);
    labelHarmonized.classList.toggle("active", harmonized);
    renderHeatmap(harmonized ? harmData : rawData);

    // Update annotation
    if (harmonized) {
      annotation.classList.add("harmonized-note");
      annotationText.innerHTML =
        "Harmonized — MODIS data has been scaled using the 1.8× VIIRS/MODIS overlap ratio. The pre-2012 record now reflects true fire activity, not sensor limitations.";
      statTotal.textContent = "11.2M";
      statPeak.textContent = "Sep 2007";
      statRatio.textContent = "—";
      statCoverage.textContent = "24 yrs";
    } else {
      annotation.classList.remove("harmonized-note");
      annotationText.innerHTML =
        "Notice the sharp jump in 2012 — that's when VIIRS came online. Raw data makes it look like fires suddenly doubled, but it's just a new sensor detecting more.";
      statTotal.textContent = "6.2M";
      statPeak.textContent = "Aug 2010";
      statRatio.textContent = "1.8×";
      statCoverage.textContent = "24 yrs";
    }
  });

  toggle.addEventListener("keydown", (e) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      toggle.click();
    }
  });
})();

// ═══ SENSOR TIMELINE ═════════════════════════════
(function () {
  const container = document.getElementById("timeline-container");
  const startYear = 2000;
  const endYear = 2027;
  const totalYears = endYear - startYear;

  const sensors = [
    {
      name: "Terra",
      type: "modis",
      start: 2000,
      end: 2027,
      label: "2000 — ~2027",
    },
    {
      name: "Aqua",
      type: "modis",
      start: 2002,
      end: 2027,
      label: "2002 — ~2027",
    },
    {
      name: "S-NPP",
      type: "viirs",
      start: 2012,
      end: 2026.8,
      label: "2012 — ceased Nov 2026",
      ceased: true,
    },
  ];

  const bar = document.createElement("div");
  bar.className = "timeline-bar";

  sensors.forEach((s) => {
    const row = document.createElement("div");
    row.className = "timeline-row";

    const name = document.createElement("span");
    name.className = "sensor-name";
    name.textContent = s.name;

    const track = document.createElement("div");
    track.className = "bar-track";

    const fill = document.createElement("div");
    fill.className =
      "bar-fill " +
      (s.type === "modis" ? "modis-bar" : "viirs-bar") +
      (s.ceased ? " ceased" : "");
    fill.style.left = ((s.start - startYear) / totalYears) * 100 + "%";
    fill.style.width = ((s.end - s.start) / totalYears) * 100 + "%";
    fill.textContent = s.label;

    track.appendChild(fill);
    row.appendChild(name);
    row.appendChild(track);
    bar.appendChild(row);
  });

  container.appendChild(bar);

  // Year markers
  const years = document.createElement("div");
  years.className = "timeline-years";
  years.style.position = "relative";
  years.style.height = "20px";
  for (let y = startYear; y <= endYear; y += 4) {
    const span = document.createElement("span");
    span.textContent = y;
    span.style.position = "absolute";
    span.style.left = ((y - startYear) / totalYears) * 100 + "%";
    span.style.transform = "translateX(-50%)";
    years.appendChild(span);
  }
  container.appendChild(years);
})();

// ═══ SCROLL PROGRESS BAR ═════════════════════════
(function () {
  const bar = document.getElementById("scroll-progress");
  if (!bar) return;
  window.addEventListener(
    "scroll",
    function () {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (scrollTop / docHeight) * 100 + "%";
    },
    { passive: true },
  );
})();

// ═══ HERO PARALLAX ═══════════════════════════════
(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const heroContent = document.querySelector(".hero-content");
  const heroGlobe = document.querySelector(".hero-globe");
  const hero = document.querySelector(".hero");
  if (!heroContent || !hero) return;

  let ticking = false;
  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          const scrollY = window.scrollY;
          const heroH = hero.offsetHeight;
          if (scrollY < heroH) {
            const progress = scrollY / heroH;
            // Text moves up faster and fades out
            heroContent.style.transform = "translateY(" + scrollY * 0.3 + "px)";
            heroContent.style.opacity = 1 - progress * 1.2;
            // Globe moves up slower for depth
            if (heroGlobe) {
              heroGlobe.style.transform = "translateY(" + scrollY * 0.1 + "px)";
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true },
  );
})();

// ═══ SCROLL REVEAL ═══════════════════════════════
(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const reveals = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right, .reveal-scale, .section-line",
  );
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
  );

  reveals.forEach((el) => observer.observe(el));
})();

// ═══ STAT COUNTERS ═══════════════════════════════
(function () {
  const stats = document.querySelectorAll(".hero-stat .value[data-count]");
  stats.forEach((el) => {
    const target = parseInt(el.dataset.count);
    const duration = 1200;
    const start = performance.now();
    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased);
      if (progress < 1) requestAnimationFrame(step);
    }
    // Delay start slightly
    setTimeout(() => requestAnimationFrame(step), 400);
  });
})();
