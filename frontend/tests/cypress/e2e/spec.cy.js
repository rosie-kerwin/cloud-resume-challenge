const VISITORS_ENDPOINT = 'https://bqjnm5buh4.execute-api.us-east-1.amazonaws.com/prod/visitors'
const RESUME_URL_CLOUDFRONT = "d23rbs2cp32ktb.cloudfront.net";

describe('rosiekerwinresume.com spec', () => {
  it("should open a resume page and display the correct information", () => {
    cy.visit(RESUME_URL_CLOUDFRONT);
    cy.contains('Rosie Kerwin')
    cy.contains('rosie.kerwin@gmail.com')
    cy.contains("linkedin.com/in/rosie-kerwin");
    cy.contains('Google | Software Engineer III (L4): Integration Testing Suite Team | New York, NY')
    cy.contains('Oberlin College')
  });
  it("should send a valid POST request", () => {
    cy.visit(RESUME_URL_CLOUDFRONT);
    cy.request("POST", VISITORS_ENDPOINT, {
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      expect(response.status).to.eq(200);
      const firstVisitCount = JSON.parse(response.body.body).visits;
      expect(firstVisitCount).to.be.a("number");
      return firstVisitCount;
    }).then((firstVisitCount) => {
      cy.request("POST", VISITORS_ENDPOINT, {
        headers: { "Content-Type": "application/json" },
      }).then((response) => {
        expect(response.status).to.eq(200);
        const secondVisitCount = JSON.parse(response.body.body).visits;
        console.log(`FIRST: ${firstVisitCount}`);
        console.log(`SECOND: ${secondVisitCount}`);
        expect(secondVisitCount - firstVisitCount).to.equal(1);

      });
    });
  });
})
