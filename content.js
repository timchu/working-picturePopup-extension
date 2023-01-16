console.log("Test");
let images = document.getElementsByTagName("img");
for (i = 0; i < images.length; i++){
  let image = images[i]
  image.onclick = function(){onclick(image.src)}
}

const url = document.URL;
let key = 0;

function onclick(myImageSrc){
  console.log("clicked");
  var existingImgKeys;
  chrome.storage.local.get([url]).then((keyImgs) => {
    existingImgKeys = keyImgs[url]
    if (!existingImgKeys){
      existingImgKeys = {}
    }
    console.log("Existing image keys: " + JSON.stringify(existingImgKeys));
    existingImgKeys[key.toString()] = myImageSrc;
    key += 1;
    chrome.storage.local.set({[url]: existingImgKeys})
    console.log(url);
    console.log("Existing image keys at end: " + JSON.stringify(existingImgKeys));
  });
}
