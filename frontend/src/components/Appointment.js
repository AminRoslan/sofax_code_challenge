import React, { Component } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import format from 'date-fns/format';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

const API_BASE = 'http://localhost:5000';

const theme = createTheme();

class Appointment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isError: false,
      firstError: false,
      lastError: false,
      phoneError: false,
      errorMessage: '',
      step: 0,
      userId: '',
      email: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      date: '',
      time: '',
      timeOpen: false,
      dateValue: null,
      timeValue: '',
      operationTime: [
        '9.00 AM',
        '10.00 AM',
        '11.00 AM',
        '12.00 PM',
        '1.00 PM',
        '2.00 PM',
        '3.00 PM',
        '4.00 PM',
        '5.00 PM',
      ],
    };
    this.checkUser = this.checkUser.bind(this);
    this.firstRegister = this.firstRegister.bind(this);
    this.checkAppointment = this.checkAppointment.bind(this);
    this.makeAppointment = this.makeAppointment.bind(this);
    this.setValue = this.setValue.bind(this);
    this.saveAppointment = this.saveAppointment.bind(this);
    this.cancelAppointment = this.cancelAppointment.bind(this);
  }

  checkUser() {
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const email = document.getElementById('email').value;
    let step = 0;
    let userId = '';
    let firstName = '';
    let lastName = '';
    let phoneNumber = '';
    let isError = false;
    let errorMessage = '';
    if (email) {
      if (regex.test(email)) {
        axios
          .post(`${API_BASE}/user/findUser`, {
            email: email,
          })
          .then((response) => {
            if (response.data) {
              const data = response.data;

              if (!data.error && data.exist) {
                userId = data.data._id;
                firstName = data.data.first_name;
                lastName = data.data.last_name;
                phoneNumber = data.data.phone_number;
                this.setState({
                  step,
                  userId,
                  email,
                  firstName,
                  lastName,
                  phoneNumber,
                });
                this.checkAppointment();
              } else if (!data.error && !data.exist) {
                step = 1;
                this.setState({ step, email });
              } else {
                isError = true;
                errorMessage = 'Something wrong happened.';
                this.setState({ isError, errorMessage });
              }
            }
          })
          .catch((error) => {
            console.error(`checkUser - error : ${error}`);
            isError = true;
            errorMessage = 'Something wrong happened.';
            this.setState({ isError, errorMessage });
          });
      } else {
        isError = true;
        errorMessage = 'Please insert valid email';
        this.setState({ isError, errorMessage });
      }
    } else {
      isError = true;
      errorMessage = 'Please insert email address';
      this.setState({ isError, errorMessage });
    }
  }

  firstRegister() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    let errorMessage = '';
    let isError = false;
    let firstError = false;
    let lastError = false;
    let phoneError = false;
    let step = 0;

    if (firstName && lastName && phoneNumber) {
      axios
        .post(`${API_BASE}/user/firstRegister`, {
          email: this.state.email,
          first_name: firstName,
          last_name: lastName,
          phone_number: phoneNumber,
        })
        .then((response) => {
          if (response.data) {
            step = 2;
            this.setState({ step });
          }
        })
        .catch((error) => {
          console.error(`firstRegister - error : ${error}`);
          isError = true;
          errorMessage = 'Something wrong happened.';
          this.setState({ isError, errorMessage });
        });
    } else {
      if (!firstName) {
        firstError = true;
      }

      if (!lastName) {
        lastError = true;
      }

      if (phoneError) {
        phoneError = true;
      }

      errorMessage = 'Please fill in the form';
      this.setState({ firstError, lastError, phoneError, errorMessage });
    }
  }

  checkAppointment() {
    let date = '';
    let time = '';
    let step = 0;
    axios
      .get(`${API_BASE}/appointment/checkAppointment/${this.state.userId}`)
      .then((response) => {
        if (response.data) {
          const data = response.data;

          if (data.exist) {
            date = data.data.date;
            time = data.data.time;
          }

          step = 2;
          this.setState({
            date,
            time,
            step,
          });
        }
      });
  }

  makeAppointment() {
    this.setState({ step: 3, dateValue: null, timeValue: '' });
  }

  saveAppointment() {
    let isError = false;
    let errorMessage = '';
    let step = 0;
    if (this.state.date && this.state.time) {
      axios
        .post(`${API_BASE}/appointment/createAppointment`, {
          user_id: this.state.userId,
          date: this.state.date,
          time: this.state.time,
        })
        .then((response) => {
          if (response.data) {
            const data = response.data;
            if (!data.error) {
              step = 2;
              this.setState({ step });
            }
          }
        })
        .catch((error) => {
          console.error(`saveAppointment - error : ${error}`);
        });
    } else {
      isError = true;
      errorMessage = 'Please fill appointment form.';
      this.setState({ isError, errorMessage });
    }
  }

  cancelAppointment() {
    axios
      .delete(`${API_BASE}/appointment/cancelAppointment/${this.state.userId}`)
      .then((response) => {
        if (response.data) {
          const data = response.data;
          if (!data.error) {
            this.setState({ date: '', time: '' });
          }
        }
      })
      .catch((error) => {
        console.error(`cancelAppointment - error : ${error}`);
      });
  }

  setValue(newValue) {
    let dateFormat = format(newValue, 'dd/MM/yy');
    let appointmentArr = [];
    axios
      .post(`${API_BASE}/appointment/checkAppointmentByDate`, {
        date: dateFormat,
      })
      .then((response) => {
        if (response.data) {
          const data = response.data;
          if (data.exist) {
            appointmentArr = data.data;
            appointmentArr.find((takenAppointment) => {
              const timeIndex = this.state.operationTime.indexOf(
                takenAppointment.time
              );
              if (timeIndex > -1) {
                this.state.operationTime.splice(timeIndex, 1);
              }
              return timeIndex;
            });
          }
        }
      })
      .catch((error) => {
        console.error(`setValue - error : ${error}`);
      });
    this.setState({ dateValue: newValue, date: dateFormat });
  }

  disableDates(renderDate) {
    const advancedDate = new Date();
    advancedDate.setDate(advancedDate.getDate() + 2);
    const limitDate = new Date();
    limitDate.setDate(limitDate.getDate() + 23);

    return (
      renderDate < advancedDate ||
      renderDate > limitDate ||
      renderDate.getDay() === 6 ||
      renderDate.getDay() === 0
    );
  }

  setTime(selectedTime) {
    this.setState({ timeValue: selectedTime, time: selectedTime });
  }

  setOpen(isOpen) {
    this.setState({ timeOpen: isOpen });
  }

  render() {
    const {
      isError,
      firstError,
      lastError,
      phoneError,
      errorMessage,
      email,
      firstName,
      lastName,
      phoneNumber,
      date,
      time,
      step,
      dateValue,
      timeValue,
      timeOpen,
      operationTime,
    } = this.state;

    const handleTimeChange = (event) => {
      this.setTime(event.target.value);
    };

    const handleClose = () => {
      this.setOpen(false);
    };

    const handleOpen = () => {
      this.setOpen(true);
    };

    return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="lg">
          <CssBaseline />
          {step === 0 && (
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <BookOnlineIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                SofaX Appointment System
              </Typography>

              <Box component="form" noValidate sx={{ mt: 1 }}>
                {isError && <Alert severity="error">{errorMessage}</Alert>}
                <TextField
                  error={isError}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoFocus
                />
                <Button
                  type="button"
                  onClick={this.checkUser}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Make Appointment
                </Button>
              </Box>
            </Box>
          )}
          {step === 1 && (
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <BookOnlineIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                First Time Registration
              </Typography>
              <Box component="form" noValidate sx={{ mt: 1 }}>
                {(isError || firstError || lastError || phoneError) && (
                  <Alert severity="error">{errorMessage}</Alert>
                )}
                <TextField
                  error={firstError}
                  margin="normal"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  name="firstName"
                />
                <TextField
                  error={lastError}
                  margin="normal"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                />
                <TextField
                  error={phoneError}
                  margin="normal"
                  required
                  fullWidth
                  type="number"
                  id="phoneNumber"
                  label="Phone Number"
                  name="phoneNumber"
                />
                <Button
                  type="button"
                  onClick={this.firstRegister}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Continue
                </Button>
              </Box>
            </Box>
          )}
          {step === 2 && (
            <TableContainer component={Paper} sx={{ maxHeight: 'auto' }}>
              <List
                sx={{
                  width: '100%',
                  maxWidth: 360,
                  bgcolor: 'background.paper',
                }}
              >
                <ListItem>
                  <ListItemText primary="Email" secondary={email} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Name"
                    secondary={firstName + ' ' + lastName}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Phone Number"
                    secondary={phoneNumber}
                  />
                </ListItem>
                {!date && (
                  <ListItem>
                    <ListItemText
                      primary="Appointment Status"
                      secondary="No Appointment"
                    />
                  </ListItem>
                )}
                {date && (
                  <ListItem>
                    <ListItemText
                      primary="Appointment Status"
                      secondary="Have Appointment"
                    />
                  </ListItem>
                )}
              </List>
              <Button
                disabled={date}
                type="button"
                onClick={this.makeAppointment}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                New Appointment
              </Button>
              {date && (
                <Table sx={{ minWidth: 500 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Date</TableCell>
                      <TableCell align="center">Time</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}
                    >
                      <TableCell align="center">{time}</TableCell>
                      <TableCell align="center">{date}</TableCell>
                      <TableCell align="center">
                        <ButtonGroup
                          variant="contained"
                          aria-label="outlined primary button group"
                        >
                          <Button onClick={this.makeAppointment}>
                            Resechedule
                          </Button>
                          <Button onClick={this.cancelAppointment}>
                            Cancel
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              )}
            </TableContainer>
          )}
          {step === 3 && (
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <BookOnlineIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Make Appointment
              </Typography>
              <Box component="form" noValidate sx={{ mt: 1 }}>
                {isError && <Alert severity="error">{errorMessage}</Alert>}
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="Date of Appointment"
                    value={dateValue}
                    onChange={(newValue) => {
                      this.setValue(newValue);
                    }}
                    disableHighlightToday
                    shouldDisableDate={this.disableDates}
                    minDate={new Date().getDate() + 2}
                    inputFormat={'dd/MM/yyyy'}
                  />
                </LocalizationProvider>
                <InputLabel shrink htmlFor="select-native">
                  Time Available
                </InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  open={timeOpen}
                  onClose={handleClose}
                  onOpen={handleOpen}
                  value={timeValue}
                  label="Age"
                  onChange={handleTimeChange}
                >
                  {operationTime.map((time) => (
                    <MenuItem value={time}>{time}</MenuItem>
                  ))}
                </Select>
                <Button
                  type="button"
                  onClick={this.saveAppointment}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Confirm Appointment
                </Button>
              </Box>
            </Box>
          )}
        </Container>
      </ThemeProvider>
    );
  }
}

export default Appointment;
