import styles from "./Ingredients.module.css";
import SCIngredient, { SCIngredientProps } from "../ingredient/Ingredient";

function SCIngredients(props: SCIngredientsProps) {
  return (
    <ul className={styles.ulIngredients}>
      {props.items.map(
        (ingredient: Omit<SCIngredientProps, "onCheckboxClick">) => (
          <SCIngredient
            key={ingredient.id}
            title={ingredient.title}
            quantity={ingredient.quantity}
            strikeThrough={ingredient.strikeThrough}
            id={ingredient.id}
            onCheckboxClick={(isChecked: boolean) => {
              props.onCheckboxClick(ingredient.id, isChecked);
            }}
          />
        )
      )}
      {/* <li className={styles.newArticle}>
        <button onClick={props.openOverlay}>+</button>
        <p>Neuen Artikel hinzufügen</p>
      </li> */}
    </ul>
  );
}

export default SCIngredients;

export interface SCIngredientsProps {
  items: Omit<SCIngredientProps, "onCheckboxClick">[];
  onCheckboxClick: (key: string, isChecked: boolean) => void;
  openOverlay: () => void;
}
