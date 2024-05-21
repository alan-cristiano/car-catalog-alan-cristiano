const createCarValidPayloadMock = {
    name: "Car name",
    description: "Car description",
    brand: "Car brand",
    year: 2000,
    km: 1000,
    userId: "userId",
};

const updateCarValidPayloadMock = {
    description: "Car updated",
    km: 5000,
};

const updateCarInvalidPayloadMock = {
    name: false,
    description: false,
    brand: false,
    year: "year",
    km: "km",
};

const createCarValidReturnMock = {
    id: expect.any(String),
    name: "Car name",
    description: "Car description",
    brand: "Car brand",
    year: 2000,
    km: 1000,
    userId: expect.any(String),
};

const updateCarValidReturnMock = {
    id: expect.any(String),
    name: "Car name",
    description: "Car updated",
    brand: "Car brand",
    year: 2000,
    km: 5000,
    userId: expect.any(String),
};

const createCarInvalidPayloadMock = {};

export {
    createCarValidPayloadMock,
    createCarValidReturnMock,
    createCarInvalidPayloadMock,
    updateCarValidPayloadMock,
    updateCarValidReturnMock,
    updateCarInvalidPayloadMock,
};
