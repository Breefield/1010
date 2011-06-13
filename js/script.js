var shaders = {};
var frames = {};
/*
var play_beat = false;

soundManager.onready(function() {
    soundManager.createSound({
        id: 'beat',
        url: 'sounds/mouseover2.mp3',
        volume: 100,
        onload: function() {
            play_beat = true;
        }
    });
});
*/

$(document).ready(function() {
    
    // Canvas prep                    
    var canvas = document.getElementById('display');
    var ctx = canvas.getContext('2d');
    canvas.width = $(window).width();
    canvas.height = $(window).height();
    
    // Cursor location                
    var m_event = {clientX: 0, clientY: 0};
    window.onmousemove = function(e) { m_event = e; };

    var playing = false;
    var min_refresh_ms = 10;
    var max_refresh_ms = 50;
    
    var search_term = 'polka dots';
    var flickr_load_url = 'http://www.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=8a2cc3efe5655de9cc0360ce59b524d8&text=' + search_term + '&content_type=1&per_page=50&page=';
    var flickr_image_sizes = ['m', 's', 't', 'z'];
    var flickr_loaded_page = 1;
    
    function initialize() {
        //loadSouceMaterial(flickr_load_url);
        shaders = loadShaders();
        frames = loadFrames();
        startPlaying();
    }
    initialize();
    
    /* frame()
     *
     */
    function frame(frame_c) {
        canvas.width = canvas.width;
        //ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
        r_frame = typeof frames[frame_c] != 'undefined' ? frame_c: frame_c % frames.length;
        render_frame(frames[r_frame]);
        //if(play_beat) soundManager.play('beat');

        var refresh_ms = min_refresh_ms + Math.abs((Math.sin((frame_c / 180) * Math.PI) * max_refresh_ms));
        setTimeout(function() { frame(frame_c + 1); }, refresh_ms);
    };              
    
    function render_frame(frame) {
        for(var i = 0; i < frame.length; i++) {
            block_size = {height: canvas.height / frame.length};
            if(frame[i].length < 1) console.log('Frame too short: ' + i);
            for(var j = 0; j < frame[i].length; j++) {

                // Floor
                var shader = ~~(Math.random() * shaders.length);
                // Use specific value, lol.
                //var shader = shaders[frame[i][j]];
                
                // Is color
                if(typeof shaders[shader] == 'string') {
                    ctx.fillStyle = shaders[shader];
                } else {
                    
                    // No existing pattern
                    if(typeof shaders[shader].pattern == 'undefined') {
                        shaders[shader].pattern = new Image();
                        shaders[shader].pattern.src = shaders[shader].url;
                    }
                    
                    ctx.fillStyle = ctx.createPattern(shaders[shader].pattern, 'repeat');
                }

                block_size.width = canvas.width / frame[i].length;
                ctx.fillRect(block_size.width * j, block_size.height * i, block_size.width, block_size.height);
            }
        }
    }

    function loadSouceMaterial(url) {
        $.getJSON(url + flickr_loaded_page + '&callback=?');
    }
    
    jsonFlickrApi = function(json) {
        var photos = [];
        var loaded = 0;
        for(var i = 0; i < json.photos.photo.length; i++) {
            var photo = json.photos.photo[i];
            photos[i] = new Image();
            var size = flickr_image_sizes[Math.floor(Math.random() * flickr_image_sizes.length)];
            photos[i].src = 'http://farm' + photo.farm + '.static.flickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_' + size + '.jpg';
            photos[i].onload = function() {
                if(++loaded >= json.photos.photo.length) sourceMaterialLoaded(photos);
                $('#loading .bar .fill').width(((loaded / photos.length) * 100) + '%');
            }
        }
    }
    
    function sourceMaterialLoaded(photos) {
        for(var i = 0; i < photos.length; i++) {
            shaders.push({url: photos[i].src, pattern: photos[i]});
            shaders.shift();
        }
        
        if(flickr_loaded_page < 40) {
            console.log('Loading page ' + (flickr_loaded_page + 1));
            loadSouceMaterial(flickr_load_url, ++flickr_loaded_page);
        }
    
        startPLaying();
    }
    
    function startPlaying() {
        $('#loading').hide();
        if(!playing) {
            playing = true;
            frame(0);
        }
    }
    
    /* window.onresize()
     *
     */
    window.onresize = function(e) {
        canvas.width = $(window).width();
        canvas.height = $(window).height();
    };              
});