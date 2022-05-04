import "./Ingredients.css";
import SCIngredient, { SCIngredientProps } from "../ingredient/Ingredient";


function SCIngredients(props: any) {
  return (
    <ul>
      {props.items.map((ingredient: SCIngredientProps) => (
        <SCIngredient
          key={ingredient.id}
          title={ingredient.title}
          quantity={ingredient.quantity}
        />
      ))}
      <li className ="newArticle">
        
          <button>+</button>
          <p>Neuen Artikel hinzufügen</p>
        
      </li>
    </ul>
  );
}

export default SCIngredients;
