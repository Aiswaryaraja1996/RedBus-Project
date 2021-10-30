import FaqBox from '../components/faq.js'
import FormEl from '../components/form.js'
import Outstation from '../components/outstation.js'

window.addEventListener('load', () => {
    createFaqs(faqObj);
    loadForm();

    const secFooter = document.querySelector('.secondaryFooter');
    const secFooterDimensions = secFooter.getBoundingClientRect();
    const formEl = document.querySelector('.form')

    window.addEventListener('scroll', () => {
        if(window.scrollY >= secFooterDimensions.top - window.innerHeight){
            // console.log("Results: ", window.scrollY - secFooterDimensions.top)
            formEl.style.bottom = `300px`;

        }
        else{
            console.log(window.scrollY, secFooterDimensions.top)
        }
    })
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
    formChanges();

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

    const backBtn = document.querySelector('.fixedHeader > img');
    backBtn.addEventListener('click', loadForm);
}