"use strict";
const { transporter } = require('./transporter');
 
module.exports = {
     sendMailService: ({from, to, subject, html})  => {
        return new Promise((res, rej) => {
            transporter.sendMail({ from, to, subject, html}, (err, info) => {
                if (err)
                    rej(err);

                res(info);
            });
        });
    }
}
