
(() => {
  const findChats = () => {
    const textBases = document.getElementsByClassName('text-base')
    const chats = []
  
    for (let i = 0; i < textBases.length; i++) {
        const textBase = textBases[i];
        const chat = textBase.children[1].children[0].innerHTML;
        chats.push(chat);
    }
    return chats
  }
  
  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type, value } = obj;
  
    if (type === "LOAD") {
      console.log("LOAD");
    } else if (type === "CONVERT-MD") {
      const chats = findChats();
      response(chats);
    } else if (type === "CONVERT-HTML") {
      const chats = findChats();
      const html = chats.join('<br/><br/>');
      response(html);
    } else if (type === "CONVERT-JSON") {
      const chats = findChats();
      const json = JSON.stringify(chats);
      response(json);
    }
  });
})();