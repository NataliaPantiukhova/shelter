document.querySelector('.burger').addEventListener('click', function () {
  document.querySelector('.burger').classList.toggle('active');
  //document.querySelector('.mobile-menu').classList.toggle('animate');
  if (document.querySelector('.mobile-menu').classList.contains('animate')) {
    document.querySelector('.mobile-menu').classList.remove('animate');
    document.querySelector('.mobile-menu').classList.add('withoutanimate');
  } else {
    document.querySelector('.mobile-menu').classList.remove('withoutanimate');
    document.querySelector('.mobile-menu').classList.add('animate');
  };
  document.querySelector('.main-logo').classList.toggle('logo-disabled');
  document.querySelector('.bg').classList.toggle('active');
  document.querySelector('.body').classList.toggle('overflow');
})

document.querySelector('.bg').addEventListener('click', function () {
  document.querySelector('.burger').classList.toggle('active');
  document.querySelector('.mobile-menu').classList.toggle('animate');
  document.querySelector('.mobile-menu').classList.toggle('withoutanimate');
  document.querySelector('.main-logo').classList.toggle('logo-disabled');
  document.querySelector('.bg').classList.toggle('active');
  document.querySelector('.body').classList.toggle('overflow');
})
window.addEventListener('resize', function () {
  if (window.innerWidth > 768) {
    document.querySelector('.main-logo').classList.remove('logo-disabled');
    document.querySelector('.burger').classList.remove('active');
    document.querySelector('.bg').classList.remove('active');
    document.querySelector('.body').classList.remove('overflow');
    if (document.querySelector('.mobile-menu').classList.contains('animate')) {
      document.querySelector('.mobile-menu').classList.remove('animate');
      document.querySelector('.mobile-menu').classList.add('withoutanimate');
    };
  }
})



let pets = []; //8
let fullPetsList = []; //48
const request = new XMLHttpRequest();
request.open('GET', 'https://rolling-scopes-school.github.io/nataliapantiukhova-JS2020Q3/shelter/assets/pets.json');
request.onload = () => { console.log(request.response) };
fetch('https://rolling-scopes-school.github.io/nataliapantiukhova-JS2020Q3/shelter/assets/pets.json').then(res => res.json()).then(list => {
  pets = list;

  fullPetsList = (() => {
    let tempArr = [];

    for (let i = 0; i < 6; i++) {
      const newPets = pets;

      for (let j = pets.length; j > 0; j--) {
        let randInd = Math.floor(Math.random() * j);
        const randElem = newPets.splice(randInd, 1)[0];
        newPets.push(randElem);
      }

      tempArr = [...tempArr, ...newPets];
    }
    return tempArr;
  })();

  fullPetsList = sort863(fullPetsList);

  createPets(fullPetsList);

  //document.querySelector("#currentPage").innerText = (currentPage+1).toString();

  for (let i = 0; i < (fullPetsList.length / 6); i++) {
    const stepList = fullPetsList.slice(i * 6, (i * 6) + 6);

    for (let j = 0; j < 6; j++) {
      stepList.forEach((item, ind) => {
        if (item.name === stepList[j].name && (ind !== j)) {
          document.querySelector("#pets").children[(i * 6) + j].style.border = '5px solid red';
        }
      })
    }
  }
})

const createPets = (petsList) => {
  const elem = document.querySelector("#pets");
  elem.innerHTML += createElements(petsList);


  !function (e) { "function" != typeof e.matches && (e.matches = e.msMatchesSelector || e.mozMatchesSelector || e.webkitMatchesSelector || function (e) { for (var t = this, o = (t.document || t.ownerDocument).querySelectorAll(e), n = 0; o[n] && o[n] !== t;)++n; return Boolean(o[n]) }), "function" != typeof e.closest && (e.closest = function (e) { for (var t = this; t && 1 === t.nodeType;) { if (t.matches(e)) return t; t = t.parentNode } return null }) }(window.Element.prototype);


  const load = () => {
    var modalButtons = elem.querySelectorAll('.js-open-modal'),
      overlay = elem.querySelector('.overlay'),
      closeButtons = elem.querySelectorAll('.js-modal-close');

    modalButtons.forEach(function (item) {
      item.addEventListener('click', function (e) {

        e.preventDefault();

        var modalId = this.getAttribute('data-modal'),
          modalElem = document.querySelector('.modal-window[data-modal="' + modalId + '"]');

        modalElem.classList.add('modal-window_open');
        overlay.classList.add('active');
      });

    });


    closeButtons.forEach(function (item) {

      item.addEventListener('click', function (e) {
        var parentModal = this.closest('.modal-window');

        parentModal.classList.remove('modal-window_open');
        overlay.classList.remove('active');
      });

    });
    document.body.addEventListener('keyup', function (e) {
      var key = e.keyCode;

      if (key == 27) {

        document.querySelector('.modal-window.modal-window_open').classList.remove('modal-window_open');
        document.querySelector('.overlay').classList.remove('active');
      };
    }, false);
    overlay.addEventListener('click', function () {
      document.querySelector('.modal-window.modal-window_open').classList.remove('modal-window_open');
      this.classList.remove('active');
    });
  };
  load();

}

createElements = (petsList) => {
  let str = '<div class="overlay js-overlay-modal"></div>';
  for (let i = 0; i < 3; i++) {
    str += `
    <div class="pets__cards__item">
        <img class="pets__cards-image" src="${petsList[i].img}" alt="${petsList[i].name}">
        <div class="pets__cards-content">
            <h4 class="pets__cards-title">${petsList[i].name}</h4>
            <button class="pets__cards-button js-open-modal" data-modal="${i}">Learn more</button>
        </div>
    </div>
    <div class="modal-window" data-modal="${i}">
        <div class="modal-window-wrap">
            <div class="modal-window__img">
                <img src="${petsList[i].img}" alt="">
            </div>
            <div class="modal-window__pet-info">
                <h3 class="pet-name">${petsList[i].name}</h3>
                <h4 class="pet-type">${petsList[i].type} ${petsList[i].breed}</h4>
                <p class="pet-description">${petsList[i].description}</p>
                <ul class="pet-info">
                    <li>
                        <strong>Age: </strong>
                        <p class=""> ${petsList[i].age}</p>
                    </li>
                    <li>
                        <strong>Inoculations: </strong>
                        <p> ${petsList[i].inoculations}</p>
                    </li>
                    <li>
                        <strong>Diseases: </strong>
                        <p> ${petsList[i].diseases}</p>
                    </li>
                    <li>
                        <strong>Parasites: </strong>
                        <p> ${petsList[i].parasites}</p>
                    </li>
                </ul>
            </div>
            <button class="close-button js-modal-close">
                <img src="../../assets/icons/Vector (1).svg" alt="close">
            </button>
        </div>

    </div>
    `;
  }
  return str;
}

request.send();

const sort863 = (list) => {
  let unique8List = [];
  let length = list.length;
  for (let i = 0; i < length / 8; i++) {
    const uniqueStepList = [];
    for (j = 0; j < list.length; j++) {
      if (uniqueStepList.length >= 8) {
        break;
      }
      const isUnique = !uniqueStepList.some((item) => {
        return item.name === list[j].name;
      });
      if (isUnique) {
        uniqueStepList.push(list[j]);
        list.splice(j, 1);
        j--;
      }
    }
    unique8List = [...unique8List, ...uniqueStepList];
  }
  list = unique8List;


  list = sort6recursively(list);

  return list;
}

const sort6recursively = (list) => {
  const length = list.length;

  for (let i = 0; i < (length / 6); i++) {
    const stepList = list.slice(i * 6, (i * 6) + 6);

    for (let j = 0; j < 6; j++) {
      const duplicatedItem = stepList.find((item, ind) => {
        return item.name === stepList[j].name && (ind !== j);
      });

      if (duplicatedItem !== undefined) {
        const ind = (i * 6) + j;
        const which8OfList = Math.trunc(ind / 8);

        list.splice(which8OfList * 8, 0, list.splice(ind, 1)[0]);

        sort6recursively(list);
      }
    }
  }

  return list;
}

