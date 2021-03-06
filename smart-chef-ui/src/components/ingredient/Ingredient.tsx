import SCInput from "../input/Input";
import "./Ingredient.css";

function SCIngredient(props: SCIngredientProps) {
  return (
    <li className="ingredientItem">
      <div className="ingredientItemLi">
        <SCInput type="checkbox" />
        <div className="ingredientTitle">{props.title}</div>
      </div>
      <div className="ingredientQuantity">{props.quantity}</div>
      
    </li>
    
  );
}
export interface SCIngredientProps {
  id?: number;
  title: string;
  quantity: string;
}

export default SCIngredient;
