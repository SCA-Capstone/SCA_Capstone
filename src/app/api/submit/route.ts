

// import mongodb, supabase, aws rds, etc.
// import formData model (typescript interface schema)
import { NextResponse } from 'next/server';

export async function POST(req: any) {
    const { name, email, company, files } = req.body;
    // validate the form data
    // check if the user is logged in / has permission to submit

    // connect to the database
        // await conntectdb();
    // insert the form data into the database
        // const newForm = await Form.create({ name, email, company, files });
        // const _id = newForm._id; 
    // response
    return NextResponse.json({
        message: "Form submitted successfully",
        // form: { _id: `${_id}` }
        }, 
        { status: 201 });
    // send a confirmation email to the user
        // await sendEmail(email, "Form submitted successfully", "Thank you for submitting your form");
}