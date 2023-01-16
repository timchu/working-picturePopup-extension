// Access current tab URL, required for accessing right data from storage.
chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
  let url = tabs[0].url;
  // use `url` here inside the callback because it's asynchronous!
  console.log("Tabs query workd")
  keyImgs = chrome.storage.local.get([url]).then((result) => {
    keyImgs = result[url]
    console.log("Keys and Images: " + keyImgs)
    for (key in keyImgs){
      document.body.innerHTML = '<div class=image-container><br><div class="close-button">X</div><img style="max-height:400px; max-width:400px; height:auto; width: auto" src = "' + keyImgs[key] + '" key="' + key + '"></div>' + document.body.innerHTML;
    } 
    let close_buttons = document.getElementsByClassName("close-button")
    for (i = 0; i < close_buttons.length; i++){
      console.log("Close button obtained!");
      close_buttons[i].addEventListener("click", removeImage(url));
    }
  });
});

// Sort of works
function removeImage(url) {
  console.log(this.parentNode.outerHTML);
  key = this.parentNode.children[1].getAttribute('key');
  let keyImgs = chrome.storage.local.get([url])
  delete keyImgs[key]
  console.log("Removing parentNode");
  console.log(this.outerHTML);
  this.parentNode.remove();
  //element.parentNode.remove();
};
