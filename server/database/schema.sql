create table user (
  id int primary key auto_increment not null,
  email varchar(255) not null unique,
  hashed_password varchar(255) not null,
  firstname varchar(255) not null,
  lastname varchar(255) not null,
  birthday varchar(255) not null,
  sex varchar(10) not null
);

create table token (
  id int primary key auto_increment not null,
  address varchar(255) not null unique,
  name varchar(255) not null,
  symbol varchar(5) not null,
  price float not null,
  percent_price float not null,
  image varchar(255) not null
);

create table favorite (
  id int primary key auto_increment not null,
  user_id int not null,
  foreign key(user_id) references user(id),
  token_id int not null,
  foreign key(token_id) references token(id)
);

-- insert into token (address) values ('0xdAC17F958D2ee523a2206206994597C13D831ec7');
-- insert into token (address) values ('0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2');
-- insert into token (address) values ('0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599');