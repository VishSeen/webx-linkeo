const linkeoWin = "popup.html";

chrome.browserAction.onClicked.addListener((tab) => {
    window.open(linkeoWin, "", "width=400,height=675");
});



// getting jira link from content script
chrome.runtime.onMessage.addListener((msg, sender) => {
    // First, validate the message's structure.
    if ((msg.from === 'content') && (msg.subject === 'showPageAction')) {
        // Enable the page-action for the requesting tab.
        chrome.pageAction.show(sender.tab.id);
    }
});