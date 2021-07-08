const searchBtn = document.querySelector('.search-btn');
const searchInput = document.querySelector('.search-input');
const listElement = document.getElementById('list');
const paginationElement = document.getElementById('pagination');
const removeBtnsCollection = document.querySelectorAll('.remove');
const clearListBtn = document.querySelector('.clear-btn');
const aboutPhoneContainer = document.querySelector('.about-phone-container');
const cardLinks = document.querySelectorAll('.card-link');
const btnClose = document.querySelector('.btn-close');
const navbarTogglerBtn = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

const searchOpen = (e) => {
  e.preventDefault();
  searchInput.style.display = 'block';
};

const searchClose = () => {
  searchInput.style.display = 'none';
};

const toggleMenu = () => navbarCollapse.classList.toggle('is-open');

function itemsUpdate() {
  const aboutPhone = document.querySelectorAll('.about-phone');
  const listItems = [];

  for (let i = 0; i < aboutPhone.length; i++) {
    listItems.push(i);
  }

  let currentPage = 1;
  let rows = 8;

  function displayList(wrapper, rowsPerPage, page) {
    wrapper.innerHTML = '';
    page--;

    let start = rowsPerPage * page;
    let end = start + rowsPerPage;

    for (let i = 0; i < aboutPhone.length; i++) {
      if (i >= start && i < end) {
        aboutPhone[i].classList.remove('d-none');
      } else {
        aboutPhone[i].classList.add('d-none');
      }
    }
  }

  function setupPagination(items, wrapper, rowsPerPage) {
    wrapper.innerHTML = '';

    let pageCount = Math.ceil(items.length / rowsPerPage);
    for (let i = 1; i < pageCount + 1; i++) {
      let btn = paginationButton(i, items);
      wrapper.appendChild(btn);
    }
  }

  function paginationButton(page, items) {
    let button = document.createElement('button');
    button.classList.add('page-link');
    button.innerText = page;

    if (currentPage === page) button.classList.add('active');

    button.addEventListener('click', () => {
      currentPage = page;
      displayList(listElement, rows, currentPage);

      let currentBtn = document.querySelector('.page-link.active');
      currentBtn.classList.remove('active');

      button.classList.add('active');
    });

    return button;
  }

  displayList(listElement, rows, currentPage);
  setupPagination(listItems, paginationElement, rows);
}

document.addEventListener('DOMContentLoaded', () => {
  itemsUpdate();
  initSwiper();
});

function initSwiper() {
  new Swiper('.swiper-container', {
    loop: true,
    slidesPerView: 4,
    autoplay: {
      delay: 1000,
    },
  });
}

removeBtnsCollection.forEach((btn) => {
  btn.addEventListener('click', () => {
    btn.closest('.about-phone').remove();
    itemsUpdate();
  });
});

clearListBtn.addEventListener('click', () => {
  aboutPhoneContainer.innerHTML = '<span>Wishlist is empty.</span>';
  aboutPhoneContainer.style.textAlign = 'center';
  paginationElement.remove();
  clearListBtn.setAttribute('disabled', '');
  clearListBtn.style.border = '1px solid #ccc';
});

searchBtn.addEventListener('click', searchOpen);

document.addEventListener('click', (e) => {
  const target = e.target;
  if (target.classList.contains('body')) {
    searchClose();
  }
});

cardLinks.forEach((link) => {
  link.addEventListener('click', (e) => e.preventDefault());
});

navbarTogglerBtn.addEventListener('click', toggleMenu);

btnClose.addEventListener('click', toggleMenu);
