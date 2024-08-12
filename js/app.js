if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then(serviceWorker => {
      console.log("Service Worker registered: ", serviceWorker);
    })
    .catch(error => {
      console.error("Error registering the Service Worker: ", error);
    });
}
function showContent(contentId) {
    const imagePath = {
        main:  'asset/img-webp/01-plan-global-V3.webp',
        jardin: 'asset/img-webp/02-plan-le_jardin-V3.webp',
        cabinet: 'asset/img-webp/03-plan-cabinet_curiosite-V3.webp',
        cuisine: 'asset/img-webp/04-plan-cuisine-V3.webp',
        cave: 'asset/img-webp/05-plan-cave-V3.webp',
        suite: 'asset/img-webp/06-plan-suite-V3.webp',
        salle: 'asset/img-webp/07-plan-salle-V3.webp',
        salon: 'asset/img-webp/08-plan-salon-V3.webp',
        loggia: 'asset/img-webp/09-plan-loggia-V3.webp',
        bar: 'asset/img-webp/01-plan-global-V3.webp',
    };

    // Déterminer quelle image est actuellement visible
    const currentImage = document.getElementById('background-image1').style.opacity == 1 ? 'background-image1' : 'background-image2';
    const nextImage = currentImage == 'background-image1' ? 'background-image2' : 'background-image1';

    // Mettre à jour la source de la nouvelle image et démarrer la transition
    const currentImgElement = document.getElementById(currentImage);
    const nextImgElement = document.getElementById(nextImage);
    nextImgElement.setAttribute('href', imagePath[contentId]);
    nextImgElement.style.opacity = 1;
    currentImgElement.style.opacity = 0;

    // Masquer tous les articles
    document.querySelectorAll('#container-2 article').forEach(article => {
        article.style.display = 'none';
    });

    // Afficher seulement l'article correspondant
    const article = document.getElementById(contentId);
    if (article) {
        article.style.display = 'block';
    }
}
// fonction montrer le menu de chaque espace
function showMenu(contentId){
    // Masquer tous les articles
      document.querySelectorAll('#container-2 article').forEach(article => {
        article.style.display = 'none';
    });

    // Afficher seulement l'article correspondant
    const article = document.getElementById(contentId);
    if (article) {
        article.style.display = 'block';
    }
}

// Timer pour faire disparaître le bouton d'interaction
let hideTouchIcoTimer;

function displayTouchIco() {
  const touchico = document.getElementById("touchIco");
  touchico.style.display = 'none';
  startTouchIcoTimer(); // Démarrer le timer pour réafficher l'élément
}

function startTouchIcoTimer() {
  clearTimeout(hideTouchIcoTimer); // Réinitialiser le timer
  hideTouchIcoTimer = setTimeout(() => {
    const touchico = document.getElementById("touchIco");
    touchico.style.display = ''; // Réafficher l'élément
  }, 15000);
}

document.addEventListener("click", displayTouchIco);
document.addEventListener("mousemove", resetTouchIcoTimer);

function resetTouchIcoTimer() {
  clearTimeout(hideTouchIcoTimer); // Réinitialiser le timer à chaque mouvement
  startTouchIcoTimer(); // Redémarrer le timer
}

// Timer de réinitialisation de la page
//let pageResetTimer;

//function resetPageTimer() {
//    clearTimeout(pageResetTimer);
//    pageResetTimer = setTimeout(() => {
//        window.location.reload(); // Rafraîchir la page
//    }, 180000);
//}

//fonction pour afficher les menus pdf
document.addEventListener("adobe_dc_view_sdk.ready", function() {
  var pdfs = [
      { url: "../asset/pdf/Carte-Cave-Juin-2024.pdf", fileName: "Cave", divId: "adobe-dc-view-cave" },
      { url: "../asset/pdf/Carte-Cuisine-Juin-2024.pdf", fileName: "Cuisine", divId: "adobe-dc-view-cuisine" },
      { url: "../asset/pdf/Carte-Jardin-Juin-2024.pdf", fileName: "Jardin", divId: "adobe-dc-view-jardin" },
      { url: "../asset/pdf/Carte-Salon-Juin-2024.pdf", fileName: "Salon", divId: "adobe-dc-view-salon" },
      { url: "../asset/pdf/Carte-Salle-a-manger-Juin-2024.pdf", fileName: "Salle", divId: "adobe-dc-view-salle" },
  ];
  // eviter que le script adobe se charge des le début pour chauque pdf
  var observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1
  };

  function loadPdf(entry) {
    if (entry.isIntersecting) {
        if (!window.AdobeDC) {
            loadAdobeSdk().then(function() {
                initializePdfViewer(entry.target.id);
            });
        } else {
            initializePdfViewer(entry.target.id);
        }
        entry.target.classList.add('loaded');
        observer.unobserve(entry.target);
    }
  }

  function loadAdobeSdk() {
    return new Promise(function(resolve, reject) {
        var script = document.createElement('script');
        script.src = "https://documentcloud.adobe.com/view-sdk/main.js";
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
  }

  function initializePdfViewer(divId) {
    var pdf = pdfs.find(p => p.divId === divId);
    if (pdf) {
        var adobeDCView = new AdobeDC.View({ clientId: "3423cb334c77406e91ebf5118d267c31", divId: pdf.divId });
        adobeDCView.previewFile({
            content: { location: { url: pdf.url } },
            metaData: { fileName: pdf.fileName }
        }, { embedMode: "SIZED_CONTAINER", showDownloadPDF: false, showPrintPDF: false });
    }
  }

  var observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => loadPdf(entry));
  }, observerOptions);

  pdfs.forEach(function(pdf) {
    var pdfContainer = document.getElementById(pdf.divId);
    if (pdfContainer) {
        observer.observe(pdfContainer);
    }
  });

  function showContent(content) {
    // Fonction pour switcher entre les contenus des sections
    var sections = ['cuisine', 'cave', 'jardin', 'salon', 'salle'];
    sections.forEach(function(section) {
        document.getElementById('menu-' + section).style.display = (content === section) ? 'block' : 'none';
    });
  }
});

// Fonction ouverture modal
function openModal(modalId) {
  var modal = document.getElementById(modalId);
  modal.style.display = "block";
}

// Fonction fermeture modal
function closeModal(modalId) {
  var modal = document.getElementById(modalId);
  modal.style.display = "none";
}

// Sel all bouton en fonction de l'ID
var buttons = document.querySelectorAll("button[id$='Btn']");

buttons.forEach(function(button) {
  button.addEventListener("click", function() {
    var modalId = button.id.replace("Btn", "Modal");
    openModal(modalId);
  });
});

// Sel all span pour fermer les modals
var spans = document.querySelectorAll("span.close");

spans.forEach(function(span) {
  span.addEventListener("click", function() {
    var modalId = span.getAttribute("data-modal");
    closeModal(modalId);
  });
});

// Fermeture modal click exterieur
window.onclick = function(event) {
  var modals = document.querySelectorAll(".modal");
  modals.forEach(function(modal) {
    if (event.target == modal) {
      closeModal(modal.id);
    }
  });
}
