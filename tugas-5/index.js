const express = require("express");
const fs = require('fs')
const users = require("./MOCK_DATA.json");

const app =express();
const PORT = 3000;

//plugin
app.use(express.urlencoded({extended: false}));

// routes
app.get('/users', (req, res) => {
    const users = JSON.parse(fs.readFileSync("./MOCK_DATA.json"));
  const html = `
    <ul>
      ${users.map(user => `<li>${user.first_name}</li>`).join('')}
    </ul>
  `;
  res.send(html);
});

// REST API
app.get('/api/users', (req, res) => {
    return res.json(users);
});

app
.route ('/api/users/:id')
   .get((req, res) => {
     const users = JSON.parse(fs.readFileSync("./MOCK_DATA.json"));
    const id = Number(req.params.id);
    const user = users.find((u) => u.id === id);
    return res.json(user);
  })
.put((req, res) => {
  const users = JSON.parse(fs.readFileSync("./MOCK_DATA.json", "utf-8"));
  const id = Number(req.params.id);
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return res.status(404).json({ status: "Error" });

  users[index] = { ...users[index], ...req.body };

  fs.writeFileSync("./MOCK_DATA.json", JSON.stringify(users, null, 2));
  res.json({ status: "Success", user: users[index] });
})

 .delete((req, res) => {
    const users = JSON.parse(fs.readFileSync("./MOCK_DATA.json", "utf-8"));
    const id = Number(req.params.id);
    const filteredUsers = users.filter(u => u.id !== id);

fs.writeFileSync("./MOCK_DATA.json", JSON.stringify(filteredUsers, null, 2));
return res.json({ status: "Deleted", id });

});


app.post('/api/users', (req, res) => {
    // Create new user
    const body = req.body;
    users.push({...body, id:users.length +1});
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
         return res.json({ status: "Success", id:users.length});
    });
    
});

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`)); 
