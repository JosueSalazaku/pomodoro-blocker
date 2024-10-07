"use strict";
chrome.storage.sync.get(['blockedSites', 'blockDuration', 'blockStartTime'], function(data) {
    const blockedSites = data.blockedSites;
    const blockDuration = data.blockDuration;
    const blockStartTime = data.blockStartTime;

    if (!blockedSites || !blockDuration || !blockStartTime) {
        console.log('Missing required data to proceed with blocking.');
        return;
    }

    console.log('Blocked Sites:', blockedSites);
    console.log('Block Duration (minutes):', blockDuration);
    console.log('Block Start Time:', blockStartTime);

    const blockEndTime = blockStartTime + (blockDuration * 60 * 1000);
    const currentTime = Date.now();

    if (currentTime < blockEndTime) {
        const rules = blockedSites.map((site, index) => {
            const domain = site.replace(/https?:\/\//, '').replace(/www\./, '');  
            const pattern = `*://*.${domain}/*`;  
            return {
                "id": index + 1,  
                "priority": 1,
                "action": { "type": "block" }, 
                "condition": { 
                    "urlFilter": pattern,  
                    "resourceTypes": ["main_frame"]  
                }
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
        console.log('Block period has ended, removing all blocking rules.');
        chrome.declarativeNetRequest.getDynamicRules(existingRules => {
            const existingRuleIds = existingRules.map(rule => rule.id);  
            chrome.declarativeNetRequest.updateDynamicRules({
                removeRuleIds: existingRuleIds 
            }, () => {
                console.log('All blocking rules removed.');
            });
        });
    }
});
