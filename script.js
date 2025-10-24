
document.getElementById('whatsapp-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const business = document.getElementById('business').value;
  const budget = document.getElementById('budget').value;
  const adsType = document.getElementById('adsType').value;

  const message = `Hola! Soy ${name}, mi teléfono es ${phone}. Tengo un negocio de ${business} y me gustaría invertir ${budget} en ${adsType}.`;
  const url = `https://wa.me/543794332820?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
});
