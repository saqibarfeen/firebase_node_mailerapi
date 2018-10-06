const mailModule= require('../server')
module.exports = function(app,db){
    app.post('/email/v1.0/send-newuser-mail', (req, res) => {
       // console.log(req.param.name);
        console.log(req.body);
        //var name = req.body.name;
        //var password = req.body.password;
        mailModule.tools.sendEmail(mailModule.transporter,'<h1>Hello</h1>',req.body.email);
        res.send('Hello')
      });
};