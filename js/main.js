let btn_nav = document.querySelector("#btn_nav");
let form = document.querySelector("form");
let inp1 = document.querySelector("#inp1");
let inp2 = document.querySelector("#inp2");
let inp3 = document.querySelector("#inp3");
let form_inp = document.querySelectorAll("form input");
let ul = document.querySelector("#ul");
// ! Create
btn_nav.addEventListener("click", (event) => {
  form.style.display = "block";
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    form_inp.forEach((elem) => {
      if (!elem.value.trim()) {
        alert("Заполните данные");
      }
    });
    let obj = { name: inp1.value, phone: inp2.value, image: inp3.value };
    let data = JSON.parse(localStorage.getItem("users"));
    data.push(obj);
    localStorage.setItem("users", JSON.stringify(data));
    readFunc();
    form_inp.value = "";
  });
});

// ! read
readFunc();
function readFunc() {
  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", "[]");
  }

  ul.innerHTML = "";
  let data = JSON.parse(localStorage.getItem("users"));
  data.forEach((elem, index) => {
    console.log(elem);

    ul.innerHTML += `
      <li>
          ${elem.name}
          ${elem.phone}
          <img src ="${elem.image}" width = 120 height =120 alt="image">
          <button id="btnDel" onclick="deleteFunc(${index})">delete</button>
          <button id ="btn2Del" onclick="editFunc(${index})">Edit</button>
        </li>
      `;
  });
}

// ! Delete
function deleteFunc(index) {
  let data = JSON.parse(localStorage.getItem("users"));
  data.splice(index, 1);
  localStorage.setItem("users", JSON.stringify(data));
  readFunc();
}

//! Edit

let modal = document.querySelector(".modal");
let inpEdit = document.querySelector(".modal_body input");
let minp1 = document.querySelector("#minp1");
let minp2 = document.querySelector("#minp2");
let minp3 = document.querySelector("#minp3");
let btnSave = document.querySelector(".modal_body button");
let closeModal = document.querySelector(".modal_footer button");

function editFunc(index) {
  modal.style.display = "block";
  let data = JSON.parse(localStorage.getItem("users"));
  minp1.value = data[index].name;
  minp1.setAttribute("id", index);
  minp2.value = data[index].phone;
  minp2.setAttribute("id", index);
  minp3.value = data[index].image;
  minp3.setAttribute("id", index);
}

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});
btnSave.addEventListener("click", () => {
  modal.style.display = "none";
  let id1 = minp1.id1;
  let id2 = minp1.id2;
  let id3 = minp1.id3;
  let data = JSON.parse(localStorage.getItem("users"));
  let newObj = {
    name: minp1.value,
    phone: minp2.value,
    image: minp3.value,
  };
  data.splice(id1, 1, newObj);
  data.splice(id2, 1, newObj);
  data.splice(id3, 1, newObj);
  localStorage.setItem("users", JSON.stringify(data));
  readFunc();
});
