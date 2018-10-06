module.exports= {
    //mailer funcction
    sendEmail: function(transporter,paramHtml,receiever){
    let mailOptions = {
      from: "ptcl_noc@gmail.com",
      to: receiever,
      subject: `Number of Requests for application in KPK`,
      html: paramHtml
     // text: `Hi there, this email was automatically sent by the wifi app`
    };
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        throw error;
      } else {
        console.log("Email successfully sent!");
      }
    });
  
  },
  createHtml: function (x){
    var htmlEmail = `
    <h1>The requests of Internet access</h1>
    <table style="width:100%">
      <tr>
        <th>Firstname</th>
        <th>Email</th>
        <th>Age</th>
      </tr>
    `
    for(var i=0;i<x.length;i++){
        htmlEmail +=`
        <tr>
    <td><p> ${x[i].name}</p></td>
    <td><p>${x[i].email}</p></td>
    <td><p>${x[i].status}</p></td>
    </tr>
    `
    }
    htmlEmail +=`
    </table>
    <h3>There are total ${x.length} requests on your list</h3>        
    `;
    console.log(htmlEmail);
    return htmlEmail;
    },


    scheduleCronForPerioidicEmailToAdmin: function(transporter,cron,dbRef){
        let myrequests=[];
        cron.schedule("0 */3 * * *", function(){
        //cron.schedule("* * * * *", function(){  
          console.log("---------------------");
            console.log("Running Cron Job");
          
          //getting data firebase
          dbRef.orderByChild('status').equalTo('pending').once('value',snap => {
              myrequests=[];
              //console.log(snap)
              //console.log(snap.key)
              snap.forEach(function(childSnap){
                  console.log('a single row is=',childSnap.val().name);
                  myrequests.push(childSnap.val())
              })
              //console.log(snap.val())
              // myrequests.push(snap.val())
          }).then(function(param){
              //when async returns , call the mailer
              var myHtml=module.exports.createHtml(myrequests);
              module.exports.sendEmail(transporter,myHtml,"saqib.arfeen@cloud9net.com");
          });
          });
    }
    
}