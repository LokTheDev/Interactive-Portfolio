const cannon = $("#cannon");
let cannonPos = parseInt(cannon.css("left").replace("px", ""), 10);
let isFoucs = false

//init modal
$(document).ready(function(){
    $(".modal-start").css('display', 'block')
    $(".modal-start").css('opacity', 1)
    $(".modal-start").css('height', '250px')
    isFoucs = true
})

//bgm
const bgmBtn = $('#bgm-btn')
let bgmOn = false
let BGM = new Audio("/resource/sound/bgm.mp3");

bgmBtn.on('click', function(){
    if(bgmOn == false){
        BGM.loop = true
        BGM.volume = 0.25 
        BGM.play();
        bgmOn = true
        return
    }
    BGM.pause()
    bgmOn = false
})


//Keyboard
document.onkeydown = function (event) {
  let cannonBound = $("#cannon")[0].getBoundingClientRect().x;
  let rightedge = $(".edge")[1].getBoundingClientRect().x;

  switch (event.keyCode) {
    case 37: //left
      if (cannonBound - 30 > 1) {
        cannonPos -= 30;
        cannon.css("left", cannonPos);
      }
      break;
    case 39: //right
      if (cannonBound + 30 < rightedge - 50) {
        cannonPos += 30;
        cannon.css("left", cannonPos);
      }
  }
};

document.onkeypress = function (event) {
    if (event.keyCode == 32) {
      fire();
    }
  };

//Touch Screen
const leftBtn = $('#arrow-left')
const rightBtn = $('#arrow-right')
const spaceBar = $('#sapceBar')

leftBtn.on( "click", function(){
    let cannonBound = $("#cannon")[0].getBoundingClientRect().x;
    let rightedge = $(".edge")[1].getBoundingClientRect().x;
    if (cannonBound - 30 > 1) {
        cannonPos -= 30;
        cannon.css("left", cannonPos);
      }
} )

rightBtn.on( "click", function(){
    let cannonBound = $("#cannon")[0].getBoundingClientRect().x;
    let rightedge = $(".edge")[1].getBoundingClientRect().x;
    if (cannonBound + 30 < rightedge - 50) {
        cannonPos += 30;
        cannon.css("left", cannonPos);
      }
} )

spaceBar.on( "click", function(){
    fire();
} )


//Game Func
function fire() {
    if(!isFoucs){
        let position = $("#cannon").offset();
        position.top -= 15;
        position.left += 18;
        const animateBullet = $('<div class="bullet shake" > <img class="bullet-img" src="/resource/bullet.png"> </div>');
        $(animateBullet).css("color", "red");
        $(animateBullet).css("position", "absolute");
        $(animateBullet).css(position);
        $(".zone").append(animateBullet);
        const snd = new Audio("/resource/sound/lazer.mp3");
        snd.volume = 0.5 
        snd.play();
        laserAnimate(animateBullet);
        isHit(position)
    }
}

function laserAnimate(animateBullet) {
  let distance = $(animateBullet).offset().top;
  while (distance > 5) {
    distance = distance - 0.25;
    $(animateBullet).css("top", distance);
  }
  setTimeout(function(){
    $(animateBullet).remove();
    },900); 
}

function isHit(position){
    const bullet = $('<div></div>');
    $(bullet).css("position", "absolute");
    position.top = 0
    $(bullet).css(position);
    $(".zone").append(bullet);
    let left = $(bullet).offset().left
    
    const about = $('.about').offset().left
    const exp = $('.exp').offset().left
    const project = $('.project').offset().left
    const contact = $('.contact').offset().left
    const snd = new Audio("resource/sound/hit.mp3");


    if(left > about - 50 && left < about + 100){
        $('.about').addClass("shake");
        snd.play();
        setTimeout(function(){
            $(".modal-about").css('display', 'block')
            $(".modal-about").css('opacity', 1)
            blurBG()
        },300); 
    }

    if(left > exp - 50 && left < exp + 150){
        $('.exp').addClass("shake");
        snd.play();
        setTimeout(function(){
            $(".modal-exp").css('display', 'block')
            $(".modal-exp").css('opacity', 1)
            blurBG()
        },300); 
    }

    if(left > project - 50 && left < project + 150){
        $('.project').addClass("shake");
        snd.play();
        setTimeout(function(){
            $(".modal-project").css('display', 'block')
            $(".modal-project").css('opacity', 1)
            blurBG()
        },300); 
    }

    if(left > contact - 50 && left < contact + 150){
        $('.contact').addClass("shake");
        snd.play();
        setTimeout(function(){
            $(".modal-contact").css('display', 'block')
            $(".modal-contact").css('opacity', 1)
            blurBG()
        },300); 
    }

}

function blurBG(modal){
    //$(".zone").css("-webkit-filter", "blur(5px) grayscale(10%)");
    $(".zone").css("opacity", "40%");
    isFoucs = true
    bornRex()
    let time = $('.dino').length
    for(let i = 0; i < time; i++){
        rexAnimate(i)
    }
}


/*Dino Party*/

function bornRex(){
    const dino = $('<img class="dino shake" src="/resource/blu.png">');
    var h = $(".zone").height();
    var w = $(".zone").width();
    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);
    $(dino).offset({ top: nh, left: nw })
    $('.options').append(dino)
}

function rexMove(){
    
    // Get viewport dimensions (remove the dimension of the div)
    var h = $(".zone").height();
    var w = $(".zone").width() ;
    
    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);
    
    return [nh,nw];    
    
}

function rexAnimate(index){
    var newq = rexMove();
    $('.dino').animate({ top: newq[0], left: newq[1] }, 10000,   function(){
        animateDiv('.dino');        
      });
};



/*Dino Party*/


function closeModal(modal){
    switch(modal){
        case 'about':
            $(".modal-about").css('opacity', 0)
            $(".modal-about").css('display', 'none')
            $(".zone").css("opacity", "1");
            $('.about').removeClass("shake");
            break;
        case 'exp':
            $(".modal-exp").css('opacity', 0)
            $(".modal-exp").css('display', 'none')
            $(".zone").css("opacity", "1");
            $('.exp').removeClass("shake");
            break;
        case 'project':
            $(".modal-project").css('opacity', 0)
            $(".modal-project").css('display', 'none')
            $(".zone").css("opacity", "1");
            $('.project').removeClass("shake");
            break;
        case 'contact':
            $(".modal-contact").css('opacity', 0)
            $(".modal-contact").css('display', 'none')
            $(".zone").css("opacity", "1");
            $('.contact').removeClass("shake");
            break;
        case 'start':
            $(".modal-start").css('opacity', 0)
            $(".modal-start").css('display', 'none')
        break;
    }
    isFoucs = false
}




/*Project Animation*/
const ShellBtn = $('#shellBtn')
let ShellConfirmed = false

ShellBtn.on('click', function(){
    if(!ShellConfirmed){
    const line = '-r--------   3 LokTheDev  staff     96 22 Jul  2099 LokDev Project!!'

    function shellAnimate(name, iteration) {
        if (iteration === name.length)
            return;
        setTimeout(function() {
            $('.animationText').text( $('.animationText').text() + name[iteration++] );
            shellAnimate(name, iteration);
        }, 50);
    }
    shellAnimate(line, 0); 
    showProject()
    }
    ShellConfirmed = true
})


function showProject(){
    setTimeout(function(){
        $(".PJwrap").css('display', 'block')
    },3000); 
}


//Create Drag and Drop for Project
let dragged;
document.getElementById('droppable').addEventListener('dragenter', function (e) { e.preventDefault() });
document.getElementById('droppable').addEventListener('dragover', function (e) { e.preventDefault() });
document.getElementById('droppable').addEventListener('drop', function (e) {
    e.preventDefault(); 
    const snd = new Audio("/resource/sound/bin.mp3");
    snd.volume = 0.5 
    snd.play();
    $("#binImg").attr('src', '/resource/bin-full.png')
    dragged.parentNode.removeChild(dragged);
});

let draggables = document.querySelectorAll('[draggable=true]');
for (let i = 0; i < draggables.length; i++) {
    draggables[i].addEventListener("dragstart", function (e) {        
        dragged = this;
        e.dataTransfer.setData('Text', this.getAttribute('data-letter')); });
}


/*Contact Walking Effect*/
$(document).ready(function(){
    animateDiv('.contact-item-a');
    animateDiv('.contact-item-b');
    animateDiv('.contact-item-c');
});

function makeNewPosition(){
    
    // Get viewport dimensions (remove the dimension of the div)
    var h = $('.content-contact').height() - 10;
    var w = $('.content-contact').width() - 70;
    
    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);
    
    return [nh,nw];    
    
}

function animateDiv(myclass){
    var newq = makeNewPosition();
    $(myclass).animate({ top: newq[0], left: newq[1] }, 1000,   function(){
      animateDiv(myclass);        
    });
    
};

