CREATE TABLE appointment (
    id BIGSERIAL PRIMARY KEY,
    patient_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL
);
