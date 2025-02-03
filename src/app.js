"use strict";

import User from "./User.js";

// Fonction pour récupérer les utilisateurs depuis l'API randomuser.me
const getRandomUser = async () => {
  const randomUser = `https://randomuser.me/api/?results=20`;
  try {
    const response = await fetch(randomUser);
    const data = await response.json();

    // Nettoyer et formater les données
    const cleanedUsers = data.results.map((user) => {
      return {
        title: user.name.title,
        firstName: user.name.first,
        lastName: user.name.last,
        city: user.location.city,
        country: user.location.country,
        age: user.dob.age,
        email: user.email,
        photo: user.picture.large,
        present: false, // état initial
      };
    });

    // Trier les utilisateurs par nom de famille A->Z
    cleanedUsers.sort((a, b) => a.lastName.localeCompare(b.lastName));
    return cleanedUsers;
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    throw error;
  }
};

// Création et afficahge des utilisateurs SANS POINTS BONUS
/*
getRandomUser().then((users) => {
  users.forEach((userData) => {
    const user = new User(userData);
    user.render();
  });
});
*/

// Fonction pour afficher les utilisateurs dans le container <main>
const renderUsers = (users) => {
  const container = document.querySelector("main");
  container.innerHTML = ""; // Effacer les profils existants

  users.forEach((userData) => {
    const user = new User(userData);
    // Ajouter un écouteur d'événements pour mettre à jour le compteur après le clic
    user.element.addEventListener("click", () => {
      setTimeout(updateCounter, 0); // Mettre à jour le compteur après le changement d'état
    });
    user.render();
  });

  // Mettre à jour le compteur initial
  updateCounter();
};

// Fonction pour mettre à jour le compteur d'utilisateurs dans l'en-tête
const updateCounter = () => {
  const counterElement = document.querySelector(".counter");
  if (counterElement) {
    // Compter les utilisateurs avec data-present="true"
    const presentUsers = document.querySelectorAll(
      '.user[data-present="true"]'
    ).length;
    counterElement.textContent = `${presentUsers}/20 people are here`;
  }
};

// Fonction de tri par nom (A-Z)
const sortByName = (users) => {
  return [...users].sort((a, b) => a.lastName.localeCompare(b.lastName));
};

// Fonction de tri par âge (du plus jeune au plus âgé)
const sortByAge = (users) => {
  return [...users].sort((a, b) => a.age - b.age);
};

// Fonction pour gérer les événements des boutons de tri
const setupSortButtons = (users) => {
  const sortByNameButton = document.getElementById("sort--name");
  const sortByAgeButton = document.getElementById("sort--age");

  sortByNameButton.addEventListener("click", () => {
    renderUsers(sortByName(users)); // Trier et afficher par nom
    updateSelectedButton("name"); // Mettre à jour le bouton sélectionné
  });

  sortByAgeButton.addEventListener("click", () => {
    renderUsers(sortByAge(users)); // Trier et afficher par âge
    updateSelectedButton("age"); // Mettre à jour le bouton sélectionné
  });
};

// Fonction pour mettre à jour la classe 'selected' du bouton actif
const updateSelectedButton = (sortBy) => {
  const nameButton = document.getElementById("sort--name");
  const ageButton = document.getElementById("sort--age");

  if (sortBy === "name") {
    nameButton.classList.add("selected");
    ageButton.classList.remove("selected");
  } else {
    ageButton.classList.add("selected");
    nameButton.classList.remove("selected");
  }
};

// Charger les utilisateurs et configurer les boutons de tri
getRandomUser().then((users) => {
  renderUsers(users);
  setupSortButtons(users);
});
