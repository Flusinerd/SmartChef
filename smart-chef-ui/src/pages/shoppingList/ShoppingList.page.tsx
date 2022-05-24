import React, { useState } from "react";
import SCIngredients from "../../components/ingredients/Ingredients";
import SCInput from "../../components/input/Input";
import SCResponsiveContainer from "../../components/responsive-container/responsive-container";
import Dude from "./dude.svg";
import styles from "./shoppingpage.module.css";

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

  const openOverlay = () => {};

  return (
    <SCResponsiveContainer pageTitle="Einkaufsliste">
      <div className={styles.centerContents}>
        <img src={Dude} alt="dude" className={styles["bg-image"]} />
        <div className={styles.listwrapper}>
          <div className={styles.ingredientSearch}>
            <SCInput placeholder="Suchen" />
          </div>

          {/* Neuen Artikel hinzufügen Button braucht eine Funktion zum öffnen des Modals */}
          <SCIngredients openOverlay={openOverlay} items={ingredients} />
        </div>
      </div>
      {/* Hier SCAccordion einfuegen  */}
    </SCResponsiveContainer>
  );
}
export default SCShoppingListPage;
