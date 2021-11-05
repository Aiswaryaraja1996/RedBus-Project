function ImportantInfo(storedInfo, vehicleObj){
    return `<li>${storedInfo.tripKms} KMs Included. Extra usage at Rs. ${vehicleObj.fareDetails.nonAc.forExtraKm}/km to be paid to the operator.</li>
    <li>Extra usage amount can be paid to redBus online or driver in cash.</li>
    <li>No refunds for usage lesser than ${storedInfo.tripKms} KMs.</li>
    <li>Any extra usage above the time indicated will be charged at Rs.${vehicleObj.fareDetails.nonAc.forExtraHour}/hour.</li>
    <li>Interstate taxes Rs. 680 included.</li>
    <li>Night bata charges of INR 350/Night are applicable in case driver drives between 22:30 and 4:30. Night bata charges for ${storedInfo.outstationFromDate} is already included.</li>
    <li>Pets / animals not allowed inside the vehicle</li>`
}

export default ImportantInfo