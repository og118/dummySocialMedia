const fs = require('fs');
const express = require('express');
const helmet = require('helmet')
const monogSanitize = require('express-mongo-sanitize');
const xssClean = require('xss-clean')
const rateLimit = require('express-rate-limit')
const hpp = require('hpp')
const morgan = require('morgan');
const globalErrorHandler = require('./controllers/errorController.js')

const postRouter = require('./routes/postRoutes');
const userRouter = require('./routes/userRoutes');



const app = express();
// MIDDLEWARES 
// Security HTTP headers
app.use(helmet());

// Development Logging
if(process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Body Parser, reading data from body to req.body
app.use(express.json({limit: '10kb'}));

// Data Sanitization against NoSQL query injection
app.use(monogSanitize());

// Data Sanitization against XSS
app.use(xssClean());

// Prevent Parameter Pollution
app.use(hpp());

// rate limiter
const limiter = rateLimit({
    max: 1000,
    windowMs: 60*60*1000, 
    message: 'Too many requests from this IP, try again next hour'
})
app.use('/', limiter);

app.use('/social/posts', postRouter);
app.use('/social/users', userRouter);

app.use(globalErrorHandler);


module.exports = app;

