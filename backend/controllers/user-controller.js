const logger = require('../config/winston');
const userService = require('../services/user-service');

const logTitle = '(user-controller)';

exports.findUserByEmail = async function (req, res) {
  const { body } = req;

  if (body) {
    logger.info(
      `${logTitle} : findUserByEmail : body : ${JSON.stringify(body)}`
    );
    // fetch user data by email input
    const userData = await userService.fetchUserByEmail(body);
    logger.info(
      `${logTitle} : registerUser : userData : ${JSON.stringify(userData)}`
    );
    res.json({
      error: userData.error,
      exist: userData.exist,
      message: userData.message,
      data: userData.data,
    });
  }
};

exports.registerUser = async function (req, res) {
  const { body } = req;

  if (body) {
    logger.info(`${logTitle} : registerUser : body : ${JSON.stringify(body)}`);
    // save user first time registration
    const saveUser = await userService.saveUserData(body);
    logger.info(
      `${logTitle} : registerUser : saveUser : ${JSON.stringify(saveUser)}`
    );
    res.json({
      error: saveUser.error,
      message: saveUser.message,
    });
  }
};
