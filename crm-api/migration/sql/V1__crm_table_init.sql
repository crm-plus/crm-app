CREATE TABLE IF NOT EXISTS credentials
(
    id       BIGINT GENERATED ALWAYS AS IDENTITY,
    email    VARCHAR UNIQUE NOT NULL,
    password VARCHAR        NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS users
(
    id                  BIGINT GENERATED ALWAYS AS IDENTITY,
    first_name          VARCHAR,
    last_name           VARCHAR,
    credential_id       INT,
    birth_date          DATE,
    residential_address VARCHAR,
    isDeleted           BOOLEAN,
    sex                 VARCHAR,

    PRIMARY KEY (id),

    CONSTRAINT fk_credential
        FOREIGN KEY (credential_id)
            REFERENCES credentials (id)
);

CREATE TABLE IF NOT EXISTS roles
(
    id   BIGINT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR UNIQUE NOT NULL,

    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS users_roles
(
    id      BIGINT GENERATED ALWAYS AS IDENTITY,
    user_id BIGINT,
    role_id BIGINT,

    PRIMARY KEY (id),

    CONSTRAINT fk_user_id
        FOREIGN KEY (user_id)
            REFERENCES users (id),

    CONSTRAINT fk_role_id
        FOREIGN KEY (role_id)
            REFERENCES roles (id)
);

CREATE TABLE IF NOT EXISTS organizations
(
    id          BIGINT GENERATED ALWAYS AS IDENTITY,
    name        VARCHAR(16) UNIQUE    NOT NULL,
    description VARCHAR,
    created_by  BIGINT                NOT NULL,
    deleted_by  BIGINT,
    created_at  DATE,
    updated_at  DATE,
    private     BOOLEAN DEFAULT FALSE NOT NULL,

    PRIMARY KEY (id),

    CONSTRAINT fk_created_by
        FOREIGN KEY (created_by)
            REFERENCES users (id),

    CONSTRAINT fk_deleted_by
        FOREIGN KEY (deleted_by)
            REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS organizations_users
(
    id      BIGINT GENERATED ALWAYS AS IDENTITY,
    organizations_id BIGINT,
    users_id BIGINT,

    PRIMARY KEY (id),

    CONSTRAINT fk_organizations_id
        FOREIGN KEY (organizations_id)
            REFERENCES organizations (id),

    CONSTRAINT fk_users_id
        FOREIGN KEY (users_id)
            REFERENCES users (id)
);