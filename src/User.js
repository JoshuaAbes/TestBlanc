"use strict";

class User {
  constructor({
    title,
    firstName,
    lastName,
    city,
    country,
    age,
    email,
    photo,
  }) {
    this.title = title;
    this.firstName = firstName;
    this.lastName = lastName;
    this.city = city;
    this.country = country;
    this.age = age;
    this.email = email;
    this.photo = photo;
    this.present = false; // Défini à false par défaut
    this.element = this.createUserElement();

    // Ajout d'un event listener pour inverser l'état de présence
    this.element.addEventListener("click", () => this.togglePresence());
  }

  createUserElement() {
    const userDiv = document.createElement("div");
    userDiv.className = "user";
    userDiv.dataset.present = this.present;

    userDiv.insertAdjacentHTML(
      "beforeend",
      `
            <img src="${this.photo}" alt="${this.firstName} ${this.lastName}">
            <div class="user--info">
                <h1>${this.title} ${this.firstName} ${this.lastName}</h1>
                <p>${this.age} years old</p>
                <p>${this.city}, ${this.country}</p>
            </div>
            <div>
                <a href="mailto:${this.email}">
                    <span class="mail logo">📧</span>
                </a>
            </div>
        `
    );

    return userDiv;
  }
  render() {
    const mainElement = document.querySelector("main");
    if (mainElement) {
      mainElement.appendChild(this.element);
    }
  }
  togglePresence() {
    // Inverser l'état de présence
    this.present = !this.present;
    this.element.dataset.present = this.present;

    // Mettre à jour le compteur d'utilisateurs présents
    updateCounter()
  }
}

export default User;
