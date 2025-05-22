(function () {
    var form = document.getElementById("devis-form");
    var prestationsContainer = document.getElementById("prestations-container");
    var outputSection = document.getElementById("devis-output");

    function createPrestationRow() {
        var div = document.createElement("div");
        div.className = "prestation-row";

        var inputSujet = document.createElement("input");
        inputSujet.type = "text";
        inputSujet.placeholder = "Description de la prestation";
        inputSujet.className = "prestation-sujet";
        inputSujet.required = true;
        inputPrix.setAttribute("aria-label", "Description de la prestation");

        var inputPrix = document.createElement("input");
        inputPrix.type = "number";
        inputPrix.min = "0";
        inputPrix.step = "0.01";
        inputPrix.placeholder = "Prix HT";
        inputPrix.className = "prestation-prix";
        inputPrix.required = true;
        inputPrix.setAttribute("aria-label", "Prix de la prestation sans taxe");

        var btnSuppr = document.createElement("button");
        btnSuppr.type = "button";
        btnSuppr.textContent = "Supprimer";
        btnSuppr.setAttribute("aria-label", "Supprimer cette prestation");
        btnSuppr.onclick = function () {
            prestationsContainer.removeChild(div);
        };

        div.appendChild(inputSujet);
        div.appendChild(inputPrix);
        div.appendChild(btnSuppr);

        prestationsContainer.appendChild(div);
    }

    document
        .getElementById("add-prestation")
        .addEventListener("click", function (e) {
            e.preventDefault();
            createPrestationRow();
        });

    // Ajouter une ligne de prestation par défaut
    createPrestationRow();

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Récupérer les données
        var nom = document.getElementById("client-nom").value.trim();
        var email = document.getElementById("client-email").value.trim();
        var date = document.getElementById("devis-date").value;
        var validite = document.getElementById("devis-validite").value;

        var dureeDroits = document.getElementById("duree-droits").value.trim();
        var territoireDroits = document
            .getElementById("territoire-droits")
            .value.trim();
        var supportsDroits = document
            .getElementById("supports-droits")
            .value.trim();

        var prestations = [];
        var totalHT = 0;

        var sujets = prestationsContainer.querySelectorAll(".prestation-sujet");
        var prixs = prestationsContainer.querySelectorAll(".prestation-prix");

        for (var i = 0; i < sujets.length; i++) {
            var sujetVal = sujets[i].value.trim();
            var prixVal = parseFloat(prixs[i].value);
            if (sujetVal && !isNaN(prixVal) && prixVal >= 0) {
                prestations.push({ sujet: sujetVal, prix: prixVal });
                totalHT += prixVal;
            }
        }

        if (prestations.length === 0) {
            alert("Veuillez ajouter au moins une prestation valide.");
            return;
        }

        // TVA à 20%
        var tva = totalHT * 0.2;
        var totalTTC = totalHT + tva;

        // Affichage dans #devis-output
        outputSection.innerHTML = ""; // Vider
        outputSection.hidden = false;
        outputSection.setAttribute("aria-hidden", "false");

        var titre = document.createElement("h3");
        titre.textContent = "DEVIS PROFESSIONNEL";
        outputSection.appendChild(titre);

        var clientP = document.createElement("p");
        clientP.innerHTML = `<strong>Client :</strong> ${nom} (${email})`;
        outputSection.appendChild(clientP);

        var dateP = document.createElement("p");
        dateP.innerHTML = `<strong>Date :</strong> ${date}`;
        outputSection.appendChild(dateP);

        var validiteP = document.createElement("p");
        validiteP.innerHTML = `<strong>Valide jusqu’au :</strong> ${
            validite || "Non spécifié"
        }`;
        outputSection.appendChild(validiteP);

        var table = document.createElement("table");
        table.setAttribute("border", "1");
        table.setAttribute("cellspacing", "0");
        table.setAttribute("cellpadding", "8");

        var thead = document.createElement("thead");
        var trHead = document.createElement("tr");
        var th1 = document.createElement("th");
        th1.textContent = "Prestations";
        var th2 = document.createElement("th");
        th2.textContent = "Prix (€)";
        trHead.appendChild(th1);
        trHead.appendChild(th2);
        thead.appendChild(trHead);
        table.appendChild(thead);

        var tbody = document.createElement("tbody");
        prestations.forEach(function (ligne) {
            var tr = document.createElement("tr");
            var tdSujet = document.createElement("td");
            tdSujet.textContent = ligne.sujet;
            var tdPrix = document.createElement("td");
            tdPrix.textContent = ligne.prix.toFixed(2) + " € HT";
            tr.appendChild(tdSujet);
            tr.appendChild(tdPrix);
            tbody.appendChild(tr);
        });
        table.appendChild(tbody);
        outputSection.appendChild(table);

        var totalP = document.createElement("p");
        totalP.innerHTML = `<strong>Total :</strong> ${totalHT.toFixed(
            2
        )} € HT + ${tva.toFixed(2)} € TVA = ${totalTTC.toFixed(2)} € TTC`;
        outputSection.appendChild(totalP);

        // Cession de droits
        var cessionSection = document.createElement("section");
        cessionSection.className = "cession-droits";

        var cessionTitle = document.createElement("h4");
        cessionTitle.textContent = "Cession de droits";
        cessionSection.appendChild(cessionTitle);

        var dureeP = document.createElement("p");
        dureeP.innerHTML = `<strong>Durée :</strong> ${
            dureeDroits || "Non spécifiée"
        }`;
        cessionSection.appendChild(dureeP);

        var territoireP = document.createElement("p");
        territoireP.innerHTML = `<strong>Territoire :</strong> ${
            territoireDroits || "Non spécifié"
        }`;
        cessionSection.appendChild(territoireP);

        var supportsP = document.createElement("p");
        supportsP.innerHTML = `<strong>Supports :</strong> ${
            supportsDroits || "Non spécifiés"
        }`;
        cessionSection.appendChild(supportsP);

        outputSection.appendChild(cessionSection);

        var merciP = document.createElement("p");
        merciP.innerHTML = "<em>Merci pour votre confiance.</em>";
        outputSection.appendChild(merciP);

        var signatureP = document.createElement("p");
        signatureP.textContent =
            "Signature du client : ..............................................";
        outputSection.appendChild(signatureP);

        // Bouton d'impression
        var printBtn = document.createElement("button");
        printBtn.type = "button";
        printBtn.textContent = "Imprimer le devis";
        printBtn.style.marginTop = "1rem";
        printBtn.addEventListener("click", function () {
            window.print();
        });
        outputSection.appendChild(printBtn);

        // Sauvegarder dans localStorage
        var devisEnregistre = {
            nom: nom,
            email: email,
            date: date,
            validite: validite,
            prestations: prestations,
            totalHT: totalHT,
            tva: tva,
            totalTTC: totalTTC,
            dureeDroits: dureeDroits,
            territoireDroits: territoireDroits,
            supportsDroits: supportsDroits,
        };

        var devisArray = JSON.parse(localStorage.getItem("devis")) || [];
        devisArray.push(devisEnregistre);
        localStorage.setItem("devis", JSON.stringify(devisArray));

        alert("Devis généré et sauvegardé avec succès.");

        // Scroll vers l'aperçu
        outputSection.scrollIntoView({ behavior: "smooth" });
    });
})();
