const axios = require('axios');

const BASE_URL = "http://localhost:3000";

describe("GET /rentals/:id", () => {
    it("should return a rental if it exists", async () => {
        const rentalId = 1; // Ensure this ID exists in your database
        const response = await axios.get(`${BASE_URL}/rentals/${rentalId}`);

        expect(response.status).toBe(200);
        expect(response.data.rental).toHaveProperty("id", rentalId);
    });

    it("should return 404 if rental does not exist", async () => {
        const nonExistentId = 12121212121212112121;

        try {
            await axios.get(`${BASE_URL}/rentals/${nonExistentId}`);
        } catch (error) {
            expect(error.response.status).toBe(404);
            expect(error.response.data).toEqual({ error: "Rental not found" });
        }
    });
});
