create table `customers` (
	customerID int not null primary key auto_increment,
    name varchar(255) not null,
    email varchar(50) not null
);

create table `line_items` (
	invoiceNumber int not null primary key,
	itemName varchar(255) not null,
    itemDescription varchar(255),
    itemPrice decimal(13,2) not null,
    customerID int,
    foreign key (customerID) references customers(customerID)
);


create table `invoices` (
	invoiceID int not null primary key auto_increment,
    invoiceNumber int not null,
    customerID int,
    foreign key (customerID) references customers(customerID)
);