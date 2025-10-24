function sendToWhatsApp(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const business = document.getElementById('business').value;
  const budget = document.getElementById('budget').value;
  const adType = document.getElementById('adType').value;
  const message = `Hola, soy ${name}, tengo un negocio de ${business}. Me interesa invertir entre ${budget} en ${adType}.`;
  const encodedMsg = encodeURIComponent(message);
  window.open(`https://wa.me/543794332820?text=${encodedMsg}`, '_blank');
}
