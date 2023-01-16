console.log("Test");
let images = document.getElementsByTagName("img");
for (i = 0; i < images.length; i++){
  let image = images[i]
  image.onclick = function(){onclick(image.src)}
}

const url = document.URL;
let key = 0;

function onclick(myImageSrc){
  var existingImgKeys;
  chrome.storage.local.get([url]).then((keyImgs) => {
    existingImgKeys = keyImgs[url]
    if (!existingImgKeys){
      existingImgKeys = {}
    }
    existingImgKeys[key.toString()] = myImageSrc;
    key += 1;
    chrome.storage.local.set({[url]: existingImgKeys})
  });
}
