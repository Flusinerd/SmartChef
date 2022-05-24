import React from "react";
import SCIngredients from "../../components/ingredients/Ingredients";
import SCInput from "../../components/input/Input";
import styles from "./shoppingpage.module.css";
import { useState } from "react";
import { ReactComponent as Dude } from "./dude.svg";
import SCResponsiveContainer from "../../components/responsive-container/responsive-container";
import SCModal from "../../components/modal/Modal";

function SCShoppingListPage(): React.ReactElement {
  const [showModal, setShowModal] = useState(false);

  const hideModal = () => {
    setShowModal(false);
  };

  const openOverlay = () => {
      setShowModal(true);
  }

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
    <SCResponsiveContainer>
      {showModal && <SCModal hideOverlay={hideModal} />}
      <div className={styles.centerContents}>
        <Dude className={styles.dude} />
        <div className={styles.listwrapper}>
          <div className={styles.ingredientSearch}>
            <SCInput placeholder="Suchen" />
          </div>

          <SCIngredients openOverlay={openOverlay} items={ingredients} />
        </div>
      </div>
      {/* Hier SCAccordion einfuegen  */}
    </SCResponsiveContainer>
  );
}
export default SCShoppingListPage;
