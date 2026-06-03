
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
const app = express();
const PORT = 3000;
let crypto;
try {
  crypto = await import('node:crypto');
} catch (err) {
  console.error('crypto support is disabled!');
}

let MEMBERS = {}
app.use(express.json());
app.get("/api", (req, res) => {
    const queries = req.query;
    res.send(queries);
});

app.get('/members', (req, res) => {
    res.send(MEMBERS);
});

app.get('/member', (req, res) => {
    res.send(MEMBERS[req.query['id']]);
});

app.get('/member/:id', (req, res) => {
    res.send(MEMBERS[req.params['id']]);
});


app.post('/members', (req, res) => {
    let response = {};
    for (let member of req.body){
        member['id'] = crypto.randomUUID();
        MEMBERS[member['id']] = member;
        response[member['id']] = member;
    };
    res.send(response);
});

app.post('/member', (req, res) => {
    req.body['id'] = crypto.randomUUID();
    MEMBERS[req.body['id']] = req.body;
    res.send(req.body);
});

app.put('/members', (req, res) => {
    let response = {}
    for (let member of req.body){
      MEMBERS[member['id']] = member;
      response[member['id']] = member;
    };
    res.send(response);
});

app.put('/member', (req, res) => {
    MEMBERS[req.body['id']] = req.body;
    res.send(req.body);
});

app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});