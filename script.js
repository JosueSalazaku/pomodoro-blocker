'use strict'
const section = document.getElementById('section')
const blockedSiteInput = document.getElementById('blocked-sites') 
const timeInput = document.getElementById('time')
const submitBtn = document.getElementById('submit-btn')

function convertData() {
    // Retrieve inpute data and store in an Array
    const inputData = blockedSiteInput.value; 
    const timeData = parseInt(timeInput.value);  

    const sitesArray = inputData.split(',').map(site => site.trim());

    console.log("Converted Websites Array:", sitesArray);
    console.log("Block Time in Minutes:", timeData);

    // Store the data in chrome.storage.sync
    chrome.storage.sync.set({
        blockedSites: sitesArray,
        blockedDuration: timeData,
        blockStartTime: Date.now()
    }, function () {
        console.log("Blocked sites and duration saved to chrome storage:", { sitesArray, timeData });
        alert(`Sites ${sitesArray} blocked for ${timeData}, Lets Focus`)
    })
}

submitBtn.addEventListener("click", () => {
    convertData()
})
