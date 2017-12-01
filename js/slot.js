
var IMAGE_HEIGHT = 172;
var IMAGE_TOP_MARGIN = 3;
var IMAGE_BOTTOM_MARGIN = 3;
var SLOT_SEPARATOR_HEIGHT = 3;
var SLOT_HEIGHT = IMAGE_HEIGHT + IMAGE_TOP_MARGIN + IMAGE_BOTTOM_MARGIN + SLOT_SEPARATOR_HEIGHT; // how many pixels one slot image takes
var RUNTIME = 200; // how long all slots spin before starting countdown
var SPINTIME = 400; // how long each slot spins at minimum
var ITEM_COUNT = 14; // item count in slots
var SLOT_SPEED = 60; // how many pixels per second slots roll
var DRAW_OFFSET = 45; // how much draw offset in slot display from top
var luck = 1;
var jackpotlarg = 1;
var jackpotmid = 5;
var jackpotsmall = 10;
var reward1 = 1;
var reward2 = 1;
var reward3 = 2;
var reward4 = 200;
var time = 0;
/*var read1 = new XMLHttpRequest();
    read1.open('GET', 'reward1.txt', false);
    read1.send();
var reward1 = parseInt(read1.responseText);
var read2 = new XMLHttpRequest();
    read2.open('GET', 'reward2.txt', false);
    read2.send();
var reward2 = parseInt(read2.responseText);
var read3 = new XMLHttpRequest();
    read3.open('GET', 'reward3.txt', false);
    read3.send();
var reward3 = parseInt(read3.responseText);
var read4 = new XMLHttpRequest();
    read4.open('GET', 'reward4.txt', false);
    read4.send();
var reward4 = parseInt(read4.responseText);*/
var circle = true;
var BLURB_TBL = [
    'น่าเสียดาย!! ลองใหม่ครั้งหน้านะ',
    'สมุดโน๊ต',
    'ปากกาและพัด',
    'ซองใส่การ์ด',
    'กระเป๋าหรือกระบอกน้ำ',
    'ปากกา',
    'รางวัลของพ่อมดและแม่มด',
    'รางวัลที่สองออกแล้ว',
    'JACKPOT แตกแล้ว!!!!',
    'ของรางวัลหมดแล้วครับ'
];

function shuffleArray( array ) {

    for (i = array.length - 1; i > 0; i--) {
	var j = parseInt(Math.random() * i);
	var tmp = array[i];
	array[i] = array[j];
	array[j] = tmp;
    }
}

// Images must be preloaded before they are used to draw into canvas
function preloadImages1( images, callback ) {

    function _preload( asset ) {
	asset.img = new Image();
	asset.img.src = 'img/Wheel1/' + asset.id+'.png';

	asset.img.addEventListener("load", function() {
	    _check();
	}, false);

	asset.img.addEventListener("error", function(err) {
	    _check(err, asset.id);
	}, false);
    }

    var loadc = 0;
    function _check( err, id ) {
	if ( err ) {
	    alert('Failed to load ' + id );
	}
	loadc++;
	if ( images.length === loadc ) 
	    return callback();
    }

    images.forEach(function(asset) {
	_preload( asset );
    });
}
function preloadImages2( images, callback ) {

    function _preload( asset ) {
	asset.img = new Image();
	asset.img.src = 'img/Wheel2/' + asset.id+'.png';

	asset.img.addEventListener("load", function() {
	    _check();
	}, false);

	asset.img.addEventListener("error", function(err) {
	    _check(err, asset.id);
	}, false);
    }

    var loadc = 0;
    function _check( err, id ) {
	if ( err ) {
	    alert('Failed to load ' + id );
	}
	loadc++;
	if ( images.length === loadc ) 
	    return callback();
    }

    images.forEach(function(asset) {
	_preload( asset );
    });
}
function preloadImages3( images, callback ) {

    function _preload( asset ) {
	asset.img = new Image();
	asset.img.src = 'img/Wheel3/' + asset.id+'.png';

	asset.img.addEventListener("load", function() {
	    _check();
	}, false);

	asset.img.addEventListener("error", function(err) {
	    _check(err, asset.id);
	}, false);
    }

    var loadc = 0;
    function _check( err, id ) {
	if ( err ) {
	    alert('Failed to load ' + id );
	}
	loadc++;
	if ( images.length === loadc ) 
	    return callback();
    }

    images.forEach(function(asset) {
	_preload( asset );
    });
}

function copyArray( array ) {
    var copy = [];
    for( var i = 0 ; i < array.length; i++) {
	copy.push( array[i] );
    }
    return copy;
}

function SlotGame() {

    var game = new Game();

    var items1 = [ 
	{id: '1'},
	{id: '2'},
	{id: '3'},
	{id: '4'},
        {id: '5'},
        {id: '6'},
        {id: '7'},
        {id: '8'},
        {id: '9'},
        {id: '10'},
        {id: '11'},
        {id: '12'},
        {id: '13'},
        {id: '14'}
    ];
    var items2 = [ 
	{id: '1'},
	{id: '2'},
	{id: '3'},
	{id: '4'},
        {id: '5'},
        {id: '6'},
        {id: '7'},
        {id: '8'},
        {id: '9'},
        {id: '10'},
        {id: '11'},
        {id: '12'},
        {id: '13'},
        {id: '14'}
    ];
    var items3 = [ 
	{id: '1'},
	{id: '2'},
	{id: '3'},
	{id: '4'},
        {id: '5'},
        {id: '6'},
        {id: '7'},
        {id: '8'},
        {id: '9'},
        {id: '10'},
        {id: '11'},
        {id: '12'},
        {id: '13'},
        {id: '14'}
    ];

    $('canvas').attr('height', IMAGE_HEIGHT * ITEM_COUNT * 2);
    $('canvas').css('height', IMAGE_HEIGHT * ITEM_COUNT * 2);

    game.items1 = items1;
    game.items2 = items2;
    game.items3 = items3;

    // load assets and predraw the reel canvases
    preloadImages1( items1, function() {

	// images are preloaded

	// draws canvas strip
	function _fill_canvas( canvas, items1 ) {
	    ctx = canvas.getContext('2d');
	    ctx.fillStyle = '#ddd';

	    for (var i = 0 ; i < ITEM_COUNT ; i++) {
		var asset = items1[i];
		ctx.save();
		ctx.shadowColor = "rgba(0,0,0,0.5)";
		ctx.shadowOffsetX = 5;
		ctx.shadowOffsetY = 5;
		ctx.shadowBlur = 5;
		ctx.drawImage(asset.img, 3, i * SLOT_HEIGHT + IMAGE_TOP_MARGIN);
		ctx.drawImage(asset.img, 3, (i + ITEM_COUNT) * SLOT_HEIGHT + IMAGE_TOP_MARGIN);
		ctx.restore();
		ctx.fillRect(0, i * SLOT_HEIGHT, 70, SLOT_SEPARATOR_HEIGHT);
		ctx.fillRect(0, (i + ITEM_COUNT)  * SLOT_HEIGHT, 70, SLOT_SEPARATOR_HEIGHT);
	    }
	}
	// Draw the canvases with shuffled arrays
	game.items1 = copyArray(items1);
	shuffleArray(game.items1);
	_fill_canvas( game.c1[0], game.items1 );
	game.resetOffset =  (ITEM_COUNT + 3) * SLOT_HEIGHT;
	game.loop();
    });
    preloadImages2( items2, function() {

	// images are preloaded

	// draws canvas strip
	function _fill_canvas( canvas, items2 ) {
	    ctx = canvas.getContext('2d');
	    ctx.fillStyle = '#ddd';

	    for (var i = 0 ; i < ITEM_COUNT ; i++) {
		var asset = items2[i];
		ctx.save();
		ctx.shadowColor = "rgba(0,0,0,0.5)";
		ctx.shadowOffsetX = 5;
		ctx.shadowOffsetY = 5;
		ctx.shadowBlur = 5;
		ctx.drawImage(asset.img, 3, i * SLOT_HEIGHT + IMAGE_TOP_MARGIN);
		ctx.drawImage(asset.img, 3, (i + ITEM_COUNT) * SLOT_HEIGHT + IMAGE_TOP_MARGIN);
		ctx.restore();
		ctx.fillRect(0, i * SLOT_HEIGHT, 70, SLOT_SEPARATOR_HEIGHT);
		ctx.fillRect(0, (i + ITEM_COUNT)  * SLOT_HEIGHT, 70, SLOT_SEPARATOR_HEIGHT);
	    }
	}
	// Draw the canvases with shuffled arrays
	game.items2 = copyArray(items2);
	shuffleArray(game.items2);
	_fill_canvas( game.c2[0], game.items2 );
	game.resetOffset =  (ITEM_COUNT + 3) * SLOT_HEIGHT;
	game.loop();
    });
    preloadImages3( items3, function() {

	// images are preloaded

	// draws canvas strip
	function _fill_canvas( canvas, items3 ) {
	    ctx = canvas.getContext('2d');
	    ctx.fillStyle = '#ddd';

	    for (var i = 0 ; i < ITEM_COUNT ; i++) {
		var asset = items3[i];
		ctx.save();
		ctx.shadowColor = "rgba(0,0,0,0.5)";
		ctx.shadowOffsetX = 5;
		ctx.shadowOffsetY = 5;
		ctx.shadowBlur = 5;
		ctx.drawImage(asset.img, 3, i * SLOT_HEIGHT + IMAGE_TOP_MARGIN);
		ctx.drawImage(asset.img, 3, (i + ITEM_COUNT) * SLOT_HEIGHT + IMAGE_TOP_MARGIN);
		ctx.restore();
		ctx.fillRect(0, i * SLOT_HEIGHT, 70, SLOT_SEPARATOR_HEIGHT);
		ctx.fillRect(0, (i + ITEM_COUNT)  * SLOT_HEIGHT, 70, SLOT_SEPARATOR_HEIGHT);
	    }
	}
	// Draw the canvases with shuffled arrays
	game.items3 = copyArray(items3);
	shuffleArray(game.items3);
	_fill_canvas( game.c3[0], game.items3 );
	game.resetOffset =  (ITEM_COUNT + 3) * SLOT_HEIGHT;
	game.loop();
    });
    
   
    /*$('#play').click(function() {
	// start game on play button click
	$('h1').text('Rolling!');
	game.restart();
    });*/
    $('body').keyup(function(e){
        var sum = reward1+reward2+reward3+reward4;
        if(e.keyCode === 32){
            var d = new Date();
            time = d.getMinutes();
            // start game on space button
            if(sum>0){
                //$('h1').text('Spinning');
                game.restart();
            }else{
                $('#status').text(BLURB_TBL[5]);
            }
        }
    });

    // Show reels for debugging
    var toggleReels = 1;
    /*$('#debug').click(function() {
	toggleReels = 1 - toggleReels;
	if ( toggleReels ) {
	    $('#reels').css('overflow', 'hidden' );
	} else {
	    $('#reels').css('overflow', 'visible' );
	}
    });*/
    /*$('body').keyup(function(e){
        if(e.keyCode === 32){
            
            /*toggleReels = 1 - toggleReels;*/
            /*if ( toggleReels ) {
                $('#reels').css('overflow', 'hidden' );
            } else {
                $('#reels').css('overflow', 'visible' );
	}
        }
    });*/
}

function Game() {

    // reel canvases
    this.c1 = $('#canvas1');
    this.c2 = $('#canvas2');
    this.c3 = $('#canvas3');

    // set random canvas offsets
    this.offset1 = -parseInt(Math.random() * ITEM_COUNT ) * SLOT_HEIGHT;
    this.offset2 = -parseInt(Math.random() * ITEM_COUNT ) * SLOT_HEIGHT;
    this.offset3 = -parseInt(Math.random() * ITEM_COUNT ) * SLOT_HEIGHT;
    this.speed1 = this.speed2 = this.speed3 = 0;
    this.lastUpdate = new Date();

    // Needed for CSS translates
    this.vendor = 
	(/webkit/i).test(navigator.appVersion) ? '-webkit' :
    	(/firefox/i).test(navigator.userAgent) ? '-moz' :
	(/msie/i).test(navigator.userAgent) ? 'ms' :
    	'opera' in window ? '-o' : '';
    
    this.cssTransform = this.vendor + '-transform';
    this.has3d = ('WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix());  
    this.trnOpen       = 'translate' + (this.has3d ? '3d(' : '(');
    this.trnClose      = this.has3d ? ',0)' : ')';
    this.scaleOpen     = 'scale' + (this.has3d ? '3d(' : '(');
    this.scaleClose    = this.has3d ? ',0)' : ')';

    // draw the slots to initial locations
    this.draw( true );
}

// Restar the game and determine the stopping locations for reels
Game.prototype.restart = function() {
    this.lastUpdate = new Date();
    this.speed1 = this.speed2 = this.speed3 = SLOT_SPEED;

    // function locates id from items
    function _find( items, id ) {
	for ( var i=0; i < items.length; i++ ) {
	    if ( items[i].id === id ) return i;
	}
    }

    // uncomment to get always jackpot
    /*this.result1 = _find( this.items1, '1' );
    this.result2 = _find( this.items2, '1' );
    this.result3 = _find( this.items3, '1' );*/
    /*this.result1 = parseInt(Math.random() * this.items1.length);
    this.result2 = parseInt(Math.random() * this.items2.length);
    this.result3 = parseInt(Math.random() * this.items3.length);
    
    this.result2 = _find( this.items2, this.items1[this.result1].id);
    this.result3 = _find( this.items3, this.items1[this.result1].id);*/

    // get random results
    var random = Math.floor((Math.random() * 4) + 1);
    var random2 = Math.floor((Math.random() * 15) + 1);
    //ช่วงแรก
    if(time<20){
        if(luck<15&&reward3>1){
            if(random===1){
                do{
                    this.result1 = parseInt(Math.random() * this.items1.length);
                }while(this.items1[this.result1].id==='14'||this.items1[this.result1].id==='13')
                this.result2 = _find( this.items2, this.items1[this.result1].id);
                this.result3 = _find( this.items3, this.items1[this.result1].id);
                luck++;
            }else if(random2===1){
                do{
                    this.result1 = parseInt(Math.random() * this.items1.length);
                    this.result2 = parseInt(Math.random() * this.items2.length);
                    this.result3 = parseInt(Math.random() * this.items3.length);
                    if(this.items1[this.result1].id==='14'&&this.items2[this.result2].id==='14'&&this.items3[this.result3].id==='14'){
                        circle=true;
                    }else if(this.items1[this.result1].id==='13'&&this.items2[this.result2].id==='13'&&this.items3[this.result3].id==='13'){
                        circle=true;
                    }else if(this.items1[this.result1].id==='13'||this.items2[this.result2].id==='13'||this.items3[this.result3].id==='13'){
                        circle=false;
                    }else if(this.items1[this.result1].id==='14'||this.items2[this.result2].id==='14'||this.items3[this.result3].id==='14'){
                        circle=false;
                    }else{
                        circle=true;
                    }
                }while(circle);
                luck=1;
            }else{
                 do{
                    this.result1 = parseInt(Math.random() * this.items1.length);
                    this.result2 = parseInt(Math.random() * this.items2.length);
                    this.result3 = parseInt(Math.random() * this.items3.length);
                    if(this.items1[this.result1].id==='14'||this.items1[this.result1].id==='13'){
                        circle=true;
                    }else if(this.items2[this.result2].id==='14'||this.items2[this.result2].id==='13'){
                        circle=true;
                    }else if(this.items3[this.result3].id==='14'||this.items3[this.result3].id==='13'){
                        circle=true;
                    }else{
                        circle=false;
                    }
                }while(circle);
                luck++;
            }
        }else if(luck===15&&reward3>1){
            do{
                this.result1 = parseInt(Math.random() * this.items1.length);
                this.result2 = parseInt(Math.random() * this.items2.length);
                this.result3 = parseInt(Math.random() * this.items3.length);
                if(this.items1[this.result1].id==='14'&&this.items2[this.result2].id==='14'&&this.items3[this.result3].id==='14'){
                        circle=true;
                    }else if(this.items1[this.result1].id==='13'&&this.items2[this.result2].id==='13'&&this.items3[this.result3].id==='13'){
                        circle=true;
                    }else if(this.items1[this.result1].id==='13'||this.items2[this.result2].id==='13'||this.items3[this.result3].id==='13'){
                        circle=false;
                    }else if(this.items1[this.result1].id==='14'||this.items2[this.result2].id==='14'||this.items3[this.result3].id==='14'){
                        circle=false;
                    }else{
                        circle=true;
                    }
            }while(circle);
            luck=1;
        }else{
            if(random===1){
                do{
                    this.result1 = parseInt(Math.random() * this.items1.length);
                }while(this.items1[this.result1].id==='14'||this.items1[this.result1].id==='13')
                this.result2 = _find( this.items2, this.items1[this.result1].id);
                this.result3 = _find( this.items3, this.items1[this.result1].id);
            }else{
                do{
                    this.result1 = parseInt(Math.random() * this.items1.length);
                    this.result2 = parseInt(Math.random() * this.items2.length);
                    this.result3 = parseInt(Math.random() * this.items3.length);
                    if(this.items1[this.result1].id==='14'||this.items1[this.result1].id==='13'){
                        circle=true;
                    }else if(this.items2[this.result2].id==='14'||this.items2[this.result2].id==='13'){
                        circle=true;
                    }else if(this.items3[this.result3].id==='14'||this.items3[this.result3].id==='13'){
                        circle=true;
                    }else{
                        circle=false;
                    }
                }while(circle);
            }
            
        }    
    }else
    //ช่วงที่สอง
    if(time>=20&&time<40){
        if(luck<15&&reward3>0&&reward2>0){
            if(random===1){
                do{
                    this.result1 = parseInt(Math.random() * this.items1.length);
                }while(this.items1[this.result1].id==='14'||this.items1[this.result1].id==='13')
                this.result2 = _find( this.items2, this.items1[this.result1].id);
                this.result3 = _find( this.items3, this.items1[this.result1].id);
                luck++;
            }else if(random2===1){
                do{
                    this.result1 = parseInt(Math.random() * this.items1.length);
                    this.result2 = parseInt(Math.random() * this.items2.length);
                    this.result3 = parseInt(Math.random() * this.items3.length);
                    if(this.items1[this.result1].id==='14'&&this.items2[this.result2].id==='14'&&this.items3[this.result3].id==='14'){
                        circle=true;
                    }else if(this.items1[this.result1].id==='13'&&this.items2[this.result2].id==='13'&&this.items3[this.result3].id==='13'){
                        circle=false;
                    }else if(this.items1[this.result1].id==='13'||this.items2[this.result2].id==='13'||this.items3[this.result3].id==='13'){
                        circle=false;
                    }else if(this.items1[this.result1].id==='14'||this.items2[this.result2].id==='14'||this.items3[this.result3].id==='14'){
                        circle=false;
                    }else{
                        circle=true;
                    }
                }while(circle)
                luck=1;
            }else {
                do{
                    this.result1 = parseInt(Math.random() * this.items1.length);
                    this.result2 = parseInt(Math.random() * this.items2.length);
                    this.result3 = parseInt(Math.random() * this.items3.length);
                    if(this.items1[this.result1].id==='14'||this.items1[this.result1].id==='13'){
                        circle=true;
                    }else if(this.items2[this.result2].id==='14'||this.items2[this.result2].id==='13'){
                        circle=true;
                    }else if(this.items3[this.result3].id==='14'||this.items3[this.result3].id==='13'){
                        circle=true;
                    }else{
                        circle=false;
                    }
                }while(circle);
                luck++;
            }
        }else if(luck<15&&reward3>0){
            if(random===1){
                do{
                    this.result1 = parseInt(Math.random() * this.items1.length);
                }while(this.items1[this.result1].id==='14'||this.items1[this.result1].id==='13')
                this.result2 = _find( this.items2, this.items1[this.result1].id);
                this.result3 = _find( this.items3, this.items1[this.result1].id);
                luck++;
            }else if(random2===1){
                do{
                    this.result1 = parseInt(Math.random() * this.items1.length);
                    this.result2 = parseInt(Math.random() * this.items2.length);
                    this.result3 = parseInt(Math.random() * this.items3.length);
                    if(this.items1[this.result1].id==='14'&&this.items2[this.result2].id==='14'&&this.items3[this.result3].id==='14'){
                        circle=true;
                    }else if(this.items1[this.result1].id==='13'&&this.items2[this.result2].id==='13'&&this.items3[this.result3].id==='13'){
                        circle=true;
                    }else if(this.items1[this.result1].id==='13'||this.items2[this.result2].id==='13'||this.items3[this.result3].id==='13'){
                        circle=false;
                    }else if(this.items1[this.result1].id==='14'||this.items2[this.result2].id==='14'||this.items3[this.result3].id==='14'){
                        circle=false;
                    }else{
                        circle=true;
                    }
                }while(circle)
                luck=1;
            }else {
                do{
                    this.result1 = parseInt(Math.random() * this.items1.length);
                    this.result2 = parseInt(Math.random() * this.items2.length);
                    this.result3 = parseInt(Math.random() * this.items3.length);
                    if(this.items1[this.result1].id==='14'||this.items1[this.result1].id==='13'){
                        circle=true;
                    }else if(this.items2[this.result2].id==='14'||this.items2[this.result2].id==='13'){
                        circle=true;
                    }else if(this.items3[this.result3].id==='14'||this.items3[this.result3].id==='13'){
                        circle=true;
                    }else{
                        circle=false;
                    }
                }while(circle);
                luck++;
            }
        }else if(luck<15&&reward2>0){
            if(random===1){
                do{
                    this.result1 = parseInt(Math.random() * this.items1.length);
                }while(this.items1[this.result1].id==='14'||this.items1[this.result1].id==='13')
                this.result2 = _find( this.items2, this.items1[this.result1].id);
                this.result3 = _find( this.items3, this.items1[this.result1].id);
                luck++;
            }else if(random2===1){
                do{
                    this.result1 = parseInt(Math.random() * this.items1.length);
                    this.result2 = parseInt(Math.random() * this.items2.length);
                    this.result3 = parseInt(Math.random() * this.items3.length);
                    if(this.items1[this.result1].id==='14'&&this.items2[this.result2].id==='14'&&this.items3[this.result3].id==='14'){
                        circle=true;
                    }else if(this.items1[this.result1].id==='13'&&this.items2[this.result2].id==='13'&&this.items3[this.result3].id==='13'){
                        circle=false;
                    }else{
                        circle=true;
                    }
                }while(circle)
                luck=1;
            }else {
                do{
                    this.result1 = parseInt(Math.random() * this.items1.length);
                    this.result2 = parseInt(Math.random() * this.items2.length);
                    this.result3 = parseInt(Math.random() * this.items3.length);
                    if(this.items1[this.result1].id==='14'||this.items1[this.result1].id==='13'){
                        circle=true;
                    }else if(this.items2[this.result2].id==='14'||this.items2[this.result2].id==='13'){
                        circle=true;
                    }else if(this.items3[this.result3].id==='14'||this.items3[this.result3].id==='13'){
                        circle=true;
                    }else{
                        circle=false;
                    }
                }while(circle);
                luck++;
            }
        }else if(luck===15&&reward3>0&&reward2>0){
            do{
                this.result1 = parseInt(Math.random() * this.items1.length);
                this.result2 = parseInt(Math.random() * this.items2.length);
                this.result3 = parseInt(Math.random() * this.items3.length);
                if(this.items1[this.result1].id==='14'&&this.items2[this.result2].id==='14'&&this.items3[this.result3].id==='14'){
                    circle=true;
                }else if(this.items1[this.result1].id==='13'&&this.items2[this.result2].id==='13'&&this.items3[this.result3].id==='13'){
                    circle=false;
                }else if(this.items1[this.result1].id==='13'||this.items2[this.result2].id==='13'||this.items3[this.result3].id==='13'){
                    circle=false;
                }else if(this.items1[this.result1].id==='14'||this.items2[this.result2].id==='14'||this.items3[this.result3].id==='14'){
                    circle=false;
                }else{
                    circle=true;
                }
            }while(circle)
            luck=1;
        }else if(luck===15&&reward3>0){
            do{
                this.result1 = parseInt(Math.random() * this.items1.length);
                this.result2 = parseInt(Math.random() * this.items2.length);
                this.result3 = parseInt(Math.random() * this.items3.length);
                if(this.items1[this.result1].id==='14'&&this.items2[this.result2].id==='14'&&this.items3[this.result3].id==='14'){
                    circle=true;
                }else if(this.items1[this.result1].id==='13'&&this.items2[this.result2].id==='13'&&this.items3[this.result3].id==='13'){
                    circle=true;
                }else if(this.items1[this.result1].id==='13'||this.items2[this.result2].id==='13'||this.items3[this.result3].id==='13'){
                    circle=false;
                }else if(this.items1[this.result1].id==='14'||this.items2[this.result2].id==='14'||this.items3[this.result3].id==='14'){
                    circle=false;
                }else{
                    circle=true;
                }
            }while(circle)
            luck=1;
        }else if(luck===15&&reward2>0){
            do{
                this.result1 = parseInt(Math.random() * this.items1.length);
                this.result2 = parseInt(Math.random() * this.items2.length);
                this.result3 = parseInt(Math.random() * this.items3.length);
                if(this.items1[this.result1].id==='14'&&this.items2[this.result2].id==='14'&&this.items3[this.result3].id==='14'){
                    circle=true;
                }else if(this.items1[this.result1].id==='13'&&this.items2[this.result2].id==='13'&&this.items3[this.result3].id==='13'){
                    circle=false;
                }else{
                    circle=true;
                }
            }while(circle)
            luck=1;
        }else{
            if(random===1){
                do{
                    this.result1 = parseInt(Math.random() * this.items1.length);
                }while(this.items1[this.result1].id==='14'||this.items1[this.result1].id==='13')
                this.result2 = _find( this.items2, this.items1[this.result1].id);
                this.result3 = _find( this.items3, this.items1[this.result1].id);
            }else{
                do{
                    this.result1 = parseInt(Math.random() * this.items1.length);
                    this.result2 = parseInt(Math.random() * this.items2.length);
                    this.result3 = parseInt(Math.random() * this.items3.length);
                    if(this.items1[this.result1].id==='14'||this.items1[this.result1].id==='13'){
                        circle=true;
                    }else if(this.items2[this.result2].id==='14'||this.items2[this.result2].id==='13'){
                        circle=true;
                    }else if(this.items3[this.result3].id==='14'||this.items3[this.result3].id==='13'){
                        circle=true;
                    }else{
                        circle=false;
                    }
                }while(circle);
            }
        }
    }else
    //ช่วงที่สาม
    if(time>=40&&time<=59){
        if(luck<15&&reward1>0){
            if(random===1){
                do{
                    this.result1 = parseInt(Math.random() * this.items1.length);
                }while(this.items1[this.result1].id==='14'||this.items1[this.result1].id==='13')
                this.result2 = _find( this.items2, this.items1[this.result1].id);
                this.result3 = _find( this.items3, this.items1[this.result1].id);
                luck++;
            }else if(random2===1){
                do{
                    this.result1 = parseInt(Math.random() * this.items1.length);
                    this.result2 = parseInt(Math.random() * this.items2.length);
                    this.result3 = parseInt(Math.random() * this.items3.length);
                    if(this.items1[this.result1].id==='14'&&this.items2[this.result2].id==='14'&&this.items3[this.result3].id==='14'){
                        circle=false;
                    }else{
                        circle=true;
                    }
                }while(circle)
                luck=1;
            }else {
                do{
                    this.result1 = parseInt(Math.random() * this.items1.length);
                    this.result2 = parseInt(Math.random() * this.items2.length);
                    this.result3 = parseInt(Math.random() * this.items3.length);
                    if(this.items1[this.result1].id==='14'||this.items1[this.result1].id==='13'){
                        circle=true;
                    }else if(this.items2[this.result2].id==='14'||this.items2[this.result2].id==='13'){
                        circle=true;
                    }else if(this.items3[this.result3].id==='14'||this.items3[this.result3].id==='13'){
                        circle=true;
                    }else{
                        circle=false;
                    }
                }while(circle);
                luck++;
            }
        }else if(luck===15&&reward1>0){
            do{
                this.result1 = parseInt(Math.random() * this.items1.length);
                this.result2 = parseInt(Math.random() * this.items2.length);
                this.result3 = parseInt(Math.random() * this.items3.length);
                if(this.items1[this.result1].id==='14'&&this.items2[this.result2].id==='14'&&this.items3[this.result3].id==='14'){
                    circle=false;
                }else{
                    circle=true;
                }
            }while(circle)
            luck=1;
        }else{
            if(random===1){
                do{
                    this.result1 = parseInt(Math.random() * this.items1.length);
                }while(this.items1[this.result1].id==='14'||this.items1[this.result1].id==='13')
                this.result2 = _find( this.items2, this.items1[this.result1].id);
                this.result3 = _find( this.items3, this.items1[this.result1].id);
            }else{
                do{
                    this.result1 = parseInt(Math.random() * this.items1.length);
                    this.result2 = parseInt(Math.random() * this.items2.length);
                    this.result3 = parseInt(Math.random() * this.items3.length);
                    if(this.items1[this.result1].id==='14'||this.items1[this.result1].id==='13'){
                        circle=true;
                    }else if(this.items2[this.result2].id==='14'||this.items2[this.result2].id==='13'){
                        circle=true;
                    }else if(this.items3[this.result3].id==='14'||this.items3[this.result3].id==='13'){
                        circle=true;
                    }else{
                        circle=false;
                    }
                }while(circle);
            }
        }
    }
    
    

    // Clear stop locations
    this.stopped1 = false;
    this.stopped2 = false;
    this.stopped3 = false;

    // randomize reel locations
    this.offset1 = -parseInt(Math.random( ITEM_COUNT )) * SLOT_HEIGHT;
    this.offset2 = -parseInt(Math.random( ITEM_COUNT )) * SLOT_HEIGHT;
    this.offset3 = -parseInt(Math.random( ITEM_COUNT )) * SLOT_HEIGHT;

    $('#results').hide();

    this.state = 1;
};

window.requestAnimFrame = (function(){
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(/* function */ callback, /* DOMElement */ element){
            window.setTimeout(callback, 1000 / 60);
        };
})();

Game.prototype.loop = function() {
    var that = this;
    that.running = true;
    (function gameLoop() {
	that.update();
	that.draw();
	if (that.running) {
	    requestAnimFrame( gameLoop );
	}
    })();
};

Game.prototype.update = function() {

    var now = new Date();
    var that = this;


    // Check slot status and if spun long enough stop it on result
    function _check_slot( offset, result ) {
	if ( now - that.lastUpdate > SPINTIME ) {
	    var c = parseInt(Math.abs( offset / SLOT_HEIGHT)) % ITEM_COUNT;
	    if ( c === result ) {
		if ( result === 0 ) {
		    if ( Math.abs(offset + (ITEM_COUNT * SLOT_HEIGHT)) < (SLOT_SPEED * 1.5)) {
			return true; // done
		    }
		} else if ( Math.abs(offset + (result * SLOT_HEIGHT)) < (SLOT_SPEED * 1.5)) {
		    return true; // done
		}
	    }
	}
	return false;
    }

    switch (this.state) {
    case 1: // all slots spinning
	if (now - this.lastUpdate > RUNTIME) {
	    this.state = 2;
	    this.lastUpdate = now;
	}
	break;
    case 2: // slot 1
	this.stopped1 = _check_slot( this.offset1, this.result1 );
        /*wheelstop.play();*/
	if ( this.stopped1 ) {
	    this.speed1 = 0;
	    this.state++;
	    this.lastUpdate = now;
	}
	break;
    case 3: // slot 1 stopped, slot 2
	this.stopped2 = _check_slot( this.offset2, this.result2 );
        /*wheelstop.play();*/
	if ( this.stopped2 ) {
	    this.speed2 = 0;
	    this.state++;
	    this.lastUpdate = now;
	}
	break;
    case 4: // slot 2 stopped, slot 3
	this.stopped3 = _check_slot( this.offset3, this.result3 );
        /*wheelstop.play();*/
	if ( this.stopped3 ) {
	    this.speed3 = 0;
	    this.state++;
	}
	break;
    case 5: // slots stopped 
	if ( now - this.lastUpdate > 700 ) {
	    this.state = 6;
	}
	break;
    case 6: // check results
	var ec = 0;
	$('#results').show();
	if (that.items1[that.result1].id === '14' && that.items2[that.result2].id === '14' && that.items3[that.result3].id === '14') {
                ec = ec+8;
        }else if (that.items1[that.result1].id === '13' && that.items2[that.result2].id === '13' && that.items3[that.result3].id === '13') {
	    ec = ec+7;
        }else if (that.items1[that.result1].id === '14' || that.items2[that.result2].id === '14' || that.items3[that.result3].id === '14' || that.items1[that.result1].id === '13' || that.items2[that.result2].id === '13' || that.items3[that.result3].id === '13') {
            ec = ec+6;
        }else if (that.items1[that.result1].id === '3' && that.items2[that.result2].id === '3' && that.items3[that.result3].id === '3') {
            ec = ec+2;
        }else if (that.items1[that.result1].id === '1' && that.items2[that.result2].id === '1' && that.items3[that.result3].id === '1') {
            ec = ec+3;
        }else if (that.items1[that.result1].id === '6' && that.items2[that.result2].id === '6' && that.items3[that.result3].id === '6') {
            ec = ec+4;
        }else if (that.items1[that.result1].id === '10' && that.items2[that.result2].id === '10' && that.items3[that.result3].id === '10') {
            ec = ec+5;
        }else if (that.items1[that.result1].id === '9' && that.items2[that.result2].id === '9' && that.items3[that.result3].id === '9') {
            ec = ec+5;
        }else if (that.items1[that.result1].id === that.items2[that.result2].id && that.items2[that.result2].id === that.items3[that.result3].id) {
	    ec = ec+1;
        }
	/*$('#multiplier').text(ec);*/
        $('#status').text(BLURB_TBL[ec]);
        //$('#status').text(time);
        if(ec===1){
            $('#status').text(BLURB_TBL[ec]);
            //$('#status').text(time);
        }else if(ec===6){
            reward3--;
        }else if(ec===7){
            reward2--;
            }else if(ec===8){
            reward1--;
            }    
            
	this.state = 7;
	break;
    case 7: // game ends
	break;
    default:
    }
    this.lastupdate = now;
};

Game.prototype.draw = function( force ) {

    if (this.state >= 6 ) return;

    // draw the spinning slots based on current state
    for (var i=1; i <= 3; i++ ) {
	var resultp = 'result'+i;
	var stopped = 'stopped'+i;
	var speedp = 'speed'+i;
	var offsetp = 'offset'+i;
	var cp = 'c'+i;
	if (this[stopped] || this[speedp] || force) {
	    if (this[stopped]) {
		this[speedp] = 0;
		var c = this[resultp]; // get stop location
		this[offsetp] = -(c * SLOT_HEIGHT);

		if (this[offsetp] + DRAW_OFFSET > 0) {
		    // reset back to beginning
		    this[offsetp] = -this.resetOffset + SLOT_HEIGHT * 3;
		}

	    } else {
		this[offsetp] += this[speedp];
		if (this[offsetp] + DRAW_OFFSET > 0) {
		    // reset back to beginning
		    this[offsetp] = -this.resetOffset + SLOT_HEIGHT * 3 - DRAW_OFFSET;
		}
	    }
	    // translate canvas location
	    this[cp].css(this.cssTransform, this.trnOpen + '0px, '+(this[offsetp] + DRAW_OFFSET)+'px' + this.trnClose);
	}
    }
};


