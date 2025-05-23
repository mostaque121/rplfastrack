/* eslint-disable @typescript-eslint/no-unused-vars */
'use server'
import { prisma } from "./prisma";
async function moveData() {
    try {
        // Step 3: Fetch all sections from MongoDB
        const data = await fetch('http://localhost:3001/api/response', {
            method: 'GET',
            mode: 'no-cors',
        });
        const mongoReviews = await data.json();

        console.log(`Found response in MongoDB`);


        for (const mongoReview of mongoReviews) {

            const review = await prisma.response.create({
                data: {
                    name: mongoReview.name,
                    email: mongoReview.email,
                    phone: mongoReview.phone,
                    interest: mongoReview.interest,
                    message: mongoReview.message,
                    createdAt: mongoReview.createdAt,
                },
            });
            console.log('respopnse data transfer successfully');
        }
        console.log('All data transfer successfully');
    }
    catch (error) {
        console.error('Error occurred during section data transfer:', error);
    }
}

export default moveData;
