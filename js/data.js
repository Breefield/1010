function loadShaders(ctx, images) {
    return ['#FFF',
            '#000',
            '#F9525D',
            '#80C98E',
            {url: 'tiles/1px-check.png'},
            {url: 'tiles/5px-diag.png'},
            {url: 'tiles/6px-triag.png'},
            {url: 'tiles/20px-checkgrad.png'}
            ];
}
        
function loadFrames() {
    return   [[[1, 1, 1, 1, 1, 1, 1, 1, 1],
               [0, 2]],
              [[0, 1]],
              [[2, 0, 1],
               [0, 5, 5]],
              [[2, 0]],
              [[0, 4],
               [3, 3]],
              [[1],
               [3],
               [2],
               [5],
               [2],
               [4]],
              [[1, 1, 1, 1, 1, 1, 1, 1, 1],
               [1, 1, 1, 1, 1, 1, 1, 1, 1],
               [1, 1, 1, 1, 1, 1, 1, 1, 1],
               [1, 1, 1, 1, 1, 1, 1, 1, 1]]
               
               ];
}