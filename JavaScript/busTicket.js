// Global Variables
var bpTime;
var bpLoc;
var bpAdd;
var p;
var fare;
var seat = [];
var dpTime;
var dpDate;
var dpAdd;
var dpLoc;
var busNo = 0;
var mainDb = [];
var nameP;
var gender;
var age;
var mail;
var phone;
var clickCount = 0;
var totalBusCount = 0;

window.addEventListener("load", () => {

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const from = urlParams.get('from');
  const to = urlParams.get('to');
  const dat = urlParams.get('date')

  console.log(from,to,dat);
  var dt = new Date(dat);
  var week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  console.log(dt.getDay());
  document.getElementById("searchDat").value = "10 Nov";
  document.getElementById("searchDay").textContent = week[dt.getDay()];
  fetchBuses();
});

document.getElementById("fwd").addEventListener("click", () => {
  document.getElementById("slider").scrollLeft += 356;
});

document.getElementById("bwd").addEventListener("click", () => {
  document.getElementById("slider").scrollLeft -= 356;
});

function seatLayout(id, seats) {
  this.id = id;
  this.seats = seats;
}

const fetchBuses = async () => {
  try {
    const results = await getBuses();
    // console.log(results[0].busDetails.length);
    document.getElementById("busCount").textContent =
      results.length + " " + "Buses ";
    totalBusCount = results.length;
    displayBuses(results);
  } catch (e) {
    console.log("Error fetching");
  }
};

const getBuses = () => {
  return fetch(
    `http://localhost:3000/busDetails?date=10 Nov 2021&source=Mumbai&destination=Bangalore`
  ).then((response) => response.json());
};

const displayBuses = (results) => {
  const busItems = document.getElementById("busItems");

  for (let i = 0; i < results.length; i++) {
    var card = createCard(results[i]);
    busItems.appendChild(card);

    colorSeats(results[i]);
  }

  selectSeats();
  selectBpt();
  selectDpt();
};

const createCard = (result) => {
  var obj = new seatLayout(result.id, result.seats);
  mainDb.push(obj);

  const mainDiv = document.createElement("div");
  mainDiv.className = "bus-card";
  mainDiv.id = result.id;

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

  bottom.innerHTML = ` <div onClick="viewSeats()" class="button view-seats fr">View Seats</div>
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
    <i onClick="closeSeats()" class="bi bi-x-circle"></i>
  </span>
  <div class="seat-container">
    <div >
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
                          <div class="seat" data-select="" data-rate=${
                            result.seats[2].rate
                          } id=${result.id}-L3>
                          <div class="seat-name"></div>  
                          <div
                              class="element" 
                            ></div>
                          </div>
                          <div class="seat" data-select="" data-rate=${
                            result.seats[3].rate
                          } id=${result.id}-L4>
                          <div class="seat-name"></div>  
                          <div
                              class="element" 
                            ></div>
                          </div>
                          <div class="seat" data-select="" data-rate=${
                            result.seats[8].rate
                          } id=${result.id}-L9>
                          <div class="seat-name"></div>  
                          <div
                              class="element" 
                            ></div>
                          </div>
                          <div class="seat" data-select="" data-rate=${
                            result.seats[9].rate
                          } id=${result.id}-L10>
                          <div class="seat-name"></div>  
                          <div
                              class="element" 
                            ></div>
                          </div>
                          <div class="seat" data-select="" data-rate=${
                            result.seats[14].rate
                          } id=${result.id}-L15>
                          <div class="seat-name"></div>  
                          <div
                              class="element" 
                            ></div>
                          </div>
                        </div>
                        <div class="second-row">
                          <div class="seat" data-select="" data-rate=${
                            result.seats[1].rate
                          } id=${result.id}-L2>
                          <div class="seat-name"></div>  
                          <div
                              class="element" 
                            ></div>
                          </div>
                          <div class="seat" data-select="" data-rate=${
                            result.seats[4].rate
                          } id=${result.id}-L5>
                          <div class="seat-name"></div>  
                          <div
                              class="element" 
                            ></div>
                          </div>
                          <div class="seat" data-select="" data-rate=${
                            result.seats[7].rate
                          } id=${result.id}-L8>
                          <div class="seat-name"></div>  
                          <div
                              class="element" 
                            ></div>
                          </div>
                          <div class="seat" data-select="" data-rate=${
                            result.seats[10].rate
                          } id=${result.id}-L11>
                          <div class="seat-name"></div>  
                          <div
                              class="element" 
                            ></div>
                          </div>
                          <div class="seat" data-select="" data-rate=${
                            result.seats[13].rate
                          } id=${result.id}-L14>
                          <div class="seat-name"></div>  
                          <div
                              class="element" 
                            ></div>
                          </div>
                        </div>
                      </div>
  
                      <div class="third-row">
                        <div class="seat" data-select="" data-rate=${
                          result.seats[0].rate
                        } id=${result.id}-L1>
                        <div class="seat-name"></div>  
                        <div
                            class="element" 
                          ></div>
                        </div>
                        <div class="seat"  data-select="" data-rate=${
                          result.seats[5].rate
                        } id=${result.id}-L6>
                        <div class="seat-name"></div>  
                        <div
                            class="element" 
                          ></div>
                        </div>
                        <div class="seat"  data-select="" data-rate=${
                          result.seats[6].rate
                        } id=${result.id}-L7>
                        <div class="seat-name"></div>  
                        <div
                            class="element" 
                          ></div>
                        </div>
                        <div class="seat"  data-select="" data-rate=${
                          result.seats[11].rate
                        } id=${result.id}-L12>
                        <div class="seat-name"></div>  
                        <div
                            class="element" 
                          ></div>
                        </div>
                        <div class="seat"  data-select="" data-rate=${
                          result.seats[12].rate
                        } id=${result.id}-L13>
                        <div class="seat-name"></div>  
                        <div
                            class="element" 
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div class="back-seats">
                      <div class="seat"  data-select="" data-rate=${
                        result.seats[15].rate
                      } id=${result.id}-L16>
                      <div class="seat-name"></div>  
                      <div
                          class="element" 
                        ></div>
                      </div>
                      <div class="seat"  data-select="" data-rate=${
                        result.seats[16].rate
                      } id=${result.id}-L17>
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
                          <div class="seat"  data-select="" data-rate=${
                            result.seats[19].rate
                          } id=${result.id}-U3>
                          <div class="seat-name"></div>  
                          <div
                              class="element" 
                            ></div>
                          </div>
                          <div class="seat"  data-select="" data-rate=${
                            result.seats[20].rate
                          } id=${result.id}-U4>
                          <div class="seat-name"></div>  
                          <div
                              class="element" 
                            ></div>
                          </div>
                          <div class="seat"  data-select="" data-rate=${
                            result.seats[25].rate
                          } id=${result.id}-U9>
                          <div class="seat-name"></div>  
                          <div
                              class="element" 
                            ></div>
                          </div>
                          <div class="seat"  data-select="" data-rate=${
                            result.seats[26].rate
                          } id=${result.id}-U10>
                          <div class="seat-name"></div>  
                          <div
                              class="element" 
                            ></div>
                          </div>
                          <div class="seat"  data-select="" data-rate=${
                            result.seats[31].rate
                          } id=${result.id}-U15>
                          <div class="seat-name"></div>  
                          <div
                              class="element" 
                            ></div>
                          </div>
                        </div>
                        <div class="second-row">
                          <div class="seat"  data-select="" data-rate=${
                            result.seats[18].rate
                          } id=${result.id}-U2>
                          <div class="seat-name"></div>  
                          <div
                              class="element" 
                            ></div>
                          </div>
                          <div class="seat"  data-select="" data-rate=${
                            result.seats[21].rate
                          } id=${result.id}-U5>
                          <div class="seat-name"></div>  
                          <div
                              class="element" 
                            ></div>
                          </div>
                          <div class="seat"  data-select="" data-rate=${
                            result.seats[24].rate
                          } id=${result.id}-U8>
                          <div class="seat-name"></div>  
                          <div
                              class="element" 
                            ></div>
                          </div>
                          <div class="seat"  data-select="" data-rate=${
                            result.seats[27].rate
                          } id=${result.id}-U11>
                          <div class="seat-name"></div>  
                          <div
                              class="element" 
                            ></div>
                          </div>
                          <div class="seat"  data-select="" data-rate=${
                            result.seats[30].rate
                          } id=${result.id}-U14>
                          <div class="seat-name"></div>  
                          <div
                              class="element" 
                            ></div>
                          </div>
                        </div>
                      </div>
  
                      <div class="third-row">
                        <div class="seat"  data-select="" data-rate=${
                          result.seats[17].rate
                        } id=${result.id}-U1>
                        <div class="seat-name"></div>  
                        <div
                            class="element" 
                          ></div>
                        </div>
                        <div class="seat"  data-select="" data-rate=${
                          result.seats[22].rate
                        } id=${result.id}-U6>
                        <div class="seat-name"></div>  
                        <div
                            class="element" 
                          ></div>
                        </div>
                        <div class="seat"  data-select="" data-rate=${
                          result.seats[23].rate
                        } id=${result.id}-U7>
                        <div class="seat-name"></div>  
                        <div
                            class="element" 
                          ></div>
                        </div>
                        <div class="seat"  data-select="" data-rate=${
                          result.seats[28].rate
                        } id=${result.id}-U12>
                        <div class="seat-name"></div>  
                        <div
                            class="element" 
                          ></div>
                        </div>
                        <div class="seat"  data-select="" data-rate=${
                          result.seats[29].rate
                        } id=${result.id}-U13>
                        <div class="seat-name"></div>  
                        <div
                            class="element" 
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div class="back-seats">
                      <div class="seat"  data-select="" data-rate=${
                        result.seats[32].rate
                      } id=${result.id}-U16>
                      <div class="seat-name"></div>  
                      <div
                          class="element" 
                        ></div>
                      </div>
                      <div class="seat"  data-select="" data-rate=${
                        result.seats[33].rate
                      } id=${result.id}-U17>
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
            ><span class="fr bpdp-change" onClick="changePts()">change</span>
            <div class="bpDpAddr">
              <div class="pR oh">
                <div class="BpDp-dashed"></div>
                <div class="colBullet-css">
                  <div class="circleBp"></div>
                </div>
                <div class="colBpDp-css">
                  <span class="${result.id}-bppt bpDpName-Lbl"
                    ></span
                  ><span class="${result.id}-bptime bpDpSummaryTm-Lbl"
                    >11:00</span>
                  <div class="${result.id}-bploc selectedBpDpAdd-Lbl">
                    Mira Road (E) National Park
                  </div>
                </div>
              </div>
              <div class="margin-top-n-8">
                <div class="colBullet-css">
                  <div class="circleDp"></div>
                </div>
                <div class="colBpDp-css pR">
                  <span class="${result.id}-dppt bpDpName-Lbl">Tumkur</span
                  ><span class="${result.id}-dptime bpDpSummaryTm-Lbl"
                    >05:00
                    <span class="${
                      result.id
                    }-dpdate color-red-next-day">(06 Nov)</span></span
                  >
                  <div class="${
                    result.id
                  }-dploc selectedBpDpAdd-Lbl">Tumkur Toll</div>
                </div>
              </div>
            </div>
            <div>
              <hr class="hr-bpDpSummary" />
              <div class="seatlayout-meta clearfix m-t-15 m-b-15">
                <div>
                  <div class="seats-selected-container">
                    <span class="seat-lb">Seat No.</span
                    ><span class="selected-seats"><span class=${
                      result.id
                    }-seat>L3</span></span>
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
                  ><span class=${result.id}-fare>2200.00</span></span
                >
                <div class="fareDisclaimer">
                  Taxes will be calculated during payment
                </div>
              </div>
              <h3 class="fare-toggle-btn fr m-t-0">Show Fare Details</h3>
              <div class="fr showlayout-button-container w-15"></div>
              <div class="continue-container w-100 fl m-b-10">
                <button onClick="proceedClick()" class="button continue prcdBtn inactive " id=${
                  result.id
                }-proceed>
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
                      <span data-value="bp"  class="bpdp-point"
                        >BOARDING POINT</span
                      >
                    </div>
                    <div class="fl w-50 selector default-clr dp tac">
                      <span data-value="dp"  class="bpdp-point"
                        >DROPPING POINT</span
                      >
                    </div>
                  </header>
                  <hr class="hr-stretch" />
                  <div class="bp-dp-list-wrapper bp">
                    <div class="modal-body oa-y ${result.id}-bplist">
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
                            <span class="time bpdp-time">  ${
                              result.boarding[4].time
                            } </span>
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
                            <span class="time bpdp-time"> ${
                              result.boarding[5].time
                            } </span>
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
                    <div class="modal-body oa-y hide ${result.id}-dplist">
                      <ul
                        data-value="dp"
                        class="select-list scrollbar height-bpdp-double-deck"
                      >
                        <li class="db oh">
                          <div class="radio-css">
                            <div class="radio-checked"></div>
                          </div>
                          <div class="bpDpTime-css">
                            <span class="time bpdp-time"> ${
                              result.dropping[0].time
                            } </span>
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
                            <span class="time bpdp-time"> ${
                              result.dropping[1].time
                            } </span>
                            <div class="bpdp-time next-day-props">
                              (${result.dropping[1].date})
                            </div>
                          </div>
                          <div class="bpDpAddr-css">
                            <span
                              class="loc"
                              >${result.dropping[1].location}</span
                            >
                            <div class="bpdpPanelAddress"> ${
                              result.dropping[1].address
                            }</div>
                          </div>
                        </li>
                        <li class="db oh">
                          <div class="radio-css">
                            <div class="radio-unchecked"></div>
                          </div>
                          <div class="bpDpTime-css">
                            <span class="time bpdp-time">${
                              result.dropping[2].time
                            }  </span>
                            <div class="bpdp-time next-day-props">
                              (${result.dropping[2].date})
                            </div>
                          </div>
                          <div class="bpDpAddr-css">
                            <span class="loc">(${
                              result.dropping[2].location
                            })</span>
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
                <button onClick="clickCont()"
                  class="button continue contBtn inactive text-trans-uc w-h-cont hide" id="${
                    result.id
                  }-cont"
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
  <div class="no-of-buses clearfix " >
  <span class="no-of-buses-block hide" onClick="closeSeat()"  id=${
    result.id
  }-busCnt>
  <span class="buses-remaining">${
    Number(totalBusCount) - 1
  }</span><span>&nbsp;Buses</span>
  
  <i class="bi bi-chevron-down icon icon-down buses-down fr" ></i>
  </span></div>
  </div>`;

  rowOne.append(col2, col2, col3, col4, col5, col6, col7, col8);
  busItem.append(rowOne);
  busDiv.append(busItem, bottom);
  li.append(busDiv, seatInfo);
  mainDiv.append(li);

  return mainDiv;
};

const closeSeat = () => {
  console.log(event);
  event.target.parentNode.parentNode.parentNode.parentNode.previousElementSibling.childNodes[1].childNodes[1].classList.remove(
    "hide-seats"
  );
  event.target.parentNode.parentNode.parentNode.parentNode.previousElementSibling.childNodes[1].childNodes[1].textContent =
    "VIEW SEATS";
  event.target.parentNode.parentNode.parentNode.parentNode.classList.remove(
    "visible"
  );
  var busCards = document.getElementsByClassName("bus-card");
  for (var i = 0; i < busCards.length; i++) {
    busCards[i].classList.remove("hide");
  }
    
};

const viewSeats = () => {
  clickCount++;
  if (clickCount % 2 !== 0) {
    event.target.classList.add("hide-seats");
    event.target.textContent = "HIDE SEATS";
    event.target.parentNode.parentNode.parentNode.childNodes[1].classList.add(
      "visible"
    );
  } else {
    event.target.classList.remove("hide-seats");
    event.target.textContent = "VIEW SEATS";
    event.target.parentNode.parentNode.parentNode.childNodes[1].classList.remove(
      "visible"
    );

    clickCount = 0;
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

const selectSeats = () => {
  var seats = document.getElementsByClassName("seat");
  var stck = [];

  for (var x = 0; x < seats.length; x++) {
    seats[x].addEventListener("click", () => {
      event.target.dataset.select = !event.target.dataset.select;
      console.log(event);
      if (event.target.dataset.select === "true") {
        stck.push(event.target.id);
        var st = event.target.id.split("-");
        console.log(event);
        busNo = st[0];

        var busCards = document.getElementsByClassName("bus-card");
        for (var i = 0; i < busCards.length; i++) {
          if (busCards[i].id != busNo) {
            busCards[i].classList.add("hide");
          }
        }

        document
          .getElementById(busNo + "-" + "busCnt")
          .classList.remove("hide");

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
        fare = document.getElementById(
          event.target.id.split("-")[0] + "-" + "total"
        ).textContent;
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

        fare = document.getElementById(
          event.target.id.split("-")[0] + "-" + "total"
        ).textContent;

        for (var y = 0; y < stck.length; y++) {
          if (stck[y] == event.target.id) {
            stck.splice(y, 1);
          }
        }
        console.log(stck.length);
        if (stck.length === 0) {
          console.log(stck.length);
          document
            .getElementById(event.target.id.split("-")[0] + "-" + "points")
            .parentNode.childNodes[1].classList.remove("hide");

          document
            .getElementById(event.target.id.split("-")[0] + "-" + "points")
            .classList.remove("visible");

          document.getElementById(busNo + "-" + "busCnt").classList.add("hide");
          document
            .getElementById(event.target.id.split("-")[0] + "-" + "points")
            .classList.add("hide");
          var busCards = document.getElementsByClassName("bus-card");
          for (var i = 0; i < busCards.length; i++) {
            busCards[i].classList.remove("hide");
          }
        }
      }
    });
  }
  seat = stck;
};

// Choosing the boarding and deprture points
const selectBpt = () => {
  var btns = document.getElementsByClassName("radio-css");

  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", () => {
      console.log(event);

      if (event.target.parentNode.parentNode.parentNode.dataset.value == "bp") {
        for (var j = 0; j < btns.length; j++) {
          btns[j].childNodes[1].classList.remove("radio-checked");
          btns[j].childNodes[1].classList.add("radio-unchecked");
        }

        event.target.classList.remove("radio-unchecked");
        event.target.classList.add("radio-checked");

        bpTime =
          event.target.parentNode.parentNode.childNodes[3].childNodes[1].textContent.trim();
        bpAdd =
          event.target.parentNode.parentNode.childNodes[5].childNodes[1].innerHTML.trim();
        bpLoc =
          event.target.parentNode.parentNode.childNodes[5].childNodes[3].textContent.trim();
        if (bpLoc && dpLoc) {
          document
            .getElementById(busNo + "-" + "cont")
            .classList.remove("hide");
        }
      } else {
        for (var j = 0; j < btns.length; j++) {
          btns[j].childNodes[1].classList.remove("radio-checked");
          btns[j].childNodes[1].classList.add("radio-unchecked");
        }

        event.target.classList.remove("radio-unchecked");
        event.target.classList.add("radio-checked");

        dpLoc =
          event.target.parentNode.parentNode.childNodes[5].childNodes[1].innerHTML.trim();

        dpAdd =
          event.target.parentNode.parentNode.childNodes[5].childNodes[3].innerHTML.trim();

        dpTime =
          event.target.parentNode.parentNode.childNodes[3].childNodes[1].innerHTML.trim();
        dpDate =
          event.target.parentNode.parentNode.childNodes[3].childNodes[3].innerHTML.trim();

        if (bpLoc && dpLoc) {
          document
            .getElementById(busNo + "-" + "cont")
            .classList.remove("hide");
        }
      }
    });
  }
};

// Displaying the boarding an departure points
const selectDpt = () => {
  var dp = document.getElementsByClassName("bpdp-point");
  for (var i = 0; i < dp.length; i++) {
    dp[i].addEventListener("click", () => {
      if (event.target.dataset.value === "dp") {
        event.target.parentNode.previousElementSibling.classList.remove(
          "selected-bpdp-color"
        );
        event.target.parentNode.classList.add("selected-bpdp-color");
        document
          .getElementsByClassName(busNo + "-" + "dplist")[0]
          .classList.remove("hide");
        document
          .getElementsByClassName(busNo + "-" + "bplist")[0]
          .classList.add("hide");
      } else {
        event.target.parentNode.nextElementSibling.classList.remove(
          "selected-bpdp-color"
        );
        event.target.parentNode.classList.add("selected-bpdp-color");
        document
          .getElementsByClassName(busNo + "-" + "bplist")[0]
          .classList.remove("hide");
        document
          .getElementsByClassName(busNo + "-" + "dplist")[0]
          .classList.add("hide");
      }
    });
  }
};

const clickCont = () => {
  console.log(seat, bpTime, bpLoc, bpAdd, dpTime, dpAdd, dpLoc, dpDate);
  console.log(event.target.id);

  document
    .getElementsByClassName(event.target.id.split("-")[0] + "-" + "bpdp")[0]
    .classList.remove("hide");
  document
    .getElementsByClassName("bp-dp-selector-container")
    [busNo - 1].classList.add("hide");

  document.getElementsByClassName(
    event.target.id.split("-")[0] + "-" + "bppt"
  )[0].textContent = bpAdd.substr(0, 15);

  document.getElementsByClassName(
    event.target.id.split("-")[0] + "-" + "bptime"
  )[0].textContent = bpTime;

  document.getElementsByClassName(
    event.target.id.split("-")[0] + "-" + "bploc"
  )[0].textContent = bpLoc;

  document.getElementsByClassName(
    event.target.id.split("-")[0] + "-" + "dppt"
  )[0].textContent = dpAdd.substr(0, 15);

  document.getElementsByClassName(
    event.target.id.split("-")[0] + "-" + "dptime"
  )[0].innerHTML = `${dpTime}<span class="color-red-next-day">${dpDate}</span>`;

  document.getElementsByClassName(
    event.target.id.split("-")[0] + "-" + "dploc"
  )[0].textContent = dpLoc;

  var temp_seat = [];
  for (var i = 0; i < seat.length; i++) {
    temp_seat.push(seat[i].split("-")[1]);
  }

  document.getElementsByClassName(
    event.target.id.split("-")[0] + "-" + "seat"
  )[0].textContent = temp_seat.join(",");

  document.getElementsByClassName(
    event.target.id.split("-")[0] + "-" + "fare"
  )[0].textContent = fare;
};

const proceedClick = () => {
  console.log(1);
  console.log(document.getElementsByClassName("page-overlay"));
  document.getElementsByClassName("page-overlay")[0].classList.remove("hide");
  document.getElementsByClassName("custinfo")[0].classList.remove("hide");
  var passgr = document.getElementsByClassName("passenger_info_outer_block")[0];
  for (var k = 0; k < seat.length; k++) {
    passgr.innerHTML += `<div class="passenger_info_content_block">
    <div class="passenger_sub_title" id="st-seat0">
      <span class="passenger_priority">Passenger ${k + 1}</span
      ><span class="passenger_seat"
        ><span class="passenger_seatno f-bold"
          >Seat ${seat[k].split("-")[1]}</span
        ></span
      ><span class="ladies_seat fr"></span>
    </div>
    <div class="passenger_contact_container clearfix">
      <div class="passenger_outer_container w-100">
        <div class="input_block">
          <label class="custinfo_label" for="04"
            >Name<input
              class="input_box"
              type="text"
              pattern="/^([A-Za-z\u00E9\u00E0\u00EB\u00E1\u00ED\u00F3\u00FA\u00FC\u00F1\u00BF\u00A1\s+]{1,40}?)+$/"
              placeholder="Name"
              data-validation-msg="Please enter valid Name"
              name="Name_0"
              maxlength="300"
              id="seatno-04"
              value="" /></label
          ><span
            id="seatno04"
            class="hide"
            data-seaterrmsg="seatno04"
            >Please enter valid Name</span
          >
        </div>
      </div>
      <div class="combined_block clearfix">
        <div class="combined_mpax gender_block">
          <div class="passenger_outer_container">
            <div class="radio_block">
              <span class="radio_block_title"
                >Gender</span
              >
              <div class="radio_container clearfix">
                <span for="22" class="radio_block"
                  ><div class="gender_position_rel">
                    <div
                      id="div_22_0"
                      class="gender_position_abs"
                    ></div>
                    <input
                      type="radio"
                      id="male"
                      name="Gender0"
                      onClick = "selectGender()"
                      value="Male"
                     
                    /><label
                      for="male"
                      class="radio_css"
                      value="Male"
                      >Male</label
                    >
                  </div></span
                ><span for="23" class="radio_block"
                  ><div
                    class="
                      gender_position_rel
                      float_left
                    "
                  >
                    <div
                      id="div_23_0"
                      class="
                        gender_position_abs
                        width_81p
                      "
                    ></div>
                    <input
                      type="radio"
                      id="female"
                      name="Gender0"
                     onClick = "selectGender()"
                      value="Female"
                      
                    /><label
                      for="female"
                      class="radio_css"
                      value="Female"
                      >Female</label
                    >
                  </div></span
                >
              </div>
              <span
                id="seatno02"
                class="hide"
                data-seaterrmsg="seatno02"
                >Please select valid gender</span
              >
            </div>
          </div>
        </div>
        <div class="combined_mpax age_block">
          <div
            class="
              passenger_outer_container
              cust-list
              w-45
            "
          >
            <div class="input_block">
              <label class="custinfo_label" for="01"
                >Age<input
                  class="input_box"
                  type="number"
                  pattern="/^[1-9]?[0-9]{1}$|^150$/"
                  placeholder="Age"
                  data-validation-msg="Please enter valid Age"
                  name="Age_0"
                  maxlength="2"
                  id="seatno-01"
                  value="" /></label
              ><span
                id="seatno01"
                class="hide"
                data-seaterrmsg="seatno01"
                >Please enter valid Age</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;

    document.getElementById("pay-amnt").textContent = fare;
  }
};

const hideForm = () => {
  document.getElementsByClassName("page-overlay")[0].classList.add("hide");
  document.getElementsByClassName("custinfo")[0].classList.add("hide");
};

const closeSeats = () => {
  console.log(event);

  event.target.parentNode.parentNode.parentNode.previousElementSibling.childNodes[1].childNodes[1].classList.remove(
    "hide-seats"
  );
  event.target.parentNode.parentNode.parentNode.previousElementSibling.childNodes[1].childNodes[1].textContent =
    "VIEW SEATS";
  event.target.parentNode.parentNode.parentNode.classList.remove("visible");
};

const changePts = () => {
  console.log(event);

  event.target.parentNode.nextElementSibling.classList.remove("hide");
  event.target.parentNode.classList.add("hide");
};

const modifyDt = () => {
  document.getElementsByClassName("search-wrapper")[0].classList.remove("hide");
  document.getElementsByClassName("modify")[0].classList.add("hide");
};

const closeModify = () => {
  document.getElementsByClassName("search-wrapper")[0].classList.add("hide");
  document.getElementsByClassName("modify")[0].classList.remove("hide");
};

const selectGender = () => {
  if (event.target.id == "male") gender = "M";
  else gender = "F";
  console.log(gender);
};

const payAmnt = () => {
  nameP = document.getElementById("seatno-04").value;
  age = document.getElementById("seatno-01").value;
  mail = document.getElementById("seatno-05").value;
  phone = document.getElementById("seatno-06").value;

  var selSeat = [];
  for (var k = 0; k < seat.length; k++) {
    selSeat.push(seat[k].split("-")[1]);
  }

  for (var k = 0; k < selSeat.length; k++) {
    for (var j = 0; j < mainDb.length; j++) {
      if (mainDb[j].id == busNo) {
        for (var i = 0; i < mainDb[j].seats.length; i++) {
          if (mainDb[j].seats[i].name == selSeat[k]) {
            mainDb[j].seats[i].value = "1";
            mainDb[j].seats[i].sex = gender;
            break;
          }
        }
        break;
      }
    }

    addPassenger({
      name: nameP,
      age: age,
      seat: selSeat[k],
      sex: gender,
      mail: mail,
      phone: phone,
      amount: fare,
    });
  }

  console.log(busNo, mainDb[j].seats);
  updateSeats({
    id: busNo,
    seats: mainDb[j].seats,
  });
};

async function addPassenger(load) {
  try {
    console.log(load);
    var res = await addPass(load);
  } catch (e) {
    console.log("Error adding Passenger");
  }
}

function addPass(payload) {
  return fetch(`http://localhost:3000/passengers`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
}

async function updateSeats(payload) {
  try {
    console.log(payload);
    const res = await patchSeat(payload);
    alert('You have successfully booked the tickets.Details will be sent your registered phone and email.')
  } catch (e) {
    console.log(e.message);
  }
}

function patchSeat(payload) {
  return fetch(`http://localhost:3000/busDetails/${busNo}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "PATCH",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
}
