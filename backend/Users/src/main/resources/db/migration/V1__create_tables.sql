-- =========================
--  TABLE: users
-- =========================
CREATE TABLE users (
    user_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(100) NOT NULL UNIQUE,
    passwordhash VARCHAR(255) NOT NULL,
    isactive BOOLEAN DEFAULT TRUE,
    salt VARCHAR(255),
    createddate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modifieddate TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    activenumberofstalls INT DEFAULT 0
);

-- =========================
--  TABLE: userdetails
-- =========================
CREATE TABLE userdetails (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    userid BIGINT NOT NULL,
    username VARCHAR(100) NOT NULL,
    company VARCHAR(100),
    contact VARCHAR(20),
    type VARCHAR(50),
    social VARCHAR(255),
    location VARCHAR(255),
    createdby VARCHAR(255),
    createddate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_userdetails_user FOREIGN KEY (userid)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);
