const sendgrid = require('sendgrid');
const helper = require('sendgrid').mail;
const azure = require('azure-storage');

module.exports = {
  emailQueue: 'emails-to-send',
  templates: {
    UTD_TV_SIGNUP: '7f610a12-21fe-4b50-a4ae-c8f974598d3c',
    ADMIN_ACTION: '2c6c78f3-784c-4663-9709-766963c5617d',
    USER_RESERVATION_RESPONSE: '58154394-8687-4655-b92a-07bb34796276',
    USER_RESERVATION_ADMIN_NOTES: '5c3be594-714a-41c8-b07d-f646fd267867',
    CREATED_RESERVATION: '9cb91814-4954-4be8-83c6-d5ac609063c3',
    RESET_PASSWORD: 'a5f46d68-9542-4448-9040-f4514346ebe8',
  },
  queueEmails(to, subject, body, template) {
    return new Promise((resolve, reject) => {
      const service = azure.createQueueService();

      const message = {
        users: to,
        subject,
        body,
        template: this.templates[template],
        environment: process.env.NODE_ENV,
      };

      service.createQueueIfNotExists(this.emailQueue, (error, result, response) => {
        if (!error) {
          service.createMessage(this.emailQueue, JSON.stringify(message), (error, result, response) => {
            if (!error) {
              resolve();
            } else {
              reject();
            }
          });
        } else {
          reject();
        }
      });
    });
  },
  sendEmail(app, to, subject, body, template) {
    return new Promise((resolve, reject) => {
      const client = sendgrid.SendGrid(app.get('keys').SENDGRID_KEY);

      const fromEmail = new helper.Email('technology@utdtv.com');
      const toEmail = new helper.Email(to);
      const content = new helper.Content('text/html', body);
      const mail = new helper.Mail();

      mail.setSubject(subject);
      mail.addContent(content);
      mail.setFrom(fromEmail);
      mail.setTemplateId(this.templates[template]);

      const personalization = new helper.Personalization();
      personalization.addTo(toEmail);
      mail.addPersonalization(personalization);

      const requestBody = mail.toJSON();
      const request = client.emptyRequest();

      request.method = 'POST';
      request.path = '/v3/mail/send';
      request.body = requestBody;

      client.API(request, (response) => {
        if (response.statusCode >= 300) {
          reject(response);
        } else {
          resolve(response);
        }
      });
    });
  },
};
