const { transporter } = require("../config/mailer");
let handlebars = require("handlebars");
let fs = require("fs");

exports.sendRegisterEmail = (user, password) => {
  readHTMLFile(
    __dirname + "/../utils/emails/registerConfirmation.html",
    function (err, html) {
      if (err) {
        console.error("error reading file", err);
        return;
      }
      let template = handlebars.compile(html);
      let replacements = {
        username: user.name,
        password,
      };
      let htmlToSend = template(replacements);
      let mailOptions = {
        from: '"Net Security 👮‍♂️🛡" <netsecurity@gmail.com>',
        to: user.email,
        subject: "Gracias por registrarte en Net Security",
        html: htmlToSend,
      };
      transporter.sendMail(mailOptions, function (error, response) {
        if (error) {
          console.error(error);
        }
      });
    }
  );
};

/* exports.sendForgotPasswordEmail = async (user, token) => {
  readHTMLFile(
    __dirname + "/../utils/emails/forgotPassword.html",
    function (err, html) {
      if (err) {
        console.error("error reading file", err);
        return;
      }
      let template = handlebars.compile(html);
      let replacements = {
        username: user.name,
        userId: user.id,
        token,
      };
      let htmlToSend = template(replacements);
      let mailOptions = {
        from: '"Net Security 👮‍♂️🛡" <netsecurity@gmail.com>',
        to: user.email,
        subject: "Te ayudamos a obtener una nueva contraseña",
        html: htmlToSend,
      };
      transporter.sendMail(mailOptions, function (error, response) {
        if (error) {
          console.error(error);
        }
      });
    }
  );
}; */

let readHTMLFile = function (path, callback) {
  fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
    if (err) {
      callback(err);
    } else {
      callback(null, html);
    }
  });
};
