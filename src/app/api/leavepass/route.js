import { NextResponse } from "next/server";
import nodemailer from 'nodemailer'

export async function POST(request) {
    // const {name, roll, destination} = request.body;
    // console.log(request.body)
    let data = await request.json();
    console.log(data)
    let date = new Date();
    let dateFormat = date.getDate() + '/' + date.getMonth() + "/" + date.getFullYear();
    let dateTime = date.getHours() + ":" + (date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes());
    console.log(dateTime);
    // return NextResponse.json({ status: 200, success: "Hello, Next.JS" })
    let text = `Leave pass generated successfully on date ${dateFormat} at time ${dateTime}`;
    console.log(text);
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        service: 'gmail',
        auth: {
            pass: "yknhemcsgutjdlka",
            user: "jobsujjawal100@gmail.com"
        }
    });
    try {
        await transporter.sendMail({
            from: data.email,
            to: "jobsujjawal100@gmail.com",
            subject: `Leave Pass`,
            text: "Asdfas",
            html: `<!DOCTYPE html>
            <html>
            <body>
            <h1>${text}</h1>
            <h2>Name: ${data.name}</h2>
            <h2>Roll no: ${data.rollNo} </h2>
            <h2>Destination : ${data.destination} </h2>
            <h2>Out Time: ${data.outTime}</h2>
            <h2>Return date: ${data.inDate}</h2>
            
            </body>
            </html>`,

        });
        // res.send({status:200, message:'Hello'})
    } catch (error) {
        console.log(error.message)
        return NextResponse.json({ success: "Not working", msg: error.message })
    }
    return NextResponse.json({ status: 200, success: "Hello, Next.JS" })
}