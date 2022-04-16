import * as istanbul from "istanbul-lib-coverage";

const map = istanbul.createCoverageMap({});

declare global {
  interface Window {
    __coverage__: any;
  }
}

Cypress.on("window:before:unload", (e) => {
  // @ts-ignore
  const coverage = e.currentTarget.__coverage__;

  if (coverage) {
    map.merge(coverage);
  }
});

after(() => {
  cy.window().then((win) => {
    const coverage = win.__coverage__;

    if (coverage) {
      map.merge(coverage);
    }

    cy.writeFile(".nyc_output/out.json", JSON.stringify(map));
    cy.exec("nyc report --reporter=html");
  });
});
