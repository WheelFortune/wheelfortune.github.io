var s_iScaleFactor = 1;
var s_iOffsetX;
var s_iOffsetY;
var s_bIsIphone;

/**
 * jQuery.browser.mobile (https://detectmobilebrowser.com/)
 * jQuery.browser.mobile will be true if the browser is a mobile device
 **/
(function(a){(jQuery.browser=jQuery.browser||{}).mobile=/android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(ad|hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|tablet|treo|up\.(browser|link)|vodafone|wap|webos|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);

$(window).resize(function() {
	sizeHandler();
});

function trace(szMsg){
    console.log(szMsg);
}

function getSize(Name) {
       var size;
       var name = Name.toLowerCase();
       var document = window.document;
       var documentElement = document.documentElement;
       if (window["inner" + Name] === undefined) {
               // IE6 & IE7 don't have window.innerWidth or innerHeight
               size = documentElement["client" + Name];
       }
       else if (window["inner" + Name] != documentElement["client" + Name]) {
               // WebKit doesn't include scrollbars while calculating viewport size so we have to get fancy

               // Insert markup to test if a media query will match document.doumentElement["client" + Name]
               var bodyElement = document.createElement("body");
               bodyElement.id = "vpw-test-b";
               bodyElement.style.cssText = "overflow:scroll";
               var divElement = document.createElement("div");
               divElement.id = "vpw-test-d";
               divElement.style.cssText = "position:absolute;top:-1000px";
               // Getting specific on the CSS selector so it won't get overridden easily
               divElement.innerHTML = "<style>@media(" + name + ":" + documentElement["client" + Name] + "px){body#vpw-test-b div#vpw-test-d{" + name + ":7px!important}}</style>";
               bodyElement.appendChild(divElement);
               documentElement.insertBefore(bodyElement, document.head);

               if (divElement["offset" + Name] == 7) {
                       // Media query matches document.documentElement["client" + Name]
                       size = documentElement["client" + Name];
               }
               else {
                       // Media query didn't match, use window["inner" + Name]
                       size = window["inner" + Name];
               }
               // Cleanup
               documentElement.removeChild(bodyElement);
       }
       else {
               // Default to use window["inner" + Name]
               size = window["inner" + Name];
       }
       return size;
};


window.addEventListener("orientationchange", onOrientationChange );


function onOrientationChange(){
    if (window.matchMedia("(orientation: portrait)").matches) {
       // you're in PORTRAIT mode	   
	   sizeHandler();
    }

    if (window.matchMedia("(orientation: landscape)").matches) {
       // you're in LANDSCAPE mode   
	   sizeHandler();
    }
	
}

function isIphone(){
    var szRet = navigator.userAgent.toLowerCase();
    if((szRet.indexOf("iphone") !== -1)){
        return true;
    }else{
        return false;
    }
}

function getIOSWindowHeight() {
    // Get zoom level of mobile Safari
    // Note, that such zoom detection might not work correctly in other browsers
    // We use width, instead of height, because there are no vertical toolbars :)
    var zoomLevel = document.documentElement.clientWidth / window.innerWidth;

    // window.innerHeight returns height of the visible area. 
    // We multiply it by zoom and get out real height.
    return window.innerHeight * zoomLevel;
};

// You can also get height of the toolbars that are currently displayed
function getHeightOfIOSToolbars() {
    var tH = (window.orientation === 0 ? screen.height : screen.width) -  getIOSWindowHeight();
    return tH > 1 ? tH : 0;
};

function isIOS(){
    var iDevices = [
            'iPad Simulator',
            'iPhone Simulator',
            'iPod Simulator',
            'iPad',
            'iPhone',
            'iPod'
            ];
    while (iDevices.length) {
        if (navigator.platform === iDevices.pop()){
            s_bIsIphone = true;
            return true;
        }       
    }
    s_bIsIphone = false;
    return false;
}

//THIS FUNCTION MANAGES THE CANVAS SCALING TO FIT PROPORTIONALLY THE GAME TO THE CURRENT DEVICE RESOLUTION

function sizeHandler() {
	window.scrollTo(0, 1);

	if (!$("#canvas")){
		return;
	}

	var h;
        var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );

        if(iOS){
            h = getIOSWindowHeight();
        }else{ 
            h = getSize("Height");
        }
        
        var w = getSize("Width");

        _checkOrientation(w,h);

	var multiplier = Math.min((h / CANVAS_HEIGHT), (w / CANVAS_WIDTH));

	var destW = CANVAS_WIDTH * multiplier;
	var destH = CANVAS_HEIGHT * multiplier;
        
        var iAdd = 0;
        if (destH < h){
            iAdd = h-destH;
            destH += iAdd;
            destW += iAdd*(CANVAS_WIDTH/CANVAS_HEIGHT);
        }else  if (destW < w){
            iAdd = w-destW;
            destW += iAdd;
            destH += iAdd*(CANVAS_HEIGHT/CANVAS_WIDTH);
        }

        var fOffsetY = ((h / 2) - (destH / 2));
        var fOffsetX = ((w / 2) - (destW / 2));
        var fGameInverseScaling = (CANVAS_WIDTH/destW);

        if( fOffsetX*fGameInverseScaling < -EDGEBOARD_X ||  
            fOffsetY*fGameInverseScaling < -EDGEBOARD_Y ){
            multiplier = Math.min( h / (CANVAS_HEIGHT-(EDGEBOARD_Y*2)), w / (CANVAS_WIDTH-(EDGEBOARD_X*2)));
            destW = CANVAS_WIDTH * multiplier;
            destH = CANVAS_HEIGHT * multiplier;
            fOffsetY = ( h - destH ) / 2;
            fOffsetX = ( w - destW ) / 2;
            
            fGameInverseScaling = (CANVAS_WIDTH/destW);
        }

        s_iOffsetX = (-1*fOffsetX * fGameInverseScaling);
        s_iOffsetY = (-1*fOffsetY * fGameInverseScaling);
        
        if(fOffsetY >= 0 ){
            s_iOffsetY = 0;
        }
        
        if(fOffsetX >= 0 ){
            s_iOffsetX = 0;
        }
        
        if(s_oInterface !== null){
            s_oInterface.refreshButtonPos( s_iOffsetX,s_iOffsetY);
        }
        if(s_oMenu !== null){
            s_oMenu.refreshButtonPos( s_iOffsetX,s_iOffsetY);
        }
        
        
		if(s_bMobile && !s_bIsIphone){
            $("#canvas").css("width",destW+"px");
            $("#canvas").css("height",destH+"px");
        }else{
            s_oStage.canvas.width = destW;
            s_oStage.canvas.height = destH;
            
            var iScale = Math.min(destW / CANVAS_WIDTH, destH / CANVAS_HEIGHT);
            s_oStage.scaleX = s_oStage.scaleY = iScale; 
        }
        
        if(fOffsetY < 0){
            $("#canvas").css("top",fOffsetY+"px");
        }else{
            $("#canvas").css("top","0px");
        }
        
        $("#canvas").css("left",fOffsetX+"px");

};

function _checkOrientation(iWidth,iHeight){
	return;
    if(s_bMobile && ENABLE_CHECK_ORIENTATION){
        if( iWidth>iHeight ){ 
            if( $(".orientation-msg-container").attr("data-orientation") === "landscape" ){
                $(".orientation-msg-container").css("display","none");
                s_oMain.startUpdate();
            }else{
                $(".orientation-msg-container").css("display","block");
                s_oMain.stopUpdate();
            }  
        }else{
            if( $(".orientation-msg-container").attr("data-orientation") === "portrait" ){
                $(".orientation-msg-container").css("display","none");
                s_oMain.startUpdate();
            }else{
                $(".orientation-msg-container").css("display","block");
                s_oMain.stopUpdate();
            }   
        }
    }
}

function inIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

function createBitmap(oSprite, iWidth, iHeight){
	var oBmp = new createjs.Bitmap(oSprite);
	var hitObject = new createjs.Shape();
	
	if (iWidth && iHeight){
		hitObject .graphics.beginFill("#fff").drawRect(0, 0, iWidth, iHeight);
	}else{
		hitObject .graphics.beginFill("#ff0").drawRect(0, 0, oSprite.width, oSprite.height);
	}

	oBmp.hitArea = hitObject;

	return oBmp;
}

function createSprite(oSpriteSheet, szState, iRegX,iRegY,iWidth, iHeight){
	if(szState !== null){
		var oRetSprite = new createjs.Sprite(oSpriteSheet, szState);
	}else{
		var oRetSprite = new createjs.Sprite(oSpriteSheet);
	}
	
	var hitObject = new createjs.Shape();
	hitObject .graphics.beginFill("#000000").drawRect(-iRegX, -iRegY, iWidth, iHeight);

	oRetSprite.hitArea = hitObject;
	
	return oRetSprite;
}


function randomFloatBetween(minValue,maxValue,precision){
    if(typeof(precision) === 'undefined'){
        precision = 2;
    }
    return parseFloat(Math.min(minValue + (Math.random() * (maxValue - minValue)),maxValue).toFixed(precision));
}

function rotateVector2D( iAngle, v) { 
	var iX = v.getX() * Math.cos( iAngle ) + v.getY() * Math.sin( iAngle );
	var iY = v.getX() * (-Math.sin( iAngle )) + v.getY() * Math.cos( iAngle ); 
	v.set( iX, iY );
}

function tweenVectorsOnX( vStart, vEnd, iLerp ){
    var iNewX = vStart + iLerp *( vEnd-vStart);
    return iNewX;
}

function shuffle(array) {
  var currentIndex = array.length
    , temporaryValue
    , randomIndex
    ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function bubbleSort(a)
{
    var swapped;
    do {
        swapped = false;
        for (var i=0; i < a.length-1; i++) {
            if (a[i] > a[i+1]) {
                var temp = a[i];
                a[i] = a[i+1];
                a[i+1] = temp;
                swapped = true;
            }
        }
    } while (swapped);
}

function compare(a,b) {
  if (a.index > b.index)
     return -1;
  if (a.index < b.index)
    return 1;
  return 0;
}

//----------------------
		// Linear	
		/**
		 * Interpolates a value between b and c parameters
		 * <p></br><b>Note:</b></br>
		 * &nbsp&nbsp&nbspt and d parameters can be in frames or seconds/milliseconds
		 *
		 * @param t Elapsed time
		 * @param b Initial position
		 * @param c Final position
		 * @param d Duration
		 * @return A value between b and c parameters
		 */

function easeLinear (t, b, c, d){
			return c*t/d + b;
}

//----------------------
		// Quad		
		/**
		 * Interpolates a value between b and c parameters
		 * <p></br><b>Note:</b></br>
		 * &nbsp&nbsp&nbspt and d parameters can be in frames or seconds/milliseconds
		 *
		 * @param t Elapsed time
		 * @param b Initial position
		 * @param c Final position
		 * @param d Duration
		 * @return A value between b and c parameters
		 */	

function easeInQuad (t, b, c, d){
			return c*(t/=d)*t + b;
		}
//----------------------
		// Sine	
		/**
		 * Interpolates a value between b and c parameters
		 * <p></br><b>Note:</b></br>
		 * &nbsp&nbsp&nbspt and d parameters can be in frames or seconds/milliseconds
		 *
		 * @param t Elapsed time
		 * @param b Initial position
		 * @param c Final position
		 * @param d Duration
		 * @return A value between b and c parameters
		 */	                
                
function easeInSine (t, b, c, d) {
			return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
		}
                
                
                
function easeInCubic (t, b, c, d) {
			return c*(t/=d)*t*t + b;
		};                


function getTrajectoryPoint(t,p){
    var result = new createjs.Point();
    var oneMinusTSq = (1-t) * (1-t);
    var TSq = t*t;
    result.x = oneMinusTSq*p.start.x+2*(1-t)*t*p.traj.x+TSq*p.end.x;
    result.y = oneMinusTSq*p.start.y+2*(1-t)*t*p.traj.y+TSq*p.end.y;
    return result;
}

function formatTime(iTime){	
    iTime/=1000;
    var iMins = Math.floor(iTime/60);
    var iSecs = iTime-(iMins*60);
    iSecs = parseFloat(iSecs).toFixed(1)
    
    var szRet = "";

    if ( iMins < 10 ){
            szRet += "0" + iMins + ":";
    }else{
            szRet += iMins + ":";
    }

    if ( iSecs < 10 ){
            szRet += "0" + iSecs;
    }else{
            szRet += iSecs;
    }	

    return szRet;
}

function degreesToRadians(iAngle){
    return iAngle * Math.PI / 180;
}

function checkRectCollision(bitmap1,bitmap2) {
    var b1, b2;
    b1 = getBounds(bitmap1,0.9);
    b2 = getBounds(bitmap2,0.98);
    return calculateIntersection(b1,b2);
}

function calculateIntersection(rect1, rect2){
    // first we have to calculate the
    // center of each rectangle and half of
    // width and height
    var dx, dy, r1={}, r2={};
    r1.cx = rect1.x + (r1.hw = (rect1.width /2));
    r1.cy = rect1.y + (r1.hh = (rect1.height/2));
    r2.cx = rect2.x + (r2.hw = (rect2.width /2));
    r2.cy = rect2.y + (r2.hh = (rect2.height/2));

    dx = Math.abs(r1.cx-r2.cx) - (r1.hw + r2.hw);
    dy = Math.abs(r1.cy-r2.cy) - (r1.hh + r2.hh);

    if (dx < 0 && dy < 0) {
      dx = Math.min(Math.min(rect1.width,rect2.width),-dx);
      dy = Math.min(Math.min(rect1.height,rect2.height),-dy);
      return {x:Math.max(rect1.x,rect2.x),
              y:Math.max(rect1.y,rect2.y),
              width:dx,
              height:dy,
              rect1: rect1,
              rect2: rect2};
    } else {
      return null;
    }
}

function getBounds(obj,iTolerance) {
    var bounds={x:Infinity,y:Infinity,width:0,height:0};
    if ( obj instanceof createjs.Container ) {
      bounds.x2 = -Infinity;
      bounds.y2 = -Infinity;
      var children = obj.children, l=children.length, cbounds, c;
      for ( c = 0; c < l; c++ ) {
        cbounds = getBounds(children[c],1);
        if ( cbounds.x < bounds.x ) bounds.x = cbounds.x;
        if ( cbounds.y < bounds.y ) bounds.y = cbounds.y;
        if ( cbounds.x + cbounds.width > bounds.x2 ) bounds.x2 = cbounds.x + cbounds.width;
        if ( cbounds.y + cbounds.height > bounds.y2 ) bounds.y2 = cbounds.y + cbounds.height;
        //if ( cbounds.x - bounds.x + cbounds.width  > bounds.width  ) bounds.width  = cbounds.x - bounds.x + cbounds.width;
        //if ( cbounds.y - bounds.y + cbounds.height > bounds.height ) bounds.height = cbounds.y - bounds.y + cbounds.height;
      }
      if ( bounds.x == Infinity ) bounds.x = 0;
      if ( bounds.y == Infinity ) bounds.y = 0;
      if ( bounds.x2 == Infinity ) bounds.x2 = 0;
      if ( bounds.y2 == Infinity ) bounds.y2 = 0;
      
      bounds.width = bounds.x2 - bounds.x;
      bounds.height = bounds.y2 - bounds.y;
      delete bounds.x2;
      delete bounds.y2;
    } else {
      var gp,gp2,gp3,gp4,imgr={},sr;
      if ( obj instanceof createjs.Bitmap ) {
        sr = obj.sourceRect || obj.image;

        imgr.width = sr.width * iTolerance;
        imgr.height = sr.height * iTolerance;
      } else if ( obj instanceof createjs.Sprite ) {
        if ( obj.spriteSheet._frames && obj.spriteSheet._frames[obj.currentFrame] && obj.spriteSheet._frames[obj.currentFrame].image ) {
          var cframe = obj.spriteSheet.getFrame(obj.currentFrame);
          imgr.width =  cframe.rect.width;
          imgr.height =  cframe.rect.height;
          imgr.regX = cframe.regX;
          imgr.regY = cframe.regY;
        } else {
          bounds.x = obj.x || 0;
          bounds.y = obj.y || 0;
        }
      } else {
        bounds.x = obj.x || 0;
        bounds.y = obj.y || 0;
      }

      imgr.regX = imgr.regX || 0; imgr.width  = imgr.width  || 0;
      imgr.regY = imgr.regY || 0; imgr.height = imgr.height || 0;
      bounds.regX = imgr.regX;
      bounds.regY = imgr.regY;
      
      gp  = obj.localToGlobal(0         -imgr.regX,0          -imgr.regY);
      gp2 = obj.localToGlobal(imgr.width-imgr.regX,imgr.height-imgr.regY);
      gp3 = obj.localToGlobal(imgr.width-imgr.regX,0          -imgr.regY);
      gp4 = obj.localToGlobal(0         -imgr.regX,imgr.height-imgr.regY);

      bounds.x = Math.min(Math.min(Math.min(gp.x,gp2.x),gp3.x),gp4.x);
      bounds.y = Math.min(Math.min(Math.min(gp.y,gp2.y),gp3.y),gp4.y);
      bounds.width = Math.max(Math.max(Math.max(gp.x,gp2.x),gp3.x),gp4.x) - bounds.x;
      bounds.height = Math.max(Math.max(Math.max(gp.y,gp2.y),gp3.y),gp4.y) - bounds.y;
    }
    return bounds;
}

function NoClickDelay(el) {
	this.element = el;
	if( window.Touch ) this.element.addEventListener('touchstart', this, false);
}
//Fisher-Yates Shuffle
function shuffle(array) {
        var counter = array.length, temp, index;
        // While there are elements in the array
        while (counter > 0) {
            // Pick a random index
            index = Math.floor(Math.random() * counter);
            // Decrease counter by 1
            counter--;
            // And swap the last element with it
            temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }
        return array;
}

NoClickDelay.prototype = {
handleEvent: function(e) {
    switch(e.type) {
        case 'touchstart': this.onTouchStart(e); break;
        case 'touchmove': this.onTouchMove(e); break;
        case 'touchend': this.onTouchEnd(e); break;
    }
},
	
onTouchStart: function(e) {
    e.preventDefault();
    this.moved = false;
    
    this.element.addEventListener('touchmove', this, false);
    this.element.addEventListener('touchend', this, false);
},
	
onTouchMove: function(e) {
    this.moved = true;
},
	
onTouchEnd: function(e) {
    this.element.removeEventListener('touchmove', this, false);
    this.element.removeEventListener('touchend', this, false);
    
    if( !this.moved ) {
        var theTarget = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        if(theTarget.nodeType == 3) theTarget = theTarget.parentNode;
        
        var theEvent = document.createEvent('MouseEvents');
        theEvent.initEvent('click', true, true);
        theTarget.dispatchEvent(theEvent);
    }
}

};

(function() {
    var hidden = "hidden";

    // Standards:
    if (hidden in document)
        document.addEventListener("visibilitychange", onchange);
    else if ((hidden = "mozHidden") in document)
        document.addEventListener("mozvisibilitychange", onchange);
    else if ((hidden = "webkitHidden") in document)
        document.addEventListener("webkitvisibilitychange", onchange);
    else if ((hidden = "msHidden") in document)
        document.addEventListener("msvisibilitychange", onchange);
    // IE 9 and lower:
    else if ('onfocusin' in document)
        document.onfocusin = document.onfocusout = onchange;
    // All others:
    else
        window.onpageshow = window.onpagehide 
            = window.onfocus = window.onblur = onchange;

    function onchange (evt) {
        var v = 'visible', h = 'hidden',
            evtMap = { 
                focus:v, focusin:v, pageshow:v, blur:h, focusout:h, pagehide:h 
            };

        evt = evt || window.event;
		
        if (evt.type in evtMap){
            document.body.className = evtMap[evt.type];
        }else{        
            document.body.className = this[hidden] ? "hidden" : "visible";

			if(document.body.className === "hidden"){
				s_oMain.stopUpdate();
			}else{
				s_oMain.startUpdate();
			}
		}
    }
})();

function ctlArcadeResume(){
    if(s_oMain !== null){
        s_oMain.startUpdate();
    }
}

function ctlArcadePause(){
    if(s_oMain !== null){
        s_oMain.stopUpdate();
    }
    
}

function getParamValue(paramName){
        var url = window.location.search.substring(1);
        var qArray = url.split('&'); 
        for (var i = 0; i < qArray.length; i++) 
        {
                var pArr = qArray[i].split('=');
                if (pArr[0] == paramName) 
                        return pArr[1];
        }
}
function CSpriteLibrary(){

    var _oLibSprites;
    var _iNumSprites;
    var _iCntSprites;
    var _cbCompleted;
    var _cbTotalCompleted;
    var _cbOwner;
    
    this.init = function( cbCompleted,cbTotalCompleted, cbOwner ){
        _iNumSprites = 0;
        _iCntSprites = 0;
        _cbCompleted = cbCompleted;
        _cbTotalCompleted = cbTotalCompleted;
        _cbOwner     = cbOwner;
		
        _oLibSprites = {};
    }
    
    this.addSprite = function( szKey, szPath ){
        if ( _oLibSprites.hasOwnProperty(szKey) ){
            return;
        }
        
        _oLibSprites[szKey] = { szPath:szPath, oSprite: new Image() };
        _iNumSprites++;
        
    }
    
    this.getSprite = function( szKey ){
        if (!_oLibSprites.hasOwnProperty(szKey)){
            return null;
        }else{
            return _oLibSprites[szKey].oSprite;
        }
    }
    
    this._onSpritesLoaded = function(){
        _cbTotalCompleted.call(_cbOwner);
    }
    
    
    
    this._onSpriteLoaded = function(){
        _cbCompleted.call(_cbOwner);
        if (++_iCntSprites == _iNumSprites) {
            this._onSpritesLoaded();
        }
        
    }    

    this.loadSprites = function(){
        for (var szKey in _oLibSprites) {
            _oLibSprites[szKey].oSprite["oSpriteLibrary"] = this;
            _oLibSprites[szKey].oSprite.onload = function(){
                this.oSpriteLibrary._onSpriteLoaded();
            };
            _oLibSprites[szKey].oSprite.src = _oLibSprites[szKey].szPath;
        } 
    }
    
    this.getNumSprites=function(){
        return _iNumSprites;
    }
}

var CANVAS_WIDTH = 1920;
var CANVAS_HEIGHT = 1080;

var EDGEBOARD_X = 256;
var EDGEBOARD_Y = 84;

var FPS_TIME      = 1000/24;
var DISABLE_SOUND_MOBILE = false;

var STATE_LOADING = 0;
var STATE_MENU    = 1;
var STATE_HELP    = 1;
var STATE_GAME    = 3;

var PRIMARY_FONT = "Arial";
var SECONDARY_FONT = "Arial Black";

var ON_MOUSE_DOWN  = 0;
var ON_MOUSE_UP    = 1;
var ON_MOUSE_OVER  = 2;
var ON_MOUSE_OUT   = 3;
var ON_DRAG_START  = 4;
var ON_DRAG_END    = 5;

var TIME_ANIM_IDLE;
var ANIM_IDLE1_TIMESPEED;
var ANIM_IDLE2_TIMESPEED;
var ANIM_IDLE3_TIMESPEED;

var ANIM_SPIN_TIMESPEED;

var TIME_ANIM_WIN;
var ANIM_WIN1_TIMESPEED;
var ANIM_WIN2_TIMESPEED;

var TIME_ANIM_LOSE;

var STATE_IDLE = 0;
var STATE_SPIN = 1;
var STATE_WIN = 2;
var STATE_LOSE = 3;

var LED_SPIN = 3;

var MIN_FAKE_SPIN = 3;
var WHEEL_SPIN_TIMESPEED = 2600;

var START_CREDIT = 0;
var START_BET;
var BET_OFFSET;
var MAX_BET;

var WHEEL_SETTINGS;

var AD_SHOW_COUNTER = new Array();

var BANK_CASH;
var WIN_OCCURRENCE;

var ENABLE_FULLSCREEN;
var ENABLE_CHECK_ORIENTATION;

var SEGMENT_ROT = 360 /20;
TEXT_GAMEOVER  = "I'M SORRY, NO MORE CREDITS TO PLAY";
TEXT_PLAY      = "PLAY";
TEXT_CREDITS   = "CREDITS";
TEXT_SPIN      = "SPIN";
TEXT_PLUS      = "+";
TEXT_MIN       = "-";
TEXT_CURRENCY  = "";
TEXT_HELP1     = 'CLICK ON "+" or "-" BUTTONS TO SELECT YOUR BET. PRIZE WILL VARY ACCORDING TO THE WAGER. THE MORE YOU BET, THE MORE YOU CAN WIN. WHEN YOU ARE READY, SPIN THE WHEEL TO PLAY!';
TEXT_HELP2     = "WHEN THE WHEEL STOPS SPINNING, YOU'LL BE SHOWN YOUR PRIZE!";
TEXT_ALERT     = "wheel_settings PROBABILITY CHECK FAILED: win_occurence number sum must be 100! Please read paragraph in the documentation for more help.";

TEXT_SHARE_IMAGE = "200x200.jpg";
TEXT_SHARE_TITLE = "Congratulations!";
TEXT_SHARE_MSG1 = "You collected <strong>";
TEXT_SHARE_MSG2 = " points</strong>!<br><br>Share your score with your friends!";
TEXT_SHARE_SHARE1 = "My score is ";
TEXT_SHARE_SHARE2 = " points! Can you do better?";
function CPreloader(){
    var _iMaskWidth;
	var _iMaskHeight;
    var _oLoadingText;
    var _oProgressBar;
    var _oMaskPreloader;
    var _oFade;
    var _oContainer;
    
    this._init = function(){
       s_oSpriteLibrary.init( this._onImagesLoaded,this._onAllImagesLoaded, this );
       s_oSpriteLibrary.addSprite("bg_menu","./sprites/bg_menu.jpg");
       s_oSpriteLibrary.addSprite("progress_bar","./sprites/progress_bar.png");
       s_oSpriteLibrary.loadSprites();
       
       _oContainer = new createjs.Container();
       s_oStage.addChild(_oContainer); 
    };
    
    this.unload = function(){
	_oContainer.removeAllChildren();
    };
    
    this.hide = function(){
        var oParent = this;
        setTimeout(function(){createjs.Tween.get(_oFade).to({alpha:1}, 500).call(function(){oParent.unload();s_oMain.gotoMenu();}); }, 1000);
    };
    
    this._onImagesLoaded = function(){
        
    };
    
    this._onAllImagesLoaded = function(){
        this.attachSprites();
        
        s_oMain.preloaderReady();
    };
    
    this.attachSprites = function(){
        
        var oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_menu'));
        _oContainer.addChild(oBg);
       
        var oSprite = s_oSpriteLibrary.getSprite('progress_bar');
       _oProgressBar  = createBitmap(oSprite);
       _oProgressBar.x = CANVAS_WIDTH/2 - (oSprite.width/2);
       _oProgressBar.y = CANVAS_HEIGHT - 170;
       _oContainer.addChild(_oProgressBar);
       
       _iMaskWidth = oSprite.width;
	   _iMaskHeight = oSprite.height;
       _oMaskPreloader = new createjs.Shape();
       _oMaskPreloader.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(_oProgressBar.x, _oProgressBar.y, 1,_iMaskHeight);
	   
       _oContainer.addChild(_oMaskPreloader);
       
       _oProgressBar.mask = _oMaskPreloader;
       
       _oLoadingText = new createjs.Text("","30px Arial", "#fff");
       _oLoadingText.x = CANVAS_WIDTH/2;
       _oLoadingText.y = CANVAS_HEIGHT - 125;
       _oLoadingText.shadow = new createjs.Shadow("#000", 2, 2, 2);
       _oLoadingText.textBaseline = "alphabetic";
       _oLoadingText.textAlign = "center";
       _oContainer.addChild(_oLoadingText);
       _oFade = new createjs.Shape();
       _oFade.graphics.beginFill("black").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
       _oFade.alpha = 0;
        
        _oContainer.addChild(_oFade);
    };
    
    this.refreshLoader = function(iPerc){
        _oLoadingText.text = iPerc+"%";
        
        
        _oMaskPreloader.graphics.clear();
        var iNewMaskWidth = Math.floor((iPerc*_iMaskWidth)/100);
        _oMaskPreloader.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(_oProgressBar.x, _oProgressBar.y, iNewMaskWidth,_iMaskHeight);
    };
    
    this._init();   
}
function CMain(oData){
    var _bUpdate;
    var _iCurResource = 0;
    var RESOURCE_TO_LOAD = 0;
    var _iState = STATE_LOADING;
    var _oData;
    
    var _oPreloader;
    var _oMenu;
    var _oHelp;
    var _oGame;

    this.initContainer = function(){

        s_oCanvas = document.getElementById("canvas");
        s_oStage = new createjs.Stage(s_oCanvas);
        createjs.Touch.enable(s_oStage);
		
	s_bMobile = jQuery.browser.mobile;
        if(s_bMobile === false){
            s_oStage.enableMouseOver(20);  
            $('body').on('contextmenu', '#canvas', function(e){ return false; });
        }
		
        s_iPrevTime = new Date().getTime();

	createjs.Ticker.addEventListener("tick", this._update);
        createjs.Ticker.setFPS(30);
        
        if(navigator.userAgent.match(/Windows Phone/i)){
                DISABLE_SOUND_MOBILE = true;
        }
        
        s_oSpriteLibrary  = new CSpriteLibrary();

        //ADD PRELOADER
        _oPreloader = new CPreloader();

    };
    
    this.preloaderReady = function(){
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            this._initSounds();
        }
        
        this._loadImages();
        _bUpdate = true;
    };
    
    this.soundLoaded = function(){
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource/RESOURCE_TO_LOAD *100);
        _oPreloader.refreshLoader(iPerc);

         if(_iCurResource === RESOURCE_TO_LOAD){
             _oPreloader.unload();
            
            this.gotoMenu();
         }
    };
    
    this._initSounds = function(){
         if (!createjs.Sound.initializeDefaultPlugins()) {
             return;
         }

        if(navigator.userAgent.indexOf("Opera")>0 || navigator.userAgent.indexOf("OPR")>0){
                createjs.Sound.alternateExtensions = ["mp3"];
                createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this));

                createjs.Sound.registerSound("./sounds/click.ogg", "click");
                createjs.Sound.registerSound("./sounds/game_over.ogg", "game_over");
                createjs.Sound.registerSound("./sounds/reel.ogg", "reel");
                createjs.Sound.registerSound("./sounds/start_reel.ogg", "start_reel");
                createjs.Sound.registerSound("./sounds/win.ogg", "win");
        }else{
                createjs.Sound.alternateExtensions = ["ogg"];
                createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this));

                createjs.Sound.registerSound("./sounds/click.mp3", "click");
                createjs.Sound.registerSound("./sounds/game_over.mp3", "game_over");
                createjs.Sound.registerSound("./sounds/reel.mp3", "reel");
                createjs.Sound.registerSound("./sounds/start_reel.mp3", "start_reel");
                createjs.Sound.registerSound("./sounds/win.mp3", "win");
        }
        
        RESOURCE_TO_LOAD += 5;
        
    };

    this._loadImages = function(){
        s_oSpriteLibrary.init( this._onImagesLoaded,this._onAllImagesLoaded, this );

        s_oSpriteLibrary.addSprite("but_play","./sprites/but_play.png");
        s_oSpriteLibrary.addSprite("msg_box","./sprites/msg_box.png");
        
        s_oSpriteLibrary.addSprite("bg_menu","./sprites/bg_menu.jpg"); 
        s_oSpriteLibrary.addSprite("bg_game","./sprites/bg_game.png");
        s_oSpriteLibrary.addSprite("bg_help","./sprites/bg_help.png");
        
        s_oSpriteLibrary.addSprite("but_exit","./sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("but_credits","./sprites/but_credits.png");
        s_oSpriteLibrary.addSprite("audio_icon","./sprites/audio_icon.png");
        s_oSpriteLibrary.addSprite("but_spin","./sprites/but_spin.png");
        s_oSpriteLibrary.addSprite("but_plus","./sprites/but_plus.png");     
        
        s_oSpriteLibrary.addSprite("wheel","./sprites/wheel.png");
        s_oSpriteLibrary.addSprite("leds","./sprites/leds.png");
		s_oSpriteLibrary.addSprite("but_fullscreen","./sprites/but_fullscreen.png");
        
        
        RESOURCE_TO_LOAD += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites();
    };
    
    this._onImagesLoaded = function(){
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource/RESOURCE_TO_LOAD *100);
        _oPreloader.refreshLoader(iPerc);
        
        if(_iCurResource === RESOURCE_TO_LOAD){
            _oPreloader.unload();
            
            //this.gotoMenu();
			this.gotoGame();
        }
    };
    
    this._onAllImagesLoaded = function(){
        
    };
    
    this.onAllPreloaderImagesLoaded = function(){
        this._loadImages();
    };
    
    this.gotoMenu = function(){
        //_oMenu = new CMenu();
        //_iState = STATE_MENU;
		this.gotoGame();
    };

    this.gotoGame = function(bEasyMode){
        s_bEasyMode=bEasyMode;
        _oGame = new CGame(_oData);   						
        _iState = STATE_GAME;

        $(s_oMain).trigger("game_start");
    };
    
    this.gotoHelp = function(){
        _oHelp = new CHelp();
        _iState = STATE_HELP;
    };
	
    this.stopUpdate = function(){
        _bUpdate = false;
        createjs.Ticker.paused = true;
        $("#block_game").css("display","block");
		createjs.Sound.setMute(true);
    };

    this.startUpdate = function(){
        s_iPrevTime = new Date().getTime();
        _bUpdate = true;
        createjs.Ticker.paused = false;
        $("#block_game").css("display","none");

		if(s_bAudioActive){
			createjs.Sound.setMute(false);
		}
    };
    
    this._update = function(event){
		if(_bUpdate === false){
			return;
		}
        var iCurTime = new Date().getTime();
        s_iTimeElaps = iCurTime - s_iPrevTime;
        s_iCntTime += s_iTimeElaps;
        s_iCntFps++;
        s_iPrevTime = iCurTime;
        
        if ( s_iCntTime >= 1000 ){
            s_iCurFps = s_iCntFps;
            s_iCntTime-=1000;
            s_iCntFps = 0;
        }
                
        if(_iState === STATE_GAME){
            _oGame.update();
        }
        
        s_oStage.update(event);

    };
    
    s_oMain = this;
    
    _oData = oData;
    ENABLE_CHECK_ORIENTATION = oData.check_orientation;
    ENABLE_FULLSCREEN = oData.fullscreen;
    
    this.initContainer();
}
var s_bMobile;
var s_bEasyMode;
var s_bAudioActive = true;
var s_iCntTime = 0;
var s_iTimeElaps = 0;
var s_iPrevTime = 0;
var s_iCntFps = 0;
var s_iCurFps = 0;

var s_oDrawLayer;
var s_oStage;
var s_oMain;
var s_oSpriteLibrary;
var s_oCanvas;
var s_bFullscreen = false;
function CTextButton(iXPos,iYPos,oSprite,szText,szFont,szColor,iFontSize, bStandard, oParentContainer){
    
    var _bDisable;
    
    var _aCbCompleted;
    var _aCbOwner;
    var _oButton;
    var _oText;
    var _oTextBack;
    var _oButtonBg;
    
    this._init =function(iXPos,iYPos,oSprite,szText,szFont,szColor,iFontSize, bStandard, oParentContainer){
        _bDisable = false;
        
        _aCbCompleted=new Array();
        _aCbOwner =new Array();

        _oButtonBg = createBitmap( oSprite);           

        var iStepShadow = Math.ceil(iFontSize/20);

        _oTextBack = new createjs.Text(szText,"bold "+iFontSize+"px "+szFont, "#000000");
        _oTextBack.textAlign = "center";
        _oTextBack.textBaseline = "alphabetic";
        var oBounds = _oTextBack.getBounds();    
        _oTextBack.x = oSprite.width/2 + iStepShadow;
        _oTextBack.y = Math.floor((oSprite.height)/2) +(oBounds.height/3) + iStepShadow -7;

        _oText = new createjs.Text(szText,"bold "+iFontSize+"px "+szFont, szColor);
        _oText.textAlign = "center";
        _oText.textBaseline = "alphabetic";
        var oBounds = _oText.getBounds();    
        _oText.x = oSprite.width/2;
        _oText.y = Math.floor((oSprite.height)/2) +(oBounds.height/3) -7;

        _oButton = new createjs.Container();
        _oButton.x = iXPos;
        _oButton.y = iYPos;
        _oButton.regX = oSprite.width/2;
        _oButton.regY = oSprite.height/2; 
        _oButton.cursor = "pointer";

        if(!bStandard){
            var oData = {   
                        images: [oSprite], 
                        // width, height & registration point of each sprite
                        frames: {width: oSprite.width/2, height: oSprite.height, regX:(oSprite.width/2)/2, regY:oSprite.height/2}, 
                        animations: {state_true:[0],state_false:[1]}
                   };
                   
            var oSpriteSheet = new createjs.SpriteSheet(oData);         
            _oButtonBg = createSprite(oSpriteSheet, "state_false",(oSprite.width/2)/2,oSprite.height/2,oSprite.width/2,oSprite.height);
            
            var iOffset = 17;
            
            _oTextBack.x = iStepShadow;
            _oTextBack.y = iStepShadow + iOffset;
            _oText.x = 0;
            _oText.y = iOffset;
            _oButton.regX = 0;
            _oButton.regY = 0;
            
        }
        _oButton.addChild(_oButtonBg,_oTextBack,_oText);

        oParentContainer.addChild(_oButton);

        this._initListener();
    };
    
    this.unload = function(){
       _oButton.off("mousedown");
       _oButton.off("pressup");
       
       oParentContainer.removeChild(_oButton);
    };
    
    this.setVisible = function(bVisible){
        _oButton.visible = bVisible;
    };
    
    this._initListener = function(){
       oParent = this;

       _oButton.on("mousedown", this.buttonDown);
       _oButton.on("pressup" , this.buttonRelease);      
    };
    
    this.addEventListener = function( iEvent,cbCompleted, cbOwner ){
        _aCbCompleted[iEvent]=cbCompleted;
        _aCbOwner[iEvent] = cbOwner; 
    };
    
    this.buttonRelease = function(){
        if(_bDisable){
            return;
        }
        _oButton.scaleX = 1;
        _oButton.scaleY = 1;
		if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            createjs.Sound.play("click");//insert an appropriate sound
        }

        if(_aCbCompleted[ON_MOUSE_UP]){
            _aCbCompleted[ON_MOUSE_UP].call(_aCbOwner[ON_MOUSE_UP]);
        }
    };
    
    this.buttonDown = function(){
        if(_bDisable){
            return;
        }
        
        _oButton.scaleX = 0.9;
        _oButton.scaleY = 0.9;

       if(_aCbCompleted[ON_MOUSE_DOWN]){
           _aCbCompleted[ON_MOUSE_DOWN].call(_aCbOwner[ON_MOUSE_DOWN]);
       }
    };
    
    this.enable = function(){
        _bDisable = false;
        
        if(!bStandard){
            _oButtonBg.gotoAndStop("state_true");
        }
        

    };
    
    this.disable = function(){
        _bDisable = true;
        if(!bStandard){
            _oButtonBg.gotoAndStop("state_false");
        }

    };
    
    this.setTextPosition = function(iX, iY){
        
        var iStepShadow = Math.ceil(iFontSize/20);
        
        _oTextBack.x = iX + iStepShadow;
        _oTextBack.y = iY + iStepShadow;
        _oText.x = iX;
        _oText.y = iY;
        
    };
    
    this.setPosition = function(iXPos,iYPos){
         _oButton.x = iXPos;
         _oButton.y = iYPos;
    };
    
    this.setX = function(iXPos){
         _oButton.x = iXPos;
    };
    
    this.setY = function(iYPos){
         _oButton.y = iYPos;
    };
    
    this.getButtonImage = function(){
        return _oButton;
    };

    this.getX = function(){
        return _oButton.x;
    };
    
    this.getY = function(){
        return _oButton.y;
    };

    this._init(iXPos,iYPos,oSprite,szText,szFont,szColor,iFontSize, bStandard, oParentContainer);
    
    return this;
    
}

function CToggle(iXPos,iYPos,oSprite,bActive){
    var _bActive;
    var _aCbCompleted;
    var _aCbOwner;
    var _oButton;
    
    this._init = function(iXPos,iYPos,oSprite,bActive){
        _aCbCompleted=new Array();
        _aCbOwner =new Array();
        
        var oData = {   
                        images: [oSprite], 
                        // width, height & registration point of each sprite
                        frames: {width: oSprite.width/2, height: oSprite.height, regX: (oSprite.width/2)/2, regY: oSprite.height/2}, 
                        animations: {state_true:[0],state_false:[1]}
                   };
                   
         var oSpriteSheet = new createjs.SpriteSheet(oData);
         
         _bActive = bActive;
		_oButton = createSprite(oSpriteSheet, "state_"+_bActive,(oSprite.width/2)/2,oSprite.height/2,oSprite.width/2,oSprite.height);
         
        _oButton.x = iXPos;
        _oButton.y = iYPos; 
        _oButton.stop();
        _oButton.cursor = "pointer";
        s_oStage.addChild(_oButton);
        
        this._initListener();
    };
    
    this.unload = function(){
       _oButton.off("mousedown", this.buttonDown);
       _oButton.off("pressup" , this.buttonRelease);
	   
       s_oStage.removeChild(_oButton);
    };
    
    this._initListener = function(){
       _oButton.on("mousedown", this.buttonDown);
       _oButton.on("pressup" , this.buttonRelease);      
    };
    
    this.addEventListener = function( iEvent,cbCompleted, cbOwner ){
        _aCbCompleted[iEvent]=cbCompleted;
        _aCbOwner[iEvent] = cbOwner; 
    };
    
    this.setActive = function(bActive){
        _bActive = bActive;
        _oButton.gotoAndStop("state_"+_bActive);
    };
    
    this.buttonRelease = function(){
        _oButton.scaleX = 1;
        _oButton.scaleY = 1;
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            createjs.Sound.play("click");
        }
        
        _bActive = !_bActive;
        _oButton.gotoAndStop("state_"+_bActive);

        if(_aCbCompleted[ON_MOUSE_UP]){
            _aCbCompleted[ON_MOUSE_UP].call(_aCbOwner[ON_MOUSE_UP],_bActive);
        }
    };
    
    this.buttonDown = function(){
        _oButton.scaleX = 0.9;
        _oButton.scaleY = 0.9;

       if(_aCbCompleted[ON_MOUSE_DOWN]){
           _aCbCompleted[ON_MOUSE_DOWN].call(_aCbOwner[ON_MOUSE_DOWN]);
       }
    };
    
    this.setPosition = function(iXPos,iYPos){
         _oButton.x = iXPos;
         _oButton.y = iYPos;
    };
    
    this._init(iXPos,iYPos,oSprite,bActive);
}
function CGfxButton(iXPos,iYPos,oSprite){
    
    var _aCbCompleted;
    var _aCbOwner;
    var _oButton;
    
    this._init =function(iXPos,iYPos,oSprite){
        
        _aCbCompleted=new Array();
        _aCbOwner =new Array();
        
        _oButton = createBitmap( oSprite);
        _oButton.x = iXPos;
        _oButton.y = iYPos; 
                                   
        _oButton.regX = oSprite.width/2;
        _oButton.regY = oSprite.height/2;
        _oButton.cursor = "pointer";
        s_oStage.addChild(_oButton);
        
        
        this._initListener();
    };
    
    this.unload = function(){
       _oButton.off("mousedown", this.buttonDown);
       _oButton.off("pressup" , this.buttonRelease); 
       
       s_oStage.removeChild(_oButton);
    };
    
    this.setVisible = function(bVisible){
        _oButton.visible = bVisible;
    };
    
    this._initListener = function(){
       _oButton.on("mousedown", this.buttonDown);
       _oButton.on("pressup" , this.buttonRelease);      
    };
    
    this.addEventListener = function( iEvent,cbCompleted, cbOwner ){
        _aCbCompleted[iEvent]=cbCompleted;
        _aCbOwner[iEvent] = cbOwner; 
    };
    
    this.buttonRelease = function(){
        _oButton.scaleX = 1;
        _oButton.scaleY = 1;

        if(_aCbCompleted[ON_MOUSE_UP]){
            _aCbCompleted[ON_MOUSE_UP].call(_aCbOwner[ON_MOUSE_UP]);
        }
    };
    
    this.buttonDown = function(){
        _oButton.scaleX = 0.9;
        _oButton.scaleY = 0.9;
		if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            createjs.Sound.play("click");//insert an appropriate sound
        }

       if(_aCbCompleted[ON_MOUSE_DOWN]){
           _aCbCompleted[ON_MOUSE_DOWN].call(_aCbOwner[ON_MOUSE_DOWN]);
       }
    };
    
    this.setPosition = function(iXPos,iYPos){
         _oButton.x = iXPos;
         _oButton.y = iYPos;
    };
    
    this.setX = function(iXPos){
         _oButton.x = iXPos;
    };
    
    this.setY = function(iYPos){
         _oButton.y = iYPos;
    };
    
    this.getButtonImage = function(){
        return _oButton;
    };
    
    
    this.getX = function(){
        return _oButton.x;
    };
    
    this.getY = function(){
        return _oButton.y;
    };

    this._init(iXPos,iYPos,oSprite);
    
    return this;
}
function CMenu(){
	var _pStartPosFullscreen;
	var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;
	var _oButFullscreen;
    var _oBg;
    var _oButPlay;
    var _oFade;
    var _oAudioToggle;
    
    var _pStartPosAudio;
    
    this._init = function(){
        _oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_menu'));
        s_oStage.addChild(_oBg);

        var oSprite = s_oSpriteLibrary.getSprite('but_play');
        _oButPlay = new CTextButton((CANVAS_WIDTH/2),CANVAS_HEIGHT - 190,oSprite,TEXT_PLAY,"Arial","#ffffff",70, false, s_oStage);
        _oButPlay.enable();
        _oButPlay.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
     
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _pStartPosAudio = {x: CANVAS_WIDTH - (oSprite.height/2)- 10, y: (oSprite.height/2) + 10};            
            _oAudioToggle = new CToggle(_pStartPosAudio.x,_pStartPosAudio.y,oSprite,s_bAudioActive);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);          
        }
		
		var doc = window.document;
        var docEl = doc.documentElement;
        _fRequestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        _fCancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
        
        if(ENABLE_FULLSCREEN === false){
            _fRequestFullScreen = false;
        }
        
        if (_fRequestFullScreen && inIframe() === false){
            oSprite = s_oSpriteLibrary.getSprite('but_fullscreen');
            _pStartPosFullscreen = {x:oSprite.width/4 + 10,y:oSprite.height/2 + 10};

            _oButFullscreen = new CToggle(_pStartPosFullscreen.x,_pStartPosFullscreen.y,oSprite,s_bFullscreen,true);
            _oButFullscreen.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this);
        }
		
        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        
        s_oStage.addChild(_oFade);
        
        createjs.Tween.get(_oFade).to({alpha:0}, 1000).call(function(){_oFade.visible = false;});
        
        this.refreshButtonPos(s_iOffsetX,s_iOffsetY);
    };
    
    this.unload = function(){
        _oButPlay.unload(); 
        _oButPlay = null;
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        
		if (_fRequestFullScreen && inIframe() === false){
            _oButFullscreen.unload();
        }
		
        s_oStage.removeChild(_oBg);
        _oBg = null;
        s_oMenu = null;
    };
    
    this.refreshButtonPos = function(iNewX,iNewY){
		if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
			_oAudioToggle.setPosition(_pStartPosAudio.x - iNewX,iNewY + _pStartPosAudio.y);
		}
		
		if (_fRequestFullScreen && inIframe() === false){
            _oButFullscreen.setPosition(_pStartPosFullscreen.x + iNewX,_pStartPosFullscreen.y + iNewY);
        }
    };
    
    this._onAudioToggle = function(){
        createjs.Sound.setMute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
	
	this._onFullscreenRelease = function(){
        if(s_bFullscreen) { 
            _fCancelFullScreen.call(window.document);
            s_bFullscreen = false;
        }else{
            _fRequestFullScreen.call(window.document.documentElement);
            s_bFullscreen = true;
        }
        
        sizeHandler();
    };
    
    this._onButPlayRelease = function(){
        this.unload();
        $(s_oMain).trigger("start_session");
        s_oMain.gotoGame();
    };
	
    s_oMenu = this;
    
    this._init();
}

var s_oMenu = null;

function CGame(oData){
    
    var _bInitGame;
    
    var _iScore;
    var _iTimeIdle;
    var _iTimeWin;
    var _iCurAnim;
    var _iGameState;
    var _iMultiply;
    var _iCurBet;
    var _iCurCredit;
    var _iCurWin;
    var _iAdCounter;
    var _iBankCash;

    var _aProbability;

    var _oInterface;
    var _oEndPanel = null;
    var _oParent;
    var _oWheel;
    var _oLeds;
    
    this._init = function(){
     
        _iMultiply = 1;
        _iTimeIdle = 0;
        _iTimeWin = 0;
        _iCurBet = START_BET;
        _iCurCredit = START_CREDIT;
        _iCurWin = -1;        
        _iGameState = STATE_IDLE;
        _iAdCounter = 0;
        _iBankCash = BANK_CASH;

        _aProbability = new Array();
        var iCount=0;
        for(var i=0; i<WHEEL_SETTINGS.length; i++){
            iCount += WHEEL_SETTINGS[i].win_occurence;
        }
        if(iCount !== 100){
            var oBg = createBitmap(s_oSpriteLibrary.getSprite('msg_box'));
            s_oStage.addChild(oBg);
            
            var oAlertText = new createjs.Text(TEXT_ALERT,"bold 50px "+SECONDARY_FONT, "#ffffff");
            oAlertText.x = CANVAS_WIDTH/2;
            oAlertText.y = CANVAS_HEIGHT/2 - 200;
            oAlertText.textAlign = "center";
            oAlertText.textBaseline = "middle";
            oAlertText.lineWidth = 900;
            s_oStage.addChild(oAlertText);
            
            return;
        }
		
		//tron 
		//prize_server =       [0    ,8    ,0    ,2    ,0    ,6    ,0    ,5    ,0    ,0    ,4    ,0    ,3    ,0    ,2    ,0    ,2    ,0    ,10   ,0];alert(prize_server.length)
		win_occurence_server = [48   ,15   ,56   ,60   ,60   ,20   ,64   ,25   ,58   ,64   ,30   ,56   ,50   ,56   ,60   ,60   ,80   ,68   ,10   ,60];
		//test
		/*var winTotal = 0;
		var pre = 0;
		var cur = 0;
        for(var i=0; i<win_occurence_server.length; i++){
			cur+=win_occurence_server[i];
			console.log("wheel "+i+": from "+pre+" to "+(cur-1)+", Prize: "+WHEEL_SETTINGS[i].prize) 
			pre = cur;  
        }*/
		//for(var i = 0; i < win_occurence_server.length; i++)winTotal+=win_occurence_server[i];
		//alert(win_occurence_server.length+": "+winTotal);

        _bInitGame=true;
        var pCenterWheel = {x: 1198, y: 540};

        _oWheel = new CWheel(pCenterWheel.x, pCenterWheel.y);
        
        var oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_game'));
        s_oStage.addChild(oBg);

        _oLeds = new CLeds(pCenterWheel.x, pCenterWheel.y);
        _iCurAnim = _oLeds.getState();

        _oInterface = new CInterface(); 
        
        //new CHelpPanel();tron
        
        this._initProbability();
		
		/*if(_iCurCredit < START_BET){tron
            this.gameOver();
			return;
        } */
    };
    
    this._initProbability = function(){
        var aPrizeLength = new Array();
        for(var i=0; i<WHEEL_SETTINGS.length; i++){
            aPrizeLength[i] = WHEEL_SETTINGS[i].win_occurence;  
        }
        for(var i=0; i<aPrizeLength.length; i++){
            for(var j=0; j<aPrizeLength[i]; j++){
                _aProbability.push(i);
            }            
        }   
		    
    };
    
    this.modifyBonus = function(szType){
        if(szType === "plus"){
            _iCurBet += BET_OFFSET;
        } else {
            _iCurBet -= BET_OFFSET;
        }

		if(_iCurBet > game_MaxBet_newTRX){
            _iCurBet = game_MaxBet_newTRX;
        } else if(_iCurBet < 0){
            _iCurBet = 0;
        } 
		if(_iCurBet > _iCurCredit){
            _iCurBet = Math.floor(_iCurCredit);
        }
        _oInterface.refreshBet(_iCurBet);
		
        //_oWheel.clearText(_iMultiply);
        //_oWheel.setText(_iMultiply);
        
        
    };
    
    this.tryShowAd = function(){
        _iAdCounter++;
        if(_iAdCounter === AD_SHOW_COUNTER){
            _iAdCounter = 0;
            $(s_oMain).trigger("show_interlevel_ad");
        }
    }
	//tron
	this.updateCredit = function(Credit, updateText){
		_iCurCredit = Credit;
        if(updateText)_oInterface.refreshCredit(_iCurCredit.toFixed(2)/1);
	}
    //tron
	this.spinWheel = function(){//this.spinWheel2();return;
		if(window.wallet_requesting)return;
		window.wallet_requesting = true;
        _oInterface.disableSpin(true);
		//
		userBetSend(_iCurBet, this.serverReturns);
	}
	//tron
	this.serverReturns = function(sr){
		if(!window.wallet_requesting)return;
		window.wallet_requesting = false;
		//
		if(sr == -1){
        	_oInterface.disableSpin(false);
		} else{
			this.spinWheel2(true, sr);
		}
	}
	//tron
    this.spinWheel2 = function(server, serverReturns){
        _iGameState = STATE_SPIN;
        _iTimeWin = 0;
        
        this.setNewRound();
        
        _oInterface.refreshMoney("0");
        _oInterface.refreshCredit(_iCurCredit);
		
		if(server){
			_iCurWin = serverReturns;
		} else{
        	_oInterface.disableSpin(true);
			//DETECT ALL POSSIBLE PRIZE LOWER THEN BANK
			var iCurPrize;
			var aAllPossiblePrize = new Array();
			for(var i=0; i<_aProbability.length; i++){
				iCurPrize = WHEEL_SETTINGS[_aProbability[i]].prize*_iMultiply;
				if(iCurPrize <= _iBankCash){
					aAllPossiblePrize.push({prize:iCurPrize,index:i});
				} 
			}
			//console.log("hh: "+aAllPossiblePrize)
			//SELECT PRIZE   
			var rand = Math.floor(Math.random()*aAllPossiblePrize.length);
			var iPrizeToChoose = aAllPossiblePrize[rand].index;     
			_iCurWin = _aProbability[iPrizeToChoose];
			console.log("rand: "+rand+", iPrizeToChoose: "+iPrizeToChoose) 
			console.log("_iCurWin: "+_iCurWin);
			
			//tron test
			var pre = 0;
			var cur = 0;
			for(var i=0; i<WHEEL_SETTINGS.length; i++){
				cur+=WHEEL_SETTINGS[i].win_occurence;
				//console.log("wheel "+i+": from "+pre+" to "+(cur-1)) 
				if(rand >= pre && rand < cur){
					console.log("iCurWin tron: "+i+", Prize: "+WHEEL_SETTINGS[i].prize);break;
				}
				pre = cur;  
			}
		}

        //CALCULATE ROTATION
        var iNumSpinFake = MIN_FAKE_SPIN + Math.floor(Math.random()*3);
        var iOffsetInterval = SEGMENT_ROT - 3;
        var iOffsetSpin = -iOffsetInterval/2 + Math.random()*iOffsetInterval;//Math.round(Math.random()*iOffsetInterval);
        var _iCurWheelDegree = _oWheel.getDegree();
        
        var iTrueRotation = (360 - _iCurWheelDegree + _iCurWin * SEGMENT_ROT + iOffsetSpin)%360; //Define how much rotation, to reach the selected prize.
        var iRotValue = 360*iNumSpinFake + iTrueRotation;
        var iTimeMult = iNumSpinFake;
        //SPIN
        _oWheel.spin(iRotValue, iTimeMult);
    };                 
    
    this.setNewRound = function(){
        if(_iCurWin < 0)return;
        _oInterface.refreshCredit(_iCurCredit);
        _oInterface.clearMoneyPanel();
        _iCurWin = -1;
    };
    
    this.releaseWheel = function(){
        _oInterface.disableSpin(false); 
        _oInterface.refreshMoney(WHEEL_SETTINGS[_iCurWin].prize * _iCurBet);//tron
        //$(s_oMain).trigger("save_score",[_iCurCredit]);
        _oInterface.refreshCredit(_iCurCredit);
        _oInterface.animWin();
        /*if(_iCurCredit < START_BET){tron
            this.gameOver();
        }  */  
		if(_iCurBet > _iCurCredit ){
            _iCurBet = Math.floor(_iCurCredit);
            _oInterface.refreshBet(_iCurBet);
        }
		if(_iCurBet > game_MaxBet_newTRX){
            _iCurBet = game_MaxBet_newTRX;
            _oInterface.refreshBet(_iCurBet);
        }
        
        if(WHEEL_SETTINGS[_iCurWin].prize <= 0){
            _iGameState = STATE_LOSE;
            if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
                createjs.Sound.play("game_over");
            }
        } else {
            _iGameState = STATE_WIN;
            if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
                createjs.Sound.play("win");
            }
        }
    };
    
    this.getCurColor = function(){
        return _oWheel.getColor();
    };
    

    this.unload = function(){
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
                createjs.Sound.stop();
        }
        _bInitGame = false;
        
        _oInterface.unload();
        if(_oEndPanel !== null){
            _oEndPanel.unload();
        }
        
        createjs.Tween.removeAllTweens();
        s_oStage.removeAllChildren();
        
    };
 
    this.onExit = function(){
        
        $(s_oMain).trigger("save_score",[_iCurCredit]);
        $(s_oMain).trigger("share_event",_iCurCredit);
        
        this.unload();
        s_oMain.gotoMenu();
        
        
    };
    
    this.gameOver = function(){  
        
        _oEndPanel = CEndPanel(s_oSpriteLibrary.getSprite('msg_box'));
        _oEndPanel.show();
    };

    this._animLedIdle = function(){
        _iTimeIdle += s_iTimeElaps;
        
        if(_iTimeIdle > TIME_ANIM_IDLE){
            _iTimeIdle=0;
            var iRandAnim = Math.floor(Math.random()*_oLeds.getNumAnim());
    
            while(iRandAnim === _iCurAnim){
                iRandAnim = Math.floor(Math.random()*_oLeds.getNumAnim());
            }    
            _oLeds.changeAnim(iRandAnim);
            _iCurAnim = iRandAnim;
        }
    };    
    
    this._animLedSpin = function(){
        _oLeds.changeAnim(LED_SPIN);
        _iGameState =-1;
    };
    
    this._animLedWin = function(){
       
        if(_iTimeWin === 0){
            var iRandomWinAnim = 4 + Math.round(Math.random())
            _oLeds.changeAnim(iRandomWinAnim);
            _oLeds.setWinColor(this.getCurColor());            
        } else if(_iTimeWin > TIME_ANIM_WIN) {
            _iTimeIdle = TIME_ANIM_IDLE; 
            _iGameState = STATE_IDLE;
            this.setNewRound();
            _iTimeWin =0;
        }
        _iTimeWin += s_iTimeElaps;
        
    };
    
    this._animLedLose = function(){
       
        if(_iTimeWin === 0){            
            _oLeds.changeAnim(6);
            _oLeds.setWinColor(this.getCurColor());            
        } else if(_iTimeWin > TIME_ANIM_LOSE) {
            _iTimeIdle = TIME_ANIM_IDLE; 
            _iGameState = STATE_IDLE;
            this.setNewRound();
            _iTimeWin =0;
        }
        _iTimeWin += s_iTimeElaps;
        
    };
    
    this.update = function(){
	if(_bInitGame){
            _oLeds.update();
        
            switch(_iGameState) {
                case STATE_IDLE:{
                        this._animLedIdle();
                   break;
                } case STATE_SPIN: {
                        this._animLedSpin();
                   break;              

                } case STATE_WIN: {
                        this._animLedWin();
                   break;                             
                } case STATE_LOSE: {
                        this._animLedLose();
                   break;                             
                }    

            }
        }
        
    };

    s_oGame=this;
    
    WHEEL_SETTINGS = oData.wheel_settings;
    
    //START_CREDIT = oData.start_credit;tron
    START_BET = oData.start_bet;
    BET_OFFSET = oData.bet_offset;
    MAX_BET = oData.max_bet;
    
    TIME_ANIM_IDLE = oData.anim_idle_change_frequency;
    ANIM_IDLE1_TIMESPEED = oData.led_anim_idle1_timespeed;
    ANIM_IDLE2_TIMESPEED = oData.led_anim_idle2_timespeed;
    ANIM_IDLE3_TIMESPEED = oData.led_anim_idle3_timespeed;
    
    ANIM_SPIN_TIMESPEED = oData.led_anim_spin_timespeed;
    
    TIME_ANIM_WIN = oData.led_anim_win_duration;
    ANIM_WIN1_TIMESPEED = oData.led_anim_win1_timespeed;
    ANIM_WIN2_TIMESPEED = oData.led_anim_win2_timespeed;
    
    TIME_ANIM_LOSE = oData.led_anim_lose_duration;
    
    AD_SHOW_COUNTER = oData.ad_show_counter;
    
    BANK_CASH = oData.bank_cash;
    ENABLE_FULLSCREEN = oData.fullscreen;
	
    _oParent=this;
    this._init();
}

var s_oGame;

function CVector2(iX,iY){
    
    var x;
    var y;
    
    this._init = function(iX,iY){
        x = iX;
        y = iY;
    };
    
    this.add = function( vx, vy ){
        x += vx;
        y += vy; 
    };		
		
    this.addV = function( v ){
        x += v.getX();
        y += v.getY(); 
    };
		
    this.scalarDivision = function( n ) {
        x /= n;
        y /= n;		
    };
		
    this.subV = function( v ){
        x -= v.getX();
        y -= v.getY(); 
    };	
		
    this.scalarProduct = function( n ){
        x*=n;
        y*=n;
    };
		
    this.invert = function(){
        x*=-1;
        y*=-1;		
    };
		
    this.dotProduct = function( v){
        return ( x*v.getX()+ y*v.getY()  );
    };
		
    this.set = function( fx, fy ){
        x = fx;
        y = fy;
    };
		
    this.setV = function( v ){
        x = v.getX();
        y = v.getY();
    };
		
    this.length = function(){
        return Math.sqrt( x*x+y*y );
    };
		
    this.length2 = function(){
        return x*x+y*y;
    };	
		
    this.normalize = function(){
        var len = this.length();
        if (len > 0 ){
                x/= len; y/=len; 
        }
    };
		
    this.getNormalize = function( outV ) {
        var len = this.length();
        outV.set(x,y);
        outV.normalize();
    };
		
    this.rot90CCW = function(){
        var a = x;
        x = -y;
        y = a;
    };
		
    this.rot90CW = function(){
        var a = x;
        x = y;
        y = -a;
    };

    this.getRotCCW = function( outV ) {
        outV.set( x, y );
        outV.rot90CCW();
    };
		
    this.getRotCW = function( outV ) {
            outV.set( x, y );
            outV.rot90CW();
    };
		
    this.ceil = function(){
        x = Math.ceil( x );
        y = Math.ceil( y );
    };
		
    this.round = function(){
        x = Math.round( x );
        y = Math.round( y );		
    };

    this.toString = function(){
        return "Vector2: " + x + ", " + y;
    };
		
    this.print = function(){
        trace( "Vector2: " + x + ", " + y + "" );
    };
    
    this.getX = function(){
        return x;
    };
    
    this.getY = function(){
        return y;
    };
    
    this._init(iX,iY);
}
function CFormatText (iX, iY, szText, oParentContainer){
    
    var _iPrevLetterWidth;
    
    var _oTextOutline;
    var _oText;
    var _oTextContainer;
    
    this._init = function(iX, iY, szText, oParentContainer){    
        
        _iPrevLetterWidth = 0;
        
        _oTextContainer = new createjs.Container();
        _oTextContainer.x = iX;
        _oTextContainer.y = iY;
        oParentContainer.addChild(_oTextContainer);
        
        var iDim = 85;
        
        var iScale = 20;
        var iLetterOffset = iDim/iScale;
        
        var iReduceOffset = 9;
        
        for(var i=0; i<szText.length; i++){
            
            var szFontTag = iDim + "px";
            
            _oTextOutline = new createjs.Text();
            _oTextOutline.text = szText[i];
            _oTextOutline.font = "bold "+szFontTag+" "+PRIMARY_FONT;
            _oTextOutline.color = "#000000";
            _oTextOutline.textAlign = "left";
            _oTextOutline.textBaseline = "middle";
            _oTextOutline.x = _iPrevLetterWidth + 2;
			_oTextOutline.y = 2;
            _oTextContainer.addChild(_oTextOutline);

            _oText = new createjs.Text();
            _oText.text = szText[i];
            _oText.font = "bold "+szFontTag+" "+PRIMARY_FONT;
            _oText.color = "#ffffff";
            _oText.textAlign = "left";
            _oText.textBaseline = "middle";
            _oText.x = _iPrevLetterWidth;
            _oTextContainer.addChild(_oText);
            
            _iPrevLetterWidth += _oText.getMeasuredWidth() + iLetterOffset;
            iDim -= iReduceOffset;
            
        }
		
		_oTextContainer.cache(0,-_oTextContainer.getBounds().height/2, _oTextContainer.getBounds().width, _oTextContainer.getBounds().height);
    };
 
    this.unload = function(){
        oParentContainer.removeChild(_oTextContainer);
    };

    this.rotateText = function(iRot){
        _oTextContainer.rotation = iRot;
    };
    
    this._init(iX, iY, szText, oParentContainer);
    
}
function CInterface(){
	var _pStartPosFullscreen;
	var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;
	var _oButFullscreen;
    var _oAudioToggle;
    var _oButExit;
    var _oButSpin;
    var _oButPlus;
    var _oButMin;
    var _oHelpPanel=null;    
    var _iCurAlpha;
    var _oCreditNum;
    var _oMoneyNum;
    var _oBetNum;
    var _oParent;
    var _oTextHighLight;
    
    var _pStartPosExit;
    var _pStartPosAudio;
    
    this._init = function(){
        _oParent = this;
        _iCurAlpha = 0;
        
        var oExitX;        
        
        var oSprite = s_oSpriteLibrary.getSprite('but_credits');
        _pStartPosExit = {x: CANVAS_WIDTH - (oSprite.height/2)- 10, y: (oSprite.height/2) + 10};
        _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSprite,true);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);
        
        oExitX = CANVAS_WIDTH - (oSprite.width/2) - 100;
        _pStartPosAudio = {x: oExitX, y: (oSprite.height/2) + 10};
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _oAudioToggle = new CToggle(_pStartPosAudio.x,_pStartPosAudio.y,oSprite,s_bAudioActive);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);          
        }      
		
		var doc = window.document;
        var docEl = doc.documentElement;
        _fRequestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        _fCancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
        
        if(ENABLE_FULLSCREEN === false){
            _fRequestFullScreen = false;
        }
        
        if (_fRequestFullScreen && inIframe() === false){
            oSprite = s_oSpriteLibrary.getSprite('but_fullscreen');
            _pStartPosFullscreen = {x:oSprite.width/4 + 10,y:oSprite.height/2 + 10};

            _oButFullscreen = new CToggle(_pStartPosFullscreen.x,_pStartPosFullscreen.y,oSprite,s_bFullscreen,true);
            _oButFullscreen.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this);
        }
		
        var oSprite = s_oSpriteLibrary.getSprite('but_spin');
        _oButSpin = new CTextButton(500,CANVAS_HEIGHT - 190,oSprite,TEXT_SPIN,"Arial","#ffffff",70, false, s_oStage);
        _oButSpin.enable();
        _oButSpin.addEventListener(ON_MOUSE_UP, this._onButSpinRelease, this);

        var oSprite = s_oSpriteLibrary.getSprite('but_plus');
        _oButPlus = new CTextButton(650,CANVAS_HEIGHT - 320,oSprite,TEXT_PLUS,"Arial","#ffffff",70, false, s_oStage);
        _oButPlus.enable();
        _oButPlus.addEventListener(ON_MOUSE_UP, this._onButPlusRelease, this);

        var oSprite = s_oSpriteLibrary.getSprite('but_plus');
        _oButMin = new CTextButton(350,CANVAS_HEIGHT - 320,oSprite,TEXT_MIN,"Arial","#ffffff",70, false, s_oStage);
        _oButMin.enable();
        _oButMin.addEventListener(ON_MOUSE_UP, this._onButMinRelease, this);
        
        var oCreditTextBack = new createjs.Text(TEXT_CREDITS,"bold 90px "+PRIMARY_FONT, "#000000");
        oCreditTextBack.x = 304;
        oCreditTextBack.y = 204;
        oCreditTextBack.textAlign = "left";
        oCreditTextBack.textBaseline = "alphabetic";
        oCreditTextBack.lineWidth = 400;
        s_oStage.addChild(oCreditTextBack);
                
        var oCreditText = new createjs.Text(TEXT_CREDITS,"bold 90px "+PRIMARY_FONT, "#ffffff");
        oCreditText.x = 300;
        oCreditText.y = 200;
        oCreditText.textAlign = "left";
        oCreditText.textBaseline = "alphabetic";
        oCreditText.lineWidth = 400;
        s_oStage.addChild(oCreditText);
        
        _oCreditNum = new createjs.Text(TEXT_CURRENCY + START_CREDIT,"bold 70px "+PRIMARY_FONT, "#ffffff");
        _oCreditNum.x = 320;
        _oCreditNum.y = 350;
        _oCreditNum.textAlign = "left";
        _oCreditNum.textBaseline = "alphabetic";
        _oCreditNum.lineWidth = 400;
        s_oStage.addChild(_oCreditNum);

        _oMoneyNum = new createjs.Text(TEXT_CURRENCY +"0","bold 70px "+PRIMARY_FONT, "#ffffff");
        _oMoneyNum.x = 320;
        _oMoneyNum.y = 560;
        _oMoneyNum.textAlign = "left";
        _oMoneyNum.textBaseline = "alphabetic";
        _oMoneyNum.lineWidth = 400;
        s_oStage.addChild(_oMoneyNum);
        
        _oTextHighLight = new createjs.Text(TEXT_CURRENCY +"0","bold 70px "+PRIMARY_FONT, "yellow");
        _oTextHighLight.x = 320;
        _oTextHighLight.y = 560;
        _oTextHighLight.textAlign = "left";
        _oTextHighLight.textBaseline = "alphabetic";
        _oTextHighLight.lineWidth = 400;
        _oTextHighLight.alpha = _iCurAlpha;
        s_oStage.addChild(_oTextHighLight);
        
        _oBetNum = new createjs.Text(TEXT_CURRENCY +START_BET,"bold 40px "+PRIMARY_FONT, "#ffffff");
        _oBetNum.x = 500;
        _oBetNum.y = 775;
        _oBetNum.textAlign = "center";
        _oBetNum.textBaseline = "alphabetic";
        _oBetNum.lineWidth = 400;
        s_oStage.addChild(_oBetNum);
		
        
        this.refreshButtonPos(s_iOffsetX,s_iOffsetY);
    };

    
    this.unload = function(){
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }

        _oButExit.unload();
        _oButSpin.unload();
		if (_fRequestFullScreen && inIframe() === false){
            _oButFullscreen.unload();
        }
        
        s_oInterface = null;
    };

    this.refreshCredit = function(iValue){        
        _oCreditNum.text = TEXT_CURRENCY + iValue;
    };
    
    this.clearMoneyPanel = function(){
        _oTextHighLight.alpha=0;
        createjs.Tween.removeTweens(_oTextHighLight); 
    };

    this.refreshMoney = function(iValue){        
        _oMoneyNum.text = TEXT_CURRENCY + iValue;
        _oTextHighLight.text = TEXT_CURRENCY + iValue;  
		
        
    };

    this.refreshBet = function(iValue){
        _oBetNum.text = TEXT_CURRENCY + iValue;
    };

    this.animWin = function(){
        if(_iCurAlpha === 1){
            _iCurAlpha = 0;
            createjs.Tween.get(_oTextHighLight).to({alpha:_iCurAlpha }, 150,createjs.Ease.cubicOut).call(function(){_oParent.animWin();});
        }else{
            _iCurAlpha = 1;
            createjs.Tween.get(_oTextHighLight).to({alpha:_iCurAlpha }, 150,createjs.Ease.cubicOut).call(function(){_oParent.animWin();});
        }
        
    };

    this._onButSpinRelease = function(){
        s_oGame.spinWheel();
    };
    
    this._onButPlusRelease = function(){
        s_oGame.modifyBonus("plus");
    };

    this._onButMinRelease = function(){
        s_oGame.modifyBonus("min");
    };

    this.disableSpin = function(bDisable){
        if(bDisable === true){
            _oButSpin.disable();
            _oButPlus.disable();
            _oButMin.disable();
        } else {
            _oButSpin.enable();
            _oButPlus.enable();
            _oButMin.enable();
        }        
    };
    
    this.refreshButtonPos = function(iNewX,iNewY){
        _oButExit.setPosition(_pStartPosExit.x - iNewX,iNewY + _pStartPosExit.y);
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
			_oAudioToggle.setPosition(_pStartPosAudio.x - iNewX,iNewY + _pStartPosAudio.y);
		}
		if (_fRequestFullScreen && inIframe() === false){
            _oButFullscreen.setPosition(_pStartPosFullscreen.x + iNewX,_pStartPosFullscreen.y + iNewY);
        }
    };
    
    this._onAudioToggle = function(){
        createjs.Sound.setMute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
	
	this._onFullscreenRelease = function(){
        if(s_bFullscreen) { 
            _fCancelFullScreen.call(window.document);
            s_bFullscreen = false;
        }else{
            _fRequestFullScreen.call(window.document.documentElement);
            s_bFullscreen = true;
        }
        
        sizeHandler();
    };
    
    this._onExit = function(){
        //$(s_oMain).trigger("end_session");
        //s_oGame.onExit(); 
		$("#contractModal").modal("show"); 
    };
    
    s_oInterface = this;
    
    this._init();
    
    return this;
}

var s_oInterface = null;

function CWheel (iX, iY){
    
    var _aText;
    var _aColors;
    var _aPrize;
    
    var _oWheel;
    var _oWheelContainer;
    var _oSpinSound;
    
    this._init = function(iX, iY){    
        
        _aText = new Array();
        _aColors = new Array();
        
        _aPrize = new Array();
        for(var i=0; i<WHEEL_SETTINGS.length; i++){
            _aPrize[i] = WHEEL_SETTINGS[i].prize;
        }
        
        
        this._initColors();
        
        var oSprite = s_oSpriteLibrary.getSprite('wheel');
        
        _oWheelContainer = new createjs.Container();
        _oWheelContainer.x = iX;
        _oWheelContainer.y = iY;
        s_oStage.addChild(_oWheelContainer);
		
     
        _oWheel = createBitmap(oSprite);
        _oWheel.regX = oSprite.width/2;
        _oWheel.regY = oSprite.height/2;
        _oWheelContainer.addChild(_oWheel);
		_oWheel.cache(0, 0, oSprite.width, oSprite.height);
        
        this.setText(1);

    };
 
    this.unload = function(){
        s_oStage.removeChild(_oWheelContainer);
        
    };
    
    this._initColors = function(){
        for(var i=0; i<9; i++){
            _aColors[0] = "violet";
        }    
        for(var i=351; i<=360; i++){
            _aColors[i] = "violet";
        }
        
        for (var j=0; j<4; j++){
            for(var i=9+j*SEGMENT_ROT*5; i<27+j*SEGMENT_ROT*5; i++){
                _aColors[i] = "blue";
            }
        }
        
        for (var j=0; j<4; j++){
            for(var i=27+j*SEGMENT_ROT*5; i<45+j*SEGMENT_ROT*5; i++){
                _aColors[i] = "green";
            }
        }
        
        for (var j=0; j<4; j++){
            for(var i=45+j*SEGMENT_ROT*5; i<63+j*SEGMENT_ROT*5; i++){
                _aColors[i] = "yellow";
            }
        }
        
        for (var j=0; j<4; j++){
            for(var i=63+j*SEGMENT_ROT*5; i<81+j*SEGMENT_ROT*5; i++){
                _aColors[i] = "red";
            }
        }
        
        for (var j=0; j<3; j++){
            for(var i=81+j*SEGMENT_ROT*5; i<=99+j*SEGMENT_ROT*5; i++){
                _aColors[i] = "violet";
            }
        }
        
        for(var i=315; i<=333; i++){
            _aColors[i] = "white";
        }
        
    };
    
    this.setText = function(){
        var oStartTextPos = {x: -355, y: 3};
        var vVect = new CVector2(oStartTextPos.x, oStartTextPos.y);
        var iLocalRot = SEGMENT_ROT;
        var iRotation =  (Math.PI*SEGMENT_ROT)/180;        
        
        for(var i=0; i<_aPrize.length; i++ ){ 
			var text = "";
			var rate = (win_occurence_server[i]/10)+"%"
            if(_aPrize[i] > 0){
				text = "x"+_aPrize[i]+"-"+rate;
			} else{ 
				text = "    "+rate;
			}
            _aText[i] = new CFormatText(vVect.getX(), vVect.getY(), text, _oWheelContainer);
            _aText[i].rotateText(-iLocalRot*i);
            
            rotateVector2D(iRotation,vVect);           
        }
    };
    
    this.clearText = function(){
        for(var i=0; i<_aPrize.length; i++ ){
            _aText[i].unload();
        }
    };
    
    this.spin = function(iValue,iTimeMult){
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
           createjs.Sound.play("start_reel");
           _oSpinSound = createjs.Sound.play("reel", {loop:-1});
           _oSpinSound.volume = 0.1;
        }

        createjs.Tween.get(_oWheelContainer).to({rotation:_oWheelContainer.rotation + iValue}, WHEEL_SPIN_TIMESPEED*iTimeMult, createjs.Ease.quartOut)//cubicOut
                .call(function(){_oWheelContainer.rotation %= 360; s_oGame.releaseWheel(); if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){_oSpinSound.stop();}});
    };
    
    this.getDegree = function(){
        return _oWheelContainer.rotation;
    };
    
    this.getColor = function(){
        var iDeg = Math.round(_oWheelContainer.rotation);
        return _aColors[iDeg];
    };
	
    this._init(iX, iY);
    
}
function CLeds (iX, iY){
    var _szWinColor;
    var _szAnimColor;
    
    var _iLedState;
    var _iTimeElaps;
    var _iNumIdleAnim;
    var _iCurLed;
    var _iCurLed2;
    
    var _aLeds;
    var _aLedsPos;
    var _aColors;
    
    var _oLedsContainer;
    
    this._init = function(iX, iY){    

        _iNumIdleAnim = 3;
        _iLedState = Math.floor(Math.random()*_iNumIdleAnim);
        _iTimeElaps = 0;
        

        _aLeds = new Array();
        _aLedsPos = new Array();
        _aColors = new Array();
        _aColors = ["white", "green", "blue", "violet", "red", "yellow"];

        _oLedsContainer = new createjs.Container();
        _oLedsContainer.x = iX;
        _oLedsContainer.y = iY;
        s_oStage.addChild(_oLedsContainer);

        var oSprite = s_oSpriteLibrary.getSprite('leds');
        var iLedWidth = 90;
        var iLedHeight = 90;
        var oData = {   // image to use
                        images: [oSprite],
                        //framerate:15,
                        // width, height & registration point of each sprite
                        frames: {width: iLedWidth, height: iLedHeight, regX: iLedWidth/2, regY: iLedHeight/2}, 
                        animations: {  off: [0], white: [1], green: [2], blue: [3], violet: [4], red: [5], yellow: [6]}
                        
        };
        var oSpriteSheet = new createjs.SpriteSheet(oData);        
        
        var oStartLedPos = {x: -427, y:0};
        var vVect = new CVector2(oStartLedPos.x, oStartLedPos.y);
        var iRotation =  (Math.PI*(360/WHEEL_SETTINGS.length))/180;
        
        
        
        for(var i=0; i<WHEEL_SETTINGS.length; i++ ){
            _aLeds[i] = createSprite(oSpriteSheet,"off",0,0,iLedWidth,iLedHeight);            
            _aLeds[i].x = vVect.getX();
            _aLeds[i].y = vVect.getY();
            rotateVector2D(iRotation,vVect);
            _oLedsContainer.addChild(_aLeds[i]);
        }
        
        _aLeds[0].visible = false;
        

    };
 
    this.unload = function(){
        s_oStage.removeChild(_oLedsContainer);
    };
    this.setWinColor = function(szColor){
        _szWinColor = szColor;
    };
    
    this.getState = function(){
        return _iLedState;
    };
    
    this.getNumAnim = function(){
        return _iNumIdleAnim;
    };
    
    this.changeAnim = function(iState){
        _iTimeElaps = 0;
        _iLedState = iState;
        for(var i=0; i<_aLeds.length; i++){
            _aLeds[i].gotoAndStop("off");
        }      
    };
    
    this.animIdle0 = function(){
        _iTimeElaps += s_iTimeElaps;
        
        if(_iTimeElaps >= 0 && _iTimeElaps < ANIM_IDLE1_TIMESPEED/2){
            for(var i=0; i<_aLeds.length; i++){
                if(i%2 === 0){                    
                    _aLeds[i].gotoAndStop("white");
                } else {
                    _aLeds[i].gotoAndStop("off");
                }
                
            }            
        } else if (_iTimeElaps >= ANIM_IDLE1_TIMESPEED/2 && _iTimeElaps < ANIM_IDLE1_TIMESPEED){
            for(var i=0; i<_aLeds.length; i++){
                if(i%2 === 0){
                    _aLeds[i].gotoAndStop("off");
                } else {
                    _aLeds[i].gotoAndStop("white");
                }
            }            
        } else {
            _iTimeElaps = 0;
        }
    
    };
    
    
    this.animIdle1 = function(){
      
        if(_iTimeElaps === 0){
            _iCurLed = 0;
            _aLeds[_iCurLed].gotoAndStop("white");
            _aLeds[_aLeds.length/4].gotoAndStop("white");
            _aLeds[_aLeds.length/2].gotoAndStop("white");
            _aLeds[_aLeds.length*3/4].gotoAndStop("white");
            
        }

        _iTimeElaps += s_iTimeElaps;
        
        if(_iTimeElaps > ANIM_IDLE2_TIMESPEED){
            
            if(_iCurLed === _aLeds.length/4){         
                _iCurLed = 0;
                _iTimeElaps=1;
            }

            if(_iCurLed === 0){
                _aLeds[_aLeds.length-1].gotoAndStop("off");
                _aLeds[0].gotoAndStop("white");
                
                _aLeds[_aLeds.length/4-1].gotoAndStop("off");
                _aLeds[_aLeds.length/4].gotoAndStop("white");
                
                _aLeds[_aLeds.length/2-1].gotoAndStop("off");
                _aLeds[_aLeds.length/2].gotoAndStop("white");
                
                _aLeds[_aLeds.length*3/4-1].gotoAndStop("off");
                _aLeds[_aLeds.length*3/4].gotoAndStop("white");
                
            }  else {
                _aLeds[_iCurLed-1].gotoAndStop("off");
                _aLeds[_iCurLed].gotoAndStop("white");
                
                _aLeds[_aLeds.length/4 + _iCurLed-1].gotoAndStop("off");
                _aLeds[_aLeds.length/4 + _iCurLed].gotoAndStop("white");
                
                _aLeds[_aLeds.length/2 + _iCurLed-1].gotoAndStop("off");
                _aLeds[_aLeds.length/2 + _iCurLed].gotoAndStop("white");
                
                _aLeds[_aLeds.length*3/4 + _iCurLed-1].gotoAndStop("off");
                _aLeds[_aLeds.length*3/4 + _iCurLed].gotoAndStop("white");                
            }
            
            
            _iCurLed++;
            _iTimeElaps=1;
        }       
        
    };
    
    this.animIdle2 = function (){
        
        if(_iTimeElaps === 0){
            _iCurLed = 0;
            _iCurLed2 = _aLeds.length/2;
            _aLeds[_iCurLed].gotoAndStop("white");
            _aLeds[_iCurLed2].gotoAndStop("white");
        }
        
        _iTimeElaps += s_iTimeElaps;
        
        if(_iTimeElaps > ANIM_IDLE3_TIMESPEED){
            
            if(_iCurLed === _aLeds.length/2){         
                _iCurLed = 0;
                _iCurLed2 = _aLeds.length/2;
                _iTimeElaps=1;
            }
            if(_iCurLed === 0){
                _aLeds[_aLeds.length-1].gotoAndStop("off");
                _aLeds[1].gotoAndStop("off");
                _aLeds[0].gotoAndStop("white");
                
                _aLeds[_aLeds.length/2+1].gotoAndStop("off");
                _aLeds[_aLeds.length/2-1].gotoAndStop("off");
                _aLeds[_aLeds.length/2].gotoAndStop("white");
                
            }else {
                _aLeds[_iCurLed-1].gotoAndStop("off");
                _aLeds[_iCurLed].gotoAndStop("white");
                
                if(_iCurLed !== 1){
                        _aLeds[_aLeds.length - _iCurLed + 1].gotoAndStop("off");
                    }                    
                _aLeds[_aLeds.length - _iCurLed].gotoAndStop("white");              


                _aLeds[_iCurLed2 + 1].gotoAndStop("off");
                _aLeds[_iCurLed2].gotoAndStop("white");

                _aLeds[_aLeds.length - _iCurLed2 -1].gotoAndStop("off");
                if(_iCurLed2 !== 0){
                    _aLeds[_aLeds.length - _iCurLed2].gotoAndStop("white");
                }
                               
            }            
            _iCurLed++;
            _iCurLed2--;
            _iTimeElaps=1;           
        }
        
    };
 
    this.animSpin0 = function(){
      
        if(_iTimeElaps === 0){
            _iCurLed = Math.floor(Math.random()*_aLeds.length);
            _aLeds[_iCurLed].gotoAndStop("white");
        }

        _iTimeElaps += s_iTimeElaps;
        
        if(_iTimeElaps > ANIM_SPIN_TIMESPEED){
            
            if(_iCurLed < 0){         
                _iCurLed = _aLeds.length -1;
                _iTimeElaps=1;
            }
            
            if(_iCurLed === _aLeds.length -1){
                _aLeds[0].gotoAndStop("off");
                _aLeds[_aLeds.length - 1].gotoAndStop("white");
            }  else {
                _aLeds[_iCurLed + 1].gotoAndStop("off");
                _aLeds[_iCurLed].gotoAndStop("white");
            }
           
            _iCurLed--;
            _iTimeElaps=1;
        }       
        
    };

    this.animWin0 = function(){
        _iTimeElaps += s_iTimeElaps;
        
        if(_iTimeElaps >= 0 && _iTimeElaps < ANIM_WIN1_TIMESPEED/2){
            for(var i=0; i<_aLeds.length; i++){
                if(i%2 === 0){                    
                    _aLeds[i].gotoAndStop(_szWinColor);
                } else {
                    _aLeds[i].gotoAndStop("off");
                }
                
            }            
        } else if (_iTimeElaps >= ANIM_WIN1_TIMESPEED/2 && _iTimeElaps < ANIM_WIN1_TIMESPEED){
            for(var i=0; i<_aLeds.length; i++){
                if(i%2 === 0){
                    _aLeds[i].gotoAndStop("off");
                } else {
                    _aLeds[i].gotoAndStop(_szWinColor);
                }
            }            
        } else {
            _iTimeElaps = 0;
        }
    
    };
    
    this.animWin1 = function (){
        
        if(_iTimeElaps === 0){
            _iCurLed = 0;
            _iCurLed2 = _aLeds.length/2;
            _szAnimColor = _szWinColor;
            _aLeds[_iCurLed].gotoAndStop(_szAnimColor);
            _aLeds[_iCurLed2].gotoAndStop(_szAnimColor);
        }
        
        _iTimeElaps += s_iTimeElaps;
        
        if(_iTimeElaps > ANIM_WIN2_TIMESPEED){
            
            if(_iCurLed > _aLeds.length/4){         
                _iCurLed = 0;
                _iCurLed2 = _aLeds.length/2;
                _iTimeElaps=1;
                if(_szAnimColor === _szWinColor){
                    _szAnimColor = "off";
                } else {
                    _szAnimColor = _szWinColor;
                }
            }
            if(_iCurLed === 0){
                _aLeds[0].gotoAndStop(_szAnimColor);
                _aLeds[_aLeds.length/2].gotoAndStop(_szAnimColor);
                
            }else if(_iCurLed <= _aLeds.length/4) {
                _aLeds[_iCurLed].gotoAndStop(_szAnimColor);                   
                _aLeds[_aLeds.length - _iCurLed].gotoAndStop(_szAnimColor);              

                _aLeds[_iCurLed2].gotoAndStop(_szAnimColor);
                if(_iCurLed2 !== 0){
                    _aLeds[_aLeds.length - _iCurLed2].gotoAndStop(_szAnimColor);
                }
                               
            } 
            
            _iCurLed++;
            _iCurLed2--;
            _iTimeElaps=1;           
        }
        
    };
    
    this.animLose = function(){
        for(var i=0; i<_aLeds.length; i++){
            _aLeds[i].gotoAndStop(_szWinColor);
        }
        _iLedState = -1;
    };
    
    this.update = function(){
      
        switch(_iLedState) {
            case 0:{
                    this.animIdle0();
               break;
            } case 1: {
                    this.animIdle1();
               break;              
               
            } case 2: {
                    this.animIdle2();
               break;              
               
            } case 3: {
                    this.animSpin0();
               break;              
               
            } case 4: {
                    this.animWin0();
               break;              
               
            } case 5: {
                    this.animWin1();
               break;              
               
            } case 6: {
                    this.animLose();
               break;              
               
            }   

        } 
        
    };
    
    this._init(iX, iY);
    
}