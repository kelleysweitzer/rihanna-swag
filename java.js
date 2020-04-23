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


function drawBackgroundImage(canvas, ctx) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const img = document.getElementById('salt-bae');  
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}


function drawalbum1(src, canvas, ctx) {
  // Create an image object. (Not part of the dom)
  const image = new Image();
  image.src = src;
  
  // After the image has loaded, draw it to the canvas
  image.onload = function() {
      ctx.drawImage(image, canvas.width - 410, canvas.height - 305, 220, 220);
  }
  return image;
}


function drawalbum2(src, canvas, ctx) {
  // Create an image object. (Not part of the dom)
  const image = new Image();
  image.src = src;
  
  // After the image has loaded, draw it to the canvas
  image.onload = function() {
      ctx.drawImage(image, canvas.width - 855, canvas.height - 605, 220, 220);
  }
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
  
  // console.log( storedAlbum1 );
  // console.log( storedAlbum2 );
  location.reload();

  }


onload = function() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  drawBackgroundImage(canvas, ctx);
  if(sessionStorage.length == 0) {
    const album1 = drawalbum1('strokes.jpg', canvas, ctx);
    const album2 = drawalbum2('strokes.jpg', canvas, ctx);
  } else {
    var query1 = sessionStorage.getItem("album1") + " " + sessionStorage.getItem("artist1");
    var query2 = sessionStorage.getItem("album2") + " " +sessionStorage.getItem("artist2");
    console.log(query1);
    var albumart = fetch(query1, query2, canvas, ctx);
    sessionStorage.clear();
  }
  
};
  
  