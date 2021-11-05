function FaqBox(faqQuestion, faqText){
    return `
    <div class="faqHeader">
        <h3>${faqQuestion}</h3>
        <img src="../Resources/ic-arrow-down-color.svg" alt="">
    </div>
    <div class="faqText hidden">
        <p>${faqText}</p>   
    </div>
`
}

export default FaqBox