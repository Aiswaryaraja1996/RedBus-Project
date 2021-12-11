document.getElementById("account-shower").addEventListener("click", () => {
  accountElement = document
    .getElementsByClassName("account-content")[0]
    .classList.remove("hide");
});
document
  .getElementById("manage-booking-shower")
  .addEventListener("click", () => {
    accountElement = document
      .getElementsByClassName("manage-booking-content")[0]
      .classList.remove("hide");
  });

window.onclick = (e) => {
  if (["account-shower", "manage-booking-shower"].includes(e.target.id)) {
    if (e.target.id === "account-shower") {
      document
        .getElementsByClassName("manage-booking-content")[0]
        .classList.add("hide");
    } else if (e.target.id === "manage-booking-shower") {
      document
        .getElementsByClassName("account-content")[0]
        .classList.add("hide");
    }
    return;
  }
  document.getElementsByClassName("account-content")[0].classList.add("hide");
  document
    .getElementsByClassName("manage-booking-content")[0]
    .classList.add("hide");
};

document.getElementById("next-coupens").addEventListener("click", () => {
  document.getElementById("coupens-container").scrollLeft += 356;
});

document.getElementById("previous-coupens").addEventListener("click", () => {
  document.getElementById("coupens-container").scrollLeft -= 356;
});

container = document.getElementById("coupens-container");
container.addEventListener("scroll", () => {
  if (container.scrollLeft === 0) {
    document.getElementById("previous-coupens").classList.add("hide");
  } else if (
    container.scrollLeft + container.offsetWidth ===
    container.scrollWidth
  ) {
    document.getElementById("next-coupens").classList.add("hide");
  } else {
    document.getElementById("previous-coupens").classList.remove("hide");
    document.getElementById("next-coupens").classList.remove("hide");
  }
});

const openLogin = () => {
  document.getElementsByClassName("login-modal")[0].classList.remove("hide");
  const loginForm = document.getElementById("login-form");
  const verificationForm = document.getElementById("verification-form");

  const mobileNumberInput = document.getElementById("mobile-number");
  const generateOTPButton = document.getElementById("otp-container");

  const verifyButton = document.getElementById("verify-otp");
  const enteredOTP = document.getElementById("entered-otp");

  const changeButton = document.getElementById("change-number");
  const closeButton = document.getElementById("close-button");

  const otherMethodsButton = document.getElementById("other-methods");

  const resend = document.getElementById("resendOtp");
  // state
  let OTP_NUMBER;

  // verify if its valid mobile number
  mobileNumberInput.addEventListener("input", (e) => {
    if (e.target.value.length === 10) {
      document.getElementById("mobile-no").textContent =
        mobileNumberInput.value;
      generateOTPButton.classList.remove("disabled");
    } else {
      generateOTPButton.classList.add("disabled");
    }
  });

  // generate otp
  generateOTPButton.addEventListener("click", () => {
    OTP_NUMBER = Math.floor(1000 + Math.random() * 9000).toString();
    alert(`Your OTP number: ${OTP_NUMBER}`);
    loginForm.style.width = 0;
  });

  resend.addEventListener("click", () => {
    OTP_NUMBER = Math.floor(1000 + Math.random() * 9000).toString();
    alert(`Your OTP number: ${OTP_NUMBER}`);
    loginForm.style.width = 0;
  });

  // verify entered OTP
  verifyButton.addEventListener("click", () => {
    if (enteredOTP.value === OTP_NUMBER) {
      document.getElementsByClassName("login-modal")[0].classList.add("hide");
      var logIcons = document.getElementsByClassName("logged");
      document.getElementsByClassName("signUp-icon")[0].classList.add("hide");
      for (var i = 0; i < logIcons.length; i++) {
        logIcons[i].classList.remove("hide");
      }
    } else {
      OTP_NUMBER = null;
      enteredOTP.value = "";
      document.getElementsByClassName("instruction")[0].textContent =
        "Otp Verification failed.";
      document.getElementsByClassName("instruction")[0].style.backgroundColor =
        "#ffd4d5";
      document.getElementsByClassName("instruction")[0].style.textAlign =
        "center";
      //   loginForm.style.width = "360px";
    }
  });

  changeButton.addEventListener("click", () => {
    loginForm.style.width = "360px";
  });

  otherMethodsButton.addEventListener("click", () => {
    loginForm.style.width = "360px";
  });

  // Handle close button
  closeButton.addEventListener("click", () => {
    document.getElementsByClassName("login-modal")[0].classList.add("hide");
  });
};

document.getElementById("select-date").addEventListener("change", () => {
  var sdate = document.getElementById("select-date").value;
  document.getElementById("select-date").type = "text";
  console.log(moment(sdate).format("DD-MMM-YYYY"));
  document.getElementById("select-date").value =
    moment(sdate).format("DD-MMM-YYYY");
});

const callBusPage = () => {
  var from = document.getElementById("from").value;
  var to = document.getElementById("to").value;
  var dat = document.getElementById("select-date").value;
  if (!from || !to || !dat) {
  } else {
    window.location.replace(
      `https://aiswaryaraja1996.github.io/RedBus-Project/Html/busTicket.html?from=${from}&to=${to}&date=${dat}`
    );
  }
};
