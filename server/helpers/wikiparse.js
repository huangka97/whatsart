import infobox from 'wiki-infobox';
import crypto from 'crypto';

// Helper: Hash Function for Wikipedia Image Link
const md5Hash = (fileName) => {
  const hash = crypto.createHash('md5');
  hash.update(fileName);
  return hash.digest('hex');
};

// Helper: Get Wikipedia Image URL with md5 Hashing
const getImageUrl = (imageFileName) => {
  const underscoreName = imageFileName.split(" ").join("_");
  const encodedURI = encodeURIComponent(underscoreName);
  const firstTwo = md5Hash(underscoreName).slice(0,2);
  const url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/' + firstTwo[0]
              + '/' + firstTwo + '/' + encodedURI + '/' + '500px-' + encodedURI;
  return url;
}

// Helper: Get City of Artwork
const getCity = (cityData) => {
  if (Object.prototype.toString.call(cityData) === '[object Object]') {
    return cityData.text || cityData.value
  }
  return cityData.map((obj) => obj.text || obj.value).join('');
}

// Helper: Get Museum of Artwork
const getMuseum = (museumData) => {
  if (museumData.constructor === Array) {
    return museumData[0].text || museumData[0].value;
  }
  return museumData.text || museumData.value;
}

// Helper: Get Medium of Artwork
const getMedium = (data) => {
  if (data.medium) {
    if(Object.prototype.toString.call(data.medium) === '[object Object]') {
      return data.medium.text || data.medium.value;
    }
    return data.material.map((obj) => obj.text || obj.value).join('');
  }
  else if (data.material) {
    if(Object.prototype.toString.call(data.material) === '[object Object]') {
      return data.material.text || data.material.value;
    }
    return data.material.map((obj) => obj.text || obj.value).join('');
  }
  else if (data.type) {
    const unformatted = data.type.map((obj) => (obj.text ? obj.text.trim() : '') || (obj.value ? obj.value.trim() : ''));
    const andIndex = unformatted.indexOf('and');
    return unformatted.slice(0, andIndex + 1).join(', ') + ' ' + unformatted.slice(andIndex + 1).join(' ');
  }
}

// Helper: Get Dimensions of Artwork
const getDimensions = (data) => {
  const dimensions = data.height_metric && data.width_metric ?
                  `${data.height_metric.value} cm x ${data.width_metric.value} cm (${Math.round(data.height_metric.value*0.39370*100)/100} in x ${Math.round(data.width_metric.value*0.39370*100)/100} in)`
                  : 'Could not retrieve dimensions';
  return dimensions;
}

// MAIN FUNCTION: Get Wikipedia Information for an Artwork
const getWikiInfo = (page) => {
  return new Promise((resolve, reject) => {
  infobox(page, 'en', function(err, data){
    if (err) {
      return reject(`Server could not find wikipedia page for '${page}'`);
    }
      //console.log(data);
      try {
        const parsedData = {
          title: data.title.value,
          artist: data.artist.text,
          year: data.year.value.replace(/{{circa}}/g, 'c.'),
          city: getCity(data.city),
          museum: getMuseum(data.museum),
          imageUrl: getImageUrl(data.image_file.value),
          medium: getMedium(data),
          dimensions: getDimensions(data),
        };
        return resolve(parsedData);
      }
      catch(error) {
        console.log('Server encountered an error:', error);
        return reject('Server encountered an error: ' + error);
      }
    });
  });
};

export default getWikiInfo;
