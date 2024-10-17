import ldap from 'ldapjs';
import express from 'express';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ldapUrl = process.env.LDAP_URL;
const domain = process.env.DOMAIN;
const client = ldap.createClient({
  url: ldapUrl,
  reconnect: true
});

app.use(express.static('public'));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/login', (req, res) => {
  res.render('login', { error: null });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const userDn = `${username}@${domain}`;

  client.bind(userDn, password, (err) => {
    if (err) {
      return res.render('login', { error: 'Error en la autenticación' });
    }

    req.session.user = username;
    res.redirect('/main');
  });
});

app.get('/main', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  res.render('main', { user: req.session.user });
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

app.get('/ping', (req, res) => {
  res.status(200).json({ message: 'pong' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
