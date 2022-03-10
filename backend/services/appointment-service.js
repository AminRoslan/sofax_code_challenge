const logger = require('../config/winston');
const Appointment = require('../models/appointment');
const User = require('../models/user');

const logTitle = '(user-service)';

exports.findAppointmentByUserId = async function (paams) {
  logger.info(
    `${logTitle} : findAppointmentByUserId : params : ${JSON.stringify(paams)}`
  );

  return new Promise((resolve) => {
    let responseData = {};
    const data = {
      user: paams.id,
    };

    Appointment.findOne(data)
      .then((appointment) => {
        if (appointment) {
          logger.info(
            `${logTitle} : findAppointmentByUserId : appointment : ${JSON.stringify(
              appointment
            )}`
          );
          responseData = {
            error: false,
            exist: true,
            message: 'Success find user appointment.',
            data: appointment,
          };
          resolve(responseData);
        } else {
          responseData = {
            error: false,
            exist: false,
            message: 'Not appointment found.',
            data: '',
          };
          resolve(responseData);
        }
      })
      .catch((error) => {
        logger.error(
          `${logTitle} : findAppointmentByUserId : error : ${error}`
        );
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

exports.findAppointmentByDate = async function (body) {
  logger.info(
    `${logTitle} : findAppointmentByDate : body : ${JSON.stringify(body)}`
  );

  return new Promise((resolve) => {
    let responseData = {};
    const data = {
      date: body.date,
    };

    Appointment.find(data)
      .then((appointment) => {
        if (appointment.length !== 0) {
          logger.info(
            `${logTitle} : findAppointmentByDate : appointment : ${JSON.stringify(
              appointment
            )}`
          );
          responseData = {
            error: false,
            exist: true,
            message: 'Success find appointment.',
            data: appointment,
          };
          resolve(responseData);
        } else {
          responseData = {
            error: false,
            exist: false,
            message: 'Not appointment found.',
            data: '',
          };
          resolve(responseData);
        }
      })
      .catch((error) => {
        logger.error(`${logTitle} : findAppointmentByDate : error : ${error}`);
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

// Will delete any user appointment before try to save new appointment
exports.saveAppointment = async function (body) {
  logger.info(`${logTitle} : saveAppointment : body : ${JSON.stringify(body)}`);

  return new Promise((resolve) => {
    let responseData = {};

    User.findById(body.user_id)
      .then((user) => {
        if (user) {
          logger.info(
            `${logTitle} : saveAppointment : user : ${JSON.stringify(user)}`
          );

          const data = {
            user: body.user_id,
          };

          Appointment.deleteMany(data)
            .then((result) => {
              if (result) {
                const appointment = new Appointment({
                  user: user,
                  date: body.date,
                  time: body.time,
                });

                appointment
                  .save()
                  .then((saveAppointment) => {
                    if (saveAppointment) {
                      logger.info(
                        `${logTitle} : saveAppointment : appointment : ${JSON.stringify(
                          saveAppointment
                        )}`
                      );
                      responseData = {
                        error: false,
                        message: 'Success save appointment',
                        data: saveAppointment,
                      };
                      resolve(responseData);
                    }
                  })
                  .catch((error) => {
                    logger.error(
                      `${logTitle} : saveAppointment : error : ${error}`
                    );
                    responseData = {
                      error: true,
                      message: 'Not Success',
                      data: '',
                    };
                    resolve(responseData);
                  });
              }
            })
            .catch((error) => {
              logger.error(`${logTitle} : saveAppointment : error : ${error}`);
              responseData = {
                error: true,
                message: 'Not Success',
                data: '',
              };
              resolve(responseData);
            });
        }
      })
      .catch((error) => {
        logger.error(`${logTitle} : saveAppointment : error : ${error}`);
        responseData = {
          error: true,
          message: 'Not Success',
          data: '',
        };
        resolve(responseData);
      });
  });
};

exports.deleteAppointment = async function (params) {
  logger.info(
    `${logTitle} : deleteAppointment : body : ${JSON.stringify(params)}`
  );

  return new Promise((resolve) => {
    let responseData = {};
    const data = {
      user: params.id,
    };
    Appointment.deleteOne(data)
      .then((result) => {
        if (result) {
          responseData = {
            error: false,
            message: 'Success delete appointment.',
          };
          resolve(responseData);
        }
      })
      .catch((error) => {
        logger.error(`${logTitle} : deleteAppointment : error : ${error}`);
        responseData = {
          error: true,
          message: 'Cannot delete appointment.',
        };
        resolve(responseData);
      });
  });
};
