create table if not exists users
(
    id                  bigserial not null
        constraint users_pk
            primary key,
    first_name          varchar   not null,
    last_name           varchar   not null,
    email               varchar   not null,
    password            varchar   not null,
    residential_address varchar,
    sex                 varchar,
    birth_date          date,
    deleted             boolean default false
);

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
    user_id bigserial not null
        constraint user_id_fk
            references users,
    role_id bigserial not null
        constraint role_id_fk
            references roles
);
