describe('Sayfayı aç', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('inputun içi var mı?', () => {
    cy
      .get(".cy-renkInput")
      .should("have.value","")
  })

  it('buton disabled mı?', () => {
    cy
      .get(".cy-submit")
      .should("be.disabled")
  })

  it('tek karakter yaz',() =>{
    cy
      .get('.cy-renkInput')
      .type('m')
      .should('have.value','m')
  })
  it('hata divi ilgili hatayı içeryor mu ?', () => {
    cy
      .get('.cy-error')
      .should('have.value',"Renginiz 2 karakterden kısa olamaz.")
  })
})
