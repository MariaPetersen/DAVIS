(function () {
    // Vérification de l'existence de l'élément dans le localStorage
    var devisArray = JSON.parse(localStorage.getItem('devis')) || [];

    // Récupération de l'élément HTML où afficher l'historique
    var historiqueContainer = document.getElementById('liste-devis');

    // Si aucun devis n'est enregistré dans le localStorage, afficher un message
    if (devisArray.length === 0) {
        var p = document.createElement("p");
        p.textContent = "Aucun devis enregistré pour le moment.";
        historiqueContainer.appendChild(p);
        return;
    }

    // Sinon on parcourt le tableau de devis
    for (var i = 0; i < devisArray.length; i++) {
        var devis = devisArray[i];

        // Création de l'article pour chaque devis
        var article = document.createElement('article');
        article.className = 'devis-output';
        article.setAttribute('role', 'region');

        var titre = document.createElement('h3');
        titre.id = 'devis-' + i;
        titre.textContent = 'DEVIS PROFESSIONNEL #' + (i + 1);
        article.setAttribute('aria-labelledby', titre.id);
        article.appendChild(titre);

        article.appendChild(document.createElement('hr'));

        var client = document.createElement('p');
        client.innerHTML = '<strong>Client :</strong> ' + devis.nom + ' (<span>' + devis.email + '</span>)';
        article.appendChild(client);

        var date = document.createElement('p');
        date.innerHTML = '<strong>Date :</strong> ' + devis.date;
        article.appendChild(date);

        var validite = document.createElement('p');
        validite.innerHTML = '<strong>Valide jusqu’au :</strong> ' + devis.validite;
        article.appendChild(validite);

        // Tableau des prestations
        var table = document.createElement('table');
        table.setAttribute('border', '1');
        table.setAttribute('cellspacing', '0');
        table.setAttribute('cellpadding', '8');

        var caption = document.createElement('caption');
        caption.textContent = 'Tableau des prestations et prix pour le devis #' + (i + 1);
        var thead = document.createElement('thead');
        var trHead = document.createElement('tr');

        var th1 = document.createElement('th');
        th1.textContent = 'Prestations';
        th1.setAttribute('scope', 'col');

        var th2 = document.createElement('th');
        th2.textContent = 'Prix (€)';
        th2.setAttribute('scope', 'col');

        trHead.appendChild(th1);
        trHead.appendChild(th2);
        thead.appendChild(trHead);
        table.appendChild(caption);
        table.appendChild(thead);

        var tbody = document.createElement("tbody");
        for (var j = 0; j < devis.prestations.length; j++) {
            var ligne = devis.prestations[j];
            var tr = document.createElement("tr");

            var tdSujet = document.createElement("td");
            tdSujet.textContent = ligne.sujet;

            var tdPrix = document.createElement("td");
            tdPrix.textContent = ligne.prix.toFixed(2) + " € HT";

            tr.appendChild(tdSujet);
            tr.appendChild(tdPrix);
            tbody.appendChild(tr);
        }

        table.appendChild(tbody);
        article.appendChild(table);

        // Total
        var total = document.createElement('p');
        total.innerHTML =
            '<strong>Total :</strong> ' +
            devis.totalHT.toFixed(2) + ' € HT + ' +
            devis.tva.toFixed(2) + ' € TVA = ' +
            devis.totalTTC.toFixed(2) + ' € TTC';
        article.appendChild(total);

        // Cession de droits
        var cessionSection = document.createElement("section");
        cessionSection.className = "cession-droits";

        var cessionTitle = document.createElement("h4");
        cessionTitle.textContent = "Cession de droits";
        cessionSection.appendChild(cessionTitle);

        var dureeDroits = devis.dureeDroits;
        var territoireDroits = devis.territoireDroits;
        var supportsDroits = devis.supportsDroits;

        var dureeP = document.createElement("p");
        dureeP.innerHTML = `<strong>Durée :</strong> ${dureeDroits || "Non spécifiée"}`;
        cessionSection.appendChild(dureeP);

        var territoireP = document.createElement("p");
        territoireP.innerHTML = `<strong>Territoire :</strong> ${territoireDroits || "Non spécifié"}`;
        cessionSection.appendChild(territoireP);

        var supportsP = document.createElement("p");
        supportsP.innerHTML = `<strong>Supports :</strong> ${supportsDroits || "Non spécifiés"}`;
        cessionSection.appendChild(supportsP);

        article.appendChild(cessionSection);

        // Merci
        var merci = document.createElement('p');
        merci.innerHTML = '<em>Merci pour votre confiance.</em>';
        article.appendChild(merci);

        // Signature
        var signature = document.createElement('p');
        signature.textContent = 'Signature du client : ..............................................';
        article.appendChild(signature);

        // Bouton d'impression
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = 'Imprimer le devis';
        btn.setAttribute('aria-label', 'Imprimer le devis de ' + devis.nom);
        btn.onclick = (function (s) {
            return function () {
                var win = window.open("", "", "width=800,height=600");
                win.document.write(
                    '<html lang="fr"><head><title>Impression</title><link rel="stylesheet" href="./css/styles.css"></head><body>'
                );
                win.document.write(s.outerHTML);
                win.document.write("</body></html>");
                win.document.close();
                win.print();
            };
        })(article);
        article.appendChild(btn);

        // Ajout à la page
        historiqueContainer.appendChild(article);
    }
})();
