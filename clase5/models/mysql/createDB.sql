-- creacion de la base de datos
drop database if exists moviesdb;
create database moviesdb;

-- usar

use moviesdb;

-- Creando la funcion uuid_to_bin

create table movie (
	id binary(16) primary key default (UUID_TO_BIN(UUID())),
	title varchar(255) not null,
	movie_year int not null,
	director varchar(255) not null,
	duration int not null,
	poster text,
	rate decimal(2,1) unsigned not null	
);

create table genre(
	id int auto_increment primary key,
	name varchar(255) not null unique
);


create table movie_genres(
	movie_id binary(16) references movie(id),
	genre_id int references genres(id),
	primary key (movie_id,genre_id)
);


insert into genre (name) values
('Drama'),
('Action'),
('Adventure'),
('Sci-Fi'),
('Romance');

insert into movie(id,title,movie_year,director,duration,poster,rate) values
(UUID_TO_BIN(UUID()),"Interestellar",1994,"Christopher Nolan",180,"https://m.media-amazon.com/images/I/91obuWzA3XL._AC_UF1000,1000_QL80_.jpg",9.0),
(UUID_TO_BIN(UUID()),"The Matrix",1999,"Lana Wachowski",136,"https://i.ebayimg.com/images/g/QFQAAOSwAQpfjaA6/s-l1200.jpg",8.7),
(UUID_TO_BIN(UUID()),"Pulp Fiction",1994,"Quentin Tarantino",154,"https://www.themoviedb.org/t/p/original/vQWk5YBFWF4bZaofAbv0tShwBvQ.jpg",8.9);

insert into movie_genres(movie_id,genre_id)
values 
	((select id from movie where title = 'Interestellar'),(select id from genre where name = 'Sci-Fi')),
	((select id from movie where title = 'Interestellar'),(select id from genre where name = 'Action')),
	((select id from movie where title = 'The Matrix'),(select id from genre where name = 'Sci-Fi')),
	((select id from movie where title = 'Pulp Fiction'),(select id from genre where name = 'Sci-Fi'));

select  BIN_TO_UUID(id) id, title,movie_year,director,duration,poster,rate from movie;

