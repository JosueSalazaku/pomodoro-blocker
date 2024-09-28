"use strict"

chrome.storage.sync.get(['blockedSites', 'blockDuration', 'blockStartTime'], function(data) {
    const blockedSites = data.blockedSites;
    const blockDuration = data.blockDuration;
    const blockStartTime = data.blockStartTime;

    console.log('Blocked Sites:', blockedSites);
    console.log('Block Duration (minutes):', blockDuration);
    console.log('Block Start Time:', blockStartTime);

    const blockEndTime = blockStartTime + (blockDuration * 60 * 1000)
    const currentTime = Date.now();

    if (currentTime < blockEndTime) {
        chrome.webRequest.onBeforeRequest.addListener(
            function (detail) {
                console.log(`Blocking request to: ${detail.url}`);
                return { cancel: true };
            },
            { url: blockedSites.map(site => `*://${site}/*`) },
            ["blocking"]
        );
    } else {
        console.log('Block period has ended, no sites are blocked.');
        chrome.webRequest.onBeforeRequest.removeListener(() => {});
    }

});
