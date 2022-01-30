/* Users table */
create table if not exists users
(
    id                            bigserial not null
        constraint users_pk
            primary key,
    first_name          varchar   not null,
    last_name           varchar   not null,
    email               varchar   not null,
    password            varchar   not null,
    residential_address varchar,
    sex                 varchar
);

alter table users
    owner to postgres;

create unique index if not exists users_email_uindex
    on users (email);

create unique index if not exists users_id_uindex
    on users (id);

/* Roles table */
create table if not exists roles
(
    id bigserial not null
        constraint roles_pk
            primary key,
    name VARCHAR not null
);

create unique index if not exists roles_name_uindex
    on roles (name);

/* Users Roles table */
create table if not exists users_roles
(
    users_roles_id bigserial not null
        constraint users_roles_pk
            primary key
        constraint roles_id___fk
            references roles
        constraint users_id___fk
            references users
);

alter table users_roles
    owner to postgres;

create unique index if not exists users_roles_id_uindex
    on users_roles (users_roles_id);
