function Outstation(){
    return `<div id="outstation">
    <div class="fixedHeader">
        <img src="../Resources/left-arrow.png" alt="">
        <div>Outstation</div>
    </div>

    <div class="inputSection" id="pickupSection">
        <div class="tripType">
            <label class="tripType_switch">
                <input type="checkbox" id="isOneWay">
                <span class="slider round"><span style="position: relative"><span class="OSLeadGen_RoundTripToggle overlap"></span> <span class="RoundTrip" style="margin-left: -10px;" id="round_trip">Round Trip </span></span><span style="position: relative"><span class="OSLeadGen_OneWayToggle overlap"></span> <span class="OnewayTrip" id="oneway">One Way Trip</span></span></span>
            </label>
        </div>
        <div class="headerText" id='pickup_tag'>
            Pick up
        </div>
        <div class="input">
            <div class="inputImages">
                <div class="pickupimage">
                    <img src="../Resources/icpickup.png" alt="">
                </div>
                <div id="line1" class="line"></div>
                <div id="dest_image" class="pickupimage">
                    <img src="../Resources/icdestination.png" alt="">
                </div>
                <div id="line2" class="line"></div>
                <div class="pickupimage">
                    <img src="../Resources/icpickup.png" alt="">
                </div>
            </div>

            <div class="inputFields">
                <div class="inputFieldDiv" id="pickupInput">
                    <input type="text" id="pickup" class='inputField' placeholder="Enter pickup location">
                    <span class='clear-button'>
                        <img src="../Resources/plus_PNG56.png" alt="">
                    </span>
                </div>
                <div class="headerText" id="destination_tag">
                    Destination
                    <div id="destinationInput" class="inputFieldDiv">
                        <input type="text" id="destination" class='inputField' placeholder="Enter a Location">
                        <span class='clear-button'>
                            <img src="../Resources/plus_PNG56.png" alt="">
                        </span>
                    </div>
                </div>
                <div class="headerText" id="return_tag">
                    Return
                    <div id="returnInput" class="inputFieldDiv ">
                        <input type="text" id="return" class='inputboxcontainerdisabled' placeholder="Return will be same as pickup location" disabled>
                        <span class='clear-button'>
                            <img src="../Resources/plus_PNG56.png" alt="">
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="inputSection" id='fromTillWhen'>
        <div>
            <div class="headerText">From when</div>
            <div class="inputboxcontainerinactive" style="margin-top: 9px;padding: 4px;padding-left: 8px;">
                <div class="calendarIcon">
                    <img src="../Resources/calendar_icon.png" alt="">
                </div>
                <div class="datePicker">
                    <input type="date" value="Date and Time">
                </div>
            </div>
        </div>
        <div>
            <div class="headerText">Till when</div>
            <div class="inputboxcontainerinactive" style="margin-top: 9px;padding: 4px;padding-left: 8px;">
                <div class="calendarIcon">
                    <img src="../Resources/calendar_icon.png" alt="">
                </div>
                <div class="datePicker">
                    <input type="date" value="Date and Time">
                </div>
                
            </div>
            <div id='keepVehicle'>(Keep Vehicle till this time)</div>
        </div>
    </div>

    <div class="inputSection" id='numberOfPassengers'>
        <div class="headerText">Number of passengers</div>
        <div style="margin-top:9px">
            <input type="number" placeholder="Max 60" class='inputboxcontainerinactive'>
        </div>
        <div class="inline-error">Enter number of passengers</div>
    </div>

    <button id="proceedButtonOutstation" class="footercont">
        <div class="footertext">PROCEED</div>
    </button>
</div>`
}

export default Outstation