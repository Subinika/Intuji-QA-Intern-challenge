
describe('Complete Student Registration Form Tests', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/automation-practice-form');
  });

  context('Name Fields', () => {
    it('TC01 - Do not accept First Name only', () => {
      cy.get('input[placeholder="First Name"]').type('John').should('have.value', 'John');
    });

    it('TC02 - Shows error for empty First Name', () => {
      cy.get('input[placeholder="First Name"]').focus().blur();
      cy.contains('First name is required').should('be.visible');
    });

    it('TC03 - Do not accept Last Name only', () => {
      cy.get('input[placeholder="Last Name"]').type('Doe').should('have.value', 'Doe');
    });

    it('TC04 - Shows error for empty Last Name', () => {
      cy.get('input[placeholder="Last Name"]').focus().blur();
      cy.contains('Last name is required').should('be.visible');
    });
  });

  context('Email Field', () => {
    it('TC05 - Accepts valid email', () => {
      cy.get('input[placeholder="name@example.com"]').type('test@example.com').should('have.value', 'test@example.com');
    });

    it('TC06 - Shows error for invalid email', () => {
      cy.get('input[placeholder="name@example.com"]').type('invalid@com');
      cy.contains('Enter a valid email').should('be.visible');
    });
  });

  context('Gender Field', () => {
    it('TC07 - Allows selecting Male', () => {
      cy.get('input[type="radio"][value="Male"]').check().should('be.checked');
    });
    it('TC08 - Allows selecting Female', () => {
      cy.get('input[type="radio"][value="Female"]').check().should('be.checked');
    });
    it('TC09 - Allows selecting Other', () => {
      cy.get('input[type="radio"][value="Other"]').check().should('be.checked');
    });
  });

  context('Mobile Number Field', () => {
    it('TC10 - Accepts valid 10-digit number', () => {
      cy.get('input[placeholder="Mobile Number"]').type('9876543210').should('have.value', '9876543210');
    });

    it('TC11 - Shows error for invalid mobile number', () => {
      cy.get('input[placeholder="Mobile Number"]').type('12345');
      cy.contains('Enter a valid mobile number').should('be.visible');
    });
  });

  context('Date of Birth Field', () => {
    it('TC12 - Accepts valid past DOB', () => {
      cy.get('input[type="date"]').type('2000-01-01').should('have.value', '2000-01-01');
    });

    it('TC13 - Shows error for future DOB', () => {
      cy.get('input[type="date"]').type('2100-01-01');
      cy.contains('Date cannot be in future').should('be.visible');
    });
  });

  context('Subjects Field', () => {
    it('TC14 - Accepts subject text', () => {
      cy.get('input[placeholder="Subjects"]').type('Maths').should('have.value', 'Maths');
    });
  });

  context('Hobbies Checkboxes', () => {
    it('TC15 - Allows selecting Sports', () => {
      cy.contains('Sports').click();
    });
    it('TC16 - Allows selecting Reading', () => {
      cy.contains('Reading').click();
    });
    it('TC17 - Allows selecting Music', () => {
      cy.contains('Music').click();
    });
  });

  /*context('Picture Upload', () => {
    it('TC18 - Allows file upload', () => {
      const fileName = 'test-image.png';
      cy.get('input[type="file"]').attachFile(fileName);
    });
  });*/

  context('Current Address Field', () => {
    it('TC19 - Accepts address text', () => {
      cy.get('textarea[placeholder="Current Address"]').type('221B Baker Street').should('have.value', '221B Baker Street');
    });
  });

  context('State and City Dropdowns', () => {
    it('TC20 - Allows selecting State', () => {
      cy.get('select').first().select('NCR');
    });
    it('TC21 - Allows selecting City', () => {
      cy.get('select').last().select('Delhi');
    });
  });

  context('Form Submission', () => {
    it('TC22 - Submits successfully with all valid inputs', () => {
      cy.get('input[placeholder="First Name"]').type('John');
      cy.get('input[placeholder="Last Name"]').type('Doe');
      cy.get('input[placeholder="name@example.com"]').type('john@example.com');
      cy.get('input[type="radio"][value="Male"]').check();
      cy.get('input[placeholder="Mobile Number"]').type('9876543210');
      cy.get('input[type="date"]').type('2000-01-01');
      cy.get('input[placeholder="Subjects"]').type('Physics');
      cy.contains('Music').click();
      cy.get('input[type="file"]').attachFile('test-image.png');
      cy.get('textarea[placeholder="Current Address"]').type('123 Main St');
      cy.get('select').first().select('NCR');
      cy.get('select').last().select('Delhi');
      cy.contains('Submit').click();
      cy.contains('Form submitted successfully').should('be.visible');
    });

    it('TC23 - Shows error if mandatory fields are missing', () => {
      cy.contains('Submit').click();
      cy.contains('First name is required').should('be.visible');
    });
  });
});
