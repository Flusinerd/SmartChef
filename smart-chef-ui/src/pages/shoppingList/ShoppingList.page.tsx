import SCNavbar from "../../components/navbar/Navbar";
import React from "react";
import SCIngredients from "../../components/ingredients/Ingredients";
import SCCard from "../../components/card/Card";
import SCInput from "../../components/input/Input";
import styles from "./shoppingpage.module.css";
import { useState } from "react";

function SCShoppingListPage(): React.ReactElement {
  const [ingredients, setIngredients] = useState([
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
      <div className ={styles.centerContents}>
        <div className={styles.listwrapper}>
          <div className={styles.ingredientSearch}>
            <SCInput placeholder="Suchen" />
          </div>
          <SCCard>
            <SCIngredients items={ingredients} />
          </SCCard>
        </div>
      </div>
      {/* Hier SCAccordion einfuegen  */}
    </React.Fragment>
  );
}
export default SCShoppingListPage;
