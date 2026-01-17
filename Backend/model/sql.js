const SqlObject ={
    findD: 'SELECT * FROM drivers_tb where fullname Like ?',
    findS: 'SELECT * FROM students_tb where fullname Like ?',
    findV: 'SELECT * FROM vendors_tb where vendor_name Like ?',
    addDriver: "insert into drivers_tb (fullname,email, passwd) values (?, ?, ?)",
    addStudent: "insert into students_tb (fullname,email, passwd) values (?, ?, ?)",
    addVendor: "insert into vendors_tb (vendor_name,email,passwd) values (?, ?, ?)",
    driverList: 'select * from drivers_tb ORDER BY fullname DESC limit 1 ',
    studentList: 'select * from students_tb ORDER BY fullname DESC limit 1 ',
    vendorList: 'select * from vendors_tb ORDER BY vendor_name DESC limit 1 ',
    // findGeneral:  'select fullname, contact, account_number, account_type, country from customers_tb left OUTER JOIN customer_account on customer_account.customer_id = customers_tb.customer_id where fullname Like ? or account_number Like ?',
    loginSqlD: "select * from drivers_tb where email = ?",
    loginSqlS: "select * from students_tb where email = ?",
    loginSqlV: "select * from vendors_tb where email = ?",
    createKeySql: "insert into apikey (fullname, api_key) values (?,?)",
    fetchKey: "select * from apikey where api_key = ?"
}
module.exports =SqlObject