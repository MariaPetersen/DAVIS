(function () {
    var historiqueContainer = document.getElementById('liste-devis');
    var devisArray = JSON.parse(localStorage.getItem('devis')) || [];

    if (devisArray.length === 0) {
        var p = document.createElement('p');
        p.textContent = "Aucun devis enregistré pour le moment.";
        historiqueContainer.appendChild(p);
        return;
    }

    for (var i = 0; i < devisArray.length; i++) {
        var devis = devisArray[i];

        var section = document.createElement('section');
        section.className = 'devis-output';

        var hr = document.createElement('hr');
        section.appendChild(hr);

        var titre = document.createElement('h2');
        titre.textContent = 'DEVIS PROFESSIONNEL #' + (i + 1);
        section.appendChild(titre);

        var client = document.createElement('p');
        client.innerHTML = '<strong>Client :</strong> ' + devis.nom + ' (<span>' + devis.email + '</span>)';
        section.appendChild(client);

        var date = document.createElement('p');
        date.innerHTML = '<strong>Date :</strong> ' + devis.date;
        section.appendChild(date);

        var validite = document.createElement('p');
        validite.innerHTML = '<strong>Valide jusqu’au :</strong> ' + devis.validite;
        section.appendChild(validite);

        // Table
        var table = document.createElement('table');
        table.setAttribute('border', '1');
        table.setAttribute('cellspacing', '0');
        table.setAttribute('cellpadding', '8');

        var thead = document.createElement('thead');
        var trHead = document.createElement('tr');
        var th1 = document.createElement('th');
        th1.textContent = 'Prestations';
        var th2 = document.createElement('th');
        th2.textContent = 'Prix (€)';
        trHead.appendChild(th1);
        trHead.appendChild(th2);
        thead.appendChild(trHead);
        table.appendChild(thead);

        var tbody = document.createElement('tbody');
        for (var j = 0; j < devis.prestations.length; j++) {
            var ligne = devis.prestations[j];
            var tr = document.createElement('tr');
            var tdSujet = document.createElement('td');
            tdSujet.textContent = ligne.sujet;
            var tdPrix = document.createElement('td');
            tdPrix.textContent = ligne.prix.toFixed(2) + ' € HT';
            tr.appendChild(tdSujet);
            tr.appendChild(tdPrix);
            tbody.appendChild(tr);
        }
        table.appendChild(tbody);
        section.appendChild(table);

        // Total
        var total = document.createElement('p');
        total.innerHTML =
            '<strong>Total :</strong> ' +
            devis.totalHT.toFixed(2) + ' € HT + ' +
            devis.tva.toFixed(2) + ' € TVA = ' +
            devis.totalTTC.toFixed(2) + ' € TTC';
        section.appendChild(total);

        var merci = document.createElement('p');
        merci.innerHTML = '<em>Merci pour votre confiance.</em>';
        section.appendChild(merci);

        var signature = document.createElement('p');
        signature.textContent = 'Signature du client : ..............................................';
        section.appendChild(signature);

        var btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = 'Imprimer le devis';
        btn.onclick = (function (s) {
            return function () {
                var win = window.open('', '', 'width=800,height=600');
                win.document.write('<html><head><title>Impression</title><link rel="stylesheet" href="./css/styles.css"></head><body>');
                win.document.write(s.outerHTML);
                win.document.write('</body></html>');
                win.document.close();
                win.print();
            };
        })(section);
        section.appendChild(btn);

        historiqueContainer.appendChild(section);
    }
})();
