-- local mysql connection
-- CREATE USER if not exists `brian`@`localhost` IDENTIFIED BY 'password';
-- GRANT ALL PRIVILEGES ON *.* TO `brian`@`localhost` WITH GRANT OPTION;
-- FLUSH PRIVILEGES;

-- drop database if exists property_connect_backend;
-- create database if not exists property_connect_backend;
-- use property_connect_backend;

-- remote mysql connection
-- mysql -h sql.freedb.tech -P 3306 -u freedb_brian-oyaro -p ?%PNCbpU@BWEjb3
use freedb_brian-oyaro-database

create table if not exists users (
    id int primary key auto_increment,
    password varchar(255) not null,
    email varchar(255) not null unique,
    role varchar(255) not null
);

create table if not exists rentals (
    id int primary key auto_increment,
    owner_id int not null,
    location varchar(255) not null,
    price int not null,
    title varchar(255) not null,
    description varchar(255) not null,
    property_type varchar(255) not null,
    imageUrl varchar(255) not null,
    status varchar(255) not null default 'available',
    foreign key (owner_id) references users(id)
);

create table if not exists bookings (
    id int primary key auto_increment,
    user_id int not null,
    rental_id int not null,
    foreign key (user_id) references users(id),
    foreign key (rental_id) references rentals(id)
);