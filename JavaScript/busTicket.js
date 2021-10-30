window.addEventListener("load", () => {
  fetchBuses();
});

const fetchBuses = async () => {
  try {
    const results = await getBuses();
    console.log(results);
    displayBuses(results);
  } catch (e) {
    console.log("Error fetching");
  }
};

const getBuses = () => {
  return fetch(
    `http://localhost:3000/busDetails?source=Mumbai&destination=Bangalore`
  ).then((response) => response.json());
};

const displayBuses = (results) => {
  const busItems = document.getElementById("busItems");

  for (let i = 0; i < results.length; i++) {
    var card = createCard(results[i]);
    busItems.appendChild(card);
  }

  viewSeats();
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
  console.log(time);
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
  rateCont.className = "lh-18 rating rat-green safety-star-rating-container";

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

  const seatCount = document.createElement("div");
  seatCount.className = "seat-left m-top-30";
  seatCount.textContent = result.seats[0].normal;

  const span4 = document.createElement("span");
  span4.className = "l-color";
  span4.textContent = " Seats Available";

  seatCount.append(span4);

  const single = document.createElement("div");
  single.className = "window-left m-top-8";
  single.textContent = result.seats[0].window;

  const span5 = document.createElement("span");
  span5.className = "l-color";
  span5.textContent = " single";

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

  seatInfo.innerHTML = `                          <div class="seat-container-div clearfix">
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
                        <div class="seat" id="L3">
                          <div
                            class="element"
                          ></div>
                        </div>
                        <div class="seat" id="L4">
                          <div
                            class="element"
                          ></div>
                        </div>
                        <div class="seat" id="L9">
                          <div
                            class="element"
                          ></div>
                        </div>
                        <div class="seat" id="L10">
                          <div
                            class="element"
                          ></div>
                        </div>
                        <div class="seat" id="L15">
                          <div
                            class="element"
                          ></div>
                        </div>
                      </div>
                      <div class="second-row">
                        <div class="seat" id="L2">
                          <div
                            class="element"
                          ></div>
                        </div>
                        <div class="seat" id="L5">
                          <div
                            class="element"
                          ></div>
                        </div>
                        <div class="seat" id="L8">
                          <div
                            class="element"
                          ></div>
                        </div>
                        <div class="seat" id="L11">
                          <div
                            class="element"
                          ></div>
                        </div>
                        <div class="seat" id="14">
                          <div
                            class="element"
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div class="third-row">
                      <div class="seat" id="L1">
                        <div class="element"></div>
                      </div>
                      <div class="seat" id="L6">
                        <div class="element"></div>
                      </div>
                      <div class="seat" id="L7">
                        <div class="element"></div>
                      </div>
                      <div class="seat" id="L12">
                        <div class="element"></div>
                      </div>
                      <div class="seat" id="L13">
                        <div class="element"></div>
                      </div>
                    </div>
                  </div>
                  <div class="back-seats">
                    <div class="seat" id="L16">
                      <div class="element"></div>
                    </div>
                    <div class="seat" id="L17">
                      <div class="element"></div>
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
                        <div class="seat" id="U3">
                          <div
                            class="element"
                          ></div>
                        </div>
                        <div class="seat" id="U4">
                          <div
                            class="element"
                          ></div>
                        </div>
                        <div class="seat" id="U9">
                          <div
                            class="element"
                          ></div>
                        </div>
                        <div class="seat" id="U10">
                          <div
                            class="element"
                          ></div>
                        </div>
                        <div class="seat" id="U15">
                          <div
                            class="element"
                          ></div>
                        </div>
                      </div>
                      <div class="second-row">
                        <div class="seat" id="U2">
                          <div
                            class="element"
                          ></div>
                        </div>
                        <div class="seat" id="U5">
                          <div
                            class="element"
                          ></div>
                        </div>
                        <div class="seat" id="U8">
                          <div
                            class="element"
                          ></div>
                        </div>
                        <div class="seat" id="U11">
                          <div
                            class="element"
                          ></div>
                        </div>
                        <div class="seat" id="U14">
                          <div
                            class="element"
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div class="third-row">
                      <div class="seat" id="U1">
                        <div class="element"></div>
                      </div>
                      <div class="seat" id="U6">
                        <div class="element"></div>
                      </div>
                      <div class="seat" id="U7">
                        <div class="element"></div>
                      </div>
                      <div class="seat" id="U12">
                        <div class="element"></div>
                      </div>
                      <div class="seat" id="U13">
                        <div class="element"></div>
                      </div>
                    </div>
                  </div>
                  <div class="back-seats">
                    <div class="seat" id="U16">
                      <div class="element"></div>
                    </div>
                    <div class="seat" id="U17">
                      <div class="element"></div>
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
  console.log(viewSeats);
  for (var i = 0; i < viewSeats.length; i++) {
    viewSeats[i].addEventListener("click", () => {
      console.log(event);
      //   event.target.classList.toggle("hide");
      event.target.classList.toggle(
        "hide-seats"
      );
      event.target.parentNode.parentNode.parentNode.childNodes[1].classList.toggle(
        "visible"
      );
    });
  }
};

// const hideSeats = () => {
//   var hideSeats = document.getElementsByClassName("view-seats");
//   for (var i = 0; i < hideSeats.length; i++) {
//     hideSeats[i].addEventListener("click", () => {
//       event.target.parentNode.parentNode.parentNode.childNodes[1].style.display =
//         "none";
//       event.target.style.backgroundColor = "#e9555d";
//       event.target.textContent = "VIEW SEATS";
//     });
//   }
// };
