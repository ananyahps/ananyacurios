var colour="white";
var sparkles=50;

var x=400;
var y=300;
var ox=400;
var oy=300;

var tiny=[];
var star=[];
var starv=[];
var starx=[];
var stary=[];
var tinyx=[];
var tinyy=[];
var tinyv=[];


/* Sparkle container */
var sparkleContainer;


/* Start */
window.onload=function() {

  sparkleContainer=document.createElement("div");

  sparkleContainer.style.position="fixed";
  sparkleContainer.style.left="0";
  sparkleContainer.style.top="0";
  sparkleContainer.style.width="100vw";
  sparkleContainer.style.height="100vh";
  sparkleContainer.style.overflow="hidden";
  sparkleContainer.style.pointerEvents="none";
  sparkleContainer.style.zIndex="999999";

  document.body.appendChild(sparkleContainer);


  var i, rats, rlef, rdow;

  for (i=0; i<sparkles; i++) {

    /* Tiny sparkle */
    rats=createDiv(3,3);
    rats.style.visibility="hidden";

    sparkleContainer.appendChild(tiny[i]=rats);

    starv[i]=0;
    tinyv[i]=0;


    /* Star sparkle */
    rats=createDiv(5,5);
    rats.style.backgroundColor="transparent";
    rats.style.visibility="hidden";

    rlef=createDiv(1,5);
    rdow=createDiv(5,1);

    rats.appendChild(rlef);
    rats.appendChild(rdow);

    rlef.style.top="2px";
    rlef.style.left="0px";

    rdow.style.top="0px";
    rdow.style.left="2px";

    sparkleContainer.appendChild(star[i]=rats);
  }

  set_width();
  sparkle();
};


/* Sparkle animation */
function sparkle() {

  var c;

  if (Math.abs(x-ox)>1 || Math.abs(y-oy)>1) {

    ox=x;
    oy=y;

    for (c=0; c<sparkles; c++) {

      if (!starv[c]) {

        star[c].style.left=(starx[c]=x)+"px";
        star[c].style.top=(stary[c]=y+1)+"px";

        star[c].style.clip="rect(0px,5px,5px,0px)";

        star[c].childNodes[0].style.backgroundColor=
        star[c].childNodes[1].style.backgroundColor=
        (colour=="random") ? newColour() : colour;

        star[c].style.visibility="visible";

        starv[c]=20;

        break;
      }
    }
  }


  for (c=0; c<sparkles; c++) {

    if (starv[c]) update_star(c);

    if (tinyv[c]) update_tiny(c);
  }

  setTimeout(sparkle,40);
}


/* Update large sparkle */
function update_star(i) {

  if (--starv[i]==15) {
    star[i].style.clip="rect(1px,4px,4px,1px)";
  }


  if (starv[i]) {

    stary[i]+=1+Math.random()*3;
    starx[i]+=(i%5-2)/5;


    /* Remove at bottom of viewport */
    if (stary[i] < window.innerHeight) {

      star[i].style.top=stary[i]+"px";
      star[i].style.left=starx[i]+"px";

    }
    else {

      star[i].style.visibility="hidden";
      starv[i]=0;
      return;
    }

  }


  else {

    tinyv[i]=20;

    tiny[i].style.top=(tinyy[i]=stary[i])+"px";
    tiny[i].style.left=(tinyx[i]=starx[i])+"px";

    tiny[i].style.width="2px";
    tiny[i].style.height="2px";

    tiny[i].style.backgroundColor=
      star[i].childNodes[0].style.backgroundColor;

    star[i].style.visibility="hidden";
    tiny[i].style.visibility="visible";
  }
}


/* Update tiny sparkle */
function update_tiny(i) {

  if (--tinyv[i]==15) {

    tiny[i].style.width="1px";
    tiny[i].style.height="1px";
  }


  if (tinyv[i]) {

    tinyy[i]+=1+Math.random()*3;
    tinyx[i]+=(i%5-2)/5;


    /* Remove at bottom of viewport */
    if (tinyy[i] < window.innerHeight) {

      tiny[i].style.top=tinyy[i]+"px";
      tiny[i].style.left=tinyx[i]+"px";

    }
    else {

      tiny[i].style.visibility="hidden";
      tinyv[i]=0;
    }

  }
  else {

    tiny[i].style.visibility="hidden";
  }
}


/* Mouse tracking */
document.addEventListener("mousemove",function(e) {

  var rect=sparkleContainer.getBoundingClientRect();

  x=e.clientX-rect.left;
  y=e.clientY-rect.top;

});


/* Resize */
window.addEventListener("resize",set_width);

function set_width() {

  if (sparkleContainer) {

    sparkleContainer.style.width=window.innerWidth+"px";
    sparkleContainer.style.height=window.innerHeight+"px";
  }
}


/* Create sparkle element */
function createDiv(height,width) {

  var div=document.createElement("div");

  div.style.position="absolute";
  div.style.height=height+"px";
  div.style.width=width+"px";
  div.style.overflow="hidden";
  div.style.pointerEvents="none";

  return div;
}


/* Random colour */
function newColour() {

  var c=[];

  c[0]=255;
  c[1]=Math.floor(Math.random()*256);
  c[2]=Math.floor(Math.random()*(256-c[1]/2));

  c.sort(function() {
    return 0.5-Math.random();
  });

  return "rgb("+c[0]+","+c[1]+","+c[2]+")";
}
