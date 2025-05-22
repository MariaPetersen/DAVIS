(function () {
  function el(type, props, parent) {
    var element = document.createElement(type);
    for (var key in props) {
      if (key === 'text') element.textContent = props[key];
      else if (key === 'onclick') element.onclick = props[key];
      else element.setAttribute(key, props[key]);
    }
    if (parent) parent.appendChild(element);
    return element;
  }

  var container = document.getElementById('prestations-container');
  var addBtn = document.getElementById('add-prestation');
  var form = document.getElementById('devis-form');
  var output = document.getElementById('devis-output');
  var tvaRate = 0.20;

  function addPrestation() {
    var wrapper = el('div', { class: 'prestation-item' }, container);
    el('input', { type: 'text', placeholder: 'Sujet', class: 'sujet', required: true }, wrapper);
    el('input', { type: 'number', placeholder: 'Prix (€ HT)', class: 'prix', required: true, min: 0 }, wrapper);
    el('button', {
      type: 'button', class: 'remove-btn', text: 'Supprimer', onclick: function () {
        container.removeChild(wrapper);
      }
    }, wrapper);
  }

  addBtn.onclick = addPrestation;
  addPrestation();

  form.onsubmit = function (e) {
    if (e.preventDefault) e.preventDefault();
    else e.returnValue = false;

    var nom = document.getElementById('client-nom').value;
    var email = document.getElementById('client-email').value;
    var date = document.getElementById('devis-date').value;
    var validite = document.getElementById('devis-validite').value;

    document.getElementById('out-client-nom').textContent = document.getElementById('client-nom').value;
    document.getElementById('out-client-email').textContent = document.getElementById('client-email').value;
    document.getElementById('out-devis-date').textContent = document.getElementById('devis-date').value;
    document.getElementById('out-devis-validite').textContent = document.getElementById('devis-validite').value;

    var lignes = document.getElementsByClassName('prestation-item');
    var tableau = document.getElementById('out-prestations');
    tableau.innerHTML = '';
    var totalHT = 0;
    var prestations = [];

    for (var i = 0; i < lignes.length; i++) {
      var sujet = lignes[i].getElementsByClassName('sujet')[0].value;
      var prix = parseFloat(lignes[i].getElementsByClassName('prix')[0].value) || 0;
      if (sujet) {
        var tr = el('tr', {}, tableau);
        el('td', { text: sujet }, tr);
        el('td', { text: prix.toFixed(2) + ' € HT' }, tr);
        totalHT += prix;
        prestations.push({ sujet: sujet, prix: prix });
      }
    }

    var montantTVA = totalHT * tvaRate;
    var totalTTC = totalHT + montantTVA;

    document.getElementById('out-total').innerHTML =
      '<strong>Total HT :</strong> ' + totalHT.toFixed(2) + ' €<br>' +
      '<strong>TVA (20%) :</strong> ' + montantTVA.toFixed(2) + ' €<br>' +
      '<strong>Total TTC :</strong> ' + totalTTC.toFixed(2) + ' €';

    var devis = {
      nom: nom,
      email: email,
      date: date,
      validite: validite,
      prestations: prestations,
      totalHT: totalHT,
      tva: montantTVA,
      totalTTC: totalTTC
    };

    var anciensDevis = JSON.parse(localStorage.getItem('devis')) || [];
    anciensDevis.push(devis);
    localStorage.setItem('devis', JSON.stringify(anciensDevis));

    output.hidden = false;
    output.scrollIntoView({ behavior: 'smooth' });
  };
})();
