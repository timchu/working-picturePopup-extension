// Access current tab URL, required for accessing right data from storage.
chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
  var url = tabs[0].url;
  // use `url` here inside the callback because it's asynchronous!
  keyImgs = chrome.storage.local.get([url]).then((result) => {
    keyImgs = result[url]
    for (key in keyImgs){
      document.body.innerHTML = '<div class=image-container><br><div class="close-button">X</div><img style="max-height:400px; max-width:400px; height:auto; width: auto" src = "' + keyImgs[key] + '" key="' + key + '"></div>' + document.body.innerHTML;
    } 
    let close_buttons = document.getElementsByClassName("close-button")
    for (i = 0; i < close_buttons.length; i++){
      close_buttons[i].addEventListener("click", removeImage);
      close_buttons[i].myUrl = url;
    }
  });
});

function removeImage(evt) {
  let url = evt.currentTarget.myUrl;
  key = this.parentNode.children[2].getAttribute('key');
  this.parentNode.remove();
  chrome.storage.local.get([url]).then((keyImgs) =>{
    delete keyImgs[url][key]
    chrome.storage.local.set({[url]: keyImgs[url]})
  });
  //element.parentNode.remove();
};
