import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../api";
import { AuthService } from "../../authentication";
import SCButton from "../../components/button/button";
import SCIngredients from "../../components/ingredients/Ingredients";
import SCInput from "../../components/input/Input";
import SCModal from "../../components/modal/Modal";
import SCResponsiveContainer from "../../components/responsive-container/responsive-container";
import { HouseholdWithStockDTO } from "../../shared/household";
import { ProductCategoryDto } from "../../shared/product-category";
import { ReactComponent as Dude } from "./dude.svg";
import styles from "./shoppingpage.module.css";

function SCShoppingListPage(): React.ReactElement {
  const [showModal, setShowModal] = useState(false);
  const [productCategories, setProductCategories] = useState<
    Map<ProductCategoryDto, ShoppingListItem>
  >(new Map());
  const [list, setList] = useState<any[]>([]);

  useEffect(() => {
    setList(Array.from(productCategories.entries())
              .sort((a, b) => (a === b ? 0 : a ? 1 : -1))
              .map(([category, item]) => ({
                quantity: item.quantity + " " + item.unit,
                title: category.name,
                id: category.id,
                strikeThrough: item.bought,
              })))
  }, [productCategories]);

  const authService = AuthService.getInstance();

  const hideModal = () => {
    setShowModal(false);
  };

  const openOverlay = () => {
    setShowModal(true);
  };

  const modalNewArticleButtons = (
    <>
      <div className={styles.mCNewArticleInputs}>
        <SCInput type="text" placeholder="Neuer Artikel" />
        <SCInput type="text" placeholder="Menge" />
      </div>
      <div className={styles.mCNewArticleButtons}>
        <SCButton id={styles.btnCancel} onClick={hideModal}>
          Abbrechen
        </SCButton>
        <SCButton id={styles.btnSave}>Speichern</SCButton>
      </div>
    </>
  );

  useEffect(() => {
    async function fetchData() {
      if (
        !authService.tokenData ||
        !authService.tokenData.householdIds ||
        authService.tokenData.householdIds.length === 0
      ) {
        alert("Sie müssen sich zuerst in einem Haushalt einloggen");
        return;
      }
      const household = await axios.get<HouseholdWithStockDTO>(
        `${baseUrl}/api/households/${authService.tokenData.householdIds[0]}`
      );
      const productCategories = new Map<ProductCategoryDto, ShoppingListItem>();
      household.data.stock.forEach((stock) => {
        const delta = stock.target - stock.actual;
        if (delta > 0) {
          if (productCategories.has(stock.product.category)) {
            const current = productCategories.get(
              stock.product.category
            ) as ShoppingListItem;
            current.quantity += delta;
            productCategories.set(stock.product.category, current);
          } else {
            productCategories.set(stock.product.category, {
              bought: false,
              unit: stock.product.unit,
              quantity: delta,
            });
          }
        }
      });
      setProductCategories(productCategories);
    }
    fetchData();
  }, [authService.tokenData]);

  return (
    <SCResponsiveContainer>
      {showModal && (
        <SCModal
          modaltitle="Neuen Artikel hinzufügen"
          children="Fügen Sie einen neuen Artikel der Einkaufsliste hinzu:"
          hideOverlay={hideModal}
          buttons={modalNewArticleButtons}
        />
      )}
      <div className={styles.centerContents}>
        <Dude className={styles.dude} />
        <div className={styles.listwrapper}>
          {/* <div className={styles.ingredientSearch}>
            <SCInput placeholder="Suchen" />
          </div> */}

          <SCIngredients
            openOverlay={openOverlay}
            items={list}
            onCheckboxClick={(key: string, isChecked: boolean) => {
              const current = Array.from(productCategories.entries()).find(
                ([category, item]) => category.id === key
              );

              if (current) {
                const [category, item] = current;
                item.bought = isChecked;
                productCategories.set(category, item);
              }

              setProductCategories(new Map(productCategories));
              console.log(productCategories);
            }}
          />
        </div>
      </div>
      {/* Hier SCAccordion einfuegen  */}
    </SCResponsiveContainer>
  );
}
export default SCShoppingListPage;

type ShoppingListItem = {
  quantity: number;
  unit?: string;
  bought: boolean;
};
