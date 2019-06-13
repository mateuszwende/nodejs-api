const { sendMailService } = require('../../../app/services/mailer');

describe('MAILER', function() {
    it.skip('should send email', async () => {
        let res;
        const secretToken = 'asd2fwdsgveg25r';
        try {
            res = await sendMailService({
                from: '"BestBefore" <matikkk2222@o2.pl>',
                to: "matwende@gmail.com",
                subject: "Hello ✔", 
                html: `<h4>Welcome on the board!</h4>
                <p>Please verify your email by clicking on this link: <br/>
                <form method="POST" action="${process.env.URL}/api/user/verify"
          
                  <button type="submit">Verify</button>
                </form>
                <a href="${process.env.URL}/api/user/verify?token=${secretToken}">
                ${process.env.URL}/api/user/verify?token=${secretToken}</a></p>
              `
              });
        } catch (err) {
            throw err;
        }

        console.log(res);
        

    });
});
