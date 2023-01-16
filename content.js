let popup = window.open(
    chrome.runtime.getURL("normal_popup.html"),
    "exampleName",
    "width=400,height=400"
);
function onLoad(popup) { 
  console.log("WINDOW LOADED");
}
let images = document.getElementsByTagName("img");
for (i = 0; i < images.length; i++){
  let image = images[i]
  image.onclick = function(){onclick(image.src)}
}

const first_image = images[0];
function onclick(myImageSrc){
  console.log("clicked");
  (async () => {
    const response = await chrome.runtime.sendMessage({imageSrc: myImageSrc});
    // do something with response here, not outside the function
    console.log(response);
  })();
}
