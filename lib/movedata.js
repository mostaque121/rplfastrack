/* eslint-disable @typescript-eslint/no-unused-vars */
'use server'
import { prisma } from "./prisma";
async function moveSectionsFromMongoToPostgres() {
    try {
        // Step 3: Fetch all sections from MongoDB
        const data = await fetch('https://www.rplfastrack.com/api/review', {
            method: 'GET',
            mode: 'no-cors',  // Don't recommend this for JSON responses
        });
        const mongoReviews = await data.json();
        console.log(`Found Reviews in MongoDB`);

        if (Array.isArray(mongoReviews)) {
            for (const mongoReview of mongoReviews) {


                const { _id, purchasedCourse, __v, ...reviewForSave } = mongoReview
                const courseLink = purchasedCourse.link;


                const relatedCourse = await prisma.course.findUnique({
                    where: {
                        link: courseLink,
                    },
                });

                console.log(`Found related Course in prisma`);


                const review = await prisma.userReview.create({
                    data: {
                        ...reviewForSave,
                        purchasedCourse: { connect: { id: relatedCourse.id } },
                    },
                });
            } console.log('Reviews data transfer completed successfully');
        } else {
            console.error('mongoSections is not an array');
        }



        console.log('Section data transfer completed successfully');
    } catch (error) {
        console.error('Error occurred during section data transfer:', error);
    }
}

export default moveSectionsFromMongoToPostgres;
