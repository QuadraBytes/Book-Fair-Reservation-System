-- =========================
--  TABLE: stall
-- =========================
CREATE TABLE stall (
    stallid BIGINT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(100) NOT NULL,
    stallnumber VARCHAR(100) NOT NULL UNIQUE,
    status VARCHAR(50) DEFAULT 'active'
);

-- =========================
--  TABLE: booking
-- =========================
CREATE TABLE booking (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    stallid BIGINT NOT NULL,
    userid BIGINT NOT NULL,
    createddate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    createdby VARCHAR(255),
    status VARCHAR(50) NOT NULL,
    stallnumber VARCHAR(100),
    qr_link VARCHAR(500),

    CONSTRAINT fk_booking_stall FOREIGN KEY (stallid)
        REFERENCES stall(stallid)
        ON DELETE CASCADE,

    CONSTRAINT fk_booking_user FOREIGN KEY (userid)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);