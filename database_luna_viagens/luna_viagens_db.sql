
CREATE TABLE cliente (
	id int primary key identity,
	nome varchar(50) not null,
	endereco varchar(50) not null,
	email varchar(20) not null,
	cpf varchar(14) not null,
	telefone varchar(14) not null,
	destino_id int,
	pacote_id int

	foreign key (destino_id) references destino (id),
	foreign key (pacote_id) references pacote (id)
)

select * from pacote

alter table destino alter column hora_ida time