const yourWhatsAppNumber = "85260805756";

    
const nailStyles = [
  {
    name: "Pearl French",
    description: "Soft pink nails with sparkly light pink tips.",
    image: "https://i.imgur.com/7QVHH1c.jpeg"
  },
  {
    name: "White Pearl French",
    description: "Clean white French tips with a glossy, elegant finish.",
    image: "https://i.imgur.com/SxAyEj3.jpeg"
  },
  {
    name: "Cherry Charm Nails",
    description: "Sheer pink nails with tiny cherry designs.",
    image: "https://i.imgur.com/BSt8Cou.jpeg"
  },
  {
    name: "Cloud Pink Nails",
    description: "Dreamy pink nails with soft flower and shimmer details.",
    image: "https://i.imgur.com/7AMYI0U.jpeg"
  },
  {
    name: "Web Pink Nails",
    description: "Pale pink nails with red spiderweb art.",
    image: "https://i.imgur.com/VCAgAyU.jpeg"
  },
  {
    name: "Rose Glow",
    description: "Sheer pink nails with a shiny chrome finish.",
    image: "https://i.imgur.com/S9zls6H.jpeg"
  }
];

let currentStyleIndex = null;
let currentStyleName = "";
let currentStyleDescription = "";
let currentStyleImage = "";

function openLightbox(index) {
  currentStyleIndex = index;
  setCurrentStyleFromIndex();
  updateLightboxContent();
  updateBottomSelectedText();
  updateSelectedButtonState();

  document.getElementById("lightbox").classList.add("active");
  document.body.style.overflow = "hidden";
}

function updateLightboxContent() {
  setCurrentStyleFromIndex();

  document.getElementById("lightboxImage").src = currentStyleImage;
  document.getElementById("lightboxCaption").textContent = currentStyleName;
  document.getElementById("lightboxDescription").textContent =
    currentStyleDescription;

  const styleCount = document.getElementById("styleCount");

  if (styleCount) {
    styleCount.textContent =
      "Style " + (currentStyleIndex + 1) + " of " + nailStyles.length;
  }
}

function showPreviousStyle(event) {
  event.stopPropagation();

  currentStyleIndex =
    currentStyleIndex === 0 ? nailStyles.length - 1 : currentStyleIndex - 1;

  updateLightboxContent();
  updateBottomSelectedText();
  updateSelectedButtonState();
}

function showNextStyle(event) {
  event.stopPropagation();

  currentStyleIndex =
    currentStyleIndex === nailStyles.length - 1 ? 0 : currentStyleIndex + 1;

  updateLightboxContent();
  updateBottomSelectedText();
  updateSelectedButtonState();
}

// Scroll to Buttom

function scrollToBottomConfirm() {
  const bottomConfirmSection = document.getElementById("bottomConfirmSection");

  if (bottomConfirmSection) {
    bottomConfirmSection.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

    bottomConfirmSection.classList.remove("highlight-confirm");

    setTimeout(function() {
      bottomConfirmSection.classList.add("highlight-confirm");
    }, 500);
  }
}

// Card Select Buttons
function selectStyleOnly(event, index) {
  event.stopPropagation();

  currentStyleIndex = index;
  setCurrentStyleFromIndex();
  updateBottomSelectedText();
  updateSelectedButtonState();

  scrollToBottomConfirm();
}

function setCurrentStyleFromIndex() {
  const style = nailStyles[currentStyleIndex];

  currentStyleImage = style.image;
  currentStyleName = style.name;
  currentStyleDescription = style.description;
}

//

function updateBottomSelectedText() {
  const bottomSelectedStyle = document.getElementById("bottomSelectedStyle");

  if (bottomSelectedStyle) {
    bottomSelectedStyle.textContent = "Current pick: " + currentStyleName;
  }
}

//

function updateSelectedButtonState() {
  const selectButtons = document.querySelectorAll(".card-select-btn");

  selectButtons.forEach(function(button, index) {
    if (index === currentStyleIndex) {
      button.classList.add("selected");
      button.innerHTML = '<i class="fa-solid fa-check"></i> Selected';
    } else {
      button.classList.remove("selected");
      button.innerHTML = '<i class="fa-solid fa-check"></i> Select';
    }
  });
}

//

function closeLightbox(event) {
  if (
    event.target.id === "lightbox" ||
    event.target.classList.contains("close-btn")
  ) {
    document.getElementById("lightbox").classList.remove("active");
    document.body.style.overflow = "";
  }
}

function chooseCurrentStyle(event) {
  event.stopPropagation();

  if (currentStyleIndex === null) {
    const bottomSelectedStyle = document.getElementById("bottomSelectedStyle");

    if (bottomSelectedStyle) {
      bottomSelectedStyle.textContent = "Please pick a style first 💕";
    }

    return;
  }

  document.getElementById("lightbox").classList.remove("active");
  document.getElementById("confirmModal").classList.add("active");
  document.body.style.overflow = "hidden";

  const selectedStyleName = document.getElementById("selectedStyleName");
  const selectedStyleDescription = document.getElementById(
    "selectedStyleDescription"
  );
  const modalSelectedStyleName = document.getElementById(
    "modalSelectedStyleName"
  );

  if (selectedStyleName) {
    selectedStyleName.textContent = currentStyleName;
  }

  if (selectedStyleDescription) {
    selectedStyleDescription.textContent = currentStyleDescription;
  }

  if (modalSelectedStyleName) {
    modalSelectedStyleName.textContent = currentStyleName;
  }

  const message =
    "Hey! I choose “" + currentStyleName + "” 😏👍🏽";

  const whatsappUrl =
    "https://api.whatsapp.com/send?phone=85260805756&text=" + encodeURIComponent(message);

  document.getElementById("whatsappBtn").href = whatsappUrl;
}



function closeConfirmModal() {
  document.getElementById("confirmModal").classList.remove("active");
  document.body.style.overflow = "";
}

document.getElementById("confirmModal").addEventListener("click", function(event) {
  if (event.target.id === "confirmModal") {
    closeConfirmModal();
  }
});

document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    document.getElementById("lightbox").classList.remove("active");
    document.getElementById("confirmModal").classList.remove("active");
    document.body.style.overflow = "";
  }
});