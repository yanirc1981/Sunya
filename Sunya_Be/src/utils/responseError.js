module.exports = (res, statusCode, message) => {
    res.status(statusCode).json({
      error: true, // Puedes ajustar esto según tus necesidades
      message
    });
  };
  