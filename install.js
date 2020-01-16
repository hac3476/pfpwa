'use strict';

let deferredInstallPrompt = null;
const installButton = document.getElementById('butInstall');
installButton.addEventListener('click', installPWA);

//add event listener for befre install prompt event
window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent);

function saveBeforeInstallPromptEvent(evt){
  deferredInstallPrompt = evt;
  installButton.removeAttribute('hidden');
}//saveBeforeInstallPromptEvent

function installPWA(evt){
  //show install prompt
  deferredInstallPrompt.prompt();
  
  //hide the install button, it can't be called twice
  evt.srcElement.setAttribute('hidden', true);
  
  //log user response to prompt
  deferredInstallPrompt.userChoice.then(choice => {
    if (choice.outcome === 'accepted'){
      console.log('user accepted the A2HS prompt', choice);
    }else{
      console.log('user dismissed the A2HS prompt', choice);
    }
    deferredInstallPrompt = null;
  });
}//installPWA

window.addEventListener('appinstalled', logAppInstalled);

function logAppInstalled(evt){
  //log the event, in a real ap, you would save this information in a file, database, or analytics software
  console.log('App was installed.', evt);
}