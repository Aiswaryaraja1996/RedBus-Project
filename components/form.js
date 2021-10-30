function FormEl(){
    return `<div class='formNav bg-red c-white'>
    <h2>Hire a Vehicle</h2>
</div>
<div class="formContent c-main">
    <h3>
        Click on journey type
    </h3>
    <div class="journeyType">
        <div class="journeyTypeChild outstation">
            <div class="journeyTypeChildText">
                <h4>Outstation</h4>
                <p>Anywhere outside your city</p>
            </div>
            <div class="journeyTypeChildImage">
                <img src="../Resources/asset_outstation.png" alt="">
            </div>
        </div>

        <div class="journeyTypeChild">
            <div class="journeyTypeChildText">
                <h4>Local</h4>
                <p>Anywhere within your city</p>
            </div>
            <div class="journeyTypeChildImage">
                <img src="../Resources/asset_local.png" alt="">
            </div>
        </div>

        <div class="journeyTypeChild">
            <div class="journeyTypeChildText">
                <h4>Airport</h4>
                <p>Pickup and drop to airport</p>
            </div>
            <div class="journeyTypeChildImage">
                <img src="../Resources/asset_airport.png" alt="">
            </div>
        </div>
    </div>

    <div class="employeeTransportWrapper">
        <div class='employee-transport'>
            <h4>Employee Transport</h4>
            <p>Completely managed employee transport</p>
            <a href="#">Know more</a>
        </div>
    </div>
</div>`
}

export default FormEl