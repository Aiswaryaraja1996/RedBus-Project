import FaqBox from '../components/faq.js'
import FormEl from '../components/form.js'
import ImportantInfo from '../components/importantInfo.js'
import Outstation from '../components/outstation.js'
import QuoteBox from '../components/quoteBox.js'


window.addEventListener("scroll", function(){
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    console.log(scrollTop,scrollHeight,clientHeight);
    if (scrollTop + clientHeight >= scrollHeight - 30){
        document.getElementsByClassName("form")[0].style.position="sticky";
    }
})


window.addEventListener('load', () => {
    const windowLoc = window.location.pathname;
    if(windowLoc.includes('busHire.html') ){
    createFaqs(faqObj);
    loadForm();

    const faqHeaders = document.querySelectorAll(".faqHeader");
        faqHeaders.forEach( el => {
            el.addEventListener('click', faqEvent)
    })

    const secFooter = document.querySelector('.secondaryFooter');
    // const secFooterDimensions = secFooter.getBoundingClientRect();
    const formEl = document.querySelector('.form')

    

    // window.addEventListener('scroll', () => {
    //     if(window.scrollY >= secFooterDimensions.top - window.innerHeight){
    //         // console.log("Results: ", window.scrollY - secFooterDimensions.top)
    //         formEl.style.bottom = `300px`;

    //     }
    //     else{
    //         console.log(window.scrollY, secFooterDimensions.top)
    //     }
    // })
    }

    if( windowLoc.includes('userQuotes.html') ){
        displayBusForHire();
        updateTripDetailsBar();
    }

    if( windowLoc.includes('vehicle.html') ){
        manageVehiclePage()
        const faqHeaders = document.querySelectorAll(".faqHeader");
        faqHeaders.forEach( el => {
            el.addEventListener('click', faqEvent)
        })
    }
    
})

let faqObj = {
    'What is redBus Hire?': 'redBus Hire helps you rent a vehicle from the best operators in your city.',
'How does it work?': 'We ask you a few simple questions regarding your trip. We work with the best                         operators in your city to get you detailed quotations, so that you get the best deal.',
'Which cities are you operational in?': 'We are currently operational in Bangalore, Mumbai, Pune, Chennai, Hyderabad,                         Delhi, Ahmedabad, Madurai, Mysore, Visakhapatnam, Surat, Vadodara, Vijayawada, Coimbatore, Goa,                         Pondicherry, Erode, Ooty, Udaipur, Jaipur, Guwahati, Trichy and Kolkata.',
'What happens if the vehicle breaks down?': 'Since we work with the best operators, the vehicles are usually reliable. In                         case of a breakdown, it is the operator\'s responsibility to replace the vehicle during the journey.',
'How are the Kilometers calculated?': 'The \'Kilometers\' are calculated basis the return trip distance between the boarding point and the destination. Any additional distance covered within the city between the Garage and the pickup point is also included in it.',
'Whom do I contact if I have additional questions?': 'You can write to us at bushire@redbus.in. Alternately, you can request a call                         back by clicking on the \'Request a Callback\' button on any of the quotes you\'ve received. One of                         our customer service executives will reach out to you.',
'What are the payment terms?': 'You can confirm your reservation by paying a small booking fee, typically                         equal to 25% of the base fare. The balance can be paid directly to us through online modes till                         two days before the start of the journey or to the operator in cash at the time of boarding.',
'What if I need to cancel my trip?': 'Cancellation policy is specific to each operator and is listed against the                         quotes on the quotations page.',
'How are toll & taxes calculated?': 'Tolls and Interstate taxes are best estimates only. If these amounts are                         included in the fare, you\'ll be charged/reimbursed for any difference between the actuals and estimations, as applicable.',
'What are the benefits of booking or renting a vehicle with redBus?': 'redBus is among the leading online booking services and for a good reason. It provides its customers with a plethora of options to choose from when it comes to operators, bus types, amenities, etc. and collaborates with the top travel agencies in the country. Travellers can choose between a bus with air conditioning and a non-air conditioned bus. The buses offer comfortable seating which boosts passenger age inclusivity and may also contain amenities like a mini-refrigerator or icebox.',
'What are the COVID-19 measures being taken with redBus?': 'redBus, in light of the recent rapid spread of COVID-19, has introduced a new move which they call Safety+. Under Safety+, all buses are required to adhere to certain strict rules and guidelines. Some of these include regular and strict temperature checks along with advisories, making the use of masks mandatory for all employees as well as passengers, and sanitisers must be provided before boarding and present on all buses at all times.',
'How long is redBus Bus Hire customer care available?': 'redBus customer care is available at all hours, that is, 24/7. The customer care staff are friendly and can be asked about any redBus bus hire questions without hesitation.',
'Will there be blankets and linens provided in a complementary fashion aboard the Vehicle with redBus?': 'For the time being, due to the current situation created by the pandemic, redBus will not be allowing the provision of blankets and various other cover-ups. This measure falls under the Safety+ guidelines.'
}

function createFaqs(obj){
    const faqWrapper = document.querySelector('.faqWrapper');
    for(let ques in obj){
        let faqBox = document.createElement('div');
        faqBox.className = 'faqBox';
        let faq = FaqBox(ques, obj[ques])
        faqBox.innerHTML = faq;
        faqWrapper.appendChild(faqBox);
    }
}

function loadForm(){
    const form = document.querySelector('.form');
    form.innerHTML = null;
    form.innerHTML = FormEl();
    // formChanges();

    const outstationDiv = document.querySelector('.outstation');
    outstationDiv.addEventListener('click', loadOutstation);
}

function formChanges(){
    const form = document.querySelector('.form');
    // Form Top Position
    const nav = document.querySelector('nav');
    const navRect = nav.getBoundingClientRect();
    console.log(navRect)

    form.style.top = `${navRect.height}px`
}

function loadOutstation(){
    const form = document.querySelector('.form');
    form.innerHTML = null;

    const outstation = Outstation();
    form.innerHTML = outstation;

    const proceedButtonOutstation = document.querySelector('#proceedButtonOutstation');
    proceedButtonOutstation.addEventListener('click', () => {
        
        handleOutstationForm();
    });
    // console.log(proceedButtonOutstation)

    const backBtn = document.querySelector('.fixedHeader > img');
    backBtn.addEventListener('click', loadForm);
}

async function handleOutstationForm(){
    const tripType = "Outstation";
    const outstationPickupInput = document.querySelector('input[name="outstationPickupInput"]').value;
    const outstationDestinationInput = document.querySelector('input[name="outstationDestinationInput"]').value;
    const outstationFromDate = document.querySelector('input[name="outstationFromDate"]').value;
    const outstationTillDate = document.querySelector('input[name="outstationTillDate"]').value;
    const outstationPassengerNumber = document.querySelector('input[name="outstationPassengerNumber"]').value;
    const tripKms = await fetchTripKms(outstationPickupInput.toLowerCase(), outstationDestinationInput.toLowerCase())

    const outstationFormValues = {tripType, outstationPickupInput, outstationDestinationInput, outstationFromDate, outstationTillDate, outstationPassengerNumber, tripKms}
    localStorage.setItem('outstationFormValues', JSON.stringify(outstationFormValues))

    window.location.assign('../Html/userQuotes.html');
    console.log('newBranch?')
}

function fetchTripKms(city1, city2){
    return fetch('https://mock-redbus-server.herokuapp.com/tripKms')
    .then( res => res.json() )
    .then ( res => res[city1][city2])
}

async function displayBusForHire(){
    
    const quoteWrapper = document.querySelector('.quotesWrapper');
    quoteWrapper.innerHTML = '';
    
    let busesAvailable = await fetchBusForHire();

    const outstationFormValues = JSON.parse(localStorage.getItem('outstationFormValues'));

    busesAvailable = busesAvailable.filter( el => {
        return (el.cityOfOperation == outstationFormValues.outstationPickupInput.toLowerCase()) && el.maxPassengers >= outstationFormValues.outstationPassengerNumber;
    })

    console.log(busesAvailable)

    const numberOfQuotationsHeader = document.querySelector(".numberOfBuses");
    numberOfQuotationsHeader.innerHTML = '';
    numberOfQuotationsHeader.innerHTML = `We have <span>${busesAvailable.length}</span> quotations for you` 

    for(let bus of busesAvailable){
        let quoteBoxParent = document.createElement('div');
        quoteBoxParent.className = 'quoteBox';

        console.log(bus.name)

        let quoteBox = QuoteBox(bus);
        quoteBoxParent.innerHTML = quoteBox;

        // Adding Amenities
        let amenitiesDiv =  quoteBoxParent.querySelector('.amenities');
        for(let i = 0; i < bus.amenities.length; i++){
            let amenity = document.createElement('div');
            amenity.className = "amenity";

            let amenityImgEl =  document.createElement('img');
            amenityImgEl.src = bus.amenities[i].image;
            amenity.append(amenityImgEl);

            amenitiesDiv.append(amenity);
        }

        quoteWrapper.append(quoteBoxParent)
    }
}

function fetchBusForHire(){
    return fetch('https://mock-redbus-server.herokuapp.com/busForHire')
    .then( res => res.json() )
}

function updateTripDetailsBar(){
    const outstationFormValues = JSON.parse(localStorage.getItem('outstationFormValues'));
    console.log( outstationFormValues );

    const locationsHeader = document.querySelector('#locations > div:nth-child(1)');
    const locationsBody = document.querySelector('#locations > div:nth-child(2)');
    
    locationsHeader.textContent = `${outstationFormValues.tripType} Trip To ${outstationFormValues.outstationDestinationInput}`
    locationsBody.innerHTML = `${outstationFormValues.outstationPickupInput} <img src="../Resources/right-arrow.svg"> ${outstationFormValues.outstationDestinationInput}`

    const departureDate = document.querySelector('.departureBy > div:nth-child(2) > input:nth-child(1)');
    departureDate.setAttribute('value', outstationFormValues.outstationFromDate)

    const returnDate = document.querySelector('.returnBy > div:nth-child(2) > input:nth-child(1)');
    returnDate.setAttribute('value', outstationFormValues.outstationTillDate)

    const passengers = document.querySelector('#passengers > div:nth-child(2)');
    passengers.textContent = `${outstationFormValues.outstationPassengerNumber} People`
    
}

function backToResults(){
    location.assign('../Html/userQuotes.html')
}

async function manageVehiclePage(){
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id')

        //Back to results
        const backToResultsDiv = document.querySelector('.backToResults');
        backToResultsDiv.addEventListener('click', backToResults)
        
        const vehicleObj = await fetchVehicle(id);

        const storedInfo = JSON.parse(localStorage.getItem('outstationFormValues'));
        console.log(storedInfo)

        //Important Info
        const impInfoUl = document.querySelector('.importantInfoPoints');
        const impoInfoLi = ImportantInfo(storedInfo, vehicleObj);
        impInfoUl.innerHTML = impoInfoLi    
        
        //DOM Manipulation
        const mainImage = document.querySelector('.main > img');
        mainImage.src = vehicleObj.vehicleImages[0];

        const secondaryImages = document.querySelector('.secondary');
        for(let i = 1; i<vehicleObj.vehicleImages.length; i++){
            let div = document.createElement('div');
            div.className = 'secondaryImage';
            div.innerHTML = `<img class="secondaryImage" src="${vehicleObj.vehicleImages[i]}" alt=""></img>`
            secondaryImages.append(div);
        }
        

        const vehicleNameWrapper = document.querySelector('.vehicleHeader > span');
        vehicleNameWrapper.textContent = vehicleObj.name

        const vehicleNumberDiv = document.querySelector("._1hqggTvm6erWqhXdMIu4Mg");
        vehicleNumberDiv.textContent = vehicleObj.vehicleNumber.number
        
        const startingFromDiv = document.querySelector('.startingFrom');
        const startingFromPrice = vehicleObj.fareDetails.ac.baseFare * storedInfo.tripKms;
        startingFromDiv.textContent = `Starting from ₹${startingFromPrice}`

        const h3TripKms = document.querySelector('.kmAndTotalPrice > div:nth-child(1) > div:nth-child(2) > h3:nth-child(1)');
        h3TripKms.textContent = `${storedInfo.tripKms} Kms`;

        const extraKmAndHourDiv = document.querySelector('.kmAndTotalPrice > div:nth-child(1) > div:nth-child(2) > span:nth-child(2)');
        extraKmAndHourDiv.textContent = `Extra km: ₹${vehicleObj.fareDetails.nonAc.forExtraKm}/km | Extra hour: ₹${vehicleObj.fareDetails.nonAc.forExtraHour}`

        const basePriceValue = storedInfo.tripKms * vehicleObj.fareDetails.nonAc.baseFare;
        const basePrice = document.querySelector('.kmAndTotalPrice > div:nth-child(1) > div:nth-child(3) > h3:nth-child(1)');
        basePrice.textContent = `₹${basePriceValue}`;

        const bookForDiv = document.querySelector('.BookFor > button:nth-child(1)');
        bookForDiv.textContent = `BOOK FOR ₹ ${basePriceValue / 5}`

        const farePriceDiv = document.querySelector('div.fareDetailWrapper:nth-child(1) > div:nth-child(1) > div:nth-child(2)');
        farePriceDiv.textContent = `₹ ${basePriceValue}`

        const addonMsgOne = document.querySelector('div.fareDetailWrapper:nth-child(1) > div:nth-child(2)');
        addonMsgOne.textContent =  `Includes ${storedInfo.tripKms} Kms`

        let diffInDates = diffBetweenDates(storedInfo.outstationTillDate, storedInfo.outstationFromDate)

        const driverAllowanceValue = vehicleObj.fareDetails.driverAllowance;

        const addonMsgTwo = document.querySelector('div.fareDetailWrapper:nth-child(2) > div:nth-child(2)');
        addonMsgTwo.textContent = `₹ ${driverAllowanceValue} * ${diffInDates} days`

        const driverAllowanceDayTotalValue = driverAllowanceValue * diffInDates
        const driverAllowanceNightTotalValue = driverAllowanceValue * (diffInDates-1)

        const driverAllowanceDayTotalDiv = document.querySelector('div.fareDetailWrapper:nth-child(2) > div:nth-child(1) > div:nth-child(2)');
        driverAllowanceDayTotalDiv.textContent = `₹ ${driverAllowanceDayTotalValue}`

        const addonMsgThree = document.querySelector('div.fareDetailWrapper:nth-child(3) > div:nth-child(2)');
        addonMsgThree.textContent = `₹ ${driverAllowanceValue} * ${diffInDates - 1} nights`

        const driverAllowanceNightTotalDiv = document.querySelector('div.fareDetailWrapper:nth-child(3) > div:nth-child(1) > div:nth-child(2)');
        driverAllowanceNightTotalDiv.textContent = `₹ ${driverAllowanceNightTotalValue}`
        
        const totalCostVal = basePriceValue+driverAllowanceDayTotalValue+driverAllowanceNightTotalValue
        const totalCostDiv = document.querySelector('.totalCostPrice');
        totalCostDiv.textContent = `₹ ${totalCostVal}`
        
        const extraKmDiv = document.querySelector('.addedInfo > div:nth-child(1)');
        extraKmDiv.textContent = `Extra km: ₹${vehicleObj.fareDetails.nonAc.forExtraKm}/km`

        const extraHourDiv = document.querySelector('.addedInfo > div:nth-child(3)');
        extraHourDiv.textContent = `Extra km: ₹${vehicleObj.fareDetails.nonAc.forExtraHour}`
        
        const tripSummarySpan = document.querySelector('.tripSummary > p:nth-child(2) > span:nth-child(1)')
        tripSummarySpan.textContent = `${storedInfo.tripKms} KMS`

        const freeCancellationTillDiv = document.querySelector('.keepInMind > div:nth-child(2) > div:nth-child(2)');
        freeCancellationTillDiv.textContent = `Free Cancellation till ${storedInfo.outstationTillDate}`

        const cancellationDateDiv = document.querySelector('.cancellationDAte');
        cancellationDateDiv.textContent = `Before ${storedInfo.outstationTillDate}`;

        const cancellationDateAfterDiv = document.querySelector('._1tblM8zNEMa9R0DBfIK5av2 > div:nth-child(1)');
        cancellationDateAfterDiv.textContent = `From ${storedInfo.outstationTillDate}`

        const allAmenitiesDiv = document.querySelector('.allAmenities');
        for(let a of vehicleObj.amenities){
            let singleAmenity = document.createElement('div');
            singleAmenity.className = 'singleAmenity';
            singleAmenity.innerHTML = `<img src="${a.image}" alt="">
            <span>${a.title}</span>`
            allAmenitiesDiv.append(singleAmenity)
        }

        console.log(vehicleObj)
}

function diffBetweenDates(date1, date2){
        const one_day=1000*60*60*24;
        const tillDate = Date.parse(date1);
        const fromDate = Date.parse(date2);
        const diffInMs = tillDate - fromDate;
        const diffInDays = (tillDate - fromDate) / one_day;

        return diffInDays
}

function fetchVehicle(id){
    return fetch(`https://mock-redbus-server.herokuapp.com/busForHire/${id}`)
    .then( res => res.json() )
}

function faqEvent(e){    
    if(e.target != '<div class="faqHeader">'){
        e.target.parentElement.classList.toggle('faqHeaderSelected')
        e.target.parentElement.nextElementSibling.classList.toggle('hidden')
        console.log(e.target.parentElement)
        console.log(e.target.parentElement.nextElementSibling)

    }
    else{
        e.target.classList.toggle('faqHeaderSelected')
    }
}