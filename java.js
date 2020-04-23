


function drawBackgroundImage(canvas, ctx) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const img = document.getElementById('rihanna'); 
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}

function drawhands(canvas, ctx) {
  const img = document.getElementById('hands'); 
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return image;
}

function drawalbum2(src, canvas, ctx) {
  // Create an image object. (Not part of the dom)
  const image = new Image();
  image.src = src;
  const img = document.getElementById('hands'); 

  // After the image has loaded, draw it to the canvas
  image.onload = function() {
      ctx.drawImage(image, canvas.width - 280, canvas.height - 280, 220, 220);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  }
  // drawhands(canvas, ctx);
  
  // img.onloadeddata = function () {
  // }
  return image;
}


function drawalbum1(src, canvas, ctx) {
  // Create an image object. (Not part of the dom)
  const image = new Image();
  image.src = src;
  const img = document.getElementById('hands'); 

  // After the image has loaded, draw it to the canvas
  image.onload = function() {
      ctx.drawImage(image, canvas.width - 730, canvas.height - 578, 220, 220);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  }
  // drawhands(canvas, ctx);
  // img. = function () {
  // }
  return image;
}


function store(){

  var album1= document.getElementById("album1");
  sessionStorage.setItem("album1", album1.value);
  
  var artist1 = document.getElementById("artist1");
  sessionStorage.setItem("artist1", artist1.value);
  
  var album2= document.getElementById("album2");
  sessionStorage.setItem("album2", album2.value);
  
  var artist2 = document.getElementById("artist2");
  sessionStorage.setItem("artist2", artist2.value);
  
  location.reload();

  }


onload = function() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  drawBackgroundImage(canvas, ctx);

  if(sessionStorage.length == 0) {
    const hands = drawhands(canvas,ctx);

  } else {
    var query1 = sessionStorage.getItem("album1") + " " + sessionStorage.getItem("artist1");
    var query2 = sessionStorage.getItem("album2") + " " +sessionStorage.getItem("artist2");
    console.log(query1);
    var albumart = fetch(query1, query2, canvas, ctx);
    sessionStorage.clear();
    // const hands = drawhands(canvas,ctx);


  }
  
  function fetch(term1, term2, canvas, ctx){

    $.ajax(
      {
        url: 'https://itunes.apple.com/search',
        crossDomain: true,
        dataType: 'jsonp',
        data: {
          term: term1,
          entity: 'album',
          limit: 1,
          explicit: 'No'
        },
        method: 'GET',
        success: function(data){
          console.log(data);
          albumURL =  data.results[0].artworkUrl100.replace('100x100','480x480');
          console.log(albumURL);
          
      const album1 = drawalbum1(albumURL, canvas, ctx);
 

        },
        
        error: function(e){
          console.log(e);
          return e;
        }
      }
      
      ); 
    
    
      $.ajax(
        {
          url: 'https://itunes.apple.com/search',
          crossDomain: true,
          dataType: 'jsonp',
          data: {
            term: term2,
            entity: 'album',
            limit: 1,
            explicit: 'No'
          },
          method: 'GET',
          success: function(data){
            console.log(data);
            albumURL =  data.results[0].artworkUrl100.replace('100x100','480x480');
            console.log(albumURL);
            const album2 = drawalbum2(albumURL, canvas, ctx);

          },
          
          error: function(e){
            console.log(e);
            return e;
          }
        }
        ); 
  }
};
  
  