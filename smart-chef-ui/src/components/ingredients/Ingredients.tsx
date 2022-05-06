import styles from "./Ingredients.module.css";
import SCIngredient, { SCIngredientProps } from "../ingredient/Ingredient";


function SCIngredients(props: any) {
  return (
    <ul className={styles.ulIngredients}>
      {props.items.map((ingredient: SCIngredientProps) => (
        <SCIngredient
          key={ingredient.id}
          title={ingredient.title}
          quantity={ingredient.quantity}
        />
      ))}
      <li className ={styles.newArticle}>
        
          <button onClick={props.openOverlay} >+</button>
          <p>Neuen Artikel hinzufügen</p>
        
      </li>
    </ul>
  );
}

export default SCIngredients;
