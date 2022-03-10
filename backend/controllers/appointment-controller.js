const logger = require('../config/winston');
const appointmentService = require('../services/appointment-service');

const logTitle = '(appointment-controller)';

exports.checkUserAppointment = async function (req, res) {
  const { params } = req;

  if (params) {
    logger.info(
      `${logTitle} : checkUserAppointment : params : ${JSON.stringify(params)}`
    );
    // get appointment data by user id
    const appointmentData = await appointmentService.findAppointmentByUserId(
      params
    );
    logger.info(
      `${logTitle} : checkUserAppointment : appointmentData : ${JSON.stringify(
        appointmentData
      )}`
    );
    res.json({
      error: appointmentData.error,
      exist: appointmentData.exist,
      message: appointmentData.message,
      data: appointmentData.data,
    });
  }
};

exports.checkUserAppointmentByDate = async function (req, res) {
  const { body } = req;

  if (body) {
    logger.info(
      `${logTitle} : checkUserAppointmentByDate : body : ${JSON.stringify(
        body
      )}`
    );
    // get appointment data by date input
    const appointmentData = await appointmentService.findAppointmentByDate(
      body
    );
    logger.info(
      `${logTitle} : checkUserAppointmentByDate : appointmentData : ${JSON.stringify(
        appointmentData
      )}`
    );
    res.json({
      error: appointmentData.error,
      exist: appointmentData.exist,
      message: appointmentData.message,
      data: appointmentData.data,
    });
  }
};

exports.createAppointment = async function (req, res) {
  const { body } = req;
  if (body) {
    logger.info(
      `${logTitle} : createAppointment : body : ${JSON.stringify(body)}`
    );
    // save appointment date
    const appointmentData = await appointmentService.saveAppointment(body);
    logger.info(
      `${logTitle} : createAppointment : appointmentData : ${JSON.stringify(
        appointmentData
      )}`
    );
    res.json({
      error: appointmentData.error,
      message: appointmentData.message,
      data: appointmentData.data,
    });
  }
};

exports.cancelAppointment = async function (req, res) {
  const { params } = req;
  if (params) {
    logger.info(
      `${logTitle} : cancelAppointment : params : ${JSON.stringify(params)}`
    );
    // delete appointment date
    const appointmentData = await appointmentService.deleteAppointment(params);
    logger.info(
      `${logTitle} : cancelAppointment : appointmentData : ${JSON.stringify(
        appointmentData
      )}`
    );
    res.json({
      error: appointmentData.error,
      message: appointmentData.message,
    });
  }
};
