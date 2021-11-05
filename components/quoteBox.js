function QuoteBox(busObj){
    const storedInfo = JSON.parse(localStorage.getItem('outstationFormValues'));
    // console.log( busObj.fareDetails.nonAc.baseFare )
    return `<a href="../Html/vehicle.html?id=${busObj.id}" data-id="${busObj.id}">
        <div>
            <div class="quoteBoxVehicleInfo">
                <div class="quoteBoxVehicleImg">
                    <img src="${busObj.vehicleImages[0]}" alt="">
                </div>
                <div class="quoteBoxVehicleMainInfo">
                    <div class="quoteBoxVehicleName">
                        <span>${busObj.name}</span>
                    </div>
                    <div class="quoteBoxVehicleNumber">
                        <span>${busObj.vehicleNumber.number}</span>
                        <img src="../Resources/wysiwyg.svg" alt="">
                    </div>
                </div>
                <div class="quoteBoxVehicleMoreInfo">
                    <div class="amenities">
                                            
                    </div>
                    <div class="startingFrom">
                        <span>Starting From</span>
                        <span>₹ ${storedInfo.tripKms * busObj.fareDetails.nonAc.baseFare}</span>
                        <span>${storedInfo.tripKms} KMS Included</span>
                    </div>
                </div>
            </div>
            

            <div><hr class='quoteBoxLineBreak'></div>
            <div class="quoteBoxExtra">
                <span>1 MORE PACKAGE</span>
                <img src="../Resources/rightArrow.svg" alt="">
            </div>
        </div>
    </a>`
}

export default QuoteBox