
const loggerController = (req, res) => {

  console.log('CONTROLLER LOGGED')
  res.send('Server response from loggerController')
}

//Here the controller functions is exported to be used on the route: myLoggerRoute.js
module.exports = {
  loggerController,
  //another function here
};