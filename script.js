// START //

const album = document.querySelector('[data-album]');
const albumImages = document.querySelectorAll('[data-album-img]');
const firstImage = document.querySelector('[data-album-img]');
const navigationDiv = document.querySelector('[data-nav]');
let navDots;

const createNavigation = () => {
  let imageArray = [];

  albumImages.forEach((image) => {
    imageArray.push(image);
    const imageArrayLength = imageArray.length;
    image.dataset.indexNumber = imageArrayLength;

    const dots = document.createElement('div');
    dots.classList.add('nav-dots');
    dots.setAttribute('data-dot', '');
    dots.dataset.indexNumber = imageArrayLength;

    navigationDiv.appendChild(dots);
  });

  // Set initial image and nav-dot in carousel
  const navDotOne = document.querySelector('[data-dot]');
  navDotOne.classList.add('active-dot');
  firstImage.classList.add('active-img');

  navDots = document.querySelectorAll('[data-dot]');

  // Set .album width to match actual client image width
  const imageWidth = firstImage.clientWidth;
  album.style.width = imageWidth + 'px';
};

createNavigation();

const arrows = document.querySelectorAll('.arrow');
let imageInfo = [
  {
    alt: 'bridge',
    artist: 'Aleksey Kuprikov',
    path: 'https://www.pexels.com/da-dk/foto/fugleperspektiv-natur-skyet-skov-3493777/',
  },
  {
    alt: 'field',
    artist: 'Admiral General M. God Shepherdly',
    path: 'https://www.pexels.com/da-dk/foto/landskab-natur-himmel-person-789555/',
  },
  {
    alt: 'flower',
    artist: 'Pok Rie',
    path: 'https://www.pexels.com/da-dk/foto/natur-mark-have-kronblade-130574/',
  },
  {
    alt: 'lion',
    artist: 'Chris Clark',
    path: 'https://www.pexels.com/da-dk/foto/natur-dyr-love-liggende-16044994/',
  },
  {
    alt: 'trees',
    artist: 'Q. Hưng Phạm',
    path: ' https://www.pexels.com/da-dk/foto/natur-skov-traeer-park-15994923/',
  },
  {
    alt: 'mountains',
    artist: 'Eberhard Grossgasteiger',
    path: 'https://www.pexels.com/da-dk/foto/forkolelse-sne-landskab-natur-2437286/',
  },
  {
    alt: 'elephant',
    artist: 'Eric Kamoga',
    path: 'https://www.pexels.com/da-dk/foto/natur-dyr-graes-elefant-17081254/',
  },
];

const changeSlide = (e) => {
  e.preventDefault();
  if (e.target.matches('.previous')) {
    showSlides((slideIndex -= 1));
  } else if (e.target.matches('.next')) {
    showSlides((slideIndex += 1));
  } else if (e.target.matches('.nav-dots')) {
    const dotIndex = e.target.dataset.indexNumber;
    showSlides((slideIndex = dotIndex));
  }
};

arrows.forEach((arrow) => {
  arrow.addEventListener('click', changeSlide);
});

navDots.forEach((dot) => {
  dot.addEventListener('click', changeSlide);
});

let slideIndex = 1;

let showSlides = (n) => {
  if (n > albumImages.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = albumImages.length;
  }
  albumImages.forEach((image) => {
    image.classList.remove('active-img');
  });
  navDots.forEach((subject) => {
    subject.classList.remove('active-dot');
  });

  navDots[slideIndex - 1].classList.add('active-dot');
  albumImages[slideIndex - 1].classList.add('active-img');
  const imageAlt = albumImages[slideIndex - 1].getAttribute('alt');

  const divCredits = document.querySelector('[data-credits]');
  const paraCredits = document.querySelector('.para-credits');
  const linkCredits = document.querySelector('.link-credits');

  for (let i = 0; i < imageInfo.length; i++) {
    if (imageAlt === imageInfo[i].alt) {
      linkCredits.setAttribute('href', imageInfo[i].path);
      linkCredits.textContent = imageInfo[i].artist;
    }
  }
  paraCredits.appendChild(linkCredits);
  divCredits.appendChild(paraCredits);

  // if (slideIndex < albumImages.length) {
  //   slideIndex++;
  // } else {
  //   slideIndex = 1;
  // }

  // setTimeout(showSlides, 2000);
};

showSlides(slideIndex);
