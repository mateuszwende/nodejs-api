const smtpTransporter = require('../../../app/modules/smtp-transporter');

describe('SMTP Transporter', () => {
  it('should send an email without errors', async () => {
    const email = 'matwende@gmail.com';
    const token = 'exampleToken';

    try {
      const info = await smtpTransporter.sendVerificationTokenEmail(email, token);

      info.should.have.property('accepted').eql([email]);
      info.should.have.property('rejected').eql([]);
    } catch (err) {
      throw err;
    }
  });

  it('should send an email from proper email', async () => {
    const email = 'matwende@gmail.com';
    const token = 'exampleToken';

    try {
      const info = await smtpTransporter.sendVerificationTokenEmail(email, token);

      info.should.have.property('envelope');
      info.envelope.should.have.property('from').eql(process.env.SMTP_USER);
    } catch (err) {
      throw err;
    }
  });

  it('should send an email to proper email', async () => {
    const email = 'matwende@gmail.com';
    const token = 'exampleToken';

    try {
      const info = await smtpTransporter.sendVerificationTokenEmail(email, token);

      info.should.have.property('envelope');
      info.envelope.should.have.property('to').eql([email]);
    } catch (err) {
      throw err;
    }
  });
});
