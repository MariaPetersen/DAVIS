document.getElementById("simulateur-devis").onsubmit = function (e) {
    e = e || window.event;
    if (e.preventDefault) e.preventDefault();
    else e.returnValue = false;
  
    var total = 0;
    var checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
    for (var i = 0; i < checkboxes.length; i++) {
      total += parseFloat(checkboxes[i].getAttribute("data-price"));
    }
  
    var quantifiables = document.querySelectorAll("input[type=number][data-price]");
    for (var j = 0; j < quantifiables.length; j++) {
      var qty = parseInt(quantifiables[j].value, 10) || 0;
      var unit = parseFloat(quantifiables[j].getAttribute("data-price"));
      total += qty * unit;
    }
  
    var resultat = document.getElementById("resultat-devis");
    if (resultat) {
      resultat.innerText = "Estimation du devis : " + total + " €";
    }
  };
  