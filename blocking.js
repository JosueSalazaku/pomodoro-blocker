"use strict";

chrome.storage.sync.get(['blockedSites', 'blockDuration', 'blockStartTime'], function(data) {
    const blockedSites = data.blockedSites;
    const blockDuration = data.blockDuration;
    const blockStartTime = data.blockStartTime;

    console.log('Blocked Sites:', blockedSites);
    console.log('Block Duration (minutes):', blockDuration);
    console.log('Block Start Time:', blockStartTime);

    const blockEndTime = blockStartTime + (blockDuration * 60 * 1000);
    const currentTime = Date.now();

    if (currentTime < blockEndTime) {
        const rules = blockedSites.map((site, index) => {
            const pattern = `*://*.${site}/*`;  
            return {
                "id": index + 1, 
                "priority": 1,
                "action": { "type": "block" },  
                "condition": { "urlFilter": pattern, "resourceTypes": ["main_frame"] }  
            };
        });

        chrome.declarativeNetRequest.getDynamicRules(existingRules => {
            const existingRuleIds = existingRules.map(rule => rule.id);
            chrome.declarativeNetRequest.updateDynamicRules({
                removeRuleIds: existingRuleIds,
                addRules: rules
            }, () => {
                console.log('Blocking rules updated:', rules);
            });
        });
    } else {
        console.log('Block period has ended, no sites are blocked.');
        chrome.declarativeNetRequest.updateDynamicRules({
            removeRuleIds: []  
        });
    }
});
