const builder = require('xmlbuilder');
const request = require('request');
const path = require('path');
const fs = require('fs');

const staticLinks = [
  {
    path: '/',
    lastmod: '2016-11-03',
    changefreq: 'weekly',
    priority: 0.5
  },
  {
    path: '/art',
    lastmod: '2016-11-03',
    changefreq: 'weekly',
    priority: 0.8
  },
  {
    path: '/photo',
    lastmod: '2016-11-03',
    changefreq: 'weekly',
    priority: 0.8
  },
  {
    path: '/about',
    lastmod: '2016-11-03',
    changefreq: 'monthly',
    priority: 0.5
  },
  {
    path: '/music',
    lastmod: '2016-11-03',
    changefreq: 'monthly',
    priority: 0.5
  }
];

const prefix = 'http://jess.gallery';

function createPath(path) {
  return `${prefix}${encodeURI(path)}`;
}

function loadImages(type) {
  return new Promise((resolve, reject) => {
    request(`http://cms.jess.gallery/v1/api/images?type=${type}`, function(err, res) {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

function createImage(params) {
  const elem = params.elem;
  const value = params.value;
  const image = elem.ele('image:image');
  image.ele('image:loc', null, value.big_url);

  if (value.description) {
    image.ele('image:caption', null, value.description);
  }

  if (value.location) {
    image.ele('image:geo_location', null, value.location);
  }

  if (value.title) {
    image.ele('image:title', null, value.title);
  }
}

function build() {
  const root = builder.create('root', {version: '1.0', encoding: 'UTF-8' });

  const urlset = root.ele('urlset', {
    xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
    'xmlns:image': 'http://www.google.com/schemas/sitemap-image/1.1'
  });

  staticLinks.forEach(link => {
    const url = urlset.ele('url');
    url.ele('loc', null, createPath(link));
    if (link.lastmod) {
      url.ele('lastmod', null, link.lastmod);
    }

    if (link.changefreq) {
      url.ele('changefreq', null, link.changefreq);
    }

    url.ele('priority', null, link.priority == null ? 0.5 : link.priority);
  });

  console.log('loading images...');
  const photoPromise = loadImages('photo');
  const artPromise = loadImages('art');

  Promise.all([ photoPromise, artPromise ])
    .then(arrayOfValues => {
      console.log('images were loaded');
      const values = arrayOfValues.reduce((arr, newValues) => arr.concat(newValues), []);

      values.forEach(value => {
        const url = urlset.ele('url');

        url.ele('loc', null, createPath(`/media/${value.id}?type=${value.type}`));
        createImage({ elem: url, value });

        url.ele('lastmod', null, 'monthly');
        url.ele('priority', null, 0.5);
      });


      const xml = urlset.end({ pretty: true });
      console.log(__dirname);
      fs.writeFileSync(path.join(__dirname, '..', 'build', 'public', 'sitemap.xml'), xml);
    })
    .catch(err => {
      console.log('error during loading images: ', errr);
    });
}

build();
