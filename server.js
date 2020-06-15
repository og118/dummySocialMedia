process.on('uncaughtException', err => {
    console.log('UNHANDLED REJECTION! Shutting Down');
    console.log(err);
    process.exit(1);
})

const app = require('./app');

const server = app.listen(3000, () =>{
    console.log('App running on port 3000');
}); 