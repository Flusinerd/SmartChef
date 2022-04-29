import "./Breadcrumb.css"

const defaultProps = {
    crumbs: ['Home', 'Category', 'Sub Category'],
    selected: (crumb: any)=>{
        console.log(crumb)
    }

}

function Breadcrumb(props: BreadcrumbProps) {

    function isLast(index: number) {
        return index === props.crumbs.length - 1;
      }

    return ( <>
        <nav className="breadNav">
      <ol className="breadcrumb">
        {
          props.crumbs.map((crumb: string, ci: number) => {
            const disabled = isLast(ci) ? 'disabled' : '';
            
            return (
              <li
                key={ ci }
                
              >
                <button className="breadElement" onClick={ () => props.selected(crumb) }>
                  { crumb }
                </button>
              </li>
            );
          })
        }
      </ol>
    </nav>    
    
    
    </> );
}

export default Breadcrumb;

export interface BreadcrumbProps {
   crumbs: string[];
   selected: any;
  }

  Breadcrumb.defaultProps = defaultProps;
