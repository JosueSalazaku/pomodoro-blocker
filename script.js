'use strict'
const section = document.getElementById('section')
const blockedSiteInput = document.getElementById('blocked-sites') 
const timeInput = document.getElementById('time')
const submitBtn = document.getElementById('submit-btn')



function convertData() {
    const inputData = blockedSiteInput.value; 
    const timeData = parseInt(timeInput.value);  

    const sitesArray = inputData.split(',').map(site => site.trim());

    console.log("Converted Websites Array:", sitesArray);
    console.log("Block Time in Minutes:", timeData);
}

submitBtn.addEventListener("click", () => {
    convertData()
})
