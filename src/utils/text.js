

// utility function to create friendly looking phone numbers
function createFormattedTel(tel) {

  if (!tel) { return ''; }

  var value = tel.toString().trim().replace(/^\+/, '');

  // handle extensions
  if(value.charAt(10) === ',') {
    var ext = value.split(',')[1];
    value = value.split(',')[0];
  }

  if (value.match(/[^0-9]/)) { return tel; }

  var country, city, number;

  switch (value.length) {
    case 1:
    case 2:
    case 3:
      city = value;
      break;
    default:
      city = value.slice(0, 3);
      number = value.slice(3);
  }

  if(number) {
    if(number.length>3) {
      number = number.slice(0, 3) + '-' + number.slice(3,7);
    }
    else {
      number = number;
    }

    var phone = '(' + city + ') ' + number;

    if(ext) return (phone  + ' ext. ' + ext).trim();
    else return (phone).trim();

    return ('(' + city + ') ' + number).trim();
  }
  else {
    return '(' + city;
  }
};


export default {

  createFormattedTel(tel) {
    return createFormattedTel(tel)
  },

  addCallButtons(htmlString) {

    // replace the actual capture group with the button
    const replacer = (_, p1) => {
      // filter out any non-numeric stuff
      p1 = p1.replace(/\D/g,'');
      return `<a class="btn btn-success" href="tel:${p1}">${createFormattedTel(p1)}</a>`;
    }

    htmlString = htmlString.replace(/{(.*)}/g, replacer);

    return htmlString;
  }


}
