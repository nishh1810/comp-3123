var http = require("http");
//TODO - Use Employee Module here
console.log("Lab 03 -  NodeJs");
const employees = require('./Employee');
//TODO - Fix any errors you found working with lab exercise

//Define Server Port
const port = process.env.PORT || 8080;

//Create Web Server using CORE API
const server = http.createServer((req, res) => {
    
    if (req.method !== 'GET') {
        res.end(`{"error": "${http.STATUS_CODES[405]}"}`)
    } else {
        if (req.url === '/') {  
            //TODO - Display message "<h1>Welcome to Lab Exercise 03</h1>"
            res.setHeader('Content-Type', 'text/html');
            res.end('<h1>Welcome to Lab Exercise 03</h1>');
        }else if (req.url === '/employee') {
            console.log("display employee");
            console.log(employees);
            //TODO - Display all details for employees in JSON format
            res.setHeader('content-type','application/json');
            res.end(JSON.stringify(employees, null, 2));
        }else if (req.url === '/employee/names') {
            //TODO - Display only all employees {first name + lastname} in Ascending order in JSON Array
            //e.g. [ "Ash Lee", "Mac Mohan", "Pritesh Patel"]
            const employeeNames = employees
                .map(emp => `${emp.firstName} ${emp.lastName}`)
                .sort(); // Sort names in ascending order
            res.setHeader('content-type','application/json');
            res.end(JSON.stringify(employeeNames));
        }else if (req.url === '/employee/totalsalary') {
            //TODO - Display Sum of all employees salary in given JSON format 
            //e.g. { "total_salary" : 100 }
            const totalSalary = employees.reduce((sum, emp) => sum + emp.Salary, 0);
            res.setHeader('content-type','application/json');
            res.end(JSON.stringify({ total_salary: totalSalary }));  
        }else {
            res.end(`{"error": "${http.STATUS_CODES[404]}"}`)
        }
    }
})

server.listen(port, () => {
    console.log(`Server listening on port 127.0.0.1.8081`);
})