import { classNames } from "../../shared/merge-classnames";
import SCInput from "../input/Input";
import styles from "./Ingredient.module.css";

function SCIngredient(props: SCIngredientProps) {
  return (
    <li
      className={classNames(
        styles["ingredientItem"],
        props.strikeThrough ? styles["bought"] : ""
      )}
    >
      <div className={styles["ingredientItemLi"]}>
        <SCInput
          type="checkbox"
          onChange={(event) => {
            props.onCheckboxClick(event.target.checked);
          }}
        />
        <div
          className={classNames(
            styles["ingredientTitle"],
            props.strikeThrough ? styles["strike-through"] : ""
          )}
        >
          {props.title}
        </div>
      </div>
      <div
        className={classNames(
          styles["ingredientQuantity"],
          props.strikeThrough ? styles["strike-through"] : ""
        )}
      >
        {props.quantity}
      </div>
    </li>
  );
}
export interface SCIngredientProps {
  id: string;
  title: string;
  quantity: string;
  strikeThrough?: boolean;
  onCheckboxClick: (isChecked: boolean) => void;
}

export default SCIngredient;
