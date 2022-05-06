import SCNavbar from "../../components/navbar/Navbar";
import React from "react";
import SCIngredients from "../../components/ingredients/Ingredients";
import SCInput from "../../components/input/Input";
import styles from "./shoppingpage.module.css";
import { useState } from "react";
import Dude from "./dude.svg";

function SCShoppingListPage(): React.ReactElement {
  const [ingredients] = useState([
    {
      id: 1,
      title: "Tomatensaft",
      quantity: "1 L",
    },
    {
      id: 2,
      title: "Käse",
      quantity: "100 g",
    },
  ]);

  return (
    <React.Fragment>
      <SCNavbar />
      <div className={styles.centerContents}>
        <img src={Dude} alt="dude" />
        <div className={styles.listwrapper}>
          <div className={styles.ingredientSearch}>
            <SCInput placeholder="Suchen" />
          </div>

            {/* Neuen Artikel hinzufügen Button braucht eine Funktion zum öffnen des Modals */}
          <SCIngredients openOverlay={() => {}} items={ingredients} />
        </div>
      </div>
      {/* Hier SCAccordion einfuegen  */}
    </React.Fragment>
  );
}
export default SCShoppingListPage;
