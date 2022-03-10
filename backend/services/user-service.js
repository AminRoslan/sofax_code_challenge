const logger = require('../config/winston');
const User = require('../models/user');

const logTitle = '(user-service)';

exports.fetchUserByEmail = async function (body) {
  logger.info(
    `${logTitle} : fetchUserByEmail : body : ${JSON.stringify(body)}`
  );

  return new Promise((resolve) => {
    let responseData = {};
    const email = {
      email: body.email,
    };

    User.findOne(email)
      .then((user) => {
        if (user) {
          logger.info(
            `${logTitle} : fetchUserByEmail : user : ${JSON.stringify(user)}`
          );
          responseData = {
            error: false,
            exist: true,
            message: 'Success get user.',
            data: user,
          };
          resolve(responseData);
        } else {
          responseData = {
            error: false,
            exist: false,
            message: 'User not found.',
            data: '',
          };
          resolve(responseData);
        }
      })
      .catch((error) => {
        logger.error(`${logTitle} : error : ${error}`);
        responseData = {
          error: true,
          exist: false,
          message: 'Data not available.',
          data: '',
        };
        resolve(responseData);
      });
  });
};

exports.saveUserData = async function (body) {
  logger.info(`${logTitle} : saveUserData : body : ${JSON.stringify(body)}`);

  return new Promise((resolve) => {
    let responseData = {};
    const user = new User({
      email: body.email,
      first_name: body.first_name,
      last_name: body.last_name,
      phone_number: body.phone_number,
    });
    user
      .save()
      .then((result) => {
        if (result) {
          logger.info(
            `${logTitle} : saveUserData : result : ${JSON.stringify(result)}`
          );
          responseData = {
            error: false,
            message: 'Success save user.',
          };
          resolve(responseData);
        }
      })
      .catch((error) => {
        logger.error(`${logTitle} : saveUserData : error : ${error}`);
        responseData = {
          error: true,
          message: 'User not saved.',
        };
        resolve(responseData);
      });
  });
};
