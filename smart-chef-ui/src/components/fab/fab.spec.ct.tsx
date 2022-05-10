import { mount } from "@cypress/react"
import SCFab from "./Fab"

describe('Fab', () => {
    it('should render correctly', () => {
        mount(<SCFab />)
    });

    it('should allow for a onClick callback', () => {
        const onClick = () => {
            console.log("clicked");
        }
        const spy = cy.spy(onClick);
        mount(<SCFab onClick={(spy)} />);
        cy.get('button').click().then(() => {
            expect(spy).to.be.calledOnce;
        });
    });
})
