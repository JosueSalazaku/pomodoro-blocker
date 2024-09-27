"use strict"

chrome.storage.sync.get(['blockedSites', 'blockDuration', 'blockStartTime'], function(data) {
    const blockedSites = data.blockedSites;
    const blockDuration = data.blockDuration;
    const blockStartTime = data.blockStartTime;

    console.log('Blocked Sites:', blockedSites);
    console.log('Block Duration (minutes):', blockDuration);
    console.log('Block Start Time:', blockStartTime);

    const blockEndTime = blockStartTime + (blockDuration * 60 * 1000)

});
