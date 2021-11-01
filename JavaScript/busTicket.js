window.addEventListener("load", () => {
  var dt = new Date("05 Nov");
  var week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  console.log(dt.getDay());
  document.getElementById("searchDat").value = "05 Nov";
  document.getElementById("searchDay").textContent = week[dt.getDay()];
  fetchBuses();
});

const fetchBuses = async () => {
  try {
    const results = await getBuses();
    console.log(results[0].busDetails.length);
    document.getElementById("busCount").textContent =
      results[0].busDetails.length + " " + "Buses ";
    displayBuses(results[0].busDetails);
  } catch (e) {
    console.log("Error fetching");
  }
};

const getBuses = () => {
  return fetch(
    `http://localhost:3000/travelDtls?source=Mumbai&destination=Bangalore&date=05 Nov 2021`
  ).then((response) => response.json());
};

const displayBuses = (results) => {
  const busItems = document.getElementById("busItems");

  for (let i = 0; i < results.length; i++) {
    var card = createCard(results[i]);
    busItems.appendChild(card);

    colorSeats(results[i]);
  }

  viewSeats();
  selectSeats();
  selectBpt();
  selectDpt();
  clickCont();
};

const createCard = (result) => {
  const mainDiv = document.createElement("div");

  const li = document.createElement("li");
  li.className = "row clearfix";

  const busDiv = document.createElement("div");
  busDiv.className = "clearfix bus-item";

  const busItem = document.createElement("div");
  busItem.className = "clearfix bus-item-details";

  const rowOne = document.createElement("div");
  rowOne.className = "clearfix row-one";

  const col2 = document.createElement("div");
  col2.className = "column-two p-right-10 w-30 fl";

  const travels = document.createElement("div");
  travels.className = "travels lh-24 f-bold d-color";
  travels.textContent = result.travels;

  const bus = document.createElement("div");
  bus.className = "bus-type f-12 m-top-16 l-color";
  bus.textContent = result.busName;

  col2.append(travels, bus);

  const col3 = document.createElement("div");
  col3.className = "column-three p-right-10 w-10 fl";

  const dpTime = document.createElement("div");
  dpTime.className = "dp-time f-19 d-color f-bold";
  dpTime.textContent = result.departure[0].time;

  const dpLocation = document.createElement("div");
  dpLocation.className = "dp-loc l-color w-wrap f-12 m-top-42";
  dpLocation.textContent = result.departure[0].location;

  col3.append(dpTime, dpLocation);

  const col4 = document.createElement("div");
  col4.className = "column-four p-right-10 w-10 fl";

  const dur = document.createElement("div");
  dur.className = "dur l-color lh-24";

  var time = result.duration.split(":");

  dur.textContent = time[0] + "h" + " " + time[1] + "m";

  col4.append(dur);

  const col5 = document.createElement("div");
  col5.className = "column-five p-right-10 w-10 fl";

  const atime = document.createElement("div");
  atime.className = "bp-time f-19 d-color disp-Inline";
  atime.textContent = result.arrival[0].time;

  const adate = document.createElement("div");
  adate.className = "next-day-dp-lbl m-top-16";
  var customDt = result.arrival[0].date.split(" ");
  adate.textContent = customDt[0] + "-" + customDt[1];

  const aloc = document.createElement("div");
  aloc.className = "bp-loc l-color w-wrap f-12 m-top-8";
  aloc.textContent = result.arrival[0].location;

  col5.append(atime, adate, aloc);

  const col6 = document.createElement("div");
  col6.className = "column-six p-right-10 w-10 fl";

  const rating = document.createElement("div");
  rating.className = "rating-sec lh-24";

  const rateCont = document.createElement("div");

  if (Number(result.ratings[0].points) >= 4.0) {
    rateCont.className = "lh-18 rating rat-green safety-star-rating-container";
  } else if (Number(result.ratings[0].points) >= 3.0) {
    rateCont.className = "lh-18 rating rat-orange safety-star-rating-container";
  } else {
    rateCont.className = "lh-18 rating rat-red safety-star-rating-container";
  }
  const i = document.createElement("i");
  i.className = "bi bi-shield-check d-block safety-star-rating";

  const span = document.createElement("span");
  span.textContent = result.ratings[0].points;

  rateCont.append(i, span);

  const ppl = document.createElement("div");
  ppl.className = "no-ppl m-top-16 l-color";

  const i2 = document.createElement("i");
  i2.className = "bi bi-people d-block icon-rating_ppl";

  const span2 = document.createElement("span");
  span2.textContent = result.ratings[0].count;

  ppl.append(i2, span2);

  col6.append(rateCont, ppl);

  const col7 = document.createElement("div");
  col7.className = "column-seven p-right-10 w-15 fl";

  const fare = document.createElement("div");
  fare.className = "seat-fare";

  const start = document.createElement("div");
  start.className = "starts";
  start.textContent = "Starts from ";

  const seat = document.createElement("div");
  seat.className = "fare d-block";

  seat.textContent = "INR ";
  const span3 = document.createElement("span");
  span3.className = "f-19 f-bold";
  span3.textContent = result.fare;

  seat.appendChild(span3);
  fare.append(start, seat);
  col7.append(fare, seat);

  const col8 = document.createElement("div");
  col8.className = "column-eight w-15 fl";

  var emptySeatN = 0;
  var emptySeatW = 0;
  for (var k = 0; k < result.seats.length; k++) {
    if (result.seats[k].value == "0" && result.seats[k].type == "N") {
      emptySeatN++;
    } else if (result.seats[k].value == "0" && result.seats[k].type == "W") {
      emptySeatW++;
    }
  }

  const seatCount = document.createElement("div");
  seatCount.className = "seat-left m-top-30";
  seatCount.textContent = emptySeatN;

  const span4 = document.createElement("span");
  span4.className = "l-color";
  span4.textContent = " Seats Available";

  seatCount.append(span4);

  const single = document.createElement("div");
  single.className = "window-left m-top-8";
  single.textContent = emptySeatW;

  const span5 = document.createElement("span");
  span5.className = "l-color";
  span5.textContent = " Window";

  single.append(span5);

  col8.append(seatCount, single);

  const bottom = document.createElement("div");
  bottom.className = "clearfix m-top-16";

  bottom.innerHTML = ` <div class="button view-seats fr">View Seats</div>
  <div>
 
  <div>
    <ul class="bottom-panel">
      <li class="amenties b-p-list">
        <span class="txt-val">Amenities</span>
      </li>
      <li class="amenties b-p-list">
        <span class="txt-val">Bus Photos</span>
      </li>
      <li class="amenties b-p-list">
        <span class="txt-val"
          >Boarding &amp; Dropping Points</span
        >
      </li>
      <li class="amenties b-p-list">
        <span class="txt-val">Reviews</span>
      </li>
      <li class="amenties b-p-list">
        <span class="txt-val">Booking policies</span>
      </li>
    </ul>
    <div class="clearfix"></div>
    <div class="panel-loader"></div>
  </div>
</div>`;

  const seatInfo = document.createElement("div");
  seatInfo.className = "seat-container-wrapper";
  seatInfo.id = result.id;

  seatInfo.innerHTML = `<div class="seat-container-div clearfix">
  <span class="seat-close">
    <i class="bi bi-x-circle"></i>
  </span>
  <div class="seat-container">
    <div>
      <div class="seat-wrapper">
        <div class="clearfix SeatsSelector MB">
          <div class="price-ploy-container">
            <div
              class="
                price-ploy-innerWrapper
                price-ploy-panel
              "
            >
              <h3 class="seat-label fl">
                Seat Price
              </h3>
              <div
                class="clearfix price-ploy-wrapper fl"
              >
                <ul class="clearfix multiFare">
                  <li
                    data-price="All"
                    class="fl mulfare price-selected"
                    style="width: 33%"
                  >
                    All
                  </li>
                  <li
                    data-price="1200"
                    class="fl mulfare"
                    style="width: 33%"
                  >
                    1200
                  </li>
                  <li
                    data-price="1300"
                    class="fl mulfare"
                    style="width: 33%"
                  >
                    1300
                  </li>
                </ul>
              </div>
            </div>
          </div>
  
          <div class="clearfix"></div>
          <div
            class="
              leftContent
              clearfix
              m-top-60
              seatlayout-padding-10
            "
          >
            <div class="seat-select-lbl">
              <span class="seatSelMsg"
                >Click on an Available seat to proceed
                with your transaction.</span
              >
            </div>
            <div class="seat-layout clearfix">
              <div
                class="label-wrapper clearfix hide"
              >
                <div class="fr lower-selector">
                  Lower
                </div>
                <div class="fl upper-selector">
                  Upper
                </div>
              </div>
              <div
                class="lower-canvas canvas-wrapper"
              >
                <div class="label">Lower Deck</div>
                <div
                  id="lower"
                  data-type="lower"
                  width="454"
                  height="211"
                  class=""
                >
                  <div class="layout">
                    <img
                      class="steering"
                      src="https://www.redbus.in/images/icons/driver-ver.svg"
                    />
                    <div class="line"></div>
                    <div class="front-seats">
                      <div>
                        <div class="first-row">
                          <div class="seat" data-select="" data-rate=${result.seats[2].rate} id=${result.id}-L3>
                          <div class="seat-name"></div>  
                          <div
                              class="element" 
                            ></div>
                          </div>
                          <div class="seat" data-select="" data-rate=${result.seats[3].rate} id=${result.id}-L4>
                          <div class="seat-name"></div>  
                          <div
                              class="element" 
                            ></div>
                          </div>
                          <div class="seat" data-select="" data-rate=${result.seats[8].rate} id=${result.id}-L9>
                          <div class="seat-name"></div>  
                          <div
                              class="element" 
                            ></div>
                          </div>
                          <div class="seat" data-select="" data-rate=${result.seats[9].rate} id=${result.id}-L10>
                          <div class="seat-name"></div>  
                          <div
                              class="element" 
                            ></div>
                          </div>
                          <div class="seat" data-select="" data-rate=${result.seats[14].rate} id=${result.id}-L15>
                          <div class="seat-name"></div>  
                          <div
                              class="element" 
                            ></div>
                          </div>
                        </div>
                        <div class="second-row">
                          <div class="seat" data-select="" data-rate=${result.seats[1].rate} id=${result.id}-L2>
                          <div class="seat-name"></div>  
                          <div
                              class="element" 
                            ></div>
                          </div>
                          <div class="seat" data-select="" data-rate=${result.seats[4].rate} id=${result.id}-L5>
                          <div class="seat-name"></div>  
                          <div
                              class="element" 
                            ></div>
                          </div>
                          <div class="seat" data-select="" data-rate=${result.seats[7].rate} id=${result.id}-L8>
                          <div class="seat-name"></div>  
                          <div
                              class="element" 
                            ></div>
                          </div>
                          <div class="seat" data-select="" data-rate=${result.seats[10].rate} id=${result.id}-L11>
                          <div class="seat-name"></div>  
                          <div
                              class="element" 
                            ></div>
                          </div>
                          <div class="seat" data-select="" data-rate=${result.seats[13].rate} id=${result.id}-L14>
                          <div class="seat-name"></div>  
                          <div
                              class="element" 
                            ></div>
                          </div>
                        </div>
                      </div>
  
                      <div class="third-row">
                        <div class="seat" data-select="" data-rate=${result.seats[0].rate} id=${result.id}-L1>
                        <div class="seat-name"></div>  
                        <div
                            class="element" 
                          ></div>
                        </div>
                        <div class="seat"  data-select="" data-rate=${result.seats[5].rate} id=${result.id}-L6>
                        <div class="seat-name"></div>  
                        <div
                            class="element" 
                          ></div>
                        </div>
                        <div class="seat"  data-select="" data-rate=${result.seats[6].rate} id=${result.id}-L7>
                        <div class="seat-name"></div>  
                        <div
                            class="element" 
                          ></div>
                        </div>
                        <div class="seat"  data-select="" data-rate=${result.seats[11].rate} id=${result.id}-L12>
                        <div class="seat-name"></div>  
                        <div
                            class="element" 
                          ></div>
                        </div>
                        <div class="seat"  data-select="" data-rate=${result.seats[12].rate} id=${result.id}-L13>
                        <div class="seat-name"></div>  
                        <div
                            class="element" 
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div class="back-seats">
                      <div class="seat"  data-select="" data-rate=${result.seats[15].rate} id=${result.id}-L16>
                      <div class="seat-name"></div>  
                      <div
                          class="element" 
                        ></div>
                      </div>
                      <div class="seat"  data-select="" data-rate=${result.seats[16].rate} id=${result.id}-L17>
                      <div class="seat-name"></div>  
                      <div
                          class="element" 
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="upper-canvas canvas-wrapper"
              >
                <div class="label">Upper Deck</div>
                <div
                  id="upper"
                  data-type="upper"
                  width="454"
                  height="211"
                >
                  <div class="layout">
                    <div class="front-seats">
                      <div>
                        <div class="first-row">
                          <div class="seat"  data-select="" data-rate=${result.seats[19].rate} id=${result.id}-U3>
                          <div class="seat-name"></div>  
                          <div
                              class="element" 
                            ></div>
                          </div>
                          <div class="seat"  data-select="" data-rate=${result.seats[20].rate} id=${result.id}-U4>
                          <div class="seat-name"></div>  
                          <div
                              class="element" 
                            ></div>
                          </div>
                          <div class="seat"  data-select="" data-rate=${result.seats[25].rate} id=${result.id}-U9>
                          <div class="seat-name"></div>  
                          <div
                              class="element" 
                            ></div>
                          </div>
                          <div class="seat"  data-select="" data-rate=${result.seats[26].rate} id=${result.id}-U10>
                          <div class="seat-name"></div>  
                          <div
                              class="element" 
                            ></div>
                          </div>
                          <div class="seat"  data-select="" data-rate=${result.seats[31].rate} id=${result.id}-U15>
                          <div class="seat-name"></div>  
                          <div
                              class="element" 
                            ></div>
                          </div>
                        </div>
                        <div class="second-row">
                          <div class="seat"  data-select="" data-rate=${result.seats[18].rate} id=${result.id}-U2>
                          <div class="seat-name"></div>  
                          <div
                              class="element" 
                            ></div>
                          </div>
                          <div class="seat"  data-select="" data-rate=${result.seats[21].rate} id=${result.id}-U5>
                          <div class="seat-name"></div>  
                          <div
                              class="element" 
                            ></div>
                          </div>
                          <div class="seat"  data-select="" data-rate=${result.seats[24].rate} id=${result.id}-U8>
                          <div class="seat-name"></div>  
                          <div
                              class="element" 
                            ></div>
                          </div>
                          <div class="seat"  data-select="" data-rate=${result.seats[27].rate} id=${result.id}-U11>
                          <div class="seat-name"></div>  
                          <div
                              class="element" 
                            ></div>
                          </div>
                          <div class="seat"  data-select="" data-rate=${result.seats[30].rate} id=${result.id}-U14>
                          <div class="seat-name"></div>  
                          <div
                              class="element" 
                            ></div>
                          </div>
                        </div>
                      </div>
  
                      <div class="third-row">
                        <div class="seat"  data-select="" data-rate=${result.seats[17].rate} id=${result.id}-U1>
                        <div class="seat-name"></div>  
                        <div
                            class="element" 
                          ></div>
                        </div>
                        <div class="seat"  data-select="" data-rate=${result.seats[22].rate} id=${result.id}-U6>
                        <div class="seat-name"></div>  
                        <div
                            class="element" 
                          ></div>
                        </div>
                        <div class="seat"  data-select="" data-rate=${result.seats[23].rate} id=${result.id}-U7>
                        <div class="seat-name"></div>  
                        <div
                            class="element" 
                          ></div>
                        </div>
                        <div class="seat"  data-select="" data-rate=${result.seats[28].rate} id=${result.id}-U12>
                        <div class="seat-name"></div>  
                        <div
                            class="element" 
                          ></div>
                        </div>
                        <div class="seat"  data-select="" data-rate=${result.seats[29].rate} id=${result.id}-U13>
                        <div class="seat-name"></div>  
                        <div
                            class="element" 
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div class="back-seats">
                      <div class="seat"  data-select="" data-rate=${result.seats[32].rate} id=${result.id}-U16>
                      <div class="seat-name"></div>  
                      <div
                          class="element" 
                        ></div>
                      </div>
                      <div class="seat"  data-select="" data-rate=${result.seats[33].rate} id=${result.id}-U17>
                      <div class="seat-name"></div>  
                      <div
                          class="element" 
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="other-container m-top-60">
    <div class="legend-container">
      <h3 class="legend-header">seat legend</h3>
      <div class="legend-wrap">
        <div class="legend-left clearfix">
          <div
            class="seat-legend-wrap sleeper-legend"
          >
            <div class="available-sleep fl"></div>
            <div class="legend-label">available</div>
          </div>
          <div
            class="seat-legend-wrap sleeper-legend"
          >
            <div class="unavailable-sleep fl"></div>
            <div class="legend-label">
              unavailable
            </div>
          </div>
          <div
            class="
              seat-legend-wrap
              sleeper-legend
              ladies-legend
            "
          >
            <div class="ladies-sleep fl"></div>
            <div class="legend-label">female</div>
          </div>
        </div>
      </div>
    </div>
    <div class="extra-info">
      <div class="route-notes">
        <div class="non-refundable-container">
          <div class="non-refundable-header">
            This booking is non-refundable
          </div>
          <div class="non-refundable-desc">
            This booking falls under the 100%
            cancellation charges window of the
            cancellation policy
          </div>
        </div>
        <div class="dc-seat-layout">
          <span></span
          ><span class="link"
            >Passengers need to mandatory show
            negative RT-PCR certificate not less than
            72 hours at the time of boarding</span
          >
        </div>
      </div>
    </div>


    <div id=${result.id}-points class="hide">
    <div>
      <div class="search-seatlayout show_top animated seatBpDp">
        <div class="seatlayout-meta-container clearfix">
          <div class="seatlayout-main-body">
            <div class="bp-dp-container">

            <div class="bpDpAddr ${result.id}-bpdp hide" >
            <span class="bpdp-lb">Boarding &amp; Dropping</span
            ><span class="fr bpdp-change">change</span>
            <div class="bpDpAddr">
              <div class="pR oh">
                <div class="BpDp-dashed"></div>
                <div class="colBullet-css">
                  <div class="circleBp"></div>
                </div>
                <div class="colBpDp-css">
                  <span class="bpDpName-Lbl"
                    >Mira Road E Sheetal Nagar</span
                  ><span class="bpDpSummaryTm-Lbl"
                    >11:00 <span class="color-red-next-day"></span
                  ></span>
                  <div class="selectedBpDpAdd-Lbl">
                    Mira Road (E) National Park
                  </div>
                </div>
              </div>
              <div class="margin-top-n-8">
                <div class="colBullet-css">
                  <div class="circleDp"></div>
                </div>
                <div class="colBpDp-css pR">
                  <span class="bpDpName-Lbl">Tumkur</span
                  ><span class="bpDpSummaryTm-Lbl"
                    >05:00
                    <span class="color-red-next-day">(06 Nov)</span></span
                  >
                  <div class="selectedBpDpAdd-Lbl">Tumkur Toll</div>
                </div>
              </div>
            </div>
            <div>
              <hr class="hr-bpDpSummary" />
              <div class="seatlayout-meta clearfix m-t-15 m-b-15">
                <div>
                  <div class="seats-selected-container">
                    <span class="seat-lb">Seat No.</span
                    ><span class="selected-seats"><span>L3</span></span>
                  </div>
                </div>
              </div>
              <hr class="hr-bpDpSummary" />
              <div class="fareDetails-Lbl">Fare Details</div>
              <div class="seatlayout-fare-break-container hide">
                <div class="fare-container animated fadeInUp">
                  <ul class="fares-container">
                    <li class="fare-row clearfix">
                      <span class="fare-type">basicFare</span
                      ><span class="fare-value"
                        ><span class="fare-currency">INR</span>2200</span
                      >
                    </li>
                  </ul>
                  <div class="child-fare-text hide"></div>
                </div>
              </div>
              <div class="fare-summary-container">
                <span class="fares-lb">Amount</span
                ><span class="fr fare-summary-value"
                  ><span class="fare-summary-currency">INR</span
                  ><span>2200.00</span></span
                >
                <div class="fareDisclaimer">
                  Taxes will be calculated during payment
                </div>
              </div>
              <h3 class="fare-toggle-btn fr m-t-0">Show Fare Details</h3>
              <div class="fr showlayout-button-container w-15"></div>
              <div class="continue-container w-100 fl m-b-10">
                <button class="button continue inactive">
                  Proceed to book
                </button>
              </div>
            </div>
          </div>

              <div class="bp-dp-selector-container">
                <div class="">
                  <header class="modal-header clearfix">
                    <div
                      class="fl w-50 selector default-clr bp selected-bpdp-color tac"
                    >
                      <span data-value="bp" class="bpdp-point"
                        >BOARDING POINT</span
                      >
                    </div>
                    <div class="fl w-50 selector default-clr dp tac">
                      <span data-value="dp" class="bpdp-point"
                        >DROPPING POINT</span
                      >
                    </div>
                  </header>
                  <hr class="hr-stretch" />
                  <div class="bp-dp-list-wrapper bp">
                    <div class="modal-body oa-y">
                      <ul
                        data-value="bp"
                        class="select-list scrollbar height-bpdp-double-deck"
                      >
                        <li class="db oh">
                          <div class="radio-css">
                            <div class="radio-unchecked"></div>
                          </div>
                          <div class="bpDpTime-css">
                            <span class="time bpdp-time">
                              ${result.boarding[0].time}
                            </span>
                          </div>
                          <div class="bpDpAddr-css">
                            <span class="loc"
                              >${result.boarding[0].location}</span
                            >
                            <div class="bpdpPanelAddress">
                              ${result.boarding[0].address}
                            </div>
                          </div>
                        </li>
                        <li class="db oh">
                          <div class="radio-css">
                            <div class="radio-unchecked"></div>
                          </div>
                          <div class="bpDpTime-css">
                            <span class="time bpdp-time">
                              ${result.boarding[1].time}
                            </span>
                          </div>
                          <div class="bpDpAddr-css">
                            <span class="loc">
                              ${result.boarding[1].location}
                            </span>
                            <div class="bpdpPanelAddress">
                              ${result.boarding[1].address}
                            </div>
                          </div>
                        </li>
                        <li class="db oh">
                          <div class="radio-css">
                            <div class="radio-unchecked"></div>
                          </div>
                          <div class="bpDpTime-css">
                            <span class="time bpdp-time">
                              ${result.boarding[2].time}
                            </span>
                          </div>
                          <div class="bpDpAddr-css">
                            <span class="loc"
                              >${result.boarding[2].location}</span
                            >
                            <div class="bpdpPanelAddress">
                              ${result.boarding[2].address}
                            </div>
                          </div>
                        </li>
                        <li class="db oh">
                          <div class="radio-css">
                            <div class="radio-unchecked"></div>
                          </div>
                          <div class="bpDpTime-css">
                            <span class="time bpdp-time">
                              ${result.boarding[3].time}
                            </span>
                          </div>
                          <div class="bpDpAddr-css">
                            <span class="loc"
                              >${result.boarding[3].location}
                            </span>
                            <div class="bpdpPanelAddress">
                              ${result.boarding[3].address}
                            </div>
                          </div>
                        </li>
                        <li class="db oh">
                          <div class="radio-css">
                            <div class="radio-unchecked"></div>
                          </div>
                          <div class="bpDpTime-css">
                            <span class="time bpdp-time">  ${result.boarding[4].time} </span>
                          </div>
                          <div class="bpDpAddr-css">
                            <span
                              class="loc"
                              
                              > ${result.boarding[4].location}</span
                            >
                            <div class="bpdpPanelAddress">
                              ${result.boarding[4].address}
                            </div>
                          </div>
                        </li>
                        <li class="db oh">
                          <div class="radio-css">
                            <div class="radio-unchecked"></div>
                          </div>
                          <div class="bpDpTime-css">
                            <span class="time bpdp-time"> ${result.boarding[5].time} </span>
                          </div>
                          <div class="bpDpAddr-css">
                            <span
                              class="loc"
                              > ${result.boarding[5].location}</span
                            >
                            <div class="bpdpPanelAddress">
                              ${result.boarding[5].address}
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div class="modal-body oa-y hide">
                      <ul
                        data-value="dp"
                        class="select-list scrollbar height-bpdp-double-deck"
                      >
                        <li class="db oh">
                          <div class="radio-css">
                            <div class="radio-checked"></div>
                          </div>
                          <div class="bpDpTime-css">
                            <span class="time bpdp-time"> ${result.dropping[0].time} </span>
                            <div class="bpdp-time next-day-props">
                              (${result.dropping[0].date})
                            </div>
                          </div>
                          <div class="bpDpAddr-css">
                            <span
                              class="loc fw-700"
                              
                              >${result.dropping[0].location}</span
                            >
                            <div class="bpdpPanelAddress">
                              ${result.dropping[0].address}
                            </div>
                          </div>
                        </li>
                        <li class="db oh">
                          <div class="radio-css">
                            <div class="radio-unchecked"></div>
                          </div>
                          <div class="bpDpTime-css">
                            <span class="time bpdp-time"> ${result.dropping[1].time} </span>
                            <div class="bpdp-time next-day-props">
                              (${result.dropping[1].date})
                            </div>
                          </div>
                          <div class="bpDpAddr-css">
                            <span
                              class="loc"
                              >${result.dropping[1].location}</span
                            >
                            <div class="bpdpPanelAddress"> ${result.dropping[1].address}</div>
                          </div>
                        </li>
                        <li class="db oh">
                          <div class="radio-css">
                            <div class="radio-unchecked"></div>
                          </div>
                          <div class="bpDpTime-css">
                            <span class="time bpdp-time">${result.dropping[2].time}  </span>
                            <div class="bpdp-time next-day-props">
                              (${result.dropping[2].date})
                            </div>
                          </div>
                          <div class="bpDpAddr-css">
                            <span class="loc">(${result.dropping[2].location})</span>
                            <div class="bpdpPanelAddress">
                              ${result.dropping[2].address}
                            </div>
                          </div>
                        </li>

                      </ul>
                    </div>
                  </div>
                </div>

                <hr class="hr-bpDpSummary" />
                <div class="margin-t-b-10">
                  <span class="fares-lb">Amount</span
                  ><span class="fareDisclaimer margin-l-5"
                    >( Taxes will be calculated during payment )</span
                  ><span class="fr fare-summary-value"
                    ><span class="fare-summary-currency">INR</span
                    ><span id=${result.id}-total>0.00</span></span
                  >
                </div>
                <button
                  class="button continue inactive text-trans-uc w-h-cont" id="${result.id}-cont"
                >
                  continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  </div>
  </div>`;

  rowOne.append(col2, col2, col3, col4, col5, col6, col7, col8);
  busItem.append(rowOne);
  busDiv.append(busItem, bottom);
  li.append(busDiv, seatInfo);
  mainDiv.append(li);

  return mainDiv;
};

const viewSeats = () => {
  var viewSeats = document.getElementsByClassName("view-seats");

  for (var i = 0; i < viewSeats.length; i++) {
    viewSeats[i].addEventListener("click", () => {
      event.target.classList.toggle("hide-seats");
      event.target.parentNode.parentNode.parentNode.childNodes[1].classList.toggle(
        "visible"
      );
    });
  }
};

const colorSeats = (data) => {
  console.log(data);
  var iter = data.id;

  for (var l = 0; l < data.seats.length; l++) {
    if (data.seats[l].value == "1" && data.seats[l].sex == "M") {
      document.getElementById(
        iter + "-" + data.seats[l].name
      ).style.backgroundColor = "#CBCBCB";
      document.getElementById(iter + "-" + data.seats[l].name).style.cursor =
        "none";
    } else if (data.seats[l].value == "1" && data.seats[l].sex == "F") {
      document.getElementById(
        iter + "-" + data.seats[l].name
      ).style.backgroundColor = "#F1A9A0";
      document.getElementById(iter + "-" + data.seats[l].name).style.cursor =
        "none";
    }
  }
};
var bp ;
var bp;
var fare;
var seat = [];
var bpTime;
var dpTime;
var dpDate;

const selectSeats = () => {
  var seats = document.getElementsByClassName("seat");
  var stck = [];
  for (var x = 0; x < seats.length; x++) {
      seats[x].addEventListener("click", () => {
      event.target.dataset.select = !event.target.dataset.select;
      console.log(event.target.dataset.select);
      if (event.target.dataset.select === "true") {
        stck.push(event.target.id);
        var st = event.target.id.split("-");
        console.log(event);
        
        event.target.style.backgroundColor = "black";
        event.target.childNodes[1].style.color = "white";
        event.target.childNodes[1].textContent = st[1];
        event.target.childNodes[1].classList.remove("hide");
        event.target.childNodes[3].classList.add("hide");
        event.target.style.justifyContent = "center";
        event.target.style.alignItems = "center";

        document.getElementById(
          event.target.id.split("-")[0] + "-" + "total"
        ).textContent = (
          Number(
            document.getElementById(
              event.target.id.split("-")[0] + "-" + "total"
            ).textContent
          ) + Number(event.target.dataset.rate)
        ).toFixed(2);

        document
          .getElementById(event.target.id.split("-")[0] + "-" + "points")
          .parentNode.childNodes[1].classList.add("hide");

        document
          .getElementById(event.target.id.split("-")[0] + "-" + "points")
          .classList.remove("hide");

        document
          .getElementById(event.target.id.split("-")[0] + "-" + "points")
          .classList.add("visible");
      } else {
        event.target.style.backgroundColor = null;
        event.target.childNodes[1].classList.add("hide");
        event.target.childNodes[3].classList.remove("hide");
        event.target.style.justifyContent = "flex-end";
        event.target.style.alignItems = "inherit";

        document.getElementById(
          event.target.id.split("-")[0] + "-" + "total"
        ).textContent = (
          Number(
            document.getElementById(
              event.target.id.split("-")[0] + "-" + "total"
            ).textContent
          ) - Number(event.target.dataset.rate)
        ).toFixed(2);
        event.target.dataset.select = "";

        for (var y = 0; y < stck.length; y++) {
          if (stck[y] == event.target.id) {
            stck.splice(y, 1);
          }
        }

        if (stck.length === 0) {
          console.log(stck.length);
          document
            .getElementById(event.target.id.split("-")[0] + "-" + "points")
            .parentNode.childNodes[1].classList.remove("hide");

          document
            .getElementById(event.target.id.split("-")[0] + "-" + "points")
            .classList.remove("visible");
          document
            .getElementById(event.target.id.split("-")[0] + "-" + "points")
            .classList.add("hide");
        }
      }
    });
  }
  seat = stck;
  
  
};

var selectBp = false;
var selectDp = false;
const selectBpt = () => {
  var btns = document.getElementsByClassName("radio-css");
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", () => {
      for (var j = 0; j < btns.length; j++) {
        btns[j].childNodes[1].classList.remove("radio-checked");
        btns[j].childNodes[1].classList.add("radio-unchecked");
      }

      event.target.classList.remove("radio-unchecked");
      event.target.classList.add("radio-checked");
      selectBp = true;
    });
  }
};

const selectDpt = () => {
  var dp = document.getElementsByClassName("bpdp-point");
  for (var i = 0; i < dp.length; i++) {
    dp[i].addEventListener("click", () => {
      if (event.target.dataset.value === "dp") {
        event.target.parentNode.previousElementSibling.classList.remove(
          "selected-bpdp-color"
        );
        event.target.parentNode.classList.add("selected-bpdp-color");

        document.getElementsByClassName("modal-body")[0].classList.add("hide");
        document
          .getElementsByClassName("modal-body")[1]
          .classList.remove("hide");
      } else {
        event.target.parentNode.nextElementSibling.classList.remove(
          "selected-bpdp-color"
        );
        event.target.parentNode.classList.add("selected-bpdp-color");
        document
          .getElementsByClassName("modal-body")[0]
          .classList.remove("hide");
        document.getElementsByClassName("modal-body")[1].classList.add("hide");
      }
    });
  }
};

const clickCont = ()=>{
  
  var cont = document.getElementsByClassName("continue");
  
  for (var i=0; i<cont.length; i++){
    cont[i].addEventListener("click",()=>{
      console.log(seat);
      console.log(event.target.id);
      document.getElementsByClassName(event.target.id.split("-")[0]+"-"+"bpdp")[0].classList.remove("hide");
      document
          .getElementsByClassName("bp-dp-selector-container")[0]
          .classList.add("hide");

    })
  }
}
